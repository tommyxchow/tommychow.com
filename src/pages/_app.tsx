import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/jetbrains-mono';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ThemeProvider attribute='class' disableTransitionOnChange>
        <div className='flex flex-col items-center'>
          <Header />

          <NavBar />

          <div className='flex min-h-screen w-full max-w-lg flex-col sm:gap-8'>
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
    </>
  );
}

export default MyApp;
