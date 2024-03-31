import { projects } from '@/app/projects/projects';
import ProjectCard from '@/components/ProjectCard';
import { links } from '@/lib/links';

export default function HomePage() {
  return (
    <>
      <h2>I&apos;m Tommy, a software engineer at Tesla</h2>
      <p>
        I specialize in building performant, polished, user-friendly mobile and
        web apps. I generally work with Flutter, Next.js, React Native, and
        SwiftUI, but am always researching and learning new tech stacks. I also
        enjoy exploring UI/UX design principles and patterns.
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
