import { CustomImage } from '@/components/CustomImage';
import { getSortedImagesByDate } from '@/lib/server-utils';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import 'react-medium-image-zoom/dist/styles.css';

const allImages = await getSortedImagesByDate();

export function generateStaticParams() {
  return allImages.map(({ file }) => ({ id: file }));
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { file, exifData, thumbHashDataURL } =
    allImages.find(({ file }) => file === id) ?? allImages[0];

  return (
    <section className='flex flex-col gap-4'>
      <figure className='sticky top-20 z-10 -mx-4 flex flex-col items-center gap-4 border-b border-zinc-300 bg-zinc-100 px-4 pb-4 dark:border-zinc-800 dark:bg-zinc-950'>
        <div className='relative aspect-4/3 size-full duration-300 animate-in fade-in'>
          <CustomImage
            className='mx-auto mt-auto size-auto! max-h-full max-w-full'
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

        <figcaption className='flex flex-col items-center font-mono text-sm text-zinc-500 dark:text-zinc-400'>
          <p>{formatDate(exifData.DateTimeOriginal, true, true)}</p>
          <p>{exifData.Model}</p>
        </figcaption>
      </figure>

      <ul className='grid grid-cols-3 gap-1'>
        {allImages.map(({ file, thumbHashDataURL }) => (
          <li key={file}>
            <Link
              href={`/gallery/${file}`}
              scroll={false}
              className='relative block aspect-square transition-opacity hover:opacity-50'
              replace
            >
              <CustomImage
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
  );
}
