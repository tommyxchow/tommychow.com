import CustomImage from '../components/CustomImage';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { email, links } from '../data/links';

const Home = () => {
  return (
    <Layout
      title='Tommy Chow | Software Developer'
      description='Software developer and recent computer science graduate based in New York City.'
    >
      <div className='relative z-0 h-24 w-24 shrink-0 overflow-hidden rounded-full shadow-md'>
        <CustomImage
          priority
          src='/assets/images/me.jpg'
          alt='Portrait photo of me wearing my graduation gown with a flowery backdrop.'
        />
      </div>

      <ul className='grid grid-cols-2 gap-8 sm:flex'>
        {links.slice(0, 4).map((link) => (
          <li key={link.title}>
            <a
              className='link flex w-fit items-center gap-2 text-sm uppercase tracking-wider opacity-60 hover:-translate-y-1 hover:opacity-100'
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

      <Section header='Hello and welcome!'>
        <div className='flex flex-col gap-4'>
          <p>
            I&apos;m Tommy, a software developer and recent CS graduate. I
            specialize and focus on building beautiful, responsive, and
            performant experiences for mobile and web.
          </p>

          <p>
            My most successful work so far is{' '}
            <ExternalLink href='https://www.frostyapp.io/'>Frosty</ExternalLink>
            , an open-source mobile app for Twitch. The name comes from my
            childhood dog. I&apos;ve managed to get it 80,000+ downloads and
            12,000+ DAU (daily active users).
          </p>

          <p>
            In my off time, I play PC games with friends, build random mobile
            and web apps, and browse Reddit/Twitter/Twitch for new ideas and
            fun.
          </p>
        </div>
      </Section>

      <Section header='Now'>
        <div className='flex flex-col gap-4'>
          <p>
            I&apos;m actively looking for a software engineering role, so
            I&apos;m spending the majority of my time applying, studying, and
            preparing for interviews.
          </p>

          <p>
            If you&apos;re interested in working with me, please don&apos;t
            hesitate to{' '}
            <ExternalLink href={`mailto:${email}`}>contact me</ExternalLink>!
          </p>
        </div>
      </Section>
    </Layout>
  );
};

export default Home;
