import { CustomImage } from '@/components/CustomImage';
import { getSortedImagesByDate } from '@/lib/server-utils';
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

  const selectedImage =
    allImages.find(({ file }) => file === id)?.file ?? allImages[0].file;

  return (
    <section className='flex flex-col gap-4'>
      <figure className='flex flex-col items-center gap-4 rounded bg-zinc-200 p-8 pb-4 dark:bg-zinc-900'>
        <div className='relative aspect-square size-full'>
          <Zoom classDialog='custom-zoom'>
            <CustomImage
              className='object-contain shadow-none'
              src={`/gallery/images/${selectedImage}`}
              alt={`Gallery image ${selectedImage}`}
              fill
            />
          </Zoom>
        </div>

        <figcaption className='font-mono text-sm'>{selectedImage}</figcaption>
      </figure>
      <ul className='grid grid-cols-3 gap-4'>
        {allImages.map(({ file }) => (
          <li
            key={file}
            className='relative aspect-square transition-opacity hover:opacity-50'
          >
            <Link href={`/gallery/${file}`}>
              <CustomImage
                src={`/gallery/images/${file}`}
                alt={`Gallery image ${file}`}
                fill
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
