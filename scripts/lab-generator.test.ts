import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import {
  checkLab,
  createLabEntry,
  getLabPaths,
  readLabEntries,
  syncLab,
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

async function writeEntry(
  root: string,
  slug: string,
  metadata: Record<string, unknown>,
): Promise<void> {
  const directory = path.join(root, 'src', 'lab', 'entries', slug)
  await fs.mkdir(directory, { recursive: true })
  await fs.writeFile(
    path.join(directory, 'entry.tsx'),
    'export default function Entry() { return null }\n',
  )
  await fs.writeFile(
    path.join(directory, 'lab.json'),
    `${JSON.stringify(metadata, null, 2)}\n`,
  )
}

void test('scaffolds an entry and generates its route', async () => {
  await withFixture(async (root) => {
    await createLabEntry('magnetic-button', root)
    const paths = getLabPaths(root)

    assert.equal((await readLabEntries(root))[0]?.title, 'Magnetic Button')
    assert.equal((await checkLab(root)).length, 0)
    await fs.access(
      path.join(paths.viewerRoutes, 'magnetic-button', 'page.tsx'),
    )
  })
})

void test('orders entries by newest date and then title', async () => {
  await withFixture(async (root) => {
    await writeEntry(root, 'older', {
      title: 'Older',
      createdAt: '2026-07-17',
    })
    await writeEntry(root, 'zebra', {
      title: 'Zebra',
      createdAt: '2026-07-18',
    })
    await writeEntry(root, 'alpha', {
      title: 'Alpha',
      createdAt: '2026-07-18',
    })

    assert.deepEqual(
      (await readLabEntries(root)).map(({ slug }) => slug),
      ['alpha', 'zebra', 'older'],
    )
  })
})

void test('rejects invalid metadata with the source path', async () => {
  await withFixture(async (root) => {
    await writeEntry(root, 'broken', {
      title: 'Broken',
      createdAt: '2026-02-30',
    })

    await assert.rejects(
      readLabEntries(root),
      /broken.*lab\.json.*real YYYY-MM-DD/,
    )
  })
})

void test('detects stale files and removes only generated routes on sync', async () => {
  await withFixture(async (root) => {
    await writeEntry(root, 'temporary', {
      title: 'Temporary',
      createdAt: '2026-07-18',
    })
    await syncLab(root)
    const paths = getLabPaths(root)
    const staleRoute = path.join(paths.viewerRoutes, 'temporary', 'page.tsx')

    await fs.rm(path.join(paths.entries, 'temporary'), {
      recursive: true,
      force: true,
    })
    assert.match((await checkLab(root)).join('\n'), /stale generated route/)

    await syncLab(root)
    await assert.rejects(fs.access(staleRoute))
    assert.deepEqual(await checkLab(root), [])
  })
})

void test('refuses to overwrite an existing entry', async () => {
  await withFixture(async (root) => {
    await createLabEntry('kept', root)
    await assert.rejects(createLabEntry('kept', root), /already exists/)
  })
})
