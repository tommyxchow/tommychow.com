import { projects } from '@/app/projects/projects';
import ProjectCard from '@/components/ProjectCard';
import { links } from '@/lib/links';

export default function HomePage() {
  return (
    <>
      <h2>Hello! I&apos;m Tommy, a frontend software engineer</h2>
      <p>
        I specialize in building performant, polished, user-friendly mobile and
        web apps. I generally work with Flutter, Next.js, React/React Native,
        and SwiftUI, but am always researching and learning new tech stacks. I
        also enjoy exploring UI/UX design principles and patterns.
      </p>
      <p>
        Currently, I&apos;m a software engineer at{' '}
        <a href='https://www.tesla.com/about' target='_blank'>
          Tesla
        </a>{' '}
        on the Vehicle Engineering team.
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
          <ProjectCard project={projects[2]} />
        </div>
      </section>
    </>
  );
}
