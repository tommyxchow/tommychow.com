import React, { useState } from 'react';
import { FaInfoCircle, FaToolbox } from 'react-icons/fa';
import ResumeSection from './resume-section';
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

const Skills = () => {
  const frameworkSkills: SkillDetails[] = [
    {
      level: 'Experienced In',
      skills: [
        {
          icon: <SiFlutter color='#02569B' />,
          name: 'Flutter',
          color: 'bg-[#02569B]',
        },
        {
          icon: <SiReact color='#61DAFB' />,
          name: 'React',
          color: 'bg-[#61DAFB]',
        },
      ],
    },
    {
      level: 'Worked With',
      skills: [
        {
          icon: <SiDjango />,
          name: 'Django',
          color: 'bg-[#092E20]',
        },
        {
          icon: <SiFlask />,
          name: 'Flask',
          color: 'bg-[#ffffff]',
        },
        {
          icon: <SiSwift color='#F05138' />,
          name: 'SwiftUI',
          color: 'bg-[#F05138]',
        },
      ],
    },
    {
      level: 'Learning',
      skills: [
        {
          icon: <SiNextdotjs />,
          name: 'Next.js',
          color: 'bg-[#ffffff]',
        },
        {
          icon: <SiTailwindcss color='#06B6D4' />,
          name: 'Tailwind CSS',
          color: 'bg-[#06B6D4]',
        },
        {
          icon: <SiReact color='#61DAFB' />,
          name: 'React Native',
          color: 'bg-[#61DAFB]',
        },
      ],
    },
  ];

  const languageSkills: SkillDetails[] = [
    {
      level: 'Experienced In',
      skills: [
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
      ],
    },
    {
      level: 'Worked With',
      skills: [
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
          icon: <SiScala color='#DC322F' />,
          name: 'Scala',
          color: 'bg-[#DC322F]',
        },
        {
          icon: <SiSwift color='#F05138' />,
          name: 'Swift',
          color: 'bg-[#F05138]',
        },
      ],
    },
    {
      level: 'Learning',
      skills: [
        {
          icon: <SiTypescript color='#3178C6' />,
          name: 'TypeScript',
          color: 'bg-[#3178C6]',
        },
      ],
    },
  ];

  const toolSkills: SkillDetails[] = [
    {
      level: 'Experienced In',
      skills: [
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
          color: 'bg-[#ffffff]',
        },
        {
          icon: <SiVisualstudiocode color='#007ACC' />,
          name: 'VS Code',
          color: 'bg-[#007ACC]',
        },
      ],
    },
    {
      level: 'Worked With',
      skills: [
        {
          icon: <SiDocker color='#2496ED' />,
          name: 'Docker',
          color: 'bg-[#2496ED]',
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
          icon: <SiXcode color='#147EFB' />,
          name: 'Xcode',
          color: 'bg-[#147EFB]',
        },
      ],
    },
    {
      level: 'Learning',
      skills: [
        {
          icon: <SiVercel />,
          name: 'Vercel',
          color: 'bg-[#ffffff]',
        },
      ],
    },
  ];

  const skillTitles = ['Frameworks & Libraries', 'Languages', 'Tools'];
  const skills = [frameworkSkills, languageSkills, toolSkills];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ResumeSection id='skills' heading='Skills' icon={<FaToolbox />}>
      <div className='mb-4 flex items-center gap-2 overflow-auto whitespace-nowrap pb-2'>
        {skillTitles.map((skillTitle, index) => (
          <button
            key={skillTitle}
            className={`rounded-lg p-2 text-sm font-semibold first:pl-0 md:text-base ${
              currentIndex == index
                ? 'text-white underline underline-offset-4'
                : 'opacity-50'
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            {skillTitle}
          </button>
        ))}
      </div>

      {skills[currentIndex].map((skill) => (
        <SkillSection key={skill.level} {...skill} />
      ))}
    </ResumeSection>
  );
};

const SkillSection = (skillDetails: SkillDetails) => {
  return (
    <div className='mb-8 items-center md:flex md:flex-col'>
      <h3 className='mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider opacity-80 md:text-sm'>
        {skillDetails.level}
        <FaInfoCircle />
      </h3>

      <div className='flex flex-wrap gap-2'>
        {skillDetails.skills.map((skill) => (
          <SkillBadge key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
};

const SkillBadge = (skill: Skill) => {
  return (
    <div
      className={`bg-2 flex items-center gap-2 rounded-lg bg-opacity-20 py-2 px-4 text-sm font-medium shadow-md transition md:text-lg ${skill.color}`}
    >
      {skill.icon}
      {skill.name}
    </div>
  );
};

interface Skill {
  icon: React.ReactNode;
  name: string;
  color: string;
}

interface SkillDetails {
  level: string;
  skills: Skill[];
}

export default Skills;
