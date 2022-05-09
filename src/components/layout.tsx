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

      <main className='flex flex-col'>{props.children}</main>
    </>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  description: string;
}

export default Layout;
