import 'server-only'

import galleryManifest from './gallery-manifest.json'

export interface GalleryImage {
  file: string
  thumbHashDataURL: string
  dateTime: string
}

export function getSortedImagesByDate(): GalleryImage[] {
  return galleryManifest
}
