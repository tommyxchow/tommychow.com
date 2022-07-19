import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Footer from '../components/footer';
import NavBar from '../components/navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <div className='flex min-h-screen flex-col'>
        <div className='flex flex-grow flex-col'>
          <NavBar />
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
