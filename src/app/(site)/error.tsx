'use client'

import {
  StatusPage,
  StatusPageAction,
  StatusPageLink,
} from '@/components/StatusPage'
import { useLogBoundaryError } from '@/hooks/use-log-boundary-error'

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
      title='Something went wrong'
      actions={
        <>
          <StatusPageAction onClick={reset}>Try again</StatusPageAction>
          <StatusPageLink href='/'>Go home</StatusPageLink>
        </>
      }
    />
  )
}
