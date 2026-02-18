import { Header } from '@/components/Header'
import { PixelatedBackground } from '@/components/PixelatedBackground'
import { Providers } from '@/components/Providers'
import { type Metadata } from 'next'
import localFont from 'next/font/local'
import { twJoin } from 'tailwind-merge'
import './globals.css'

const fontSans = localFont({
  src: './UncutSans-Variable.woff2',
  variable: '--font-sans',
})
const fontMono = localFont({
  src: './DepartureMono-Regular.woff2',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tommychow.com'),
  title: 'Tommy Chow',
  description: 'Mobile & web engineer.',
  openGraph: {
    url: 'https://www.tommychow.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body
        className={twJoin(
          'bg-background/80 text-foreground selection:bg-foreground selection:text-background relative min-h-dvh font-sans underline-offset-4',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Providers>
          <PixelatedBackground />
          <Header />
          <main className='grid min-h-dvh grow'>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
