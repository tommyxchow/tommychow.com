import { motion, Transition } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import {
  FaEnvelope,
  FaFileAlt,
  FaGithub,
  FaLightbulb,
  FaLinkedin,
  FaUser,
} from 'react-icons/fa';
import { email, githubLink, linkedInLink } from '../constants';
import LinkTable, { LinkInfo } from './link-table';

const Landing = () => {
  const links: LinkInfo[] = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      href: `mailto:${email}`,
      external: true,
    },
    {
      icon: <FaGithub />,
      title: 'GitHub',
      href: githubLink,
      external: true,
    },
    {
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      href: linkedInLink,
      external: true,
    },
    {
      icon: <FaFileAlt />,
      title: 'Resume',
      href: '/resume.pdf',
      external: true,
    },
  ];

  const contents: LinkInfo[] = [
    {
      icon: <FaLightbulb />,
      title: 'Projects',
      href: '#projects',
      external: false,
    },
    {
      icon: <FaUser />,
      title: 'About Me',
      href: '#about',
      external: false,
    },
  ];

  const transition: Transition = {
    delay: 0.5,
    type: 'spring',
  };

  return (
    <div className='mb-52 flex w-full justify-center'>
      <motion.div
        id='landing'
        className='flex min-h-screen w-fit items-center justify-center p-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
      >
        <div className='grid w-full grid-cols-2 gap-y-4 sm:grid-cols-4'>
          <motion.div
            className='relative col-span-full h-24 w-24 shrink-0 self-center overflow-hidden rounded-full sm:col-span-1 sm:justify-self-center md:h-28 md:w-28 lg:h-32 lg:w-32 xl:h-40 xl:w-40'
            initial={{ y: '-50' }}
            animate={{ y: 0 }}
            transition={transition}
          >
            <Image
              priority
              src='/me.jpeg'
              alt='Me'
              layout='fill'
              quality={100}
            />
          </motion.div>

          <motion.h1
            className='col-span-full self-start text-3xl sm:col-start-2 sm:self-center sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
            initial={{ y: '-50' }}
            animate={{ y: 0 }}
            transition={transition}
          >
            Hi! I&apos;m <span className='font-extrabold'>Tommy</span>, a
            <br />
            <span className='font-extrabold text-cyan-400'>Software</span>{' '}
            <span className='font-extrabold text-orange-400'>Developer</span>
          </motion.h1>

          <motion.p
            className='col-span-full mb-8 max-w-sm text-sm opacity-90 sm:col-start-2 md:max-w-lg md:text-base lg:max-w-xl lg:text-lg xl:max-w-2xl'
            initial={{ y: '-50' }}
            animate={{ y: 0 }}
            transition={transition}
          >
            Welcome to my website! I&apos;m a recent computer science graduate
            from the University at Buffalo and am looking for a job either
            remote or in the NYC area.
          </motion.p>

          <motion.div
            className='col-span-full space-y-10 sm:col-start-2'
            initial={{ y: '50' }}
            animate={{ y: 0 }}
            transition={transition}
          >
            <LinkTable header='Links' links={links} />

            <LinkTable header='Table of Contents' links={contents} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;