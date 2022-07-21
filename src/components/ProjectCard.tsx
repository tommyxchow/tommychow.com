import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { ProjectInfo } from '../types';

const ProjectCard = ({
  name,
  date,
  description,
  imageLink,
  repoLink,
  figmaLink,
  demoLink,
}: ProjectInfo) => {
  const projectDate = new Date(date);

  const formattedDate = `${projectDate.toLocaleString('default', {
    month: 'long',
  })} ${projectDate.getFullYear()}`;

  return (
    <li className='group relative aspect-video overflow-clip'>
      <div className='absolute z-10 flex h-full w-full flex-col items-center justify-center gap-2 p-12 text-neutral-300 opacity-0 transition hover:bg-black hover:bg-opacity-80 hover:opacity-100'>
        <h2 className='text-xl font-semibold text-neutral-100 md:text-2xl lg:text-3xl'>
          {name}
        </h2>
        <p className='text-center text-sm font-medium lg:text-base'>
          {formattedDate}
        </p>
        <p className='mb-4 text-center text-sm font-medium lg:text-base'>
          {description}
        </p>
        <div className='flex gap-4'>
          {demoLink && (
            <a
              className='flex items-center gap-1'
              href={demoLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              Live Demo
              <FaExternalLinkAlt />
            </a>
          )}
          {figmaLink && (
            <a
              className='flex items-center gap-1'
              href={demoLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              Figma Wireframe
              <FaExternalLinkAlt />
            </a>
          )}
          <a
            className='flex items-center gap-1'
            href={repoLink}
            target='_blank'
            rel='noopener noreferrer'
          >
            Source
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>

      <Image
        src={imageLink}
        alt={`Thumbnail for ${name}.`}
        layout='fill'
        objectFit='cover'
      />
    </li>
  );
};

export default ProjectCard;
