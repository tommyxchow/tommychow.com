import Layout from '../components/Layout';

const Blog = () => {
  return (
    <Layout title='Blog | Tommy Chow' description={"Tommy Chow's blog."}>
      <h1 className='text-2xl font-bold'>Blog</h1>

      <p>
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
