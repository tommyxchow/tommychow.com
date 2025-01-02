import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Providers } from '@/components/Providers';
import '@code-hike/mdx/dist/index.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { twJoin } from 'tailwind-merge';
import './globals.css';

const fontSans = localFont({
  src: './OverusedGrotesk-VF.woff2',
  variable: '--font-sans',
});
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tommychow.com'),
  title: 'Tommy Chow',
  description: 'Mobile & web engineer.',
  openGraph: {
    url: 'https://www.tommychow.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={twJoin(
          'mx-auto flex min-h-dvh max-w-screen-sm flex-col bg-zinc-100 px-4 pb-8 font-sans text-zinc-900 underline-offset-4 selection:bg-zinc-900 selection:text-zinc-100 md:px-0 dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-zinc-100 dark:selection:text-zinc-900',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Providers>
          <Header />

          <main className='grow'>
            <article>{children}</article>
          </main>

          <Footer />
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
