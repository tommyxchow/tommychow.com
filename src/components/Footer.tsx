import { LinkInfo } from '../types';
import ExternalLink from './ExternalLink';

const Footer = () => {
  return (
    <footer className='px-4 py-16'>
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
        <p>
          <ExternalLink
            text='Last updated 2022'
            href='https://github.com/tommyxchow/tommychow.com'
          />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
