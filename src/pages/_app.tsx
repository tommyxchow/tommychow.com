import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Figtree } from 'next/font/google';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';

const defaultFont = Figtree({
  subsets: ['latin'],
  variable: '--font-default',
});

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div className={`${defaultFont.variable} font-sans`}>
      <ThemeProvider attribute='class' disableTransitionOnChange>
        <div className='m-auto flex min-h-screen max-w-screen-sm flex-col px-4 sm:px-0'>
          <Header />

          <div className='mt-8 grow flex-col sm:mt-16 sm:gap-8'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={router.route}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </div>

          <Footer />
        </div>
      </ThemeProvider>

      <Analytics />
    </div>
  );
}

export default MyApp;
