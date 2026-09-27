'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'

export function Providers({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>
}
