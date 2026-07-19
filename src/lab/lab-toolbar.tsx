'use client'

import { Button } from '@/components/ui/button'
import { labEntries } from '@/lab/generated-manifest'
import { ChevronLeft, ChevronRight, Home, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useSyncExternalStore } from 'react'

type ScrollAvailability = 'both' | 'left' | 'none' | 'right'

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
    const activeTab = navRef.current?.querySelector('[aria-current="page"]')
    activeTab?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [pathname])

  const scrollTabs = (direction: -1 | 1) => {
    const nav = navRef.current
    if (nav === null) return

    nav.scrollBy({
      left: direction * nav.clientWidth * 0.75,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }

  return (
    <header className='relative z-50 flex min-w-0 items-center gap-1.5 border-b border-border/50 bg-background p-2'>
      <Button
        render={<Link aria-label='Go to home page' href='/' />}
        nativeButton={false}
        variant='outline'
        size='icon-sm'
      >
        <Home />
      </Button>

      <div className='relative min-w-0 flex-1'>
        <nav
          ref={navRef}
          id='lab-entry-tabs'
          aria-label='Lab entries'
          className='scrollbar-none overflow-x-auto overscroll-x-contain'
        >
          <ul className='flex w-max gap-1.5'>
            {labEntries.map((entry) => {
              const active = pathname === entry.href
              return (
                <li key={entry.slug}>
                  <Button
                    render={
                      <Link
                        href={entry.href}
                        aria-current={active ? 'page' : undefined}
                      />
                    }
                    nativeButton={false}
                    variant={active ? 'default' : 'outline'}
                    size='sm'
                  >
                    {entry.title}
                  </Button>
                </li>
              )
            })}
          </ul>
        </nav>

        {canScrollLeft ? (
          <>
            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-y-0 inset-s-0 z-10 w-12 bg-linear-to-r from-background via-background/80 to-transparent'
            />
            <Button
              type='button'
              variant='secondary'
              size='icon-sm'
              className='absolute inset-y-0 inset-s-0 z-20 my-auto'
              aria-label='Scroll Lab entries left'
              aria-controls='lab-entry-tabs'
              onClick={() => scrollTabs(-1)}
            >
              <ChevronLeft />
            </Button>
          </>
        ) : null}

        {canScrollRight ? (
          <>
            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-y-0 inset-e-0 z-10 w-12 bg-linear-to-l from-background via-background/80 to-transparent'
            />
            <Button
              type='button'
              variant='secondary'
              size='icon-sm'
              className='absolute inset-y-0 inset-e-0 z-20 my-auto'
              aria-label='Scroll Lab entries right'
              aria-controls='lab-entry-tabs'
              onClick={() => scrollTabs(1)}
            >
              <ChevronRight />
            </Button>
          </>
        ) : null}
      </div>

      <Button
        type='button'
        variant='outline'
        size='icon-sm'
        className='ms-auto shrink-0'
        aria-label='Toggle color theme'
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        <Sun className='hidden dark:block' />
        <Moon className='block dark:hidden' />
      </Button>
    </header>
  )
}
