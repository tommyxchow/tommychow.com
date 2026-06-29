import 'server-only'

import galleryManifest from './gallery-manifest.json'

export interface GalleryImage {
  file: string
  thumbHash: string
  dateTime: string
  width: number
  height: number
  variants: number[]
}

export function getSortedImagesByDate(): GalleryImage[] {
  return galleryManifest
}
