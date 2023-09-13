import Link from 'next/link';
import { formatDateString } from '../common';
import { ProjectInfo } from '../data/projects';
import CustomImage from './CustomImage';

type ProjectCardProps = {
  project: ProjectInfo;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className='not-prose relative aspect-video overflow-clip rounded-xl shadow-xl transition duration-300 hover:opacity-60 active:scale-95 active:shadow-none'
      id={project.id}
    >
      <Link
        className='absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black to-50% p-4 transition'
        href={'/projects/' + project.id}
      >
        <div className='flex flex-col text-neutral-200'>
          <h2 className='text-lg font-bold'>{project.name}</h2>
          <div className='font-medium opacity-60'>
            <time dateTime={project.dateCompleted}>
              {project.dateCompleted
                ? formatDateString(project.dateCompleted)
                : 'Ongoing'}
            </time>
            <p>{project.shortDescription}</p>
          </div>
        </div>
      </Link>

      <CustomImage
        priority
        src={project.thumbnail}
        alt={`Thumbnail for ${project.name}.`}
      />
    </div>
  );
}
