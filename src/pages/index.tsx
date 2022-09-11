import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import Section from '../components/Section';
import { LinkInfo, ProjectInfo } from '../types';

const Home = ({ links, projects }: HomeProps) => {
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

      <p>
        I&apos;m Tommy, a software developer trying to build beautiful,
        responsive, and performant experiences.
      </p>

      <p>
        Currently, I&apos;m building and maintaining{' '}
        <ExternalLink href='https://www.frostyapp.io/'>Frosty</ExternalLink>.
        I&apos;m also looking for a full-time software engineering role.
      </p>

      <ul className='grid grid-cols-2 gap-8 sm:flex'>
        {links.slice(0, 4).map((link) => (
          <li key={link.title}>
            <a
              className='flex items-center gap-2 transition hover:opacity-100 sm:opacity-60'
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
    </Layout>
  );
};

interface HomeProps {
  links: LinkInfo[];
  projects: ProjectInfo[];
}

export default Home;
