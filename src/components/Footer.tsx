import { LinkInfo } from '../types';
import ExternalLink from './ExternalLink';

const Footer = ({ links }: FooterProps) => {
  return (
    <footer className='flex w-full max-w-screen-md grid-cols-3 flex-col-reverse items-center gap-8 px-4 py-16 sm:grid sm:px-8'>
      <p className='text-sm text-neutral-700 dark:text-neutral-300'>
        Thanks for stopping by ❤️
      </p>

      <div className='col-span-full col-start-2 flex w-full justify-evenly text-sm text-neutral-700 dark:text-neutral-300 sm:justify-between'>
        {links.map((link) => (
          <ExternalLink key={link.title} href={link.href}>
            {link.title}
          </ExternalLink>
        ))}
      </div>
    </footer>
  );
};

interface FooterProps {
  links: LinkInfo[];
}

export default Footer;
