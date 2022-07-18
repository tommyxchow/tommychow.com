import { FiFileText, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { email, githubLink, linkedInLink } from '../constants';

const Footer = () => {
  const links: LinkInfo[] = [
    {
      icon: <FiMail />,
      title: 'Email',
      href: `mailto:${email}`,
      external: true,
    },
    {
      icon: <FiGithub />,
      title: 'GitHub',
      href: githubLink,
      external: true,
    },
    {
      icon: <FiLinkedin />,
      title: 'LinkedIn',
      href: linkedInLink,
      external: true,
    },
    {
      icon: <FiFileText />,
      title: 'Resume',
      href: '/resume.pdf',
      external: true,
    },
  ];

  return (
    <footer className='border-t-2 border-black p-4'>
      <h2 className='mb-2 text-xl font-semibold'>More</h2>
      <ul className='flex gap-4'>
        {links.map((link) => (
          <li key={link.title} className=''>
            {link.title}
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
  external: boolean;
}

export default Footer;
