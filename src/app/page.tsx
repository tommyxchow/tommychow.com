import { projects } from '@/app/projects/projects';
import BlogPostCard from '@/components/BlogPostCard';
import { CustomImage } from '@/components/CustomImage';
import { HoverUnderline } from '@/components/HoverUnderline';
import ProjectCard from '@/components/ProjectCard';
import { Prose } from '@/components/Prose';
import { links } from '@/lib/links';
import {
  getAllBlogPostsFrontmatter,
  getSortedImagesByDate,
} from '@/lib/server-utils';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';

export default async function HomePage() {
  const allImages = await getSortedImagesByDate();
  const blogPosts = await getAllBlogPostsFrontmatter();

  return (
    <div className='mt-4 flex flex-col gap-16'>
      <hgroup className='flex flex-col items-baseline gap-2'>
        <h1 className='text-xl font-semibold'>Tommy Chow</h1>
        <p className='text-zinc-500 dark:text-zinc-400'>
          Software Engineer at{' '}
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
          semantics, and accessibility in mind.
        </p>

        <p>
          I grew up in Queens, NY and studied computer science at the Univeristy
          at Buffalo. I currently live and work in the SF Bay Area. My latest
          hobbies include collecting CS2 skins and building mechanical
          keyboards.
        </p>

        <ul className='not-prose flex gap-4'>
          {links.map((link) => (
            <li key={link.title}>
              <HoverUnderline>
                <a href={link.href} target='_blank'>
                  {link.title}
                </a>
              </HoverUnderline>
            </li>
          ))}
        </ul>
      </Prose>

      <section className='flex flex-col gap-4'>
        <Link
          className='-mx-4 flex items-center justify-between border-b border-zinc-300 p-4 transition-[background] hover:bg-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-900'
          href='/gallery'
        >
          <h2 className='text-lg font-semibold'>Gallery</h2>
          <HiArrowRight />
        </Link>
        <ul className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          {allImages.slice(0, 4).map(({ file, thumbHashDataURL }) => (
            <li key={file}>
              <Link
                href={`/gallery/${file}`}
                className='relative block aspect-square transition-opacity hover:opacity-50'
              >
                <CustomImage
                  src={`/gallery/images/${file}`}
                  alt='Gallery image'
                  sizes='(max-width: 640px) 50vw, 25vw'
                  fill
                  priority
                  placeholder='blur'
                  blurDataURL={thumbHashDataURL}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className='flex flex-col'>
        <Link
          className='-mx-4 flex items-center justify-between border-b border-zinc-300 p-4 transition-[background] hover:bg-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-900'
          href='/blog'
        >
          <h2 className='text-lg font-semibold'>Blog</h2>
          <HiArrowRight />
        </Link>
        <ul>
          {blogPosts.map((post) => (
            <li key={post.id}>
              <BlogPostCard {...post} />
            </li>
          ))}
        </ul>
      </section>

      <section className='flex flex-col'>
        <Link
          className='-mx-4 flex items-center justify-between border-b border-zinc-300 p-4 transition-[background] hover:bg-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-900'
          href='/projects'
        >
          <h2 className='text-lg font-semibold'>Projects</h2>
          <HiArrowRight />
        </Link>
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
