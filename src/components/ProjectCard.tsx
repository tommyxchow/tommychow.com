import Image from 'next/image';
import Link from 'next/link';
import { ProjectInfo } from '../data/projects';

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
      className='relative aspect-video overflow-clip shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-none'
      id={id}
    >
      <Link href={'/projects/' + id}>
        <a className='absolute z-10 flex h-full w-full flex-col justify-end bg-gradient-to-b from-transparent to-black p-2 text-lg font-medium text-neutral-200 transition sm:p-4'>
          {name}
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
