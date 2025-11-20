import { projects } from '@/app/projects/projects'
import BlogPostCard from '@/components/BlogPostCard'
import { CustomImage } from '@/components/CustomImage'
import { HoverUnderline } from '@/components/HoverUnderline'
import ProjectCard from '@/components/ProjectCard'
import { Prose } from '@/components/Prose'
import Section from '@/components/Section'
import { links } from '@/lib/links'
import {
  getAllBlogPostsFrontmatter,
  getSortedImagesByDate,
} from '@/lib/server-utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function HomePage() {
  const allImages = await getSortedImagesByDate()
  const blogPosts = await getAllBlogPostsFrontmatter()

  return (
    <div className='mt-4 flex flex-col gap-16'>
      <hgroup className='flex flex-col items-baseline gap-1'>
        <h1 className='text-lg font-semibold'>Tommy Chow</h1>
        <p className='text-muted-foreground font-medium'>
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
          I build mobile and web apps with a focus on clean, performant, and
          intuitive interfaces. Lately, I&apos;ve been working on internal
          dashboards that help teams visualize large datasets and streamline
          their processes.
        </p>

        <p>
          Originally from Queens, NY, I studied CS at University at Buffalo and
          now live in the SF Bay Area. Outside of work, I&apos;m probably
          watching Twitch, gaming with friends, or tweaking my mechanical
          keyboards.
        </p>

        <ul className='not-prose flex gap-2'>
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

      <Section title='Gallery' href='/gallery'>
        <ul className='grid grid-cols-3 gap-1 sm:grid-cols-4'>
          {allImages.slice(0, 2).map(({ file, thumbHashDataURL }, index) => (
            <li key={file}>
              <Link
                href={`/gallery/${file}`}
                className={`relative block aspect-square overflow-hidden transition-opacity hover:opacity-60 ${
                  index === 0 ? 'rounded-l-lg' : ''
                }`}
              >
                <CustomImage
                  src={`/gallery/images/${file}`}
                  alt={`Gallery image ${file}`}
                  sizes='(max-width: 640px) 50vw, 25vw'
                  fill
                  priority
                  placeholder='blur'
                  blurDataURL={thumbHashDataURL}
                />
              </Link>
            </li>
          ))}
          {allImages[2] && (
            <li className='hidden sm:block'>
              <Link
                href={`/gallery/${allImages[2].file}`}
                className='relative block aspect-square overflow-hidden transition-opacity hover:opacity-60'
              >
                <CustomImage
                  src={`/gallery/images/${allImages[2].file}`}
                  alt={`Gallery image ${allImages[2].file}`}
                  sizes='(max-width: 640px) 50vw, 25vw'
                  fill
                  priority
                  placeholder='blur'
                  blurDataURL={allImages[2].thumbHashDataURL}
                />
              </Link>
            </li>
          )}
          <li>
            <Link
              href='/gallery'
              className='group relative block aspect-square overflow-hidden rounded-r-lg'
            >
              {allImages[2] && (
                <CustomImage
                  src={`/gallery/images/${allImages[2].file}`}
                  alt={`Gallery image ${allImages[2].file}`}
                  sizes='(max-width: 640px) 50vw, 25vw'
                  fill
                  priority
                  placeholder='blur'
                  blurDataURL={allImages[2].thumbHashDataURL}
                  className='sm:hidden'
                />
              )}
              {allImages[3] && (
                <CustomImage
                  src={`/gallery/images/${allImages[3].file}`}
                  alt={`Gallery image ${allImages[3].file}`}
                  sizes='(max-width: 640px) 50vw, 25vw'
                  fill
                  priority
                  placeholder='blur'
                  blurDataURL={allImages[3].thumbHashDataURL}
                  className='hidden sm:block'
                />
              )}
              <div className='absolute inset-0 bg-black/20 transition-all group-hover:bg-black/40'>
                <div className='absolute inset-0 backdrop-blur-md'></div>
                <div className='relative flex h-full items-center justify-center'>
                  <div className='text-foreground flex items-center gap-2 text-center text-white'>
                    <span className='text-sm font-medium'>
                      {allImages.length - 3} more
                    </span>
                    <ArrowRight className='h-4 w-4' />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </Section>

      <Section title='Blog' href='/blog'>
        <ul className='flex flex-col gap-2'>
          {blogPosts.map((post) => (
            <li key={post.id}>
              <BlogPostCard {...post} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title='Projects' href='/projects'>
        <ul className='flex flex-col gap-4 md:grid md:grid-cols-2'>
          {projects.map((project) => (
            <li key={project.name}>
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
