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
      date: 'Mar. 2022',
      description:
        'Twitch client for iOS and Android with BTTV, FFZ, and 7TV support.',
      imageLink: '/frosty-app.png',
      projectLink: '',
      badges: [allBadges.openSource, allBadges.flutter, allBadges.dart],
      priority: true,
    },
    {
      name: 'Frosty (Website)',
      date: 'Mar. 2022',
      description: 'Marketing website for Frosty.',
      imageLink: '/frosty-website.png',
      projectLink: '',
      badges: [allBadges.nextJs, allBadges.tailwind, allBadges.typeScript],
      priority: true,
    },
    {
      name: 'Study Seeker',
      date: 'Mar. 2022',
      description:
        'Responsive web app for finding potential study partners, groups, and classes.',
      imageLink: '/frosty-app.png',
      projectLink: '',
      badges: [allBadges.react, allBadges.javaScript],
    },
    {
      name: 'Zeal',
      date: 'Dec. 2021',
      description:
        'Social web app that allows creating, exploring, and joining events.',
      imageLink: '/zeal.jpg',
      projectLink: '',
      badges: [allBadges.react, allBadges.django, allBadges.javaScript],
    },
    {
      name: 'The Gallery',
      date: 'May 2020',
      description:
        'Basic web app developed to learn the foundations of internet protocols and full stack web development.',
      imageLink: '/gallery.jpg',
      projectLink: '',
      badges: [allBadges.python, allBadges.html, allBadges.css],
    },
    {
      name: 'Stock Visualizer',
      date: 'May 2019',
      description:
        'Simple stock visualizer created with bottle.py, plotly, and the IEX Cloud API. Developed in Replit.',
      imageLink: '/stonks.jpg',
      projectLink: '',
      badges: [allBadges.python, allBadges.html, allBadges.css],
    },
  ];

  return (
    <Layout description='My Personal Website'>
      <div className='mb-20 flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center gap-6 lg:flex-row'>
          <div className='relative h-28 w-28 overflow-hidden rounded-full md:h-36 md:w-36 lg:h-40 lg:w-40'>
            <Image
              priority
              src='/me.jpeg'
              alt='Me'
              layout='fill'
              quality={100}
            />
          </div>

          <div className='flex flex-col items-center gap-4 lg:mt-6 lg:items-start'>
            <h1 className='text-center text-2xl font-medium md:text-3xl lg:text-left lg:text-4xl'>
              Hi! I&apos;m <span className='font-bold'>Tommy</span>,
              <br />a <span className='font-bold'>React Developer</span>.
            </h1>
            <div className='mb-8 flex gap-4 text-xs uppercase tracking-wider'>
              {links.map((link) => (
                <HeaderLink key={link.title} {...link} />
              ))}
            </div>
          </div>
        </div>

        <p className='w-80 lg:w-[500px]'>
          I enjoy and focus on full-stack mobile and web development, with an
          emphasis on declarative front-end frameworks.
        </p>
      </div>

      <ResumeSection icon={<FaLightbulb size={20} />} heading='Projects'>
        <div className='-mx-8 flex snap-x gap-8 overflow-auto py-6 md:grid md:snap-none md:grid-cols-2 md:px-8 lg:grid-cols-3'>
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
