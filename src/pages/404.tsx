import Layout from '../components/Layout';
import Section from '../components/Section';

const Custom404 = () => {
  return (
    <Layout title='404 | Tommy Chow' description='Page not found.'>
      <Section header='404'>
        <p className='text-neutral-600 dark:text-neutral-400'>
          It looks like this page doesn&apos;t exist...
        </p>
      </Section>
    </Layout>
  );
};

export default Custom404;
