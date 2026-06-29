'use client'

import { StatusPage, StatusPageAction } from '@/components/StatusPage'
import { useLogBoundaryError } from '@/hooks/use-log-boundary-error'
import { fontMono, fontSans } from '@/lib/fonts'
import { twJoin } from 'tailwind-merge'
import './globals.css'

/**
 * Catches errors thrown in the root layout itself. It replaces the whole
 * document, so it must render its own <html>/<body> and import globals.css
 * directly instead of inheriting from layout.tsx.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useLogBoundaryError(error)

  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <body
        className={twJoin(
          'relative min-h-dvh bg-background font-sans text-foreground underline-offset-4 selection:bg-foreground selection:text-background',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <main className='grid min-h-dvh grow place-items-center'>
          <StatusPage
            title='Something went wrong'
            actions={
              <StatusPageAction onClick={reset}>Try again</StatusPageAction>
            }
          />
        </main>
      </body>
    </html>
  )
}
