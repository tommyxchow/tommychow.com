import { getSortedImagesByDate } from '@/lib/server-utils'
import { GalleryPreview } from './GalleryPreview'
import { HomeClient } from './HomeClient'
import { ProfileMeta } from './ProfileMeta'

const PREVIEW_IMAGE_COUNT = 10

export default function HomePage() {
  const allImages = getSortedImagesByDate()
  const previewImages = allImages.slice(0, PREVIEW_IMAGE_COUNT)
  const remainingImageCount = allImages.length - previewImages.length

  return (
    <HomeClient>
      <ProfileMeta key='profile' />
      <GalleryPreview
        key='gallery'
        images={previewImages}
        remainingCount={remainingImageCount}
      />
    </HomeClient>
  )
}
