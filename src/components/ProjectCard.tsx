import Image from 'next/image';
import Link from 'next/link';
import { ProjectInfo } from '../types';

const ProjectCard = ({
  id,
  name,
  thumbnailLink,
  dateCompleted,
}: ProjectInfo) => {
  let formattedDate = 'Ongoing';
  if (dateCompleted) {
    const projectDate = new Date(dateCompleted);

    formattedDate = `${projectDate.toLocaleString('default', {
      month: 'long',
    })} ${projectDate.getFullYear()}`;
  }

  return (
    <div
      className='group relative aspect-video overflow-clip shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-none'
      id={id}
    >
      <Link href={'/projects/' + id}>
        <a className='absolute z-10 flex h-full w-full flex-col items-center justify-center p-8 opacity-0 transition hover:bg-black hover:bg-opacity-80 hover:opacity-100'>
          <h2 className='text-xl font-semibold text-neutral-200 sm:text-2xl'>
            {name}
          </h2>
          <p className='text-neutral-300'>{formattedDate}</p>
        </a>
      </Link>

      <Image
        priority={id.startsWith('frosty')}
        src={thumbnailLink}
        alt={`Thumbnail for ${name}.`}
        layout='fill'
        objectFit='cover'
      />
    </div>
  );
};

export default ProjectCard;
