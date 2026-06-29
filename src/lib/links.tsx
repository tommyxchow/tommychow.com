import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

export interface LinkInfo {
  icon?: React.ReactNode
  title: string
  href: string
}

export const links: LinkInfo[] = [
  {
    icon: <Mail size={12} />,
    title: 'Email',
    href: 'mailto:tommyxchow@gmail.com',
  },
  {
    icon: <FaGithub size={12} />,
    title: 'GitHub',
    href: 'https://github.com/tommyxchow',
  },
  {
    icon: <FaLinkedin size={12} />,
    title: 'LinkedIn',
    href: 'https://linkedin.com/in/tommy-chow/',
  },
]
