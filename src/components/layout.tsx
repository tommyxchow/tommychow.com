import Head from 'next/head';
import React from 'react';
import NavBar from './navbar';

const Layout = (props: LayoutProps) => {
  return (
    <div className='bg-black'>
      <Head>
        <title>Tommy Chow</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={props.description} />
        <link rel='icon' href='/logo.svg' />
      </Head>

      {/* <NavBar /> */}

      <main className='flex min-h-screen flex-col p-8'>{props.children}</main>

      <footer className='flex flex-col items-center gap-4 pb-8'>
        <p className='text-sm font-light opacity-80'>Thanks for stopping by!</p>
        <p className='text-xs font-light opacity-50'>
          Built with Next.js and Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  description: string;
}

export default Layout;
