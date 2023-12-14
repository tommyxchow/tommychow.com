import { Badge } from '@/components/Badge';
import { CustomImage } from '@/components/CustomImage';
import projects from '@/data/projects';
import { skills } from '@/data/skills';
import { formatDateString } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((project) => project.id === params?.slug);

  if (!project) notFound();

  const formattedDate = project.dateCompleted
    ? formatDateString(project.dateCompleted)
    : 'Ongoing';

  return (
    <div className='flex flex-col gap-8'>
      <section className='space-y-4'>
        <div className='flex items-end justify-between'>
          <div className='flex items-baseline gap-2 text-2xl'>
            <h1 className='font-bold'>{project.name}</h1>
            <time
              className='font-medium text-neutral-600 dark:text-neutral-400'
              dateTime={project.dateCompleted}
            >
              {formattedDate}
            </time>
          </div>

          {project.links && (
            <ul className='flex gap-2'>
              {project.links.map((link) => (
                <li key={link.title}>
                  <Badge
                    icon={<HiArrowTopRightOnSquare />}
                    title={link.title}
                    href={link.href}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <CustomImage
          priority
          src={project.thumbnail}
          alt={`Thumbnail for ${project.name}.`}
        />
      </section>

      <section>
        <h2>Stack</h2>
        <ul className='flex flex-wrap gap-2'>
          {project.technologies.map((tech) => {
            const skill = skills.find((skill) => skill.name === tech)!;

            return (
              <li key={tech}>
                <Badge icon={skill.icon} title={skill.name} />
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2>Overview</h2>
        <div className='prose prose-neutral dark:prose-invert'>
          {project.longDescription.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {project.screenshots && (
        <section>
          <h2>Screenshots</h2>
          <ul className='space-y-4'>
            {project.screenshots.map((screenshot, index) => (
              <li key={index}>
                <CustomImage
                  src={screenshot}
                  alt={`Screenshot for ${project.name}.`}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
