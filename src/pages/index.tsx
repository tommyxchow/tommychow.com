import Link from 'next/link';
import Section from '../components/Section';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { LinkInfo, ProjectInfo } from '../types';
import Image from 'next/image';

const Home = ({ links, projects }: HomeProps) => {
  return (
    <Layout
      title='Tommy Chow | Software Developer'
      description='Software developer and recent computer science graduate based in New York City.'
    >
      <h1 className='text-2xl font-bold'>Welcome!</h1>

      <div className=' grid gap-8 sm:grid-cols-3'>
        <div className='relative aspect-square h-32 overflow-hidden rounded-full shadow-md'>
          <Image
            priority
            src='/photos/me.jpg'
            alt='Portrait photo of me wearing my graduation gown with a flowery backdrop.'
            layout='fill'
          />
        </div>

        <p className='col-span-2'>
          I&apos;m Tommy, a software developer and recent computer science
          graduate based in New York City. I&apos;m always eager to learn,
          collaborate, and make meaningful contributions to the world.
          <br />
          <br />
          I&apos;m a full-stack developer but lean more towards the front-end. I
          enjoy creating impactful mobile and web experiences with declarative
          frameworks including Flutter, React, and SwiftUI.
        </p>
      </div>

      <Section header='Status'>
        I&apos;m seeking a full-time position in software engineering. I&apos;m
        open to all roles but my preference is frontend, mobile, and full-stack
        either remote or in New York City.
      </Section>

      <Section header='Featured'>
        <ul className='mb-4 grid gap-4'>
          {projects.slice(0, 2).map((projectInfo) => (
            <ProjectCard key={projectInfo.name} {...projectInfo} />
          ))}
        </ul>

        <div className='flex flex-col items-end gap-2 self-end'>
          <Link href='/skills'>
            <a className='link transition hover:translate-x-2'>
              Explore my skills -&gt;
            </a>
          </Link>

          <Link href='/projects'>
            <a className='link transition hover:translate-x-2'>
              See more projects -&gt;
            </a>
          </Link>
        </div>
      </Section>

      <Section header='More'>
        <div className='flex justify-between gap-8'>
          <ul className='flex flex-col gap-2'>
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

          <div className='flex flex-col items-end justify-end gap-2 text-end'>
            <Link href='/blog'>
              <a className='link transition hover:translate-x-2'>
                Read my blog -&gt;
              </a>
            </Link>

            <Link href='/about'>
              <a className='link transition hover:translate-x-2'>
                Learn more about me -&gt;
              </a>
            </Link>
          </div>
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
