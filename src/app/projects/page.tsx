import ProjectCard from '@/components/ProjectCard';
import { projects } from './projects';

export default function ProjectsPage() {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.name}>
          <ProjectCard {...project} />
        </li>
      ))}
    </ul>
  );
}
