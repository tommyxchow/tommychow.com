import { FiFileText, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { email, githubLink, linkedInLink } from '../constants';

const Footer = () => {
  const links: LinkInfo[] = [
    {
      icon: <FiMail />,
      title: 'Email',
      href: `mailto:${email}`,
    },
    {
      icon: <FiGithub />,
      title: 'GitHub',
      href: githubLink,
    },
    {
      icon: <FiLinkedin />,
      title: 'LinkedIn',
      href: linkedInLink,
    },
    {
      icon: <FiFileText />,
      title: 'Resume',
      href: '/resume.pdf',
    },
  ];

  return (
    <footer className='sticky inset-0 overflow-auto bg-black px-4 py-2 text-neutral-100'>
      <ul className='flex justify-between gap-4 md:justify-evenly'>
        {links.map((link) => (
          <li key={link.title}>
            <a
              className='flex items-center gap-1 text-sm font-semibold md:text-base'
              href={link.href}
              target='_blank'
              rel='noreferrer'
            >
              {link.icon}
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

interface LinkInfo {
  icon?: React.ReactNode;
  title: string;
  href: string;
}

export default Footer;
