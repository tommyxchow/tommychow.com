import {
  SiDjango,
  SiFlask,
  SiFlutter,
  SiMobx,
  SiNextdotjs,
  SiReact,
  SiSwift,
  SiTailwindcss,
  SiC,
  SiCplusplus,
  SiCss3,
  SiDart,
  SiHtml5,
  SiJavascript,
  SiPython,
  SiScala,
  SiTypescript,
  SiDocker,
  SiFigma,
  SiFastlane,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHeroku,
  SiSentry,
  SiVercel,
  SiVisualstudiocode,
  SiXcode,
} from 'react-icons/si';

export const skills: Skill[] = [
  {
    icon: <SiDjango />,
    name: 'Django',
  },
  {
    icon: <SiFlask />,
    name: 'Flask',
  },
  {
    icon: <SiFlutter color='#02569B' />,
    name: 'Flutter',
  },
  {
    icon: <SiMobx color='#FF9955' />,
    name: 'MobX',
  },
  {
    icon: <SiNextdotjs />,
    name: 'Next.js',
  },
  {
    icon: <SiReact color='#61DAFB' />,
    name: 'React',
  },
  {
    icon: <SiReact color='#61DAFB' />,
    name: 'React Native',
  },
  {
    icon: <SiSwift color='#F05138' />,
    name: 'SwiftUI',
  },
  {
    icon: <SiTailwindcss color='#06B6D4' />,
    name: 'Tailwind CSS',
  },
  {
    icon: <SiC color='#A8B9CC' />,
    name: 'C',
  },
  {
    icon: <SiCplusplus color='#00599C' />,
    name: 'C++',
  },
  {
    icon: <SiCss3 color='#1572B6' />,
    name: 'CSS',
  },
  {
    icon: <SiDart color='#0175C2' />,
    name: 'Dart',
  },
  {
    icon: <SiHtml5 color='#E34F26' />,
    name: 'HTML',
  },
  {
    icon: <SiJavascript color='#F7DF1E' />,
    name: 'JavaScript',
  },
  {
    icon: <SiPython color='#3776AB' />,
    name: 'Python',
  },
  {
    icon: <SiScala color='#DC322F' />,
    name: 'Scala',
  },
  {
    icon: <SiSwift color='#F05138' />,
    name: 'Swift',
  },
  {
    icon: <SiTypescript color='#3178C6' />,
    name: 'TypeScript',
  },
  {
    icon: <SiDocker color='#2496ED' />,
    name: 'Docker',
  },
  {
    icon: <SiFigma color='#F24E1E' />,
    name: 'Figma',
  },
  {
    icon: <SiFastlane color='#00F200' />,
    name: 'Fastlane',
  },
  {
    icon: <SiGit color='#F05032' />,
    name: 'Git',
  },
  {
    icon: <SiGithub />,
    name: 'GitHub',
  },
  {
    icon: <SiGithubactions color='#2088FF' />,
    name: 'GitHub Actions',
  },
  {
    icon: <SiHeroku />,
    name: 'Heroku',
  },
  {
    icon: <SiSentry />,
    name: 'Sentry',
  },
  {
    icon: <SiVercel />,
    name: 'Vercel',
  },
  {
    icon: <SiVisualstudiocode color='#007ACC' />,
    name: 'VS Code',
  },
  {
    icon: <SiXcode color='#147EFB' />,
    name: 'Xcode',
  },
];

export interface Skill {
  icon: React.ReactNode;
  name: string;
}
