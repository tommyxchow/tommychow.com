import { Mail } from 'lucide-react'
import { SiGithub, SiLinkedin } from 'react-icons/si'

export const repoLink = 'https://github.com/tommyxchow/tommychow.com'
export const githubLink = 'https://github.com/tommyxchow'
export const linkedInLink = 'https://linkedin.com/in/tommy-chow/'
export const email = 'tommyxchow@gmail.com'

export const links: LinkInfo[] = [
  {
    icon: <Mail />,
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
]

export interface LinkInfo {
  icon?: React.ReactNode
  title: string
  href: string
}
