import type { NextPage } from 'next';
import About from '../components/about';
import Landing from '../components/landing';
import Layout from '../components/layout';
import Projects from '../components/projects';

const Home: NextPage = () => {
  return (
    <Layout description="Tommy Chow's Personal Website">
      <Landing />
      <div className='min-h-screen'></div>
      <Projects />
      <div className='min-h-screen'></div>
      <About />
    </Layout>
  );
};

export default Home;
