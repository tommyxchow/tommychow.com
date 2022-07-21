import Layout from '../components/Layout';

const Blog = () => {
  return (
    <Layout title='Blog | Tommy Chow' description={"Tommy Chow's blog."}>
      <p className='md:text-lg lg:text-2xl'>
        I don&apos;t write out my thoughts much, but when I do I&apos;ll post
        them here.
        <br />
        <br />
        This place is empty for now, but I promise there will be something soon!
      </p>
    </Layout>
  );
};

export default Blog;
