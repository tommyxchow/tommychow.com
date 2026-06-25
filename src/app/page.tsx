import { Prose } from '@/components/Prose'
import { getSortedImagesByDate } from '@/lib/server-utils'
import { GalleryPreview } from './GalleryPreview'
import { HomeClient } from './HomeClient'
import { SocialLinks } from './SocialLinks'

export default function HomePage() {
  const allImages = getSortedImagesByDate()
  const previewImages = allImages.slice(0, 3)

  return (
    <HomeClient>
      <header className='flex h-4 items-center gap-2'>
        <h1 className='text-sm leading-none font-medium tracking-wide text-muted-foreground uppercase'>
          Tommy Chow
        </h1>
        <SocialLinks />
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
