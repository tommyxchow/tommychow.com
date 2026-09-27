'use client'

import { Button } from '@/components/ui/button'
import { twJoin } from 'cn'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const path = usePathname()
  const showBackButton = path !== '/'

  return (
    // The bar spans the page top, so it lets clicks through to the content under
    // it; only the home button takes them, and only while it's visible.
    <header className='pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between p-4'>
      <Button
        render={<Link aria-label='Go back to home page' href='/' />}
        nativeButton={false}
        // Hidden on the home page: out of the tab order and screen readers too.
        inert={!showBackButton}
        variant='ghost'
        size='icon'
        className={twJoin(
          'transition-opacity duration-300',
          showBackButton
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        <Home />
      </Button>
    </header>
  )
}
