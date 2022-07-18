import type { NextPage } from 'next';
import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout title='Tommy Chow' description={"Tommy Chow's Personal Website"}>
      <div className='flex h-full flex-col'>
        <p className='mb-4'>
          Welcome to my website! Here&apos;s a quick rundown of who I am and
          what I do:
        </p>
        <ul className='mb-4 list-disc space-y-2 px-4'>
          <li>
            I&apos;m a software developer and recent computer science graduate
            based in New York City.
          </li>
          <li>
            I&apos;m always eager to learn, collaborate, and make meaningful
            contributions to the world.
          </li>
          <li>
            I enjoy creating impactful mobile and web experiences with Flutter
            and React.
          </li>
          <li>
            My most notable work is Frosty, a mobile Twitch client for iOS and
            Android (10,000+ downloads).
          </li>
        </ul>
        <p>
          Currently, I&apos;m seeking full-time position in software
          engineering. I&apos;m open to all roles, but my preference is
          frontend, full-stack, and mobile development either remote or in New
          York City.
        </p>
      </div>
    </Layout>
  );
};

export default Home;
