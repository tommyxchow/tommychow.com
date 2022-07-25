import { LinkInfo } from '../types';
import ExternalLink from './ExternalLink';

const Footer = ({ links }: FooterProps) => {
  return (
    <footer className='flex w-full max-w-screen-md grid-cols-3 flex-col-reverse items-center gap-8 px-4 py-16 sm:grid sm:px-8'>
      <p className='text-sm text-neutral-700 dark:text-neutral-300'>
        Thanks for stopping by ❤️
      </p>

      <div className='col-span-full col-start-2 flex w-full justify-evenly gap-2 text-sm text-neutral-700 dark:text-neutral-300 sm:justify-between'>
        {links.map((link) => (
          <a
            className='link flex w-fit items-center gap-2 hover:-translate-y-1'
            href={link.href}
            target='_blank'
            rel='noreferrer'
            key={link.title}
          >
            {link.title}
          </a>
        ))}
      </div>
    </footer>
  );
};

interface FooterProps {
  links: LinkInfo[];
}

export default Footer;
