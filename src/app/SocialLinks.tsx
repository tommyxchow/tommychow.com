'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { links } from '@/lib/links'

export function SocialLinks() {
  return (
    <nav aria-label='Social links'>
      <ul className='flex items-center gap-2'>
        {links.map((link) => {
          const isExternal = link.href.startsWith('http')

          return (
            <li key={link.title}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={link.href}
                      {...(isExternal
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      aria-label={link.title}
                      className='relative flex size-4 items-center justify-center text-muted-foreground transition-colors before:absolute before:-inset-1 before:content-[""] hover:text-foreground focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none [&_svg]:size-4'
                    />
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
          )
        })}
      </ul>
    </nav>
  )
}
