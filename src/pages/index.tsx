import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { links } from '../data/links';

const Home = () => {
  return (
    <Layout title='Tommy Chow' description='You found me!'>
      <Section header='Hello'>
        <div className='flex flex-col gap-4'>
          <p>
            I&apos;m Tommy, a software engineer based in NYC. I enjoy building
            performant, usable, and beautiful experiences for mobile and web.
          </p>

          <p>
            During 2021-2022, I created{' '}
            <ExternalLink href='https://www.frostyapp.io/'>Frosty</ExternalLink>
            , an open-source mobile app for Twitch named after my childhood dog.
            It now has 100,000+ downloads and 30,000+ monthly active users.
          </p>

          <p>
            In my off time, I play PC games with friends, make random mobile and
            web apps, and bounce around Reddit, Twitter, and Twitch for new
            ideas and fun.
          </p>
        </div>
      </Section>

      <Section header='Now'>
        <div className='flex flex-col gap-4'>
          <p>
            Software engineering at{' '}
            <ExternalLink href='https://wildr.com/'>Wildr</ExternalLink>.
          </p>

          <p></p>
        </div>
      </Section>

      <Section header='More'>
        <ul className='flex flex-wrap gap-8'>
          {links.slice(0, 4).map((link) => (
            <li key={link.title}>
              <a
                className='link flex w-fit items-center gap-2 hover:-translate-y-1'
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
      </Section>
    </Layout>
  );
};

export default Home;
