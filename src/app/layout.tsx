import { Header } from '@/components/Header';
import { Prose } from '@/components/Prose';
import { Providers } from '@/components/Providers';
import { type Metadata } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import './globals.css';

const fontSans = Archivo({
  subsets: ['latin'],
  variable: '--font-sans',
});
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tommychow.com'),
  title: 'Tommy Chow',
  description: 'Software engineer based in NYC.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <Providers>
        <body
          className={twJoin(
            'mx-auto flex min-h-screen max-w-screen-sm flex-col bg-neutral-50 px-4 pb-8 font-sans text-neutral-900 underline-offset-4 dark:bg-neutral-950 dark:text-neutral-100 sm:px-0',
            fontSans.variable,
            fontMono.variable,
          )}
        >
          <Header />

          <div className='grow'>
            <Prose>
              <article>{children}</article>
            </Prose>
          </div>
        </body>
      </Providers>
    </html>
  );
}
