import { source } from '../constants';

const Footer = () => {
  return (
    <footer className='w-fulltext-sm flex max-w-screen-sm flex-col items-center justify-center gap-4 px-4 py-16 text-sm text-neutral-500 dark:text-neutral-400 md:px-0'>
      <p>Thanks for stopping by ❤️</p>
      <a className='text-sm' href={source} target='_blank' rel='noreferrer'>
        (Source)
      </a>
    </footer>
  );
};

export default Footer;
