import profilePicture from '../../public/assets/images/me.jpg';
import CustomImage from '../components/CustomImage';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { currentJob, links } from '../data/links';

const Home = () => {
  return (
    <Layout title='Tommy Chow' description='You found me!'>
      <div className='flex flex-col gap-8'>
        <div className='flex items-center gap-2'>
          <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-md'>
            <CustomImage
              priority
              src={profilePicture}
              alt='Portrait photo of me wearing my graduation gown with a flowery backdrop.'
            />
          </div>
          <hgroup>
            <h1 className='text-xl font-bold'>Tommy Chow</h1>
            <p className='font-medium text-neutral-600 dark:text-neutral-400'>
              Software Engineer @{' '}
              <a
                className='underline decoration-neutral-600 underline-offset-4 dark:decoration-neutral-400'
                href={currentJob}
                target='_blank'
                rel='noreferrer'
              >
                Wildr
              </a>
            </p>
          </hgroup>
        </div>

        <ul className='flex flex-wrap gap-2'>
          {links.slice(0, 4).map((link) => (
            <li key={link.title}>
              <a
                className='flex w-fit items-center gap-2 rounded-full bg-neutral-200 px-4 py-2 text-sm font-medium shadow transition hover:opacity-60 active:scale-95 active:shadow-none dark:bg-neutral-900'
                href={link.href}
                target='_blank'
                rel='noreferrer'
              >
                {link.icon}
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Section>
        <div className='flex flex-col gap-4 sm:mt-8'>
          <p>
            Hey! I&apos;m Tommy, a software engineer based in NYC. I enjoy
            building performant, usable, and beautiful experiences for mobile
            and web.
          </p>

          <p>
            During 2021-2022, I created{' '}
            <ExternalLink href='https://www.frostyapp.io/'>Frosty</ExternalLink>
            , an open-source mobile app for Twitch named after my childhood dog.
            It now has 200,000+ downloads and 50,000+ monthly active users.
          </p>

          <p>
            In my off time, I play PC games with friends, make random mobile and
            web apps, and bounce around Reddit, Twitter, and Twitch for new
            ideas and fun.
          </p>
        </div>
      </Section>
    </Layout>
  );
};

export default Home;
