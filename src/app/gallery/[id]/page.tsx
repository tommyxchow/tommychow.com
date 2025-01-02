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
      <figure className='sticky top-20 z-10 -mx-4 flex flex-col items-center gap-4 bg-zinc-100 p-4 dark:bg-zinc-950'>
        <div className='relative aspect-square size-full'>
          <Zoom classDialog='custom-zoom'>
            <CustomImage
              className='object-contain shadow-none'
              src={`/gallery/images/${selectedImage}`}
              alt={`Gallery image ${selectedImage}`}
              sizes='100vw'
              fill
            />
          </Zoom>
        </div>

        <figcaption className='font-mono text-sm'>{selectedImage}</figcaption>
      </figure>

      <ul className='grid grid-cols-3 gap-4'>
        {allImages.map(({ file }) => (
          <li key={file}>
            <Link
              href={`/gallery/${file}`}
              scroll={false}
              className='relative block aspect-square transition-opacity hover:opacity-50'
            >
              <CustomImage
                src={`/gallery/images/${file}`}
                alt={`Gallery image ${file}`}
                sizes='33vw'
                fill
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
