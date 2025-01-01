import { getSortedImagesByDate } from '@/lib/server-utils';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className='flex flex-col gap-4'>
      <div className='relative aspect-square size-full'>
        <Image
          className='object-contain'
          src={`/gallery/images/${selectedImage}`}
          alt='Gallery image'
          fill
        />
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {allImages.map(({ file }) => (
          <Link
            href={`/gallery/${file}`}
            key={file}
            className='flex flex-col items-start gap-2'
          >
            <div className='relative aspect-[3/2] size-full'>
              <Image
                className='object-cover'
                src={`/gallery/images/${file}`}
                alt='Gallery image'
                fill
              />
            </div>
            <p>{file}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
