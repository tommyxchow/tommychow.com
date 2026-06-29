'use client'

import { StatusPage } from '@/components/StatusPage'
import { Button } from '@/components/ui/button'
import { useLogBoundaryError } from '@/hooks/use-log-boundary-error'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useLogBoundaryError(error)

  return (
    <StatusPage
      eyebrow='Error'
      title='Something went wrong'
      message='An unexpected error occurred while loading this page.'
      actions={
        <>
          <Button variant='outline' onClick={reset}>
            Try again
          </Button>
          <Button
            render={<Link href='/' />}
            nativeButton={false}
            variant='ghost'
          >
            Go home
          </Button>
        </>
      }
      hint='If the problem persists, reload the page.'
    />
  )
}
