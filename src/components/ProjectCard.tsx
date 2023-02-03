import Link from 'next/link';
import { formatDateString } from '../common';
import { ProjectInfo } from '../data/projects';
import CustomImage from './CustomImage';

const ProjectCard = ({
  id,
  name,
  dateCompleted,
  category,
  thumbnailLink,
}: ProjectInfo) => {
  return (
    <div
      className='relative aspect-video overflow-clip shadow-lg transition duration-300 hover:opacity-50 active:scale-95 active:shadow-none'
      id={id}
    >
      <Link
        className='absolute z-10 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black to-transparent p-2 text-neutral-200 transition sm:p-4'
        href={'/projects/' + id}
      >
        <p className='font-medium'>{name}</p>
        <div className='flex justify-between gap-4'>
          <p className='opacity-50'>{category}</p>
          <p className='opacity-50'>
            {dateCompleted ? formatDateString(dateCompleted) : 'Ongoing'}
          </p>
        </div>
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
