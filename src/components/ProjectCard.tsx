import Link from 'next/link';
import { formatDateString } from '../common';
import { ProjectInfo } from '../data/projects';
import CustomImage from './CustomImage';

const ProjectCard = ({
  id,
  name,
  dateCompleted,
  category,
  thumbnail,
}: ProjectInfo) => {
  return (
    <div
      className='relative aspect-video overflow-clip rounded-xl shadow-xl transition duration-300 hover:opacity-50 active:scale-95 active:shadow-none'
      id={id}
    >
      <Link
        className='absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-2 text-neutral-200 transition sm:p-4'
        href={'/projects/' + id}
      >
        <h2 className='font-medium'>{name}</h2>
        <div className='flex justify-between gap-4'>
          <p className='opacity-50'>{category}</p>
          <time dateTime={dateCompleted} className='opacity-50'>
            {dateCompleted ? formatDateString(dateCompleted) : 'Ongoing'}
          </time>
        </div>
      </Link>

      <CustomImage priority src={thumbnail} alt={`Thumbnail for ${name}.`} />
    </div>
  );
};

export default ProjectCard;
