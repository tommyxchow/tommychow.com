import { type ProjectInfo } from '@/app/projects/projects';
import { formatDate } from '@/lib/utils';
import { CustomImage } from './CustomImage';

interface ProjectCardProps {
  project: ProjectInfo;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className='not-prose flex flex-col gap-2'>
      <a
        className='transition-opacity hover:opacity-50'
        href={project.url}
        target='_blank'
      >
        <CustomImage
          priority
          src={project.thumbnail}
          alt={`Thumbnail for ${project.name}.`}
        />
      </a>

      <div className='flex justify-between gap-2 font-medium'>
        <a className='hover:underline' href={project.githubUrl} target='_blank'>
          <h3>{project.name}</h3>
        </a>
        <time dateTime={project.dateCompleted}>
          {project.dateCompleted
            ? formatDate(project.dateCompleted)
            : 'Ongoing'}
        </time>
      </div>
    </article>
  );
}
