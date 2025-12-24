import { Mail } from 'lucide-react'
import { SiGithub, SiLinkedin } from 'react-icons/si'

export interface LinkInfo {
  icon?: React.ReactNode
  title: string
  href: string
}

export const links: LinkInfo[] = [
  {
    icon: <Mail size={18} />,
    title: 'Email',
    href: 'mailto:tommyxchow@gmail.com',
  },
  {
    icon: <SiGithub size={16} />,
    title: 'GitHub',
    href: 'https://github.com/tommyxchow',
  },
  {
    icon: <SiLinkedin size={16} />,
    title: 'LinkedIn',
    href: 'https://linkedin.com/in/tommy-chow/',
  },
]
