'use client'

import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twJoin } from 'tailwind-merge'

export function Header() {
  const path = usePathname()
  const showBackButton = path !== '/'

  return (
    <header className='fixed inset-x-0 top-0 z-50 flex items-center justify-between p-4'>
      <Button
        asChild
        variant='ghost'
        size='icon'
        className={twJoin(
          'transition-opacity duration-300',
          showBackButton ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <Link aria-label='Go back to home page' href='/'>
          <Home />
        </Link>
      </Button>
    </header>
  )
}
