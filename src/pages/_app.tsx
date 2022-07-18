import { AnimatePresence, motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import Footer from '../components/footer';
import NavBar from '../components/navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div className='flex h-full flex-col'>
      <NavBar />

      <div className='flex-grow'>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className='h-full'
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

export default MyApp;
