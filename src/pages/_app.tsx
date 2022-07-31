import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  SiC,
  SiCplusplus,
  SiCss3,
  SiDart,
  SiDjango,
  SiDocker,
  SiFigma,
  SiFlask,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHeroku,
  SiHtml5,
  SiJavascript,
  SiMobx,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiScala,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVisualstudiocode,
  SiXcode,
} from 'react-icons/si';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import {
  email,
  githubLink,
  linkedInLink,
  projects,
  source,
} from '../constants';
import '../styles/globals.css';
import { LinkInfo, Skill } from '../types';

function MyApp({ Component, pageProps, router }: AppProps) {
  const links: LinkInfo[] = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      href: `mailto:${email}`,
    },
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
      icon: <FaFileAlt />,
      title: 'Resume',
      href: '/resume.pdf',
    },
    {
      title: 'Source',
      href: source,
    },
  ];

  const skills: Skill[] = [
    {
      icon: <SiDjango />,
      name: 'Django',
      color: 'bg-[#092E20]',
    },
    {
      icon: <SiFlask />,
      name: 'Flask',
      color: 'bg-neutral-600',
    },
    {
      icon: <SiFlutter color='#02569B' />,
      name: 'Flutter',
      color: 'bg-[#02569B]',
    },
    {
      icon: <SiMobx color='#FF9955' />,
      name: 'MobX',
      color: 'bg-[#FF9955]',
    },
    {
      icon: <SiNextdotjs />,
      name: 'Next.js',
      color: 'bg-neutral-600',
    },
    {
      icon: <SiReact color='#61DAFB' />,
      name: 'React',
      color: 'bg-[#61DAFB]',
    },
    {
      icon: <SiReact color='#61DAFB' />,
      name: 'React Native',
      color: 'bg-[#61DAFB]',
    },
    {
      icon: <SiSwift color='#F05138' />,
      name: 'SwiftUI',
      color: 'bg-[#F05138]',
    },
    {
      icon: <SiTailwindcss color='#06B6D4' />,
      name: 'Tailwind CSS',
      color: 'bg-[#06B6D4]',
    },
    {
      icon: <SiC color='#A8B9CC' />,
      name: 'C',
      color: 'bg-[#A8B9CC]',
    },
    {
      icon: <SiCplusplus color='#00599C' />,
      name: 'C++',
      color: 'bg-[#00599C]',
    },
    {
      icon: <SiCss3 color='#1572B6' />,
      name: 'CSS',
      color: 'bg-[#1572B6]',
    },
    {
      icon: <SiDart color='#0175C2' />,
      name: 'Dart',
      color: 'bg-[#0175C2]',
    },
    {
      icon: <SiHtml5 color='#E34F26' />,
      name: 'HTML',
      color: 'bg-[#E34F26]',
    },
    {
      icon: <SiJavascript color='#F7DF1E' />,
      name: 'JavaScript',
      color: 'bg-[#F7DF1E]',
    },
    {
      icon: <SiPython color='#3776AB' />,
      name: 'Python',
      color: 'bg-[#3776AB]',
    },
    {
      icon: <SiScala color='#DC322F' />,
      name: 'Scala',
      color: 'bg-[#DC322F]',
    },
    {
      icon: <SiSwift color='#F05138' />,
      name: 'Swift',
      color: 'bg-[#F05138]',
    },
    {
      icon: <SiTypescript color='#3178C6' />,
      name: 'TypeScript',
      color: 'bg-[#3178C6]',
    },
    {
      icon: <SiDocker color='#2496ED' />,
      name: 'Docker',
      color: 'bg-[#2496ED]',
    },
    {
      icon: <SiFigma color='#F24E1E' />,
      name: 'Figma',
      color: 'bg-[#F24E1E]',
    },
    {
      icon: <SiGit color='#F05032' />,
      name: 'Git',
      color: 'bg-[#F05032]',
    },
    {
      icon: <SiGithub />,
      name: 'GitHub',
      color: 'bg-neutral-600',
    },
    {
      icon: <SiGithubactions color='#2088FF' />,
      name: 'GitHub Actions',
      color: 'bg-[#2088FF]',
    },
    {
      icon: <SiHeroku />,
      name: 'Heroku',
      color: 'bg-[#430098]',
    },
    {
      icon: <SiVercel />,
      name: 'Vercel',
      color: 'bg-neutral-600',
    },
    {
      icon: <SiVisualstudiocode color='#007ACC' />,
      name: 'VS Code',
      color: 'bg-[#007ACC]',
    },
    {
      icon: <SiXcode color='#147EFB' />,
      name: 'Xcode',
      color: 'bg-[#147EFB]',
    },
  ];

  return (
    <ThemeProvider attribute='class' disableTransitionOnChange>
      <div className='flex flex-col items-center'>
        <NavBar />

        <div className='flex min-h-screen w-full max-w-screen-md flex-col'>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <Component
                {...pageProps}
                links={links}
                projects={projects}
                skills={skills}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <Footer links={links} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
