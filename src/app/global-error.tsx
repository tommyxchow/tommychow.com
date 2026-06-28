'use client'

import { useLogBoundaryError } from '@/hooks/use-log-boundary-error'

/**
 * Catches errors thrown in the root layout itself. It replaces the whole
 * document, so it must render its own <html>/<body> and can't rely on
 * globals.css being applied — hence the inline styles.
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
    <html lang='en'>
      <body
        style={{
          display: 'flex',
          minHeight: '100dvh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ color: '#71717a', margin: 0 }}>
          A critical error occurred. Please reload the page.
        </p>
        <button
          onClick={reset}
          style={{
            cursor: 'pointer',
            borderRadius: '0.375rem',
            border: '1px solid currentColor',
            background: 'transparent',
            padding: '0.5rem 1rem',
            font: 'inherit',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
