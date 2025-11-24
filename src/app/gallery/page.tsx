import { CustomImage } from '@/components/CustomImage'
import { getSortedImagesByDate } from '@/lib/server-utils'
import 'react-medium-image-zoom/dist/styles.css'

export default async function GalleryPage() {
  const allImages = await getSortedImagesByDate()

  return (
    <section className='flex flex-col'>
      <ul className='columns-3 gap-2 space-y-2'>
        {allImages.map(({ file, thumbHashDataURL, width, height }) => (
          <li key={file} className='break-inside-avoid'>
            <CustomImage
              className='shadow-none'
              src={`/gallery/images/${file}`}
              alt={`Gallery image ${file}`}
              width={width}
              height={height}
              priority
              placeholder='blur'
              blurDataURL={thumbHashDataURL}
              canZoom
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
