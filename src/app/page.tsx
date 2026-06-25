import { Prose } from '@/components/Prose'
import { links } from '@/lib/links'
import { getSortedImagesByDate } from '@/lib/server-utils'
import { GalleryPreview } from './GalleryPreview'
import { HomeClient } from './HomeClient'

export default function HomePage() {
  const allImages = getSortedImagesByDate()
  const previewImages = allImages.slice(0, 3)

  return (
    <HomeClient>
      <header className='flex h-4 items-center gap-2'>
        <h1 className='text-sm leading-none font-medium tracking-wide text-muted-foreground uppercase'>
          Tommy Chow
        </h1>
        <nav aria-label='Social links' className='flex h-4 items-center'>
          <ul className='flex h-4 items-center gap-2'>
            {links.map((link) => {
              const isExternal = link.href.startsWith('http')

              return (
                <li key={link.title} className='flex h-4 items-center'>
                  <a
                    href={link.href}
                    {...(isExternal
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    aria-label={link.title}
                    className='relative flex size-4 items-center justify-center text-muted-foreground transition-colors before:absolute before:-inset-1 before:content-[""] hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-4'
                  >
                    {link.icon}
                  </a>
                </li>
              )
            })}
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

      <GalleryPreview images={previewImages} />
    </HomeClient>
  )
}
