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

      {/* <NavBar /> */}

      <main className='m-auto min-h-screen max-w-screen-md p-8 pt-24'>
        {props.children}
      </main>

      <footer className='flex flex-col items-center gap-4 pb-8'>
        <p className='text-sm font-light'>Thanks for stopping by!</p>
        <p className='text-xs font-light opacity-50'>
          Built with Next.js and Tailwind CSS
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
