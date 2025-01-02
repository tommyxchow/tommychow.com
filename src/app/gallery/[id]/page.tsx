import { CustomImage } from '@/components/CustomImage';
import { getSortedImagesByDate } from '@/lib/server-utils';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export async function generateStaticParams() {
  const allImages = await getSortedImagesByDate();

  return allImages.map(({ file }) => ({ params: { id: file } }));
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const allImages = await getSortedImagesByDate();

  const { file, exifData } =
    allImages.find(({ file }) => file === id) ?? allImages[0];

  return (
    <section className='flex flex-col'>
      <figure className='sticky top-20 z-10 -mx-4 flex flex-col gap-4 bg-zinc-100 px-4 pb-4 dark:bg-zinc-950'>
        <Zoom classDialog='custom-zoom'>
          <div className='relative aspect-[4/3]'>
            <CustomImage
              className='mx-auto mt-auto !size-auto max-h-full max-w-full'
              src={`/gallery/images/${file}`}
              alt={`Gallery image ${file}`}
              sizes='100vw'
              fill
              priority
              quality={100}
            />
          </div>
        </Zoom>

        <figcaption className='flex justify-between gap-2 font-mono text-xs text-zinc-500 sm:text-sm dark:text-zinc-400'>
          <p>{exifData.Model}</p>

          <p className='text-right'>
            {formatDate(exifData.DateTimeOriginal, true, true)}
          </p>
        </figcaption>
      </figure>

      <ul className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
        {allImages.map(({ file }, index) => (
          <li key={file}>
            <Link
              href={`/gallery/${file}`}
              scroll={false}
              className='relative block aspect-[4/3] transition-opacity hover:opacity-50'
            >
              <CustomImage
                src={`/gallery/images/${file}`}
                alt={`Gallery image ${file}`}
                sizes='(max-width: 640px) 50vw, 33vw'
                fill
                priority={index < 4}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
