import { projects } from '@/app/projects/projects';
import ProjectCard from '@/components/ProjectCard';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Tommy Chow',
};

export default function ProjectsPage() {
  return (
    <>
      <h2>Projects</h2>
      <ul className='not-prose flex flex-col gap-8'>
        {projects.map((project) => (
          <li key={project.name}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  );
}
