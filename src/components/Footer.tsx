import { source } from '../data/links';

const Footer = () => {
  return (
    <footer className='flex justify-between py-8 text-sm text-neutral-600 dark:text-neutral-400 sm:py-16 md:px-0'>
      <p>Thanks for stopping by ❤️</p>
      <a
        className='underline-offset-2 hover:underline'
        href={source}
        target='_blank'
      >
        Last updated September 2023
      </a>
    </footer>
  );
};

export default Footer;
