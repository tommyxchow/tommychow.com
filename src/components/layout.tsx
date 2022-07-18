import Head from 'next/head';
import React from 'react';
import Footer from './footer';

const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <div className='h-full'>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={description} />
      </Head>

      <main className='flex h-full flex-col p-4'>{children}</main>
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default Layout;
