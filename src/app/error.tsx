'use client'

import {
  StatusPage,
  StatusPageAction,
  StatusPageLink,
} from '@/components/StatusPage'
import { useLogBoundaryError } from '@/hooks/use-log-boundary-error'

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useLogBoundaryError(error)

  return (
    <StatusPage
      title='Something went wrong'
      actions={
        <>
          <StatusPageAction onClick={retry}>Try again</StatusPageAction>
          <StatusPageLink href='/'>Go home</StatusPageLink>
        </>
      }
    />
  )
}
