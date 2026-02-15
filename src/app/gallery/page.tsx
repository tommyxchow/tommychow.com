import { getSortedImagesByDate } from '@/lib/server-utils'
import { GalleryClient } from './GalleryClient'

export default function GalleryPage() {
  const allImages = getSortedImagesByDate()

  return (
    <section className='h-dvh w-full overflow-hidden'>
      <GalleryClient images={allImages} />
    </section>
  )
}
