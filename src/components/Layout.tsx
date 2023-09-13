import Head from 'next/head';

const Layout = ({ title, description, headline, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta
          name='description'
          content={description ?? 'Software engineer and fried food lover'}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <main className='flex flex-col gap-8'>
        {headline && <h1 className='text-2xl font-bold'>{headline}</h1>}

        {children}
      </main>
    </>
  );
};

interface LayoutProps {
  title: string;
  description?: string;
  headline?: string;
  children: React.ReactNode;
}

export default Layout;
