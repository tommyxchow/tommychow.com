import { projects } from '@/app/projects/projects';
import ProjectCard from '@/components/ProjectCard';
import { links } from '@/lib/links';

export default function HomePage() {
  return (
    <>
      <h2>I&apos;m Tommy, a software engineer based in NYC.</h2>

      <p>
        I focus on the frontend and specialize in mobile, web, and
        cross-platform development.
      </p>

      <p>
        I&apos;m currently looking for a frontend-focused software engineering
        role, prefably hybrid or in-person within New York City.
      </p>

      <div className='flex flex-wrap gap-4'>
        {links.map((link) => (
          <a
            className='flex items-center gap-2'
            key={link.title}
            href={link.href}
            target='_blank'
          >
            {link.icon}
            {link.title}
          </a>
        ))}
      </div>

      <section>
        <h3>Featured</h3>
        <div className='flex flex-col gap-8'>
          <ProjectCard project={projects[0]} />
          <ProjectCard project={projects[3]} />
        </div>
      </section>
    </>
  );
}
