import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import Footer from '../components/footer';
import NavBar from '../components/navbar';
import { email, githubLink, linkedInLink } from '../constants';
import '../styles/globals.css';
import { LinkInfo } from '../types';

function MyApp({ Component, pageProps, router }: AppProps) {
  const links: LinkInfo[] = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      href: `mailto:${email}`,
    },
    {
      icon: <FaGithub />,
      title: 'GitHub',
      href: githubLink,
    },
    {
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      href: linkedInLink,
    },
    {
      icon: <FaFileAlt />,
      title: 'Resume',
      href: '/resume.pdf',
    },
  ];

  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <div className='flex min-h-screen flex-col'>
        <div className='m-auto flex w-full max-w-screen-2xl flex-grow flex-col'>
          <NavBar links={links} />
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

        <Footer links={links} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
