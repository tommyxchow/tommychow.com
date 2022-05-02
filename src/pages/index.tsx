import type { NextPage } from 'next';
import Image from 'next/image';
import {
  FaEnvelope,
  FaFile,
  FaGithub,
  FaLightbulb,
  FaLinkedin,
  FaSuitcase,
  FaTools,
} from 'react-icons/fa';
import Badge, { allBadges } from '../components/badge';
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
      icon: <FaFile />,
      title: 'Resume',
      href: '/resume.pdf',
    },
  ];

  const projects: ProjectInfo[] = [
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
    {
      name: 'Study Seeker',
      date: 'May 2022',
      description:
        'Responsive web app aimed to allow students to find and rate potential study partners, create and join groups, and explore classes.',
      imageLink: '/study-seeker.jpg',
      projectLink: 'https://webdev.cse.buffalo.edu/hci/teams/commitment',
      badges: [allBadges.react, allBadges.css],
      priority: true,
    },
    {
      name: 'Zeal',
      date: 'December 2021',
      description:
        'Social web app that allows creating, exploring, and joining events.',
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
      <div className='mb-20 flex flex-col items-center gap-4 md:items-start'>
        <div className='flex flex-col items-center gap-6 md:flex-row'>
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
            <h1 className='text-center text-3xl font-medium md:text-left md:text-5xl'>
              Hi! I&apos;m <span className='font-bold'>Tommy</span>, a
              <br />
              <span className='font-bold'>
                <span className='text-cyan-400'>Software</span>{' '}
                <span className='text-orange-400'>Developer</span>
              </span>
            </h1>
            <div className='mb-8 flex gap-4 text-xs uppercase tracking-wider'>
              {links.map((link) => (
                <HeaderLink key={link.title} {...link} />
              ))}
            </div>
          </div>
        </div>

        <p className='md:text-lg'>
          I enjoy and focus on full-stack mobile and web development, with an
          emphasis on declarative front-end frameworks.
        </p>
      </div>

      <ResumeSection icon={<FaLightbulb size={20} />} heading='Projects'>
        <p>
          These projects that I&apos;ve worked on contibuted the most to my
          growth as a developer. I was able to gain hands-on experience with
          popular frameworks, design and wire-framing, deployment and CI/CD,
          common Agile practices and leadership and teamwork.
        </p>
        <div className='-mx-8 flex snap-x gap-8 overflow-auto py-6 md:grid md:snap-none md:grid-cols-2 md:px-8'>
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </ResumeSection>

      <ResumeSection icon={<FaTools size={20} />} heading='Technical Skills'>
        <h2>Technical Skills</h2>
      </ResumeSection>

      <ResumeSection icon={<FaSuitcase size={20} />} heading='Work Experience'>
        <h2>Work Experience</h2>
      </ResumeSection>
    </Layout>
  );
};

export default Home;
