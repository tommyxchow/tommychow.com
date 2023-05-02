import { GetStaticPaths, GetStaticProps } from 'next';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { formatDateString } from '../../common';
import CustomImage from '../../components/CustomImage';
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import SkillBadge from '../../components/SkillBadge';
import projects, { ProjectInfo } from '../../data/projects';
import { skills } from '../../data/skills';

interface ProjectProps {
  project: ProjectInfo;
}

const Project = ({ project }: ProjectProps) => {
  let formattedDate = project.dateCompleted
    ? formatDateString(project.dateCompleted)
    : 'Ongoing';

  return (
    <Layout
      title={`${project.name} | Tommy Chow`}
      description={project.shortDescription}
    >
      <section className='space-y-4'>
        <div>
          <h1 className='text-lg font-medium'>{project.name}</h1>

          <div className='flex justify-between gap-4'>
            <p className='text-neutral-600 dark:text-neutral-400'>
              {project.category}
            </p>
            <time
              dateTime={project.dateCompleted}
              className='text-neutral-600 dark:text-neutral-400'
            >
              {formattedDate}
            </time>
          </div>
        </div>

        <CustomImage
          priority
          src={project.thumbnail}
          alt={`Thumbnail for ${project.name}.`}
        />
      </section>

      <div className='space-y-8'>
        <Section>
          <ul className='flex flex-wrap gap-2'>
            {project.technologies.map((tech) => (
              <li key={tech}>
                <SkillBadge {...skills.find((skill) => skill.name === tech)!} />
              </li>
            ))}
          </ul>
        </Section>

        {project.links && (
          <Section>
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
                    <HiArrowTopRightOnSquare />
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section>
          <div className='space-y-4'>
            {project.longDescription.split('\n').map((paragraph, index) => (
              <p key={index} className='text-neutral-700 dark:text-neutral-300'>
                {paragraph}
              </p>
            ))}
          </div>
        </Section>

        {project.screenshots && (
          <Section>
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
          </Section>
        )}
      </div>
    </Layout>
  );
};

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
