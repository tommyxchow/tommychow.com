import ProjectCard from '@/components/ProjectCard'
import { projects } from './projects'

export default function ProjectsPage() {
  return (
    <ul className='flex flex-col gap-4'>
      {projects.map((project) => (
        <li key={project.name}>
          <ProjectCard {...project} showThumbnail />
        </li>
      ))}
    </ul>
  )
}
