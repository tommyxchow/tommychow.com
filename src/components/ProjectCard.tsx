import { type ProjectInfo } from '@/data/projects';
import { formatDateString } from '@/lib/utils';
import Link from 'next/link';
import { CustomImage } from './CustomImage';

interface ProjectCardProps {
  project: ProjectInfo;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className='not-prose flex flex-col gap-2'>
      <Link
        className='transition-opacity hover:opacity-50'
        href={'/projects/' + project.id}
      >
        <CustomImage
          priority
          src={project.thumbnail}
          alt={`Thumbnail for ${project.name}.`}
        />
      </Link>

      <div className='flex justify-between gap-2 text-lg'>
        <h3 className='font-semibold'>{project.name}</h3>
        <time dateTime={project.dateCompleted}>
          {project.dateCompleted
            ? formatDateString(project.dateCompleted)
            : 'Ongoing'}
        </time>
      </div>
    </article>
  );
}
