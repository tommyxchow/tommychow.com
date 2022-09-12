import { FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { SiGithub, SiLinkedin } from 'react-icons/si';

export const githubLink = 'https://github.com/tommyxchow';
export const linkedInLink = 'https://www.linkedin.com/in/tommy-chow/';
export const email = 'tommyxchow@gmail.com';
export const source = 'https://github.com/tommyxchow/tommychow.com';

export const links: LinkInfo[] = [
  {
    icon: <FaEnvelope />,
    title: 'Email',
    href: `mailto:${email}`,
  },
  {
    icon: <SiGithub />,
    title: 'GitHub',
    href: githubLink,
  },
  {
    icon: <SiLinkedin />,
    title: 'LinkedIn',
    href: linkedInLink,
  },
  {
    icon: <FaFileAlt />,
    title: 'Resume',
    href: '/TommyChowResume.pdf',
  },
  {
    title: 'Source',
    href: source,
  },
];

export interface LinkInfo {
  icon?: React.ReactNode;
  title: string;
  href: string;
}
