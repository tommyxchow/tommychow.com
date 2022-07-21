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

      <main className='flex h-full flex-col px-4 pb-8 sm:px-8 sm:pb-16 lg:px-16 lg:pb-32'>
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
