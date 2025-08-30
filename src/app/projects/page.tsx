import ProjectCard from '@/components/ProjectCard'
import { projects } from './projects'

export default function ProjectsPage() {
  return (
    <ul className='grid min-h-0 w-full grid-cols-2 gap-4'>
      {projects.map((project) => (
        <li key={project.name} className='w-full'>
          <ProjectCard {...project} showThumbnail />
        </li>
      ))}
    </ul>
  )
}
