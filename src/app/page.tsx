import { getSortedImagesByDate } from '@/lib/server-utils'
import { GalleryPreview } from './GalleryPreview'
import { HomeClient } from './HomeClient'
import { ProfileMeta } from './ProfileMeta'

export default function HomePage() {
  const allImages = getSortedImagesByDate()
  const previewImages = allImages.slice(0, 4)

  return (
    <HomeClient>
      <ProfileMeta />
      <GalleryPreview images={previewImages} />
    </HomeClient>
  )
}
