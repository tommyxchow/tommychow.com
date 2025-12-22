import { HoverUnderline } from '@/components/HoverUnderline'
import { Prose } from '@/components/Prose'
import { links } from '@/lib/links'

export default function HomePage() {
  return (
    <div className='place-self-center'>
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
    </div>
  )
}
