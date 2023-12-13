import ProjectCard from '../../components/ProjectCard';
import { Prose } from '../../components/Prose';
import projects from '../../data/projects';

export default function ProjectsPage() {
  return (
    <Prose>
      <h2>Projects</h2>

      <ul className='not-prose flex flex-col gap-8'>
        {projects.map((project) => (
          <li key={project.name}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Prose>
  );
}
