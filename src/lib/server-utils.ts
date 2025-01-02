import 'server-only';

import exifr from 'exifr';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

interface BlogPostFrontmatter {
  title: string;
  summary: string;
  date: Date;
}

export interface BlogPost extends BlogPostFrontmatter {
  id: string;
}

const blogPostsDirectory = path.resolve('src/app/blog/_posts');

export function getBlogPostFrontMatter(id: string): BlogPost {
  const mdxFilePath = path.resolve(blogPostsDirectory, id, 'page.mdx');

  const { data } = matter.read(mdxFilePath);

  return { id, ...(data as BlogPostFrontmatter) };
}

export async function getAllBlogPostsFrontmatter(): Promise<BlogPost[]> {
  const postFolders = await fs.readdir(blogPostsDirectory);

  const allFrontmatter = postFolders.map((folderName) =>
    getBlogPostFrontMatter(folderName),
  );

  // Sort by newest.
  return allFrontmatter.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export interface ExifData {
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

export async function getSortedImagesByDate() {
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
