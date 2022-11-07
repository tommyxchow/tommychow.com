import Layout from '../components/Layout';

const Custom404 = () => {
  return (
    <Layout title='404 | Tommy Chow' description='Page not found.'>
      <article className='flex flex-col items-center justify-center gap-4'>
        <h1 className='font-mono text-2xl'>404</h1>
        <p className='text-neutral-600 dark:text-neutral-400'>
          Looks like this page doesn&apos;t exist...
        </p>
      </article>
    </Layout>
  );
};

export default Custom404;
