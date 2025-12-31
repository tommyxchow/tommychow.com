import { CustomImage } from '@/components/CustomImage'
import { Prose } from '@/components/Prose'
import { links } from '@/lib/links'
import { getSortedImagesByDate } from '@/lib/server-utils'
import Link from 'next/link'
import { HomeClient } from './HomeClient'

export default async function HomePage() {
  const allImages = await getSortedImagesByDate()
  const previewImages = allImages.slice(0, 3)

  return (
    <HomeClient>
      <header className='flex items-center gap-2'>
        <h1 className='text-muted-foreground text-sm font-medium tracking-wide uppercase'>
          Tommy Chow
        </h1>
        <nav aria-label='Social links'>
          <ul className='flex items-center gap-2'>
            {links.map((link) => (
              <li key={link.title}>
                <a
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={link.title}
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <Prose>
        <p>
          I make mobile and web apps with a focus on clean, performant, and
          intuitive interfaces. Now at Tesla, I&apos;m building internal
          dashboards that help teams visualize large datasets and streamline
          their processes.
        </p>

        <p>
          Originally from Queens, NY, I studied CS at UB and now live in the Bay
          Area. Outside of work, I&apos;m probably watching Twitch, gaming with
          friends, or tweaking my mechanical keyboards.
        </p>
      </Prose>

      <section className='mt-8 flex flex-col gap-4'>
        <Link href='/gallery' className='group block'>
          <div className='grid grid-cols-3 gap-1 overflow-hidden rounded-sm'>
            {previewImages.map(({ file, thumbHashDataURL }) => (
              <div key={file} className='relative aspect-3/4 overflow-hidden'>
                <CustomImage
                  src={`/gallery/images/${file}`}
                  alt='Gallery preview'
                  fill
                  sizes='(max-width: 640px) 50vw, 400px'
                  className='object-cover shadow-none transition-transform duration-500 group-hover:scale-105'
                  placeholder='blur'
                  blurDataURL={thumbHashDataURL}
                />
              </div>
            ))}
          </div>
          <div className='mt-3 flex items-center justify-between'>
            <span className='text-muted-foreground text-sm font-medium tracking-wide uppercase'>
              Gallery
            </span>
            <span className='text-muted-foreground transition-transform group-hover:translate-x-1'>
              →
            </span>
          </div>
        </Link>
      </section>
    </HomeClient>
  )
}
