import { links } from '@/lib/links'
import { CopyEmailButton } from './copy-email-button'

// With a mouse the rows sit one 16px line apart, so each link's hit area is
// its line. On touch the list opens to 8px gaps and the pseudo-element pads
// each link to a 24px tap target without overlapping its neighbours.
const linkClassName =
  'relative inline-block text-muted-foreground uppercase transition-colors before:absolute before:-inset-x-1 before:content-[""] pointer-coarse:before:-inset-y-1 hover:text-foreground focus-visible:rounded-sm focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'

export function SocialLinks() {
  return (
    <nav aria-label='Social links'>
      <ul className='flex flex-col md:items-end pointer-coarse:gap-2'>
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
