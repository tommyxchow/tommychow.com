import 'server-only'

import exifr from 'exifr'
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { rgbaToDataURL } from 'thumbhash'

export interface ExifData {
  // Basic Image Information
  Make: string // Camera make, e.g., 'Apple'
  Model: string // Camera model, e.g., 'iPhone 15 Pro'
  ExifImageWidth: number // Image width in pixels
  ExifImageHeight: number // Image height in pixels

  // Camera and Lens Metadata
  FocalLengthIn35mmFormat: number // Focal length
  LensModel: string // Lens model, e.g., 'iPhone 15 Pro back triple camera'

  // Exposure Settings
  ExposureTime: number // Exposure time in seconds
  FNumber: number // Aperture value
  ISO: number // ISO sensitivity

  // Date and Time
  DateTimeOriginal: Date // Date and time the photo was taken

  // Geolocation Data
  GPSLatitude?: [number, number, number] // Latitude in degrees, minutes, seconds
  GPSLongitude?: [number, number, number] // Longitude in degrees, minutes, seconds
  GPSAltitude?: number // Altitude in meters
  latitude?: number // Decimal latitude
  longitude?: number // Decimal longitude
}

export async function getSortedImagesByDate() {
  try {
    const directory = path.join(process.cwd(), 'public', 'gallery', 'images')

    const imageFiles = await fs.readdir(directory)

    // Limit to 20 images in development for faster hot reloads
    const filesToProcess =
      process.env.NODE_ENV === 'development'
        ? imageFiles.slice(0, 20)
        : imageFiles

    const fileStats = await Promise.all(
      filesToProcess.map(async (file) => {
        const imagePath = path.join(directory, file)

        const exifData = (await exifr.parse(imagePath)) as ExifData

        const imagePipeline = sharp(imagePath).rotate()
        const metadata = await imagePipeline.metadata()

        const { data, info } = await imagePipeline
          .resize(100, 100, { fit: 'inside' })
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true })
        const thumbHashDataURL = rgbaToDataURL(info.width, info.height, data)

        return {
          file,
          exifData,
          thumbHashDataURL,
          width: metadata.width ?? 0,
          height: metadata.height ?? 0,
        }
      }),
    )

    // Sort by most recent modification time
    const sortedFiles = fileStats.sort(
      (a, b) =>
        b.exifData.DateTimeOriginal.getTime() -
        a.exifData.DateTimeOriginal.getTime(),
    )

    return sortedFiles.map(({ file, thumbHashDataURL, exifData }) => ({
      file,
      thumbHashDataURL,
      dateTime: exifData.DateTimeOriginal.toISOString(),
    }))
  } catch (error) {
    console.error('Error reading or sorting images:', error)
    throw error
  }
}
