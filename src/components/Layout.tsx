import Head from 'next/head';
import React from 'react';

const Layout = ({ title, description, header, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <main className='flex flex-col gap-16 px-4 py-16 sm:gap-32 sm:py-32 md:px-0'>
        {header && <h1 className='text-2xl font-medium'>{header}</h1>}

        {children}
      </main>
    </>
  );
};

interface LayoutProps {
  title: string;
  description: string;
  header?: string;
  children: React.ReactNode;
}

export default Layout;
