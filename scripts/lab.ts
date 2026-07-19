/* eslint-disable no-console -- This file is a CLI and reports command results. */

import { randomUUID } from 'node:crypto'
import type { Dirent } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import prettier from 'prettier'

const PRETTIER_CONFIG_PATH = fileURLToPath(
  new URL('../package.json', import.meta.url),
)

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const ISO_TIMESTAMP_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
export const IDEA_METADATA_KEYS = new Set(['$schema', 'title', 'description'])
export const VARIATION_METADATA_KEYS = new Set([
  '$schema',
  'title',
  'createdAt',
  'notes',
])
const LAB_IDEA_SCHEMA_ID = 'https://tommychow.com/schemas/lab-idea.json'
const LAB_VARIATION_SCHEMA_ID =
  'https://tommychow.com/schemas/lab-variation.json'

export interface LabIdeaMetadata {
  title: string
  description?: string
}

export interface LabVariationMetadata {
  title: string
  createdAt: string
  notes?: string
}

export interface LabVariation extends LabVariationMetadata {
  slug: string
  href: string
}

export interface LabIdea extends LabIdeaMetadata {
  slug: string
  href: string
  variations: LabVariation[]
}

interface LabPaths {
  root: string
  entries: string
  manifest: string
  viewerRoutes: string
}

interface GeneratedFile {
  path: string
  content: string
}

export function getLabPaths(root = process.cwd()): LabPaths {
  return {
    root,
    entries: path.join(root, 'src', 'lab', 'entries'),
    manifest: path.join(root, 'src', 'lab', 'generated-manifest.ts'),
    viewerRoutes: path.join(
      root,
      'src',
      'app',
      'lab',
      '(viewer)',
      '(generated)',
    ),
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isCanonicalTimestamp(value: string): boolean {
  if (!ISO_TIMESTAMP_PATTERN.test(value)) return false

  const parsed = new Date(value)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString() === value
}

function validateOptionalString(
  value: unknown,
  key: string,
  source: string,
): string | undefined {
  if (value === undefined) return undefined
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(
      `${source}: "${key}" must be a non-empty string when provided`,
    )
  }
  return value.trim()
}

function assertRecordWithAllowedKeys(
  value: unknown,
  allowedKeys: Set<string>,
  source: string,
): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(`${source}: expected a JSON object`)
  }

  const unknownKeys = Object.keys(value).filter((key) => !allowedKeys.has(key))
  if (unknownKeys.length > 0) {
    throw new Error(`${source}: unknown field(s): ${unknownKeys.join(', ')}`)
  }

  return value
}

function requireNonEmptyTitle(
  value: Record<string, unknown>,
  source: string,
): string {
  if (typeof value.title !== 'string' || value.title.trim() === '') {
    throw new Error(`${source}: "title" must be a non-empty string`)
  }
  return value.title.trim()
}

function validateIdeaMetadata(value: unknown, source: string): LabIdeaMetadata {
  const record = assertRecordWithAllowedKeys(value, IDEA_METADATA_KEYS, source)
  const description = validateOptionalString(
    record.description,
    'description',
    source,
  )

  return {
    title: requireNonEmptyTitle(record, source),
    ...(description !== undefined ? { description } : {}),
  }
}

function validateVariationMetadata(
  value: unknown,
  source: string,
): LabVariationMetadata {
  const record = assertRecordWithAllowedKeys(
    value,
    VARIATION_METADATA_KEYS,
    source,
  )
  if (
    typeof record.createdAt !== 'string' ||
    !isCanonicalTimestamp(record.createdAt)
  ) {
    throw new Error(
      `${source}: "createdAt" must be a canonical UTC ISO timestamp`,
    )
  }
  const notes = validateOptionalString(record.notes, 'notes', source)

  return {
    title: requireNonEmptyTitle(record, source),
    createdAt: record.createdAt,
    ...(notes !== undefined ? { notes } : {}),
  }
}

export function validateSlug(slug: string): void {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Invalid Lab slug "${slug}". Use lowercase kebab-case letters and numbers.`,
    )
  }
}

async function pathExists(target: string): Promise<boolean> {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

async function readJson(target: string): Promise<unknown> {
  let source: string
  try {
    source = await fs.readFile(target, 'utf8')
  } catch {
    throw new Error(`${target}: missing required metadata file`)
  }

  try {
    return JSON.parse(source) as unknown
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`${target}: invalid JSON (${message})`, { cause: error })
  }
}

async function readVariation(
  ideaSlug: string,
  ideaDirectory: string,
  variationSlug: string,
): Promise<LabVariation> {
  validateSlug(variationSlug)
  const variationDirectory = path.join(
    ideaDirectory,
    'variations',
    variationSlug,
  )
  const componentPath = path.join(variationDirectory, 'entry.tsx')
  if (!(await pathExists(componentPath))) {
    throw new Error(`${componentPath}: missing required entry.tsx`)
  }

  const metadataPath = path.join(variationDirectory, 'variation.json')
  const metadata = validateVariationMetadata(
    await readJson(metadataPath),
    metadataPath,
  )
  return {
    slug: variationSlug,
    ...metadata,
    href: `/lab/${ideaSlug}/${variationSlug}`,
  }
}

export async function readLabIdeas(root = process.cwd()): Promise<LabIdea[]> {
  const paths = getLabPaths(root)
  await fs.mkdir(paths.entries, { recursive: true })
  const directoryEntries = await fs.readdir(paths.entries, {
    withFileTypes: true,
  })

  const ideas = await Promise.all(
    directoryEntries
      .filter((entry) => entry.isDirectory())
      .map(async ({ name: slug }) => {
        validateSlug(slug)
        const ideaDirectory = path.join(paths.entries, slug)
        const metadataPath = path.join(ideaDirectory, 'lab.json')
        const metadata = validateIdeaMetadata(
          await readJson(metadataPath),
          metadataPath,
        )
        const variationsDirectory = path.join(ideaDirectory, 'variations')

        let variationEntries: Dirent[]
        try {
          variationEntries = await fs.readdir(variationsDirectory, {
            withFileTypes: true,
          })
        } catch {
          throw new Error(
            `${variationsDirectory}: missing required variations directory`,
          )
        }

        const variationSlugs = variationEntries
          .filter((entry) => entry.isDirectory())
          .map(({ name }) => name)
        if (variationSlugs.length === 0) {
          throw new Error(
            `${variationsDirectory}: every Lab idea must have at least one variation`,
          )
        }

        const variations = await Promise.all(
          variationSlugs.map((variationSlug) =>
            readVariation(slug, ideaDirectory, variationSlug),
          ),
        )
        variations.sort(
          (left, right) =>
            left.createdAt.localeCompare(right.createdAt) ||
            left.title.localeCompare(right.title, 'en') ||
            left.slug.localeCompare(right.slug, 'en'),
        )
        const newestVariation = variations.at(-1)
        if (newestVariation === undefined) {
          throw new Error(`${variationsDirectory}: no variations found`)
        }

        return {
          slug,
          ...metadata,
          href: newestVariation.href,
          variations,
        }
      }),
  )

  return ideas.sort((left, right) => {
    const leftNewest = left.variations.at(-1)
    const rightNewest = right.variations.at(-1)
    if (leftNewest === undefined || rightNewest === undefined) return 0
    return (
      rightNewest.createdAt.localeCompare(leftNewest.createdAt) ||
      left.title.localeCompare(right.title, 'en') ||
      left.slug.localeCompare(right.slug, 'en')
    )
  })
}

function quote(value: string): string {
  return `'${value
    .replaceAll('\\', '\\\\')
    .replaceAll("'", "\\'")
    .replaceAll('\r', '\\r')
    .replaceAll('\n', '\\n')}'`
}

function renderManifest(ideas: LabIdea[]): string {
  if (ideas.length === 0) {
    return [
      "import { type LabIdea } from './types'",
      '',
      'export const labIdeas: readonly LabIdea[] = []',
      '',
    ].join('\n')
  }

  const records = ideas.map((idea) => {
    const ideaLines = [
      '  {',
      `    slug: ${quote(idea.slug)},`,
      `    title: ${quote(idea.title)},`,
    ]
    if (idea.description !== undefined) {
      ideaLines.push(`    description: ${quote(idea.description)},`)
    }
    ideaLines.push(`    href: ${quote(idea.href)},`, '    variations: [')

    for (const variation of idea.variations) {
      const variationLines = [
        '      {',
        `        slug: ${quote(variation.slug)},`,
        `        title: ${quote(variation.title)},`,
        `        createdAt: ${quote(variation.createdAt)},`,
      ]
      if (variation.notes !== undefined) {
        variationLines.push(`        notes: ${quote(variation.notes)},`)
      }
      variationLines.push(`        href: ${quote(variation.href)},`, '      },')
      ideaLines.push(...variationLines)
    }

    ideaLines.push('    ],', '  },')
    return ideaLines.join('\n')
  })

  return [
    "import { type LabIdea } from './types'",
    '',
    'export const labIdeas: readonly LabIdea[] = [',
    ...records,
    ']',
    '',
  ].join('\n')
}

function renderVariationRoute(idea: LabIdea, variation: LabVariation): string {
  return [
    `import Entry from '@/lab/entries/${idea.slug}/variations/${variation.slug}/entry'`,
    "import { createLabMetadata } from '@/lab/metadata'",
    '',
    `export const metadata = createLabMetadata(${quote(idea.slug)}, ${quote(variation.slug)})`,
    '',
    'export default function LabVariationPage() {',
    '  return <Entry />',
    '}',
    '',
  ].join('\n')
}

function renderIdeaRedirect(idea: LabIdea): string {
  return [
    "import { redirect } from 'next/navigation'",
    '',
    'export default function LabIdeaPage() {',
    `  redirect(${quote(idea.href)})`,
    '}',
    '',
  ].join('\n')
}

function expectedGeneratedFiles(
  ideas: LabIdea[],
  root: string,
): GeneratedFile[] {
  const paths = getLabPaths(root)
  return [
    { path: paths.manifest, content: renderManifest(ideas) },
    ...ideas.flatMap((idea) => [
      {
        path: path.join(paths.viewerRoutes, idea.slug, 'page.tsx'),
        content: renderIdeaRedirect(idea),
      },
      ...idea.variations.map((variation) => ({
        path: path.join(
          paths.viewerRoutes,
          idea.slug,
          variation.slug,
          'page.tsx',
        ),
        content: renderVariationRoute(idea, variation),
      })),
    ]),
  ]
}

function expectedViewerRoutePaths(
  generated: GeneratedFile[],
  manifestPath: string,
): Set<string> {
  return new Set(
    generated
      .map((file) => file.path)
      .filter((filePath) => filePath !== manifestPath),
  )
}

async function walkFiles(directory: string): Promise<string[]> {
  if (!(await pathExists(directory))) return []
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(directory, entry.name)
      if (entry.isDirectory()) return walkFiles(target)
      return [target]
    }),
  )

  return files.flat()
}

function isStrictlyInside(ownedRoot: string, target: string): boolean {
  const relative = path.relative(ownedRoot, target)
  return (
    relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative)
  )
}

function assertInside(
  ownedRoot: string,
  target: string,
  message = `Refusing to remove path outside generated Lab routes: ${target}`,
): void {
  if (!isStrictlyInside(ownedRoot, target)) {
    throw new Error(message)
  }
}

async function formatGeneratedContent(
  file: GeneratedFile,
): Promise<GeneratedFile> {
  if (!file.path.endsWith('.ts') && !file.path.endsWith('.tsx')) return file

  const config = await prettier.resolveConfig(PRETTIER_CONFIG_PATH)
  const content = await prettier.format(file.content, {
    ...config,
    filepath: file.path,
  })
  return { path: file.path, content }
}

async function prepareGeneratedFiles(
  ideas: LabIdea[],
  root: string,
): Promise<GeneratedFile[]> {
  const generated = expectedGeneratedFiles(ideas, root)
  return Promise.all(generated.map(formatGeneratedContent))
}

async function writeIfChanged(file: GeneratedFile): Promise<boolean> {
  const current = await fs.readFile(file.path, 'utf8').catch(() => undefined)
  if (current === file.content) return false
  await fs.mkdir(path.dirname(file.path), { recursive: true })
  await fs.writeFile(file.path, file.content)
  return true
}

async function removeStaleFiles(
  expected: Set<string>,
  ownedRoots: string[],
): Promise<number> {
  const existing = (await Promise.all(ownedRoots.map(walkFiles))).flat()
  const stale = existing.filter((file) => !expected.has(file))

  for (const file of stale) {
    const owner = ownedRoots.find((root) => isStrictlyInside(root, file))
    if (owner === undefined) {
      throw new Error(`Could not establish generated owner for ${file}`)
    }
    assertInside(owner, file)
    await fs.rm(file)
  }

  const staleDirectories = new Set<string>()
  for (const file of stale) {
    let directory = path.dirname(file)
    while (ownedRoots.some((root) => isStrictlyInside(root, directory))) {
      staleDirectories.add(directory)
      directory = path.dirname(directory)
    }
  }

  const deepestFirst = [...staleDirectories].sort(
    (left, right) => right.length - left.length,
  )
  for (const directory of deepestFirst) {
    const owner = ownedRoots.find((root) => isStrictlyInside(root, directory))
    if (owner === undefined) continue
    assertInside(owner, directory)
    const remaining = await fs.readdir(directory).catch(() => [])
    if (remaining.length === 0) await fs.rmdir(directory)
  }

  return stale.length
}

export async function syncLab(root = process.cwd()): Promise<void> {
  const ideas = await readLabIdeas(root)
  const paths = getLabPaths(root)
  const generated = await prepareGeneratedFiles(ideas, root)
  const changed = await Promise.all(generated.map(writeIfChanged))
  const expectedRoutes = expectedViewerRoutePaths(generated, paths.manifest)
  const removed = await removeStaleFiles(expectedRoutes, [paths.viewerRoutes])
  const changedCount = changed.filter(Boolean).length
  console.log(
    `Lab synchronized: ${ideas.length} ideas, ${ideas.reduce((count, idea) => count + idea.variations.length, 0)} variations, ${changedCount} updated, ${removed} removed`,
  )
}

export async function checkLab(root = process.cwd()): Promise<string[]> {
  const ideas = await readLabIdeas(root)
  const paths = getLabPaths(root)
  const generated = await prepareGeneratedFiles(ideas, root)
  const issues: string[] = []

  const generatedIssues = await Promise.all(
    generated.map(async (file) => {
      const current = await fs
        .readFile(file.path, 'utf8')
        .catch(() => undefined)
      return current === file.content
        ? undefined
        : `${file.path}: generated content is missing or stale`
    }),
  )
  issues.push(...generatedIssues.filter((issue) => issue !== undefined))

  const expectedRoutes = expectedViewerRoutePaths(generated, paths.manifest)
  const existingRoutes = await walkFiles(paths.viewerRoutes)
  for (const file of existingRoutes) {
    if (!expectedRoutes.has(file)) issues.push(`${file}: stale generated route`)
  }

  return issues
}

function capitalizedSlugWords(slug: string): string[] {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
}

function titleFromSlug(slug: string): string {
  return capitalizedSlugWords(slug).join(' ')
}

function componentNameFromSlug(slug: string): string {
  const name = capitalizedSlugWords(slug).join('')
  return /^\d/.test(name) ? `Lab${name}` : name
}

function writeJson(value: object): string {
  return `${JSON.stringify(value, null, 2)}\n`
}

function assertVariationPath(variationsRoot: string, target: string): void {
  assertInside(variationsRoot, target, `Invalid Lab variation path: ${target}`)
  if (path.dirname(target) !== variationsRoot) {
    throw new Error(`Invalid Lab variation path: ${target}`)
  }
}

function labTemporaryPath(parent: string, label: string): string {
  return path.join(parent, `.lab-tmp-${label}-${randomUUID()}`)
}

async function createTemporaryDirectory(
  parent: string,
  label: string,
): Promise<string> {
  return fs.mkdtemp(path.join(parent, `.lab-tmp-${label}-`))
}

export async function createLabEntry(
  ideaSlug: string,
  initialVariationSlug = 'first-pass',
  root = process.cwd(),
): Promise<void> {
  validateSlug(ideaSlug)
  validateSlug(initialVariationSlug)
  const paths = getLabPaths(root)
  await fs.mkdir(paths.entries, { recursive: true })
  const ideaDirectory = path.join(paths.entries, ideaSlug)
  if (await pathExists(ideaDirectory)) {
    throw new Error(`Lab idea already exists: ${ideaDirectory}`)
  }

  const temporaryIdeaDirectory = await createTemporaryDirectory(
    paths.root,
    ideaSlug,
  )
  try {
    const variationDirectory = path.join(
      temporaryIdeaDirectory,
      'variations',
      initialVariationSlug,
    )
    await fs.mkdir(variationDirectory, { recursive: true })
    await fs.writeFile(
      path.join(temporaryIdeaDirectory, 'lab.json'),
      writeJson({
        $schema: LAB_IDEA_SCHEMA_ID,
        title: titleFromSlug(ideaSlug),
      }),
    )
    await fs.writeFile(
      path.join(variationDirectory, 'variation.json'),
      writeJson({
        $schema: LAB_VARIATION_SCHEMA_ID,
        title: titleFromSlug(initialVariationSlug),
        createdAt: new Date().toISOString(),
      }),
    )
    await fs.writeFile(
      path.join(variationDirectory, 'entry.tsx'),
      [
        `export default function ${componentNameFromSlug(initialVariationSlug)}() {`,
        "  return <div className='min-h-full w-full' />",
        '}',
        '',
      ].join('\n'),
    )
    await fs.rename(temporaryIdeaDirectory, ideaDirectory)
  } catch (error: unknown) {
    await fs.rm(temporaryIdeaDirectory, { recursive: true, force: true })
    throw error
  }

  await syncLab(root)
  console.log(
    `Created Lab idea: src/lab/entries/${ideaSlug} (variation: ${initialVariationSlug})`,
  )
}

export async function createLabVariation(
  ideaSlug: string,
  newVariationSlug: string,
  sourceVariationSlug: string | undefined = undefined,
  root = process.cwd(),
): Promise<void> {
  validateSlug(ideaSlug)
  validateSlug(newVariationSlug)
  if (sourceVariationSlug !== undefined) validateSlug(sourceVariationSlug)

  const ideas = await readLabIdeas(root)
  const idea = ideas.find((candidate) => candidate.slug === ideaSlug)
  if (idea === undefined) {
    throw new Error(`Lab idea does not exist: ${ideaSlug}`)
  }
  const sourceVariation =
    sourceVariationSlug === undefined
      ? idea.variations.at(-1)
      : idea.variations.find(
          (candidate) => candidate.slug === sourceVariationSlug,
        )
  if (sourceVariation === undefined) {
    throw new Error(
      `Lab variation does not exist: ${ideaSlug}/${sourceVariationSlug ?? '<newest>'}`,
    )
  }

  const paths = getLabPaths(root)
  const ideaDirectory = path.join(paths.entries, ideaSlug)
  const variationsRoot = path.join(ideaDirectory, 'variations')
  const sourceDirectory = path.join(variationsRoot, sourceVariation.slug)
  const targetDirectory = path.join(variationsRoot, newVariationSlug)
  assertVariationPath(variationsRoot, sourceDirectory)
  assertVariationPath(variationsRoot, targetDirectory)
  if (await pathExists(targetDirectory)) {
    throw new Error(`Lab variation already exists: ${targetDirectory}`)
  }

  const temporaryVariationDirectory = labTemporaryPath(
    ideaDirectory,
    newVariationSlug,
  )
  try {
    await fs.cp(sourceDirectory, temporaryVariationDirectory, {
      recursive: true,
      errorOnExist: true,
    })
    await fs.writeFile(
      path.join(temporaryVariationDirectory, 'variation.json'),
      writeJson({
        $schema: LAB_VARIATION_SCHEMA_ID,
        title: titleFromSlug(newVariationSlug),
        createdAt: new Date().toISOString(),
      }),
    )
    await fs.rename(temporaryVariationDirectory, targetDirectory)
  } catch (error: unknown) {
    await fs.rm(temporaryVariationDirectory, { recursive: true, force: true })
    throw error
  }

  await syncLab(root)
  console.log(
    `Created Lab variation: src/lab/entries/${ideaSlug}/variations/${newVariationSlug}`,
  )
}

const LAB_CLI_USAGE =
  'Usage: lab.ts <new <idea> [variation] | variation <idea> <new-variation> [source-variation] | sync | check>'

export async function runLabCommand(
  args: string[],
  root = process.cwd(),
): Promise<void> {
  const [command, firstSlug, secondSlug, thirdSlug] = args
  switch (command) {
    case undefined:
      throw new Error(LAB_CLI_USAGE)
    case 'new':
      if (firstSlug === undefined) {
        throw new Error('Usage: pnpm lab:new <idea> [initial-variation]')
      }
      await createLabEntry(firstSlug, secondSlug, root)
      return
    case 'variation':
      if (firstSlug === undefined || secondSlug === undefined) {
        throw new Error(
          'Usage: pnpm lab:variation <idea> <new-variation> [source-variation]',
        )
      }
      await createLabVariation(firstSlug, secondSlug, thirdSlug, root)
      return
    case 'sync':
      await syncLab(root)
      return
    case 'check': {
      const issues = await checkLab(root)
      if (issues.length > 0) {
        throw new Error(
          `Lab check failed:\n${issues.map((issue) => `- ${issue}`).join('\n')}`,
        )
      }
      console.log('Lab check passed')
      return
    }
    default:
      throw new Error(LAB_CLI_USAGE)
  }
}

const invokedPath = process.argv[1]
if (
  invokedPath !== undefined &&
  import.meta.url === pathToFileURL(path.resolve(invokedPath)).href
) {
  runLabCommand(process.argv.slice(2)).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
