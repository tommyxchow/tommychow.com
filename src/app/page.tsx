import { HoverUnderline } from '@/components/HoverUnderline'
import { Prose } from '@/components/Prose'
import { links } from '@/lib/links'

export default function HomePage() {
  return (
    <div className='flex flex-col gap-2 place-self-center'>
      <header className='flex items-center gap-2'>
        <h1 className='text-muted-foreground'>Tommy Chow</h1>
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
        <HoverUnderline>
          <a href='/gallery'>Gallery →</a>
        </HoverUnderline>
      </Prose>
    </div>
  )
}
