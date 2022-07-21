import Image from 'next/image';
import { ProjectInfo } from '../types';

const ProjectCard = ({
  name,
  date,
  description,
  imageLink,
  projectLink,
}: ProjectInfo) => {
  return (
    <li className='group relative aspect-video'>
      <a href={projectLink} target='_blank' rel='noopener noreferrer'>
        <div className='absolute z-10 flex h-full w-full flex-col items-center justify-center gap-4 p-12 opacity-0 transition hover:bg-black hover:bg-opacity-80 hover:opacity-100'>
          <h2 className='text-2xl font-semibold text-neutral-100'>{name}</h2>
          <p className='text-center text-sm text-neutral-100'>{description}</p>
        </div>

        <Image
          src={imageLink}
          alt={`Thumbnail for ${name}.`}
          layout='fill'
          objectFit='cover'
        />
      </a>
    </li>
  );
};

export default ProjectCard;
