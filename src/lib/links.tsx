import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

export const EMAIL = 'tommyxchow@gmail.com'

export type LinkInfo =
  | {
      icon?: React.ReactNode
      title: string
      href: string
    }
  | {
      icon?: React.ReactNode
      title: string
      copyValue: string
    }

export const links: LinkInfo[] = [
  {
    icon: <Mail size={12} />,
    title: 'Copy email',
    copyValue: EMAIL,
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
