import Layout from '../components/layout';

const Blog = () => {
  return (
    <Layout title='Blog | Tommy Chow' description={"Tommy Chow's blog."}>
      <p className='md:text-lg lg:col-span-2 lg:text-2xl'>
        Here would contain a few of my thoughts if I had any!
      </p>
    </Layout>
  );
};

export default Blog;
