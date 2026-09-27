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
    <header className='fixed inset-x-0 top-0 z-50 flex items-center justify-between p-4'>
      <Button
        render={
          <Link
            aria-label='Go back to home page'
            href='/'
            tabIndex={showBackButton ? 0 : -1}
          />
        }
        nativeButton={false}
        variant='ghost'
        size='icon'
        className={twJoin(
          'transition-opacity duration-300',
          showBackButton ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <Home />
      </Button>
    </header>
  )
}
