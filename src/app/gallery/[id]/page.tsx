import exifr from 'exifr';
import fs from 'fs/promises';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';

interface ExifData {
  // Basic Image Information
  Make: string; // Camera make, e.g., 'Apple'
  Model: string; // Camera model, e.g., 'iPhone 15 Pro'
  ExifImageWidth: number; // Image width in pixels
  ExifImageHeight: number; // Image height in pixels

  // Camera and Lens Metadata
  FocalLength: number; // Focal length
  LensModel: string; // Lens model, e.g., 'iPhone 15 Pro back triple camera'

  // Exposure Settings
  ExposureTime: number; // Exposure time in seconds
  FNumber: number; // Aperture value
  ISO: number; // ISO sensitivity

  // Date and Time
  DateTimeOriginal: Date; // Date and time the photo was taken

  // Geolocation Data
  GPSLatitude?: [number, number, number]; // Latitude in degrees, minutes, seconds
  GPSLongitude?: [number, number, number]; // Longitude in degrees, minutes, seconds
  GPSAltitude?: number; // Altitude in meters
  latitude?: number; // Decimal latitude
  longitude?: number; // Decimal longitude
}

async function getSortedImagesByDate() {
  try {
    const directory = path.join(process.cwd(), 'public', 'gallery', 'images');

    const imageFiles = await fs.readdir(directory);

    const fileStats = await Promise.all(
      imageFiles.map(async (file) => {
        const imagePath = path.join(directory, file);
        const exifData = (await exifr.parse(imagePath)) as ExifData;
        return { file, exifData };
      }),
    );

    // Sort by most recent modification time
    const sortedFiles = fileStats.sort(
      (a, b) =>
        b.exifData.DateTimeOriginal.getTime() -
        a.exifData.DateTimeOriginal.getTime(),
    );

    return sortedFiles;
  } catch (error) {
    console.error('Error reading or sorting images:', error);
    throw error;
  }
}

export async function generateStaticParams() {
  const allImages = await getSortedImagesByDate();

  return allImages.map(({ file }) => ({ params: { id: file } }));
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const allImages = await getSortedImagesByDate();

  const selectedImage =
    allImages.find(({ file }) => file === id)?.file ?? allImages[0].file;

  return (
    <div className='flex flex-col gap-4'>
      <div className='relative aspect-square size-full'>
        <Image
          className='object-contain'
          src={`/gallery/images/${selectedImage}`}
          alt='Gallery image'
          fill
        />
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {allImages.map(({ file }) => (
          <Link
            href={`/gallery/${file}`}
            key={file}
            className='flex flex-col items-start gap-2'
          >
            <div className='relative aspect-[3/2] size-full'>
              <Image
                className='object-cover'
                src={`/gallery/images/${file}`}
                alt='Gallery image'
                fill
              />
            </div>
            <p>{file}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
