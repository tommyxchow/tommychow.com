import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import Footer from '../components/footer';
import NavBar from '../components/navbar';
import { email, githubLink, linkedInLink } from '../constants';
import '../styles/globals.css';
import { LinkInfo, ProjectInfo } from '../types';

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

  const projects: ProjectInfo[] = [
    {
      name: 'Frosty for Twitch',
      date: '2022-06-22',
      description:
        'Twitch.tv client for iOS and Android with BTTV, FFZ, and 7TV support.',
      imageLink: '/projects/frosty-app.png',
      projectLink: 'https://github.com/tommyxchow/frosty',
    },
    {
      name: 'Frosty Website',
      date: '2022-06-22',
      description: 'Marketing website for the Frosty app.',
      imageLink: '/projects/frosty-website.png',
      projectLink: 'https://github.com/tommyxchow/frostyapp.io',
    },
    {
      name: 'Study Seeker',
      date: '2022-05-06',
      description:
        'Responsive social media platform aimed to help students find the best match for a potential study partner.',
      imageLink: '/projects/study-seeker.png',
      projectLink: 'https://github.com/tommyxchow/study-seeker',
    },
    {
      name: 'Zeal',
      date: '2021-12-04',
      description:
        'Social web app that streamlines creating, exploring, and joining events.',
      imageLink: '/projects/zeal.png',
      projectLink: 'https://github.com/tommyxchow/zeal',
    },
    {
      name: 'The Gallery',
      date: '2021-05-18',
      description:
        'Image sharing web app developed to learn internet protocols and full-stack web development.',
      imageLink: '/projects/gallery.jpg',
      projectLink: 'https://github.com/tommyxchow/the-gallery',
    },
    {
      name: 'Stock Chart Visualizer',
      date: '2019-05-18',
      description:
        'My first web app. Allows entering any stock ticker to see the relevant price history and volume charts.',
      imageLink: '/projects/stonks.jpg',
      projectLink: 'https://github.com/tommyxchow/stock-chart-visualizer',
    },
  ];

  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <div className='flex min-h-screen flex-col'>
        <div className='m-auto flex w-full max-w-screen-2xl flex-grow flex-col'>
          <NavBar />
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <Component {...pageProps} links={links} projects={projects} />
            </motion.div>
          </AnimatePresence>
        </div>

        <Footer links={links} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
