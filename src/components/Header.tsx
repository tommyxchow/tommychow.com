'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twJoin } from 'tailwind-merge'
import { ThemeToggle } from './ThemeToggle'

const routeToHeader: Record<string, string> = {
  '/gallery': 'Gallery',
  '/blog': 'Blog',
  '/projects': 'Projects',
}

export function Header() {
  const path = usePathname()
  const isGalleryPage = path.includes('/gallery')
  const showBackButton = path !== '/'

  const header = Object.entries(routeToHeader).find(([route, _]) => {
    if (route === '/gallery') {
      return path.startsWith(route)
    }
    return path === route
  })?.[1]

  return (
    <header
      className={twJoin(
        'sticky inset-0 z-50 -mx-4 flex items-center justify-between px-4 py-8',
        isGalleryPage ? 'bg-background' : 'from-background bg-gradient-to-b',
      )}
    >
      <Link
        aria-label='Go back to home page'
        className={twJoin(
          'transition-opacity hover:opacity-60',
          showBackButton
            ? 'animate-in fade-in duration-300 ease-out'
            : 'invisible',
        )}
        href='/'
      >
        <ArrowLeft className='h-4 w-4' />
      </Link>

      {header && (
        <span className='animate-in fade-in flex h-0 items-center font-semibold tracking-wide uppercase duration-300 ease-out'>
          {header}
        </span>
      )}

      <ThemeToggle />
    </header>
  )
}
