import type { NextPage } from 'next';
import About from '../components/about';
import Intro from '../components/intro';
import Layout from '../components/layout';
import Projects from '../components/projects';
import Skills from '../components/skills';

const Home: NextPage = () => {
  return (
    <Layout description="Tommy Chow's Personal Website">
      <Intro />
      <Skills />
      <Projects />
      <About />
    </Layout>
  );
};

export default Home;
