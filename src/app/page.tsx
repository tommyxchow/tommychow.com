import ProjectCard from '../components/ProjectCard';
import { Prose } from '../components/Prose';
import projects from '../data/projects';

export default function HomePage() {
  return (
    <Prose>
      <h2 className='text-xl font-semibold'>
        I&apos;m Tommy, a software engineer currently based in New York City. I
        focus on the frontend and specialize in mobile, web, and cross-platform
        development.
      </h2>

      <section>
        <h3>Featured</h3>
        <div className='flex flex-col gap-8'>
          <ProjectCard project={projects[0]} />
          <ProjectCard project={projects[3]} />
        </div>
      </section>
    </Prose>
  );
}
