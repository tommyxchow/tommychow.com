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
      <div className='grid gap-8 sm:grid-cols-4 sm:gap-0'>
        <div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-full shadow-md'>
          <Image
            priority
            src='/photos/me.jpg'
            alt='Portrait photo of me wearing my graduation gown with a flowery backdrop.'
            layout='fill'
          />
        </div>

        <p className='col-span-3'>
          Welcome! I&apos;m Tommy, a software developer and recent computer
          science graduate based in NYC.
          <br />
          <br />I focus on the frontend, but occasionally dabble in backend and
          devops. I enjoy making mobile and web apps with frameworks like
          Flutter, Next.js, and SwiftUI.
        </p>
      </div>

      <Section header='Links'>
        <ul className='flex flex-wrap gap-4 sm:justify-between'>
          {links.slice(0, 4).map((link) => (
            <li key={link.title}>
              <a
                className='link flex items-center gap-2 hover:-translate-y-1'
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

      <Section header='Now'>
        <p>
          Building and maintaining{' '}
          <ExternalLink href='https://www.frostyapp.io/'>Frosty</ExternalLink>.
          <br />
          <br />
          Improving my experience with web development through React and
          Next.js.
          <br />
          <br />
          Seeking a full-time position in software engineering (I&apos;m open to
          all roles but my preference is frontend, mobile, and fullstack either
          remote or in NYC).
        </p>
      </Section>

      <Section header='Featured'>
        <div className='flex flex-col gap-2'>
          <ul className='mb-4 grid gap-4'>
            {projects.slice(0, 2).map((projectInfo) => (
              <li key={projectInfo.name}>
                <ProjectCard {...projectInfo} />
              </li>
            ))}
          </ul>

          <Link href='/projects'>
            <a className='link flex w-fit items-center gap-1 self-end transition hover:translate-x-2'>
              More projects <HiArrowRight />
            </a>
          </Link>
        </div>
      </Section>
    </Layout>
  );
};

interface HomeProps {
  links: LinkInfo[];
  projects: ProjectInfo[];
}

export default Home;
