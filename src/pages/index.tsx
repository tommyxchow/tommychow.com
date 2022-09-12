import Image from 'next/image';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import { links } from '../data/links';

const Home = () => {
  return (
    <Layout
      title='Tommy Chow | Software Developer'
      description='Software developer and recent computer science graduate based in New York City.'
    >
      <div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-full shadow-md'>
        <Image
          priority
          src='/photos/me.jpg'
          alt='Portrait photo of me wearing my graduation gown with a flowery backdrop.'
          layout='fill'
        />
      </div>

      <ul className='grid grid-cols-2 justify-between gap-8 sm:flex'>
        {links.slice(0, 4).map((link) => (
          <li key={link.title}>
            <a
              className='link flex w-fit items-center gap-2 opacity-60 hover:-translate-y-1 hover:opacity-100'
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

      <p>
        I&apos;m Tommy—a software developer, decent gamer, and enjoyer of
        unhealthy foods. I focus on building beautiful, responsive, and
        performant experiences for mobile and web.
      </p>

      <p>
        Currently, I&apos;m developing and maintaining{' '}
        <ExternalLink href='https://www.frostyapp.io/'>Frosty</ExternalLink>.
        I&apos;m also looking for a full-time software engineering role.
      </p>
    </Layout>
  );
};

export default Home;
