/* eslint-disable no-console -- This file is a CLI and reports command results. */

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const ALLOWED_METADATA_KEYS = new Set([
  '$schema',
  'title',
  'createdAt',
  'description',
])

export interface LabMetadata {
  title: string
  createdAt: string
  description?: string
}

export interface LabEntry extends LabMetadata {
  slug: string
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

function isValidDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false
  const parsed = new Date(`${value}T00:00:00.000Z`)
  return (
    !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value)
  )
}

function validateMetadata(value: unknown, source: string): LabMetadata {
  if (!isRecord(value)) {
    throw new Error(`${source}: expected a JSON object`)
  }

  const unknownKeys = Object.keys(value).filter(
    (key) => !ALLOWED_METADATA_KEYS.has(key),
  )
  if (unknownKeys.length > 0) {
    throw new Error(`${source}: unknown field(s): ${unknownKeys.join(', ')}`)
  }

  if (typeof value.title !== 'string' || value.title.trim() === '') {
    throw new Error(`${source}: "title" must be a non-empty string`)
  }
  if (typeof value.createdAt !== 'string' || !isValidDate(value.createdAt)) {
    throw new Error(`${source}: "createdAt" must be a real YYYY-MM-DD date`)
  }
  if (
    value.description !== undefined &&
    (typeof value.description !== 'string' || value.description.trim() === '')
  ) {
    throw new Error(
      `${source}: "description" must be a non-empty string when provided`,
    )
  }
  if (value.$schema !== undefined && typeof value.$schema !== 'string') {
    throw new Error(`${source}: "$schema" must be a string when provided`)
  }

  return {
    title: value.title.trim(),
    createdAt: value.createdAt,
    ...(typeof value.description === 'string'
      ? { description: value.description.trim() }
      : {}),
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

export async function readLabEntries(
  root = process.cwd(),
): Promise<LabEntry[]> {
  const paths = getLabPaths(root)
  await fs.mkdir(paths.entries, { recursive: true })
  const directoryEntries = await fs.readdir(paths.entries, {
    withFileTypes: true,
  })

  const entries = await Promise.all(
    directoryEntries
      .filter((entry) => entry.isDirectory())
      .map(async ({ name: slug }) => {
        validateSlug(slug)
        const entryDirectory = path.join(paths.entries, slug)
        const metadataPath = path.join(entryDirectory, 'lab.json')
        const componentPath = path.join(entryDirectory, 'entry.tsx')

        if (!(await pathExists(componentPath))) {
          throw new Error(`${componentPath}: missing required entry.tsx`)
        }

        let metadataSource: string
        try {
          metadataSource = await fs.readFile(metadataPath, 'utf8')
        } catch {
          throw new Error(`${metadataPath}: missing required lab.json`)
        }

        let metadata: unknown
        try {
          metadata = JSON.parse(metadataSource) as unknown
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : String(error)
          throw new Error(`${metadataPath}: invalid JSON (${message})`, {
            cause: error,
          })
        }

        return { slug, ...validateMetadata(metadata, metadataPath) }
      }),
  )

  return entries.sort(
    (left, right) =>
      right.createdAt.localeCompare(left.createdAt) ||
      left.title.localeCompare(right.title, 'en'),
  )
}

function quote(value: string): string {
  return `'${value
    .replaceAll('\\', '\\\\')
    .replaceAll("'", "\\'")
    .replaceAll('\r', '\\r')
    .replaceAll('\n', '\\n')}'`
}

function renderManifest(entries: LabEntry[]): string {
  if (entries.length === 0) {
    return [
      "import { type LabEntry } from './types'",
      '',
      'export const labEntries: readonly LabEntry[] = []',
      '',
    ].join('\n')
  }

  const records = entries.map((entry) => {
    const lines = [
      '  {',
      `    slug: ${quote(entry.slug)},`,
      `    title: ${quote(entry.title)},`,
      `    createdAt: ${quote(entry.createdAt)},`,
    ]
    if (entry.description !== undefined) {
      lines.push(`    description: ${quote(entry.description)},`)
    }
    lines.push(`    href: ${quote(`/lab/${entry.slug}`)},`, '  },')
    return lines.join('\n')
  })

  return [
    "import { type LabEntry } from './types'",
    '',
    'export const labEntries: readonly LabEntry[] = [',
    ...records,
    ']',
    '',
  ].join('\n')
}

function renderViewerRoute(entry: LabEntry): string {
  return [
    `import Entry from '@/lab/entries/${entry.slug}/entry'`,
    "import { createLabMetadata } from '@/lab/metadata'",
    '',
    `export const metadata = createLabMetadata(${quote(entry.slug)})`,
    '',
    'export default function LabEntryPage() {',
    '  return <Entry />',
    '}',
    '',
  ].join('\n')
}

function expectedGeneratedFiles(
  entries: LabEntry[],
  root: string,
): GeneratedFile[] {
  const paths = getLabPaths(root)
  return [
    { path: paths.manifest, content: renderManifest(entries) },
    ...entries.map((entry) => ({
      path: path.join(paths.viewerRoutes, entry.slug, 'page.tsx'),
      content: renderViewerRoute(entry),
    })),
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
      if (entry.isDirectory()) {
        return walkFiles(target)
      }
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

function assertInside(ownedRoot: string, target: string): void {
  if (!isStrictlyInside(ownedRoot, target)) {
    throw new Error(
      `Refusing to remove path outside generated Lab routes: ${target}`,
    )
  }
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

  const staleSlugs = new Set(stale.map((file) => path.dirname(file)))
  const deepestFirst = [...staleSlugs].sort((a, b) => b.length - a.length)
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
  const entries = await readLabEntries(root)
  const paths = getLabPaths(root)
  const generated = expectedGeneratedFiles(entries, root)
  const changed = await Promise.all(generated.map(writeIfChanged))
  const expectedRoutes = expectedViewerRoutePaths(generated, paths.manifest)
  const removed = await removeStaleFiles(expectedRoutes, [paths.viewerRoutes])
  const changedCount = changed.filter(Boolean).length
  console.log(
    `Lab synchronized: ${entries.length} entries, ${changedCount} updated, ${removed} removed`,
  )
}

export async function checkLab(root = process.cwd()): Promise<string[]> {
  const entries = await readLabEntries(root)
  const paths = getLabPaths(root)
  const generated = expectedGeneratedFiles(entries, root)
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

function localDate(): string {
  const now = new Date()
  const year = String(now.getFullYear())
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function createLabEntry(
  slug: string,
  root = process.cwd(),
): Promise<void> {
  validateSlug(slug)
  const paths = getLabPaths(root)
  const entryDirectory = path.join(paths.entries, slug)
  if (await pathExists(entryDirectory)) {
    throw new Error(`Lab entry already exists: ${entryDirectory}`)
  }

  const title = titleFromSlug(slug)
  const componentName = componentNameFromSlug(slug)
  await fs.mkdir(entryDirectory, { recursive: true })
  await fs.writeFile(
    path.join(entryDirectory, 'lab.json'),
    `${JSON.stringify(
      {
        $schema: '../../lab-entry.schema.json',
        title,
        createdAt: localDate(),
      },
      null,
      2,
    )}\n`,
  )
  await fs.writeFile(
    path.join(entryDirectory, 'entry.tsx'),
    [
      `export default function ${componentName}() {`,
      "  return <div className='min-h-full w-full' />",
      '}',
      '',
    ].join('\n'),
  )

  await syncLab(root)
  console.log(`Created Lab entry: src/lab/entries/${slug}`)
}

export async function runLabCommand(
  args: string[],
  root = process.cwd(),
): Promise<void> {
  const [command, slug] = args
  switch (command) {
    case undefined:
      throw new Error('Usage: lab.ts <new <slug> | sync | check>')
    case 'new':
      if (slug === undefined) throw new Error('Usage: pnpm lab:new <slug>')
      await createLabEntry(slug, root)
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
      throw new Error('Usage: lab.ts <new <slug> | sync | check>')
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
