import Head from 'next/head';
import React from 'react';
import NavBar from './navbar';

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Tommy Chow</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={props.description} />
      </Head>

      <NavBar />

      <main className='m-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg'>
        {props.children}
      </main>

      <footer className='flex flex-col items-center gap-4 pb-8'>
        <p className='text-sm font-light'>Thanks for stopping by!</p>
        <p className='text-xs font-light opacity-50'>
          Built with{' '}
          <a
            className='hover:underline'
            href='https://nextjs.org'
            target='_blank'
            rel='noreferrer'
          >
            Next.js
          </a>
          ,{' '}
          <a
            className='hover:underline'
            href='https://tailwindcss.com'
            target='_blank'
            rel='noreferrer'
          >
            Tailwind CSS
          </a>
          , and{' '}
          <a
            className='hover:underline'
            href='https://www.framer.com/motion'
            target='_blank'
            rel='noreferrer'
          >
            Framer Motion
          </a>
          .
        </p>
      </footer>
    </>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  description: string;
}

export default Layout;
