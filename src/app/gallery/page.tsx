import { getSortedImagesByDate } from '@/lib/server-utils'
import { Suspense } from 'react'
import { GalleryClient } from './GalleryClient'

export default function GalleryPage() {
  const allImages = getSortedImagesByDate()

  return (
    <section className='h-dvh w-full overflow-hidden'>
      <Suspense>
        <GalleryClient images={allImages} />
      </Suspense>
    </section>
  )
}
