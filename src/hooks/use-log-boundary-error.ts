'use client'

import { useEffect } from 'react'

export function useLogBoundaryError(error: Error & { digest?: string }) {
  useEffect(() => {
    // Surface the error for observability (Cloudflare Workers logs).
    console.error(error)
  }, [error])
}
