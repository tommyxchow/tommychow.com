import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  checkLab,
  createLabEntry,
  createLabVariation,
  getLabPaths,
  IDEA_METADATA_KEYS,
  ISO_TIMESTAMP_PATTERN,
  readLabIdeas,
  syncLab,
  VARIATION_METADATA_KEYS,
} from './lab'

async function withFixture(
  run: (root: string) => Promise<void>,
): Promise<void> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'tommy-lab-'))
  try {
    await run(root)
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
}

interface FixtureVariation {
  slug: string
  metadata: Record<string, unknown>
  source?: string
}

async function writeIdea(
  root: string,
  slug: string,
  metadata: Record<string, unknown>,
  variations: FixtureVariation[],
): Promise<void> {
  const ideaDirectory = path.join(getLabPaths(root).entries, slug)
  await fs.mkdir(path.join(ideaDirectory, 'variations'), { recursive: true })
  await fs.writeFile(
    path.join(ideaDirectory, 'lab.json'),
    `${JSON.stringify(metadata, null, 2)}\n`,
  )

  for (const variation of variations) {
    const variationDirectory = path.join(
      ideaDirectory,
      'variations',
      variation.slug,
    )
    await fs.mkdir(variationDirectory, { recursive: true })
    await fs.writeFile(
      path.join(variationDirectory, 'entry.tsx'),
      variation.source ??
        'export default function Entry() { return <div /> }\n',
    )
    await fs.writeFile(
      path.join(variationDirectory, 'variation.json'),
      `${JSON.stringify(variation.metadata, null, 2)}\n`,
    )
  }
}

async function readGenerated(
  root: string,
  ...segments: string[]
): Promise<string> {
  return fs.readFile(
    path.join(getLabPaths(root).viewerRoutes, ...segments),
    'utf8',
  )
}

void test('scaffolds an idea with a default or custom first variation', async () => {
  await withFixture(async (root) => {
    await createLabEntry('magnetic-button', undefined, root)
    await createLabEntry('particle-garden', 'opening-scene', root)

    const ideas = await readLabIdeas(root)
    assert.deepEqual(
      ideas
        .sort((left, right) => left.slug.localeCompare(right.slug))
        .map((idea) => [idea.slug, idea.variations.map(({ slug }) => slug)]),
      [
        ['magnetic-button', ['first-pass']],
        ['particle-garden', ['opening-scene']],
      ],
    )
    assert.equal((await checkLab(root)).length, 0)
    assert.ok(
      (await readGenerated(root, 'magnetic-button', 'page.tsx')).includes(
        "redirect('/lab/magnetic-button/first-pass')",
      ),
    )
    assert.match(
      await readGenerated(root, 'particle-garden', 'opening-scene', 'page.tsx'),
      /createLabMetadata\('particle-garden', 'opening-scene'\)/,
    )
  })
})

void test('clones a variation with fresh metadata and preserved source files', async () => {
  await withFixture(async (root) => {
    const source = 'export default function Entry() { return <canvas /> }\n'
    await writeIdea(
      root,
      'particle-garden',
      { title: 'Particle Garden', description: 'An evolving study.' },
      [
        {
          slug: 'first-pass',
          metadata: {
            title: 'First Pass',
            createdAt: '2026-07-18T12:00:00.000Z',
            notes: 'Keep this note on the source only.',
          },
          source,
        },
      ],
    )

    await createLabVariation('particle-garden', 'soft-glow', undefined, root)
    const ideas = await readLabIdeas(root)
    const idea = ideas[0]
    assert.notEqual(idea, undefined)
    assert.deepEqual(
      idea?.variations.map(({ slug }) => slug),
      ['first-pass', 'soft-glow'],
    )

    const paths = getLabPaths(root)
    assert.equal(
      await fs.readFile(
        path.join(
          paths.entries,
          'particle-garden',
          'variations',
          'soft-glow',
          'entry.tsx',
        ),
        'utf8',
      ),
      source,
    )
    const clonedMetadata = JSON.parse(
      await fs.readFile(
        path.join(
          paths.entries,
          'particle-garden',
          'variations',
          'soft-glow',
          'variation.json',
        ),
        'utf8',
      ),
    ) as Record<string, unknown>
    assert.equal(clonedMetadata.title, 'Soft Glow')
    assert.match(String(clonedMetadata.createdAt), ISO_TIMESTAMP_PATTERN)
    assert.equal(clonedMetadata.notes, undefined)

    const sourceMetadata = JSON.parse(
      await fs.readFile(
        path.join(
          paths.entries,
          'particle-garden',
          'variations',
          'first-pass',
          'variation.json',
        ),
        'utf8',
      ),
    ) as Record<string, unknown>
    assert.equal(sourceMetadata.notes, 'Keep this note on the source only.')
  })
})

void test('clones from an explicit source variation', async () => {
  await withFixture(async (root) => {
    await writeIdea(root, 'type-study', { title: 'Type Study' }, [
      {
        slug: 'first-pass',
        metadata: {
          title: 'First Pass',
          createdAt: '2026-07-18T12:00:00.000Z',
        },
        source: 'export default function Entry() { return <p>old</p> }\n',
      },
      {
        slug: 'latest',
        metadata: {
          title: 'Latest',
          createdAt: '2026-07-18T13:00:00.000Z',
        },
        source: 'export default function Entry() { return <p>latest</p> }\n',
      },
    ])

    await createLabVariation('type-study', 'alternate', 'first-pass', root)
    assert.equal(
      await fs.readFile(
        path.join(
          getLabPaths(root).entries,
          'type-study',
          'variations',
          'alternate',
          'entry.tsx',
        ),
        'utf8',
      ),
      'export default function Entry() { return <p>old</p> }\n',
    )
  })
})

void test('orders ideas by newest variation and variations chronologically', async () => {
  await withFixture(async (root) => {
    await writeIdea(root, 'older-idea', { title: 'Older Idea' }, [
      {
        slug: 'second',
        metadata: {
          title: 'Second',
          createdAt: '2026-07-18T09:00:00.000Z',
        },
      },
      {
        slug: 'first',
        metadata: {
          title: 'First',
          createdAt: '2026-07-18T08:00:00.000Z',
        },
      },
    ])
    await writeIdea(root, 'newer-idea', { title: 'Newer Idea' }, [
      {
        slug: 'v1',
        metadata: {
          title: 'V1',
          createdAt: '2026-07-18T09:00:00.001Z',
        },
      },
    ])

    const ideas = await readLabIdeas(root)
    assert.deepEqual(
      ideas.map(({ slug }) => slug),
      ['newer-idea', 'older-idea'],
    )
    assert.deepEqual(
      ideas[1]?.variations.map(({ slug }) => slug),
      ['first', 'second'],
    )
  })
})

void test('rejects malformed ideas, variations, and empty optional strings', async () => {
  await withFixture(async (root) => {
    await writeIdea(root, 'broken', { title: 'Broken', unknown: true }, [
      {
        slug: 'first-pass',
        metadata: {
          title: 'First Pass',
          createdAt: '2026-07-18T12:00:00.000Z',
        },
      },
    ])
    await assert.rejects(readLabIdeas(root), /broken.*lab\.json.*unknown field/)
  })

  await withFixture(async (root) => {
    await writeIdea(root, 'broken', { title: 'Broken', description: ' ' }, [
      {
        slug: 'first-pass',
        metadata: {
          title: 'First Pass',
          createdAt: '2026-07-18T12:00:00.000Z',
        },
      },
    ])
    await assert.rejects(readLabIdeas(root), /description.*non-empty/)
  })

  await withFixture(async (root) => {
    await writeIdea(root, 'broken', { title: 'Broken' }, [
      {
        slug: 'first-pass',
        metadata: {
          title: 'First Pass',
          createdAt: '2026-07-18T12:00:00.000Z',
          notes: '',
        },
      },
    ])
    await assert.rejects(readLabIdeas(root), /notes.*non-empty/)
  })

  await withFixture(async (root) => {
    await writeIdea(root, 'broken', { title: 'Broken' }, [
      {
        slug: 'first-pass',
        metadata: {
          title: 'First Pass',
          createdAt: '2026-07-18',
        },
      },
    ])
    await assert.rejects(readLabIdeas(root), /canonical UTC ISO timestamp/)
  })
})

void test('rejects empty ideas and missing variation files', async () => {
  await withFixture(async (root) => {
    const ideaDirectory = path.join(getLabPaths(root).entries, 'empty')
    await fs.mkdir(path.join(ideaDirectory, 'variations'), { recursive: true })
    await fs.writeFile(
      path.join(ideaDirectory, 'lab.json'),
      JSON.stringify({ title: 'Empty' }),
    )
    await assert.rejects(readLabIdeas(root), /at least one variation/)
  })

  await withFixture(async (root) => {
    await writeIdea(root, 'missing-entry', { title: 'Missing Entry' }, [
      {
        slug: 'first-pass',
        metadata: {
          title: 'First Pass',
          createdAt: '2026-07-18T12:00:00.000Z',
        },
      },
    ])
    await fs.rm(
      path.join(
        getLabPaths(root).entries,
        'missing-entry',
        'variations',
        'first-pass',
        'entry.tsx',
      ),
    )
    await assert.rejects(readLabIdeas(root), /missing required entry\.tsx/)
  })
})

void test('rejects invalid slugs and missing clone sources without changing files', async () => {
  await assert.rejects(createLabEntry('../escape'), /Invalid Lab slug/)

  await withFixture(async (root) => {
    await assert.rejects(
      createLabVariation('missing', 'new-one', undefined, root),
      /idea does not exist/,
    )
    await createLabEntry('kept', undefined, root)
    await assert.rejects(
      createLabVariation('kept', '../escape', undefined, root),
      /Invalid Lab slug/,
    )
    await assert.rejects(
      createLabVariation('kept', 'new-one', 'missing', root),
      /variation does not exist/,
    )
    await createLabVariation('kept', 'new-one', undefined, root)
    await assert.rejects(
      createLabVariation('kept', 'new-one', undefined, root),
      /already exists/,
    )
  })
})

void test('generates nested routes and preserves composite idea/variation identities', async () => {
  await withFixture(async (root) => {
    await writeIdea(
      root,
      'first-idea',
      { title: 'First Idea', description: 'First description.' },
      [
        {
          slug: 'v1',
          metadata: {
            title: 'V1',
            createdAt: '2026-07-18T12:00:00.000Z',
            notes: 'First notes.',
          },
        },
      ],
    )
    await writeIdea(
      root,
      'second-idea',
      { title: 'Second Idea', description: 'Second description.' },
      [
        {
          slug: 'v1',
          metadata: {
            title: 'V1',
            createdAt: '2026-07-18T13:00:00.000Z',
            notes: 'Second notes.',
          },
        },
      ],
    )

    await syncLab(root)
    const manifest = await fs.readFile(getLabPaths(root).manifest, 'utf8')
    assert.match(manifest, /description: 'First description\.'/)
    assert.match(manifest, /notes: 'First notes\.'/)
    assert.match(manifest, /notes: 'Second notes\.'/)
    assert.ok(
      (await readGenerated(root, 'first-idea', 'page.tsx')).includes(
        "redirect('/lab/first-idea/v1')",
      ),
    )
    assert.match(
      await readGenerated(root, 'second-idea', 'v1', 'page.tsx'),
      /createLabMetadata\('second-idea', 'v1'\)/,
    )
  })
})

void test('detects drift and prunes nested stale routes without touching outside files', async () => {
  await withFixture(async (root) => {
    await writeIdea(root, 'temporary', { title: 'Temporary' }, [
      {
        slug: 'first-pass',
        metadata: {
          title: 'First Pass',
          createdAt: '2026-07-18T12:00:00.000Z',
        },
      },
    ])
    await syncLab(root)
    const paths = getLabPaths(root)
    const generatedPage = path.join(
      paths.viewerRoutes,
      'temporary',
      'first-pass',
      'page.tsx',
    )
    await fs.appendFile(generatedPage, '// drift\n')
    assert.match((await checkLab(root)).join('\n'), /generated content/)

    const outsideFile = path.join(
      root,
      'src',
      'app',
      'lab',
      '(viewer)',
      'keep.txt',
    )
    await fs.writeFile(outsideFile, 'keep me\n')
    await fs.rm(path.join(paths.entries, 'temporary'), {
      recursive: true,
      force: true,
    })
    assert.match((await checkLab(root)).join('\n'), /stale generated route/)

    await syncLab(root)
    await assert.rejects(fs.access(path.join(paths.viewerRoutes, 'temporary')))
    assert.equal(await fs.readFile(outsideFile, 'utf8'), 'keep me\n')
    assert.deepEqual(await checkLab(root), [])
  })
})

void test('keeps runtime metadata allowlists aligned with the JSON schemas', async () => {
  const projectRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
  )
  const ideaSchema = JSON.parse(
    await fs.readFile(
      path.join(projectRoot, 'src', 'lab', 'lab-idea.schema.json'),
      'utf8',
    ),
  ) as { properties: Record<string, unknown>; additionalProperties: boolean }
  const variationSchema = JSON.parse(
    await fs.readFile(
      path.join(projectRoot, 'src', 'lab', 'lab-variation.schema.json'),
      'utf8',
    ),
  ) as {
    properties: {
      createdAt: { pattern?: string }
    } & Record<string, unknown>
    additionalProperties: boolean
  }
  assert.deepEqual(
    Object.keys(ideaSchema.properties).sort(),
    [...IDEA_METADATA_KEYS].sort(),
  )
  assert.deepEqual(
    Object.keys(variationSchema.properties).sort(),
    [...VARIATION_METADATA_KEYS].sort(),
  )
  assert.equal(
    variationSchema.properties.createdAt.pattern,
    ISO_TIMESTAMP_PATTERN.source,
  )
  assert.equal(ideaSchema.additionalProperties, false)
  assert.equal(variationSchema.additionalProperties, false)
})
