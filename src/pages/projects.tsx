import ExternalLink from '../components/ExternalLink';
import Layout from '../components/layout';
import ProjectCard from '../components/ProjectCard';
import { githubLink } from '../constants';
import { ProjectInfo } from '../types';

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <Layout
      title='Projects | Tommy Chow'
      description={"Tommy Chow's projects."}
    >
      <p className='mb-12 md:text-lg lg:col-span-2 lg:text-2xl'>
        I focus on creating mobile and web experiences that motivate me to learn
        and solve meaningful problems. All of my work is free and open-source by
        default.
      </p>

      <p className='mb-12 md:text-lg lg:col-span-2 lg:text-2xl'>
        To see all my projects, check out{' '}
        <ExternalLink text='my GitHub profile' href={githubLink} />.
      </p>

      <ul className='col-span-full grid flex-col gap-8 md:grid-cols-2 lg:row-start-2'>
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
