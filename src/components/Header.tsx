'use client'

import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twJoin } from 'tailwind-merge'

export function Header() {
  const path = usePathname()
  const showBackButton = path !== '/'
  const isGalleryPage = path.startsWith('/gallery')

  return (
    <header
      className={twJoin(
        'fixed inset-x-0 top-0 z-50 flex items-center justify-between p-4',
        !isGalleryPage && 'mx-auto max-w-(--breakpoint-sm)',
      )}
    >
      <Button
        variant='ghost'
        size='icon'
        render={<Link aria-label='Go back to home page' href='/' />}
        className={twJoin(
          showBackButton
            ? 'animate-in fade-in duration-300 ease-out'
            : 'invisible',
        )}
      >
        <Home />
      </Button>
    </header>
  )
}
