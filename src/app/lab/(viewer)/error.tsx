'use client'

import { useLogBoundaryError } from '@/hooks/use-log-boundary-error'
import Link from 'next/link'

export default function LabError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useLogBoundaryError(error)

  return (
    <section className='grid min-h-full w-full place-items-center p-6 font-mono text-xs uppercase'>
      <div className='flex flex-col items-start gap-3'>
        <h1>This experiment stopped</h1>
        <div className='flex gap-3 text-muted-foreground'>
          <button
            type='button'
            onClick={reset}
            className='min-h-11 underline underline-offset-4 hover:text-foreground focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'
          >
            Try again
          </button>
          <Link
            href='/lab'
            className='flex min-h-11 items-center underline underline-offset-4 hover:text-foreground focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'
          >
            View the index
          </Link>
        </div>
      </div>
    </section>
  )
}
