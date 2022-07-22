import React from 'react';
import { FaTools } from 'react-icons/fa';
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
import Layout from '../components/Layout';

const Skills = () => {
  const frameworkSkills: Skill[] = [
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
      name: 'Tailwind',
      color: 'bg-[#06B6D4]',
    },
  ];

  const languageSkills: Skill[] = [
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
  ];

  const toolSkills: Skill[] = [
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
    <Layout title='Skills | Tommy Chow' description={"Tommy Chow's skills."}>
      <p>
        Here&apos;s an ongoing list of various stuff I&apos;ve worked with ever
        since I began pursuing a computer science degree in 2019.
      </p>

      <div className='flex flex-col gap-8 md:gap-16'>
        <SkillSection
          skillType='Frameworks and Libraries'
          skills={frameworkSkills}
        />

        <SkillSection skillType='Languages' skills={languageSkills} />

        <SkillSection skillType='Tools' skills={toolSkills} />
      </div>

      <p>
        I&apos;m constantly exploring and learning both the new and old in the
        full-stack world. Thanks to the experiences, concepts, and patterns
        I&apos;ve obtained from utilizing all of these, I&apos;ve become very
        capable of adapting and transferring between technologies.
      </p>
    </Layout>
  );
};

const SkillSection = ({ skillType, skills }: SkillSectionProps) => {
  return (
    <section className='grid gap-2 md:grid-cols-3 md:gap-8'>
      <h2 className='font-semibold'>{skillType}</h2>
      <ul className='col-span-full col-start-2 flex flex-wrap gap-2'>
        {skills.map((skill) => (
          <li key={skill.name}>
            <SkillBadge {...skill} />
          </li>
        ))}
      </ul>
    </section>
  );
};

const SkillBadge = ({ icon, name, color }: Skill) => {
  return (
    <div
      className={`flex items-center gap-1 rounded-full bg-opacity-20 px-3 py-1 text-sm font-medium shadow ${color}`}
    >
      {icon}
      {name}
    </div>
  );
};

interface Skill {
  icon: React.ReactNode;
  name: string;
  color: string;
}

interface SkillSectionProps {
  skillType: string;
  skills: Skill[];
}

export default Skills;
