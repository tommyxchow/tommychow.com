import { Header } from '@/components/Header'
import { PixelatedBackground } from '@/components/PixelatedBackground'
import { Providers } from '@/components/Providers'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { type Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { twJoin } from 'tailwind-merge'
import './globals.css'

const fontSans = localFont({
  src: './UncutSans-Variable.woff2',
  variable: '--font-sans',
})
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
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
    <html lang='en' suppressHydrationWarning>
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
          <div className='mx-auto flex min-h-dvh max-w-(--breakpoint-md) flex-col px-4 md:px-0'>
            <main className='grid grow'>{children}</main>
          </div>
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
