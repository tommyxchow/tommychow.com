import { LinkInfo } from '../types';
import ExternalLink from './ExternalLink';

const Footer = ({ links }: FooterProps) => {
  const routes = ['Home', 'Skills', 'Projects', 'Blog', 'About'];
  const projects = [
    'Frosty App',
    'Frosty Website',
    'Study Seeker',
    'Zeal',
    'The Gallery',
  ];

  return (
    <footer className='m-auto flex w-full max-w-screen-2xl flex-col gap-20 px-4 py-16 sm:px-8 lg:px-16'>
      {/* <div className='flex justify-evenly gap-8 text-sm'>
        <div>
          <h3 className='mb-4 font-semibold'>Pages</h3>
          <ul className='flex flex-col gap-2'>
            {routes.map((route) => (
              <a key={route}>{route}</a>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='mb-4 font-semibold'>Projects</h3>
          <ul className='flex flex-col gap-2'>
            {projects.map((project) => (
              <a key={project}>{project}</a>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='mb-4 font-semibold'>Links</h3>
          <ul className='flex flex-col gap-2'>
            {links.map((link) => (
              <a key={link.title}>{link.title}</a>
            ))}
          </ul>
        </div>
      </div> */}

      <div className='flex flex-col items-center gap-2 text-center text-xs'>
        <p>Thanks for stopping by ❤️</p>
        <p>
          Designed and developed by me with{' '}
          <ExternalLink text='Next.js' href='https://nextjs.org/' />,{' '}
          <ExternalLink text='Tailwind CSS' href='https://tailwindcss.com/' />,
          and <ExternalLink text='Figma' href='https://www.figma.com/' />
        </p>
        <p>
          Deployed with{' '}
          <ExternalLink text='Vercel' href='https://vercel.com/' />
        </p>
      </div>
    </footer>
  );
};

const FooterSection = ({ header, links }: FooterSectionProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='mb-4 font-semibold'>{header}</h3>
      <ul className='flex flex-col gap-2'>
        {links.map((link) => (
          <a key={link.title}>{link.title}</a>
        ))}
      </ul>
    </div>
  );
};

interface FooterProps {
  links: LinkInfo[];
}

interface FooterSectionProps {
  header: string;
  links: LinkInfo[];
}

export default Footer;
