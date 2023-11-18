import { type GetStaticPaths, type GetStaticProps } from 'next';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { formatDateString } from '../../common';
import Badge from '../../components/Badge';
import CustomImage from '../../components/CustomImage';
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import projects, { type ProjectInfo } from '../../data/projects';
import { skills } from '../../data/skills';

interface ProjectProps {
  project: ProjectInfo;
}

const Project = ({ project }: ProjectProps) => {
  const formattedDate = project.dateCompleted
    ? formatDateString(project.dateCompleted)
    : 'Ongoing';

  return (
    <Layout
      title={`${project.name} | Tommy Chow`}
      description={project.shortDescription}
    >
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

      <Section header='Stack'>
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
      </Section>

      <Section header='Overview'>
        <div className='prose prose-neutral dark:prose-invert'>
          {project.longDescription.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {project.screenshots && (
        <Section header='Screenshots'>
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
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = projects.map((project) => ({
    params: { projectName: project.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const project = projects.find(
    (project) => project.id === params?.projectName,
  );

  return {
    props: {
      project,
    },
  };
};

export default Project;
