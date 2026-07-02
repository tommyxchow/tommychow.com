'use client'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <TooltipProvider delay={300}>
        {children}
        <Toaster position='top-center' offset={56} />
      </TooltipProvider>
    </NuqsAdapter>
  )
}
