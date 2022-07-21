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
    >
      <p className='mb-8 md:mb-16 md:text-lg lg:text-xl'>
        I focus on creating mobile and web experiences that motivate me to learn
        and solve meaningful problems. All of my work is free and open-source by
        default.
      </p>

      <ul className='mb-8 flex flex-col gap-4 md:mb-16 md:gap-8'>
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </ul>

      <p className='md:text-lg lg:text-xl'>
        To see all my projects, check out{' '}
        <ExternalLink text='my GitHub profile' href={githubLink} />.
      </p>
    </Layout>
  );
};

interface ProjectsProps {
  projects: ProjectInfo[];
}

export default Projects;
