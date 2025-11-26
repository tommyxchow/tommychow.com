import { CustomImage } from '@/components/CustomImage'
import { getSortedImagesByDate } from '@/lib/server-utils'
import 'react-medium-image-zoom/dist/styles.css'

const NUM_COLUMNS = 3

export default async function GalleryPage() {
  const allImages = await getSortedImagesByDate()

  // Distribute images into columns in left-to-right reading order
  const columns: (typeof allImages)[] = Array.from(
    { length: NUM_COLUMNS },
    () => [],
  )
  allImages.forEach((image, index) => {
    columns[index % NUM_COLUMNS].push(image)
  })

  return (
    <section className='flex flex-col'>
      <div className='flex gap-2'>
        {columns.map((columnImages, columnIndex) => (
          <ul key={columnIndex} className='flex flex-1 flex-col gap-2'>
            {columnImages.map(
              ({ file, thumbHashDataURL, width, height }, imageIndex) => (
                <li key={file}>
                  <CustomImage
                    className='shadow-none'
                    src={`/gallery/images/${file}`}
                    alt={`Gallery image ${file}`}
                    width={width}
                    height={height}
                    // Only prioritize first 3 images per column (9 total above the fold)
                    priority={imageIndex < 3}
                    loading={imageIndex < 3 ? 'eager' : 'lazy'}
                    placeholder='blur'
                    blurDataURL={thumbHashDataURL}
                    canZoom
                  />
                </li>
              ),
            )}
          </ul>
        ))}
      </div>
    </section>
  )
}
