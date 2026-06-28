'use client'

import { Button } from '@/components/ui/button'
import { useLogBoundaryError } from '@/hooks/use-log-boundary-error'
import { statusPageClassName } from '@/lib/status-page'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useLogBoundaryError(error)

  return (
    <div className={statusPageClassName}>
      <h1 className='text-4xl font-semibold tracking-tight'>
        Something went wrong
      </h1>
      <p className='text-muted-foreground'>
        An unexpected error occurred. Try again, and if it keeps happening,
        reload the page.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
