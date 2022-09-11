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
      <ul className='flex flex-col gap-4'>
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
