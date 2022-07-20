import { LinkInfo } from '../types';

const Footer = ({ links }: FooterProps) => {
  return (
    <footer className='sticky inset-0 overflow-auto bg-black px-4 py-2 text-neutral-100 lg:py-4'>
      <ul className='flex justify-between gap-4 md:justify-evenly lg:justify-center lg:gap-8'>
        {links.map((link) => (
          <li key={link.title}>
            <a
              className='flex items-center gap-1 text-sm font-semibold md:text-base lg:text-lg'
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

interface FooterProps {
  links: LinkInfo[];
}

export default Footer;
