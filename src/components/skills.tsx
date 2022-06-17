import React, { useState } from 'react';
import { FaInfoCircle, FaTools } from 'react-icons/fa';
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
import { AnimatePresence, motion } from 'framer-motion';

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
          name: 'Tailwind',
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
    <ResumeSection id='skills' heading='Skills' icon={<FaTools />}>
      <div className='mb-4 flex items-center gap-2 overflow-auto whitespace-nowrap pb-2 md:grid md:grid-cols-3 md:gap-0'>
        <div className='md:col-start-2'>
          {skillTitles.map((skillTitle, index) => (
            <motion.button
              key={skillTitle}
              className={`m-4 text-sm font-semibold transition first:ml-0 active:scale-95 md:text-base ${
                currentIndex == index
                  ? 'text-white underline decoration-lime-400 underline-offset-4'
                  : 'text-neutral-400'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {skillTitle}
            </motion.button>
          ))}
        </div>
      </div>

      {skills[currentIndex].map((skill) => (
        <SkillSection key={skill.level} {...skill} />
      ))}
    </ResumeSection>
  );
};

const SkillSection = (skillDetails: SkillDetails) => {
  return (
    <div className='mb-8 w-full md:grid md:grid-cols-3'>
      <h3 className='mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider md:mr-12 md:mb-0 md:justify-end md:text-sm'>
        {skillDetails.level}
        {/* <FaInfoCircle /> */}
      </h3>

      <div className='flex flex-wrap gap-2 md:col-span-2'>
        <AnimatePresence exitBeforeEnter>
          {skillDetails.skills.map((skill) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <SkillBadge {...skill} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SkillBadge = (skill: Skill) => {
  return (
    <div
      className={`bg-2 flex items-center gap-2 rounded-full bg-opacity-20 py-2 px-4 font-mono text-sm shadow-md transition md:text-lg ${skill.color}`}
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
