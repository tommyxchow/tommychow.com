import { getSortedImagesByDate } from '@/lib/server-utils'
import { GalleryClient } from './GalleryClient'

export default async function GalleryPage() {
  const allImages = await getSortedImagesByDate()

  return (
    <section className='h-dvh w-full overflow-hidden'>
      <GalleryClient images={allImages} />
    </section>
  )
}
