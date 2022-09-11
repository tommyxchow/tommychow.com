import { readFileSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import { join } from 'path';
import { HiExternalLink } from 'react-icons/hi';
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import SkillBadge from '../../components/SkillBadge';
import { projects } from '../../constants';
import { ProjectInfo, Skill } from '../../types';

const Project = ({ project, skills, mdxSource }: ProjectProps) => {
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
          <h1 className='text-2xl font-medium'>{project.name}</h1>
          <p className='text-neutral-600 dark:text-neutral-400'>
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

      {project.screenshotLinks && (
        <Section header='Screenshots'>
          <ul className='space-y-4'>
            {project.screenshotLinks?.map((screenshotLink) => (
              <li
                className='relative aspect-video shadow-lg'
                key={screenshotLink}
              >
                <Image
                  src={screenshotLink}
                  alt={`Screenshot for ${project.name}.`}
                  layout='fill'
                  objectFit='cover'
                />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </Layout>
  );
};

interface ProjectProps {
  project: ProjectInfo;
  skills: Skill[];
  mdxSource: MDXRemoteSerializeResult;
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = projects.map((project) => ({
    params: { projectName: project.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let mdxSource: MDXRemoteSerializeResult | null = null;

  try {
    const dataDirectory = join(process.cwd(), 'src/data/projects');
    const mdxFile = join(dataDirectory, `${params?.projectName}.mdx`);
    const mdxFileContent = readFileSync(mdxFile, 'utf8');

    mdxSource = await serialize(mdxFileContent);
  } catch (error) {
    console.log('File not found.');
  }

  const project = projects.find(
    (project) => project.id === params?.projectName
  );

  return {
    props: {
      project,
      mdxSource,
    },
  };
};

export default Project;
