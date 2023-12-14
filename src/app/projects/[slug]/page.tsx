import { Badge } from '@/components/Badge';
import { CustomImage } from '@/components/CustomImage';
import { Prose } from '@/components/Prose';
import { projects } from '@/lib/projects';
import { skills } from '@/lib/skills';
import { formatDateString } from '@/lib/utils';
import { notFound } from 'next/navigation';

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
    <Prose>
      <article>
        <h2>
          {project.name} ({formattedDate})
        </h2>

        <CustomImage
          priority
          src={project.thumbnail}
          alt={`Thumbnail for ${project.name}.`}
        />

        {project.longDescription.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <section>
          <h3>Stack</h3>
          <ul className='not-prose flex flex-wrap gap-2'>
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
          <h3>Screenshots</h3>
          <ul className='not-prose space-y-4'>
            {project.screenshots?.map((screenshot, index) => (
              <li key={index}>
                <CustomImage
                  src={screenshot}
                  alt={`Screenshot for ${project.name}.`}
                />
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Prose>
  );
}
