import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';
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
      title='Project Name | Tommy Chow'
      description='This is a project template.'
    >
      <section className='flex flex-col gap-8'>
        <div>
          <h1 className='mb-2 text-2xl font-semibold'>{project.name}</h1>
          <h2>{project.shortDescription}</h2>
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

      <Section header='Status'>
        {formattedDate == 'Ongoing'
          ? formattedDate
          : 'Completed ' + formattedDate}
      </Section>

      <Section header='Technologies'>
        <ul className='flex flex-wrap gap-2'>
          {project.technologies.map((tech) => (
            <li key={tech}>
              <SkillBadge {...skills.find((skill) => skill.name == tech)!} />
            </li>
          ))}
        </ul>
      </Section>

      <Section header='Description'>
        <p>{project.longDescription}</p>
      </Section>

      <Section header='Links'>
        <ul className='flex flex-col gap-4'>
          {project.links.map((link) => (
            <li className='w-fit' key={link.title}>
              <a
                className='link flex w-fit items-center gap-2 hover:-translate-y-1'
                href={link.href}
                target='_blank'
                rel='noreferrer'
              >
                {link.title}
                <FaExternalLinkAlt />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {project.screenshotLinks && (
        <section className='flex flex-col gap-4'>
          <h2 className='text-lg font-semibold'>Screenshots</h2>
          {project.screenshotLinks?.map((screenshotLink) => (
            <div
              className='relative aspect-video shadow-lg'
              key={screenshotLink}
            >
              <Image
                src={screenshotLink}
                alt='Project image'
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
  const project = projects.find((project) => project.id == params?.projectName);

  return {
    props: {
      project,
    },
  };
};
