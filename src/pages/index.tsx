import type { NextPage } from 'next';
import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout
      title='Tommy Chow | Software Developer'
      description='Software developer and recent computer science graduate based in New York City.'
    >
      <p className='font-medium'>
        I&apos;m a software developer and recent computer science graduate based
        in New York City. I&apos;m always eager to learn, collaborate, and make
        meaningful contributions to the world. I enjoy creating impactful mobile
        and web experiences with Flutter and React.
        <br />
        <br />
        Currently, I&apos;m seeking a full-time position in software
        engineering. I&apos;m open to all roles but my preference is frontend,
        full-stack, and mobile development either remote or in New York City.
      </p>
    </Layout>
  );
};

export default Home;
