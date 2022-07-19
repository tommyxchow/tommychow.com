import Layout from '../components/layout';

const Blog = () => {
  return (
    <Layout title='Blog | Tommy Chow' description={"Tommy Chow's blog."}>
      <p className='font-medium md:text-lg'>
        Here would contain a few of my thoughts if I had any!
      </p>
    </Layout>
  );
};

export default Blog;
