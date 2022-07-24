import Head from 'next/head';
import React from 'react';

const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={description} />
      </Head>

      <main className='flex flex-col gap-16 px-4 py-16 sm:gap-32 sm:px-8 sm:py-32'>
        {children}
      </main>
    </>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default Layout;
