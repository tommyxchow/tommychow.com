import type { NextPage } from 'next';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import Layout from '../components/layout';

const Home: NextPage = () => {
  const links = ['Email', 'Github', 'LinkedIn', 'Resume'];

  return (
    <Layout title='Tommy Chow' description={"Tommy Chow's Personal Website"}>
      <div className='flex flex-col gap-20'>
        <p className='text-sm text-gray-800'>
          Software developer and recent computer science graduate based in New
          York City. Always eager to learn, collaborate, and make meaningful
          contributions to the world. Enjoys creating impactful mobile and web
          experiences with Flutter and React.
          <br />
          <br />
          Currently seeking full-time position in software engineering. Open to
          all roles, but prefers frontend, full-stack, and mobile development
          either remote or in New York City.
        </p>
      </div>
    </Layout>
  );
};

export default Home;
