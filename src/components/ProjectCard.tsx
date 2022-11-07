import Link from 'next/link';
import { ProjectInfo } from '../data/projects';
import CustomImage from './CustomImage';

const ProjectCard = ({ id, name, thumbnailLink }: ProjectInfo) => {
  return (
    <div
      className='relative aspect-video overflow-clip shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-none'
      id={id}
    >
      <Link
        className='absolute z-10 flex h-full w-full flex-col justify-end bg-gradient-to-b from-transparent to-black p-2 text-xl font-medium text-neutral-200 transition sm:p-4'
        href={'/projects/' + id}
      >
        {name}
      </Link>

      <CustomImage
        priority={id.startsWith('frosty')}
        src={thumbnailLink}
        alt={`Thumbnail for ${name}.`}
      />
    </div>
  );
};

export default ProjectCard;
