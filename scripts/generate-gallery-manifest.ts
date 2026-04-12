import exifr from 'exifr'
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { rgbaToDataURL } from 'thumbhash'

const IMAGES_DIR = path.join(process.cwd(), 'public', 'gallery', 'images')
const OPTIMIZED_DIR = path.join(process.cwd(), 'public', 'gallery', 'optimized')
const OUTPUT_PATH = path.join(
  process.cwd(),
  'src',
  'lib',
  'gallery-manifest.json',
)

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const VARIANT_WIDTHS = [640, 1080, 1920] as const
const WEBP_QUALITY = 80

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
}

interface ManifestEntry {
  file: string
  thumbHashDataURL: string
  dateTime: string
  width: number
  height: number
  variants: number[]
}

function stripExt(file: string): string {
  return file.replace(/\.[^.]+$/, '')
}

async function shouldSkip(
  outputPath: string,
  sourceMtimeMs: number,
): Promise<boolean> {
  try {
    const stat = await fs.stat(outputPath)
    return stat.mtimeMs >= sourceMtimeMs
  } catch {
    return false
  }
}

async function emitVariant(
  sourceBuffer: Buffer,
  outputPath: string,
  width: number,
  sourceMtimeMs: number,
): Promise<void> {
  if (await shouldSkip(outputPath, sourceMtimeMs)) return
  await sharp(sourceBuffer)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath)
}

async function processImage(file: string) {
  const imagePath = path.join(IMAGES_DIR, file)
  const basename = stripExt(file)

  const [sourceBuffer, sourceStat, exifData] = await Promise.all([
    fs.readFile(imagePath),
    fs.stat(imagePath),
    exifr.parse(imagePath) as Promise<{ DateTimeOriginal?: Date } | null>,
  ])

  const date = exifData?.DateTimeOriginal ?? new Date(0)

  const metadata = await sharp(sourceBuffer).rotate().metadata()
  const originalWidth = metadata.width
  const originalHeight = metadata.height

  const { data, info } = await sharp(sourceBuffer)
    .rotate()
    .resize(100, 100, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const variants = VARIANT_WIDTHS.filter((w) => w <= originalWidth)

  await Promise.all(
    variants.map((width) => {
      const outputPath = path.join(OPTIMIZED_DIR, `${basename}-${width}.webp`)
      return emitVariant(sourceBuffer, outputPath, width, sourceStat.mtimeMs)
    }),
  )

  return {
    file,
    date,
    thumbHashDataURL: rgbaToDataURL(info.width, info.height, data),
    width: originalWidth,
    height: originalHeight,
    variants,
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', DATE_FORMAT).toUpperCase()
}

async function generateManifest(): Promise<void> {
  await fs.mkdir(OPTIMIZED_DIR, { recursive: true })

  const allFiles = await fs.readdir(IMAGES_DIR)
  const imageFiles = allFiles.filter((f) =>
    IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()),
  )
  const processed = await Promise.all(imageFiles.map(processImage))

  processed.sort((a, b) => b.date.getTime() - a.date.getTime())

  const manifest: ManifestEntry[] = processed.map(
    ({ file, thumbHashDataURL, date, width, height, variants }) => ({
      file,
      thumbHashDataURL,
      dateTime: formatDate(date),
      width,
      height,
      variants,
    }),
  )

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(manifest, null, 2) + '\n')
  // eslint-disable-next-line no-console
  console.log(`Gallery manifest generated: ${manifest.length} images`)
}

generateManifest().catch((error: unknown) => {
  console.error('Failed to generate gallery manifest:', error)
  process.exit(1)
})
