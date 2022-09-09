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
      <Section header=''>
        <div className='flex flex-col gap-8'>
          <h1 className='text-2xl font-medium'>
            I’m Tommy, a software developer focused on building beautiful,
            responsive, and performant experiences.
          </h1>

          <ul className='flex flex-wrap gap-8'>
            {links.slice(0, 4).map((link) => (
              <li key={link.title}>
                <a
                  className='link flex items-center gap-2 opacity-60 hover:-translate-y-1 hover:opacity-100'
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
      </Section>

      <Section header='Now'>
        <ul className='list-disc space-y-4 pl-6'>
          <li>
            Building and maintaining{' '}
            <ExternalLink href='https://www.frostyapp.io/'>Frosty</ExternalLink>
            .
          </li>
          <li>
            Improving my experience with web development through React and
            Next.js.
          </li>
          <li>
            Seeking a full-time position in software engineering (I&apos;m open
            to all roles but my preference is frontend, mobile, and fullstack
            either remote or in NYC).
          </li>
        </ul>
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
