'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { type LinkInfo, links } from '@/lib/links'
import { toast } from 'sonner'

const linkClassName =
  'relative flex size-3 items-center justify-center text-inherit before:absolute before:-inset-1.5 before:content-[""] focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none [&_svg]:size-3'

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
      <ul className='flex items-center gap-1.5 leading-none'>
        {links.map((link) => (
          <li key={link.title}>
            <Tooltip>
              <TooltipTrigger
                render={
                  isCopyLink(link) ? (
                    <button
                      type='button'
                      onClick={() => void copyToClipboard(link.copyValue)}
                      aria-label={link.title}
                      className={linkClassName}
                    />
                  ) : (
                    <a
                      href={link.href}
                      {...(link.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      aria-label={link.title}
                      className={linkClassName}
                    />
                  )
                }
              >
                {link.icon}
              </TooltipTrigger>
              <TooltipContent
                side='top'
                sideOffset={8}
                showArrow={false}
                className='border border-border bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10'
              >
                {link.title}
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </nav>
  )
}
