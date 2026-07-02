import { statSheetTypographyClassName } from '@/lib/constants'
import { getSortedImagesByDate } from '@/lib/server-utils'
import { twJoin } from 'tailwind-merge'
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
      <h1
        className={twJoin(
          'text-center text-foreground',
          statSheetTypographyClassName,
        )}
      >
        Tommy Chow
      </h1>
      <ProfileMeta key='profile' />
      <GalleryPreview
        key='gallery'
        images={previewImages}
        remainingCount={remainingImageCount}
      />
    </HomeClient>
  )
}
