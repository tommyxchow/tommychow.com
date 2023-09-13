import Layout from '../../components/Layout';
import ProjectCard from '../../components/ProjectCard';
import projects from '../../data/projects';

const Projects = () => {
  return (
    <Layout headline='My Projects' title='Projects | Tommy Chow'>
      <ul className='flex flex-col gap-4'>
        {projects.map((project) => (
          <li key={project.name}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Projects;
