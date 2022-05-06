import type { NextPage } from 'next';
import Image from 'next/image';
import {
  FaEnvelope,
  FaFileAlt,
  FaGithub,
  FaLightbulb,
  FaLinkedin,
  FaUser,
  FaWalking,
} from 'react-icons/fa';
import { allBadges } from '../components/badge';
import HeaderLink, { HeaderLinkInfo } from '../components/header-link';
import Layout from '../components/layout';
import ProjectCard, { ProjectInfo } from '../components/project-card';
import ResumeSection from '../components/resume-section';
import { email, githubLink, linkedInLink } from '../constants';

const Home: NextPage = () => {
  const links: HeaderLinkInfo[] = [
    {
      icon: <FaGithub />,
      title: 'GitHub',
      href: githubLink,
    },
    {
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      href: linkedInLink,
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      href: `mailto:${email}`,
    },
    {
      icon: <FaFileAlt />,
      title: 'Resume',
      href: '/resume.pdf',
    },
  ];

  const myProjects: ProjectInfo[] = [
    {
      name: 'Frosty (Mobile App)',
      date: 'May 2022',
      description:
        'Twitch client for iOS and Android with BTTV, FFZ, and 7TV support.',
      imageLink: '/frosty-app.png',
      projectLink: 'https://github.com/tommyxchow/frosty',
      badges: [allBadges.openSource, allBadges.flutter],
      priority: true,
    },
    {
      name: 'Frosty (Website)',
      date: 'May 2022',
      description: 'Marketing website for the Frosty app.',
      imageLink: '/frosty-website.png',
      projectLink: 'https://github.com/tommyxchow/frostyapp.io',
      badges: [allBadges.nextJs, allBadges.tailwind, allBadges.typeScript],
      priority: true,
    },
  ];

  const schoolProjects: ProjectInfo[] = [
    {
      name: 'Study Seeker',
      date: 'May 2022',
      description:
        'Responsive social media platform aimed to help students find the best match for a potential study partner.',
      imageLink: '/study-seeker.jpg',
      projectLink: 'https://webdev.cse.buffalo.edu/hci/teams/commitment',
      badges: [allBadges.react, allBadges.css],
      priority: true,
    },
    {
      name: 'Zeal',
      date: 'December 2021',
      description:
        'Social web app that streamlines creating, exploring, and joining events.',
      imageLink: '/zeal.jpg',
      projectLink: 'https://github.com/Prakshal-Jain/Zeal',
      badges: [allBadges.react, allBadges.django],
      priority: true,
    },
    {
      name: 'The Gallery',
      date: 'May 2020',
      description:
        'Basic web app developed to learn the foundations of internet protocols and full-stack web development.',
      imageLink: '/gallery.jpg',
      projectLink: 'https://github.com/tommyxchow/the-gallery',
      badges: [allBadges.python, allBadges.html, allBadges.css],
    },
    {
      name: 'Stock Chart Visualizer',
      date: 'May 2019',
      description:
        'Simple web app that allows entering any stock ticker to see the relevant price history and volume charts.',
      imageLink: '/stonks.jpg',
      projectLink: 'https://github.com/tommyxchow/stock-chart-visualizer',
      badges: [allBadges.python, allBadges.html, allBadges.css],
    },
  ];

  return (
    <Layout description="Tommy Chow's Personal Website">
      <div className='mb-8'>
        <div className='mb-4 flex flex-col items-center gap-6 md:flex-row'>
          <div className='relative h-36 w-36 shrink-0 overflow-hidden rounded-full md:h-40 md:w-40'>
            <Image
              priority
              src='/me.jpeg'
              alt='Me'
              layout='fill'
              quality={100}
            />
          </div>

          <div className='flex flex-col items-center gap-4 md:mt-8 md:items-start'>
            <h1 className='text-center text-3xl md:text-left md:text-5xl'>
              Hi! I&apos;m <span className='font-extrabold'>Tommy</span>, a
              <br />
              <span className='font-extrabold'>
                <span className='text-cyan-400'>Software</span>{' '}
                <span className='text-orange-400'>Developer</span>
              </span>
            </h1>
            <div className='mb-8 flex gap-4 text-xs uppercase tracking-wider md:text-sm'>
              {links.map((link) => (
                <HeaderLink key={link.title} {...link} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ResumeSection icon={<FaWalking />} heading="What I'm Doing Now">
        <p className='md:text-lg'>
          Currently, I&apos;m a senior computer science student at the
          University at Buffalo and am looking for a job either remote or in the
          NYC area. If you&apos;d like to know more about my professional
          experience, please check out my resume at the link above!
        </p>
      </ResumeSection>

      <ResumeSection icon={<FaUser />} heading='About Me'>
        <p className='md:text-lg'>
          I&apos;m a passionate mobile and web developer who enjoys working with
          declarative front-end frameworks including Flutter, React, and
          SwiftUI. For more insight into my development experience, check out my
          GitHub profile at the link above!
          <br />
          <br />
          Beyond the software development world, I was born and raised in
          Queens, NY, where I discovered my favorite foods such as sushi, fried
          chicken, halal, and Korean BBQ. When I&apos;m not busy eating or
          programming, I&apos;ll probably be playing video games online with
          friends and watching live streams on Twitch.
          <br />
          <br />A somewhat unusual hobby that I have is building and customizing
          mechanical keyboards (check out{' '}
          <a
            className='hover:underline'
            href={'https://www.reddit.com/r/MechanicalKeyboards'}
            target='_blank'
            rel='noreferrer'
          >
            /r/MechanicalKeyboards on Reddit
          </a>{' '}
          if you&apos;re curious!). My current keyboard is the{' '}
          <a
            className='hover:underline'
            href='https://rama.works/m65-b'
            target='_blank'
            rel='noreferrer'
          >
            RAMA WORKS M65-B
          </a>{' '}
          with{' '}
          <a
            className='hover:underline'
            href='https://drop.com/buy/drop-oblotzky-gmk-oblivion-v2-custom-keycap-set'
            target='_blank'
            rel='noreferrer'
          >
            GMK Oblivion V2 keycaps
          </a>{' '}
          and{' '}
          <a
            className='hover:underline'
            href='https://thekey.company/products/c3-tangerine-switches-r2'
            target='_blank'
            rel='noreferrer'
          >
            Tangerine switches
          </a>
          .
        </p>
      </ResumeSection>

      <ResumeSection icon={<FaLightbulb />} heading='My Projects'>
        <p className='mb-8 md:text-lg'>
          Below are some of the projects that I&apos;ve worked on which
          contributed greatly to my growth as a developer. I was able to gain
          hands-on experience with popular frameworks, design, wireframing,
          deployment, CI/CD, common Agile practices, teamwork, leadership, and
          more.
        </p>

        <h3 className='font-medium uppercase tracking-wider'>Personal</h3>
        <div className='-mx-8 mb-6 flex snap-x gap-8 overflow-auto py-6 md:grid md:snap-none md:grid-cols-2 md:px-8'>
          {myProjects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>

        <h3 className='font-medium uppercase tracking-wider'>School</h3>
        <div className='-mx-8 flex snap-x gap-8 overflow-auto py-6 md:grid md:snap-none md:grid-cols-2 md:px-8'>
          {schoolProjects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </ResumeSection>
    </Layout>
  );
};

export default Home;
