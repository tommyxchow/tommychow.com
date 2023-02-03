import Head from 'next/head';

const Layout = ({ title, description, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <main className='flex flex-col gap-8 py-4 px-4 sm:px-0'>{children}</main>
    </>
  );
};

interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default Layout;
