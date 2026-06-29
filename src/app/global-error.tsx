'use client'

import { StatusPage } from '@/components/StatusPage'
import { Button } from '@/components/ui/button'
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
        <main className='grid min-h-dvh grow'>
          <StatusPage
            eyebrow='Critical error'
            title='Something went wrong'
            message='A critical error occurred. Reload the page to continue.'
            actions={
              <Button variant='outline' onClick={reset}>
                Try again
              </Button>
            }
            hint='If the problem persists, clear your cache and reload.'
          />
        </main>
      </body>
    </html>
  )
}
