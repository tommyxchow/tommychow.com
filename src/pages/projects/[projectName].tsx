import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { HiExternalLink } from 'react-icons/hi';
import CustomImage from '../../components/CustomImage';
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import SkillBadge from '../../components/SkillBadge';
import { ProjectInfo, projects } from '../../data/projects';
import { skills } from '../../data/skills';

const Project = ({ project }: ProjectProps) => {
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
      <section className='space-y-4'>
        <div className='space-y-2'>
          <h1 className='text-xl font-medium'>{project.name}</h1>
          <p className='text-neutral-600 dark:text-neutral-400'>
            {project.shortDescription}
          </p>
        </div>

        <div className='relative aspect-video shadow-lg'>
          <CustomImage
            priority
            src={project.thumbnailLink}
            alt={`Thumbnail for ${project.name}.`}
          />
        </div>
      </section>

      <div className='space-y-16'>
        <Section header='Built with'>
          <ul className='flex flex-wrap gap-2'>
            {project.technologies.map((tech) => (
              <li key={tech}>
                <SkillBadge {...skills.find((skill) => skill.name === tech)!} />
              </li>
            ))}
          </ul>
        </Section>

        <Section header='Highlights'>
          <ul className='ml-4 list-disc'>
            <li>
              <span
                className={`font-medium ${
                  formattedDate === 'Ongoing'
                    ? 'animate-pulse text-yellow-600 dark:text-yellow-400'
                    : 'text-lime-600 dark:text-lime-400'
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

        <Section header='Links'>
          <ul className='flex flex-wrap gap-8'>
            {project.links.map((link) => (
              <li key={link.title}>
                <a
                  className='link flex items-center gap-1 hover:-translate-y-1'
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

        {project.screenshotLinks && (
          <Section header='Screenshots'>
            <ul className='space-y-4'>
              {project.screenshotLinks?.map((screenshotLink) => (
                <li
                  className='relative aspect-video shadow-lg'
                  key={screenshotLink}
                >
                  <CustomImage
                    src={screenshotLink}
                    alt={`Screenshot for ${project.name}.`}
                  />
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </Layout>
  );
};

interface ProjectProps {
  project: ProjectInfo;
}

export const getStaticPaths: GetStaticPaths = () => {
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

export default Project;
