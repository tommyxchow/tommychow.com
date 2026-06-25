'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <TooltipProvider delay={300}>{children}</TooltipProvider>
    </NuqsAdapter>
  )
}
