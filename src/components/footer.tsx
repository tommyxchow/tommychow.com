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
    <footer className='sticky inset-0 flex flex-col gap-2 bg-black px-4 py-2 text-white'>
      <ul className='flex justify-between gap-4'>
        {links.map((link) => (
          <li key={link.title}>
            <a
              className='text-sm font-semibold'
              href={link.href}
              target='_blank'
              rel='noreferrer'
            >
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
