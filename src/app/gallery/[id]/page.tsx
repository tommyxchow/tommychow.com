import { CustomImage } from '@/components/CustomImage'
import { getSortedImagesByDate } from '@/lib/server-utils'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import 'react-medium-image-zoom/dist/styles.css'

const allImages = await getSortedImagesByDate()

export function generateStaticParams() {
  return allImages.map(({ file }) => ({ id: file }))
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { file, exifData, thumbHashDataURL } =
    allImages.find(({ file }) => file === id) ?? allImages[0]

  return (
    <section className='flex flex-col'>
      <figure className='bg-background border-border sticky top-25 z-10 flex flex-col items-center gap-4 border-b px-4 pb-4'>
        <div className='animate-in fade-in relative h-[50dvh] min-h-80 w-full duration-300 sm:h-[45dvh] lg:h-[40dvh]'>
          <CustomImage
            className='object-contain'
            src={`/gallery/images/${file}`}
            alt={`Gallery image ${file}`}
            sizes='100vw'
            fill
            priority
            quality={100}
            placeholder='blur'
            blurDataURL={thumbHashDataURL}
            canZoom
          />
        </div>

        <figcaption className='text-muted-foreground flex flex-col items-center font-mono text-sm'>
          <p>{formatDate(exifData.DateTimeOriginal, true, true)}</p>
          <p>{exifData.Model}</p>
        </figcaption>
      </figure>

      <ul className='grid grid-cols-3 gap-1 sm:grid-cols-4'>
        {allImages.map(({ file, thumbHashDataURL }) => (
          <li key={file}>
            <Link
              href={`/gallery/${file}`}
              scroll={false}
              className='relative block aspect-square transition-opacity hover:opacity-60'
              replace
            >
              <CustomImage
                className='shadow-none'
                src={`/gallery/images/${file}`}
                alt={`Gallery image ${file}`}
                sizes='(max-width: 640px) 50vw, 33vw'
                fill
                priority
                placeholder='blur'
                blurDataURL={thumbHashDataURL}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
