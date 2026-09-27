import { links } from '@/lib/links'
import { CopyEmailButton } from './copy-email-button'

// The pseudo-element pads each 16px line to a 24px hit area; the list's 8px
// gap keeps neighbouring hit areas from overlapping.
const linkClassName =
  'relative text-muted-foreground uppercase transition-colors before:absolute before:-inset-x-1 before:-inset-y-1 before:content-[""] hover:text-foreground focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'

export function SocialLinks() {
  return (
    <nav aria-label='Social links'>
      <ul className='flex flex-col gap-2 md:items-end'>
        <li>
          <CopyEmailButton className={linkClassName} />
        </li>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className={linkClassName}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
