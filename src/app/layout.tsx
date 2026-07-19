import { Providers } from '@/components/providers'
import { BASE_URL } from '@/lib/constants'
import { fontMono, fontSans } from '@/lib/fonts'
import { type Metadata, type Viewport } from 'next'
import { twJoin } from 'tailwind-merge'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Tommy Chow',
  description: 'Mobile & web engineer.',
  openGraph: {
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  themeColor: '#09090b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={twJoin(
          'relative min-h-dvh bg-transparent font-sans text-foreground underline-offset-4 selection:bg-foreground selection:text-background',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
