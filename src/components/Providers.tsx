'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { useEffect } from 'react'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      void import('react-scan').then(({ scan }) => {
        scan({ enabled: true })
      })
    }
  }, [])

  return <NuqsAdapter>{children}</NuqsAdapter>
}
