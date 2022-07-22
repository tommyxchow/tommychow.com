import Section from '../components/HomeSection';
import Layout from '../components/Layout';

const Blog = () => {
  return (
    <Layout title='Blog | Tommy Chow' description={"Tommy Chow's blog."}>
      <Section header='Blog'>
        <p>
          I don&apos;t write out my thoughts much, but when I do I&apos;ll post
          them here.
          <br />
          <br />
          This place is empty for now, but I promise there will be something
          soon!
        </p>
      </Section>
    </Layout>
  );
};

export default Blog;
