import { BlackwallBackground } from '@/components/blackwall-background'
import { Header } from '@/components/Header'
import { BASE_URL } from '@/lib/constants'
import { fontMono, fontSans } from '@/lib/fonts'
import { twJoin } from 'cn'
import { type Metadata, type Viewport } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Tommy Chow',
  description: 'Software engineer at Tesla.',
  openGraph: {
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  // Matches the black around the wall, so phone browser bars blend in.
  themeColor: '#050304',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className='dark'
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <body
        className={twJoin(
          'relative min-h-dvh font-sans text-foreground underline-offset-4 selection:bg-foreground selection:text-background',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <NuqsAdapter>
          <BlackwallBackground />
          <Header />
          <main className='grid min-h-dvh grow place-items-center'>
            {children}
          </main>
        </NuqsAdapter>
      </body>
    </html>
  )
}
