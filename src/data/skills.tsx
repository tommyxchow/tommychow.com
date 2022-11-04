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
  SiReplit,
  SiChartdotjs,
} from 'react-icons/si';

export const skills: Skill[] = [
  {
    type: 'Framework',
    icon: <SiChartdotjs color='#FF6384' />,
    name: 'Chart.js',
  },
  {
    type: 'Framework',
    icon: <SiDjango />,
    name: 'Django',
  },
  {
    type: 'Framework',
    icon: <SiFlask />,
    name: 'Flask',
  },
  {
    type: 'Framework',
    icon: <SiFlutter color='#02569B' />,
    name: 'Flutter',
  },
  {
    type: 'Framework',
    icon: <SiMobx color='#FF9955' />,
    name: 'MobX',
  },
  {
    type: 'Framework',
    icon: <SiNextdotjs />,
    name: 'Next.js',
  },
  {
    type: 'Framework',
    icon: <SiReact color='#61DAFB' />,
    name: 'React',
  },
  {
    type: 'Framework',
    icon: <SiReact color='#61DAFB' />,
    name: 'React Native',
  },
  {
    type: 'Framework',
    icon: <SiSwift color='#F05138' />,
    name: 'SwiftUI',
  },
  {
    type: 'Framework',
    icon: <SiTailwindcss color='#06B6D4' />,
    name: 'Tailwind CSS',
  },
  {
    type: 'Language',
    icon: <SiC color='#A8B9CC' />,
    name: 'C',
  },
  {
    type: 'Language',
    icon: <SiCplusplus color='#00599C' />,
    name: 'C++',
  },
  {
    type: 'Language',
    icon: <SiCss3 color='#1572B6' />,
    name: 'CSS',
  },
  {
    type: 'Language',
    icon: <SiDart color='#0175C2' />,
    name: 'Dart',
  },
  {
    type: 'Language',
    icon: <SiHtml5 color='#E34F26' />,
    name: 'HTML',
  },
  {
    type: 'Language',
    icon: <SiJavascript color='#F7DF1E' />,
    name: 'JavaScript',
  },
  {
    type: 'Language',
    icon: <SiPython color='#3776AB' />,
    name: 'Python',
  },
  {
    type: 'Language',
    icon: <SiScala color='#DC322F' />,
    name: 'Scala',
  },
  {
    type: 'Language',
    icon: <SiSwift color='#F05138' />,
    name: 'Swift',
  },
  {
    type: 'Language',
    icon: <SiTypescript color='#3178C6' />,
    name: 'TypeScript',
  },
  {
    type: 'Tool',
    icon: <SiDocker color='#2496ED' />,
    name: 'Docker',
  },
  {
    type: 'Tool',
    icon: <SiFigma color='#F24E1E' />,
    name: 'Figma',
  },
  {
    type: 'Tool',
    icon: <SiFastlane color='#00F200' />,
    name: 'Fastlane',
  },
  {
    type: 'Tool',
    icon: <SiGit color='#F05032' />,
    name: 'Git',
  },
  {
    type: 'Tool',
    icon: <SiGithub />,
    name: 'GitHub',
  },
  {
    type: 'Tool',
    icon: <SiGithubactions color='#2088FF' />,
    name: 'GitHub Actions',
  },
  {
    type: 'Tool',
    icon: <SiHeroku />,
    name: 'Heroku',
  },
  {
    type: 'Tool',
    icon: <SiReplit color='#667881' />,
    name: 'Replit',
  },
  {
    type: 'Tool',
    icon: <SiSentry />,
    name: 'Sentry',
  },
  {
    type: 'Tool',
    icon: <SiVercel />,
    name: 'Vercel',
  },
  {
    type: 'Tool',
    icon: <SiVisualstudiocode color='#007ACC' />,
    name: 'VS Code',
  },
  {
    type: 'Tool',
    icon: <SiXcode color='#147EFB' />,
    name: 'Xcode',
  },
];

export interface Skill {
  type: 'Framework' | 'Language' | 'Tool';
  icon: React.ReactNode;
  name: string;
}
