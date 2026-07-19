'use client'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { labIdeas } from '@/lab/generated-manifest'
import { type LabIdea, type LabVariation } from '@/lab/types'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Moon,
  Sun,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useSyncExternalStore } from 'react'

type ScrollAvailability = 'both' | 'left' | 'none' | 'right'

const variationDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function getScrollAvailability(nav: HTMLElement | null): ScrollAvailability {
  if (nav === null) return 'none'

  const maxScrollLeft = nav.scrollWidth - nav.clientWidth
  const canScrollLeft = nav.scrollLeft > 1
  const canScrollRight = nav.scrollLeft < maxScrollLeft - 1

  if (canScrollLeft && canScrollRight) return 'both'
  if (canScrollLeft) return 'left'
  if (canScrollRight) return 'right'
  return 'none'
}

function getServerScrollAvailability(): ScrollAvailability {
  return 'none'
}

function formatReadableTimestamp(timestamp: string): string {
  return variationDateFormatter.format(new Date(timestamp))
}

function VariationMenuItem({
  variation,
  active,
}: {
  variation: LabVariation
  active: boolean
}) {
  return (
    <DropdownMenuItem
      render={<Link href={variation.href} />}
      aria-current={active ? 'page' : undefined}
    >
      <Tooltip>
        <TooltipTrigger render={<span className='flex min-w-0 flex-1' />}>
          <span className='truncate'>{variation.title}</span>
        </TooltipTrigger>
        <TooltipContent side='right' sideOffset={10} surface='popover'>
          <div className='flex max-w-64 flex-col gap-1 text-start text-xs/snug font-normal'>
            <time
              dateTime={variation.createdAt}
              className='text-muted-foreground tabular-nums'
            >
              Created {formatReadableTimestamp(variation.createdAt)}
            </time>
            {variation.notes !== undefined ? (
              <p className='text-pretty text-muted-foreground'>
                {variation.notes}
              </p>
            ) : null}
          </div>
        </TooltipContent>
      </Tooltip>
    </DropdownMenuItem>
  )
}

function LabIdeaChip({ idea, pathname }: { idea: LabIdea; pathname: string }) {
  const activeVariation = idea.variations.find(
    (variation) => variation.href === pathname,
  )
  const active = activeVariation !== undefined
  const variant = active ? 'default' : 'outline'
  const hasVariationMenu = idea.variations.length > 1
  const labelHref = activeVariation?.href ?? idea.href
  const label =
    active && hasVariationMenu
      ? `${idea.title} · ${activeVariation.title}`
      : idea.title

  const labelButton = (
    <Button
      render={
        <Link
          href={labelHref}
          aria-current={
            active ? (hasVariationMenu ? 'location' : 'page') : undefined
          }
          {...(active ? { 'data-lab-active-chip': '' } : {})}
        />
      }
      nativeButton={false}
      variant={variant}
      size='xs'
    >
      <span className='max-w-48 truncate'>{label}</span>
    </Button>
  )

  if (!hasVariationMenu) return labelButton

  return (
    <ButtonGroup>
      {labelButton}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant={variant}
              size='icon-xs'
              aria-label={`Choose ${idea.title} variation`}
            />
          }
        >
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='min-w-40'>
          {idea.variations.map((variation) => (
            <VariationMenuItem
              key={variation.slug}
              variation={variation}
              active={variation.href === pathname}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

export function LabToolbar() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const navRef = useRef<HTMLElement>(null)

  const subscribeToScroll = (onStoreChange: () => void) => {
    const nav = navRef.current
    if (nav === null) return () => undefined

    const resizeObserver = new ResizeObserver(onStoreChange)
    resizeObserver.observe(nav)
    if (nav.firstElementChild !== null) {
      resizeObserver.observe(nav.firstElementChild)
    }
    nav.addEventListener('scroll', onStoreChange, { passive: true })

    return () => {
      resizeObserver.disconnect()
      nav.removeEventListener('scroll', onStoreChange)
    }
  }

  const getScrollSnapshot = () => getScrollAvailability(navRef.current)
  const scrollAvailability = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollAvailability,
  )
  const canScrollLeft =
    scrollAvailability === 'left' || scrollAvailability === 'both'
  const canScrollRight =
    scrollAvailability === 'right' || scrollAvailability === 'both'

  useEffect(() => {
    const activeChip = navRef.current?.querySelector('[data-lab-active-chip]')
    activeChip?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [pathname])

  const scrollIdeas = (direction: -1 | 1) => {
    const nav = navRef.current
    if (nav === null) return

    nav.scrollBy({
      left: direction * nav.clientWidth * 0.75,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }

  const renderScrollChrome = (side: 'left' | 'right') => {
    const visible = side === 'left' ? canScrollLeft : canScrollRight
    if (!visible) return null

    const direction = side === 'left' ? -1 : 1
    return (
      <>
        <div
          aria-hidden='true'
          className={cn(
            'pointer-events-none absolute inset-y-0 z-10 w-12',
            side === 'left'
              ? 'inset-s-0 bg-linear-to-r from-background via-background/80 to-transparent'
              : 'inset-e-0 bg-linear-to-l from-background via-background/80 to-transparent',
          )}
        />
        <Button
          type='button'
          variant='secondary'
          size='icon-xs'
          className={cn(
            'absolute inset-y-0 z-20 my-auto',
            side === 'left' ? 'inset-s-0' : 'inset-e-0',
          )}
          aria-label={
            side === 'left' ? 'Scroll Lab ideas left' : 'Scroll Lab ideas right'
          }
          aria-controls='lab-idea-links'
          onClick={() => scrollIdeas(direction)}
        >
          {side === 'left' ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </>
    )
  }

  return (
    <header className='relative z-50 flex min-w-0 items-center gap-1 border-b border-border/50 bg-background p-1.5'>
      <Button
        render={<Link aria-label='Go to home page' href='/' />}
        nativeButton={false}
        variant='outline'
        size='icon-xs'
      >
        <Home />
      </Button>

      <div className='relative min-w-0 flex-1'>
        <nav
          ref={navRef}
          id='lab-idea-links'
          aria-label='Lab ideas'
          className='scrollbar-none overflow-x-auto overscroll-x-contain'
        >
          <ul className='flex w-max gap-1'>
            {labIdeas.map((idea) => (
              <li key={idea.slug}>
                <LabIdeaChip idea={idea} pathname={pathname} />
              </li>
            ))}
          </ul>
        </nav>

        {renderScrollChrome('left')}
        {renderScrollChrome('right')}
      </div>

      <Button
        type='button'
        variant='outline'
        size='icon-xs'
        className='shrink-0'
        aria-label='Toggle color theme'
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        <Sun className='hidden dark:block' />
        <Moon className='block dark:hidden' />
      </Button>
    </header>
  )
}
