'use client'

import { type LinkInfo, links } from '@/lib/links'
import { toast } from 'sonner'

// The pseudo-element pads the hit area to about 24px around the small text.
const linkClassName =
  'relative text-muted-foreground uppercase transition-colors before:absolute before:-inset-x-1 before:-inset-y-1.5 before:content-[""] hover:text-foreground focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'

function isCopyLink(
  link: LinkInfo,
): link is Extract<LinkInfo, { copyValue: string }> {
  return 'copyValue' in link
}

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    toast.success('Email copied')
  } catch {
    toast.error('Could not copy email')
  }
}

export function SocialLinks() {
  return (
    <nav aria-label='Social links'>
      <ul className='flex flex-wrap gap-x-4 gap-y-2 md:justify-end'>
        {links.map((link) => (
          <li key={link.label}>
            {isCopyLink(link) ? (
              <button
                type='button'
                onClick={() => void copyToClipboard(link.copyValue)}
                aria-label={`Copy ${link.label.toLowerCase()}`}
                className={linkClassName}
              >
                {link.label}
              </button>
            ) : (
              <a
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className={linkClassName}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
