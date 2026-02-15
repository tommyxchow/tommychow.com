import exifr from 'exifr'
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { rgbaToDataURL } from 'thumbhash'

const IMAGES_DIR = path.join(process.cwd(), 'public', 'gallery', 'images')
const OUTPUT_PATH = path.join(
  process.cwd(),
  'src',
  'lib',
  'gallery-manifest.json',
)

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

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
}

async function processImage(file: string) {
  const imagePath = path.join(IMAGES_DIR, file)

  const exifData = (await exifr.parse(imagePath)) as {
    DateTimeOriginal?: Date
  } | null
  const date = exifData?.DateTimeOriginal ?? new Date(0)

  const { data, info } = await sharp(imagePath)
    .rotate()
    .resize(100, 100, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  return {
    file,
    date,
    thumbHashDataURL: rgbaToDataURL(info.width, info.height, data),
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', DATE_FORMAT).toUpperCase()
}

async function generateManifest(): Promise<void> {
  const allFiles = await fs.readdir(IMAGES_DIR)
  const imageFiles = allFiles.filter((f) =>
    IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()),
  )
  const processed = await Promise.all(imageFiles.map(processImage))

  processed.sort((a, b) => b.date.getTime() - a.date.getTime())

  const manifest: ManifestEntry[] = processed.map(
    ({ file, thumbHashDataURL, date }) => ({
      file,
      thumbHashDataURL,
      dateTime: formatDate(date),
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
