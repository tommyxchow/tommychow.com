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

      <main className='grid h-full p-4 lg:grid-cols-4 lg:gap-20 lg:p-8'>
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
