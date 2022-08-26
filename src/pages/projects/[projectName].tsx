import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { HiExternalLink } from 'react-icons/hi';
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import SkillBadge from '../../components/SkillBadge';
import { projects } from '../../constants';
import { ProjectInfo, Skill } from '../../types';

const Project = ({ project, skills }: ProjectProps) => {
  let formattedDate = 'Ongoing';
  if (project.dateCompleted) {
    const projectDate = new Date(project.dateCompleted);

    formattedDate = `${projectDate.toLocaleString('default', {
      month: 'long',
    })} ${projectDate.getFullYear()}`;
  }

  return (
    <Layout
      title={`${project.name} | Tommy Chow`}
      description={project.shortDescription}
    >
      <section className='space-y-8'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-semibold'>{project.name}</h1>
          <p className='text-neutral-500 dark:text-neutral-400'>
            {project.shortDescription}
          </p>
        </div>

        <div className='relative aspect-video shadow-lg'>
          <Image
            priority
            src={project.thumbnailLink}
            alt={`Thumbnail for ${project.name}.`}
            layout='fill'
            objectFit='cover'
          />
        </div>
      </section>

      <div className='space-y-16'>
        <Section header='Highlights'>
          <ul className='list-inside list-disc'>
            <li>
              <span
                className={`font-medium ${
                  formattedDate === 'Ongoing'
                    ? 'animate-pulse text-yellow-500 dark:text-yellow-400'
                    : 'text-green-500 dark:text-green-400'
                }`}
              >
                {formattedDate === 'Ongoing'
                  ? formattedDate
                  : 'Completed on ' + formattedDate}
              </span>
            </li>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </Section>

        <Section header='Built with'>
          <ul className='flex flex-wrap gap-2'>
            {project.technologies.map((tech) => (
              <li key={tech}>
                <SkillBadge {...skills.find((skill) => skill.name === tech)!} />
              </li>
            ))}
          </ul>
        </Section>

        <Section header='Links'>
          <ul className='flex flex-wrap gap-4'>
            {project.links.map((link) => (
              <li key={link.title}>
                <a
                  className='link flex items-center gap-1 font-medium hover:-translate-y-1'
                  href={link.href}
                  target='_blank'
                  rel='noreferrer'
                >
                  {link.title}
                  <HiExternalLink />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <p>{project.longDescription}</p>

      {project.screenshotLinks && (
        <section className='space-y-4'>
          {project.screenshotLinks?.map((screenshotLink) => (
            <div
              className='relative aspect-video shadow-lg'
              key={screenshotLink}
            >
              <Image
                src={screenshotLink}
                alt={`Screenshot for ${project.name}.`}
                layout='fill'
                objectFit='cover'
              />
            </div>
          ))}
        </section>
      )}
    </Layout>
  );
};

interface ProjectProps {
  project: ProjectInfo;
  skills: Skill[];
}

export default Project;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map((project) => ({
    params: { projectName: project.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projects.find(
    (project) => project.id === params?.projectName
  );

  return {
    props: {
      project,
    },
  };
};
