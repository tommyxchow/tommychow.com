import { projects } from '@/app/projects/projects';
import BlogPostCard from '@/components/BlogPostCard';
import { CustomImage } from '@/components/CustomImage';
import { HoverUnderline } from '@/components/HoverUnderline';
import ProjectCard from '@/components/ProjectCard';
import { Prose } from '@/components/Prose';
import {
  getAllBlogPostsFrontmatter,
  getSortedImagesByDate,
} from '@/lib/server-utils';
import Link from 'next/link';

export default async function HomePage() {
  const allImages = await getSortedImagesByDate();
  const blogPosts = await getAllBlogPostsFrontmatter();

  return (
    <div className='mt-4 flex flex-col gap-16'>
      <hgroup className='flex flex-col items-baseline gap-2'>
        <h1 className='text-xl font-semibold'>Tommy Chow</h1>
        <p className='text-zinc-500 dark:text-zinc-400'>
          Software engineer at{' '}
          <HoverUnderline>
            <a href='https://www.tesla.com/about' target='_blank'>
              Tesla
            </a>
          </HoverUnderline>
        </p>
      </hgroup>

      <Prose>
        <p>
          I design and engineer mobile and web apps. I lean towards building
          modern, minimalistic, and practical user interfaces with performance,
          semantics, and accessibility always in mind. I&apos;m also a
          mechanical keyboard enthusiast and Counter-Strike 2 skins enjoyer.
        </p>
      </Prose>

      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Gallery</h2>
        <ul className='grid grid-cols-3 gap-4'>
          {allImages.map(({ file }) => (
            <li
              key={file}
              className='relative aspect-square transition-opacity hover:opacity-50'
            >
              <Link href={`/gallery/${file}`}>
                <CustomImage
                  src={`/gallery/images/${file}`}
                  alt='Gallery image'
                  fill
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Blog</h2>
        <ul>
          {blogPosts.map((post) => (
            <li key={post.id}>
              <BlogPostCard {...post} />
            </li>
          ))}
        </ul>
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.name}>
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
