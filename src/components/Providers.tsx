'use client'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLab = pathname === '/lab' || pathname.startsWith('/lab/')

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem={false}
      forcedTheme={isLab ? undefined : 'dark'}
      storageKey='lab-theme'
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <TooltipProvider delay={300}>
          {children}
          <Toaster position='top-center' offset={56} />
        </TooltipProvider>
      </NuqsAdapter>
    </ThemeProvider>
  )
}
