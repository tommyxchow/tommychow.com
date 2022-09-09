import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { githubLink } from '../constants';
import { ProjectInfo } from '../types';

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <Layout
      title='Projects | Tommy Chow'
      description={"Tommy Chow's projects."}
      header='Selected Projects'
    >
      <div className='flex flex-col gap-8'>
        <p>
          I enjoy creating mobile and web experiences solve meaningful problems
          and motivate me to learn. The projects here are meant to showcase my
          growth, diversity, and versatility as a software developer.
        </p>

        <p>
          All of my work is free and open-source by default. To see them all,
          check out{' '}
          <ExternalLink href={githubLink}>my GitHub profile</ExternalLink>!
        </p>
      </div>

      <ul className='mb-8 flex flex-col gap-4 sm:mb-16'>
        {projects.map((project) => (
          <li key={project.name}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

interface ProjectsProps {
  projects: ProjectInfo[];
}

export default Projects;
