import React from 'react';
import Image from 'next/image';
import {
  FaEnvelope,
  FaFileAlt,
  FaGithub,
  FaLinkedin,
  FaUser,
  FaLightbulb,
} from 'react-icons/fa';
import LinkTable, { LinkInfo } from './link-table';
import { email, githubLink, linkedInLink } from '../constants';

const Landing = () => {
  const contents: LinkInfo[] = [
    {
      icon: <FaUser />,
      title: 'About Me',
      href: '#about',
      external: false,
    },
    {
      icon: <FaLightbulb />,
      title: 'Projects',
      href: '#projects',
      external: false,
    },
  ];

  const links: LinkInfo[] = [
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
      icon: <FaEnvelope />,
      title: 'Email',
      href: `mailto:${email}`,
      external: true,
    },
    {
      icon: <FaFileAlt />,
      title: 'Resume',
      href: '/resume.pdf',
      external: true,
    },
  ];

  return (
    <div
      id='landing'
      className='flex min-h-screen items-center justify-center p-8'
    >
      <div className='grid w-full grid-cols-2 gap-y-4 sm:grid-cols-4'>
        <div className='relative col-span-full h-24 w-24 shrink-0 self-center overflow-hidden rounded-full sm:col-span-1 sm:justify-self-center md:h-28 md:w-28 lg:h-32 lg:w-32 xl:h-40 xl:w-40'>
          <Image priority src='/me.jpeg' alt='Me' layout='fill' quality={100} />
        </div>

        <h1 className='col-span-full self-start text-3xl sm:col-start-2 sm:self-center sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
          Hi! I&apos;m <span className='font-extrabold'>Tommy</span>, a
          <br />
          <span className='font-extrabold text-cyan-400'>Software</span>{' '}
          <span className='font-extrabold text-orange-400'>Developer</span>
        </h1>

        <p className='col-span-full mb-8 max-w-sm text-sm opacity-90 sm:col-start-2 md:max-w-md md:text-base lg:max-w-xl lg:text-lg xl:max-w-2xl'>
          Welcome to my website! Currently, I&apos;m a senior computer science
          student at University at Buffalo and am looking for a job either
          remote or in the NYC area.
        </p>

        <div className='col-span-full row-start-5 sm:col-span-1 sm:col-start-2 sm:row-start-3'>
          <LinkTable header='Table of Contents' links={contents} />
        </div>

        <div className='col-span-full mb-8 sm:col-span-1 sm:col-start-4 sm:mb-0'>
          <LinkTable header='Links' links={links} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
