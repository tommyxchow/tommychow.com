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
      <h1 className='text-2xl font-bold'>Projects</h1>

      <p>
        I focus on creating mobile and web experiences that motivate me to learn
        and solve meaningful problems. All of my work is free and open-source by
        default.
        <br />
        <br />
        For all of my projects, check out{' '}
        <ExternalLink text='my GitHub profile' href={githubLink} />.
      </p>

      <ul className='mb-8 flex flex-col gap-4 md:mb-16 md:gap-8'>
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </ul>
    </Layout>
  );
};

interface ProjectsProps {
  projects: ProjectInfo[];
}

export default Projects;
