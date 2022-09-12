import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiArrowLeft } from 'react-icons/hi';

const NavBar = () => {
  const router = useRouter();

  const routes = ['Projects', 'About'];

  return (
    <nav className='sticky inset-0 z-50 h-fit overflow-auto bg-neutral-100 bg-opacity-80 p-4 font-medium uppercase tracking-wider backdrop-blur dark:bg-neutral-900 dark:bg-opacity-80 sm:items-end sm:px-0 sm:py-32'>
      <AnimatePresence mode='wait'>
        <motion.ul
          key={router.asPath.split('/')[2]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
          className='flex gap-4 sm:flex-col sm:items-end sm:gap-2'
        >
          {router.asPath.split('/')[2] ? (
            <li>
              <Link href='/projects'>
                <a className='flex items-center gap-2'>
                  <HiArrowLeft />
                  Back
                </a>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link href='/'>
                  <a
                    className={`whitespace-nowrap transition duration-500 ${
                      router.pathname !== '/' &&
                      'opacity-80 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100'
                    }`}
                  >
                    Intro
                  </a>
                </Link>
              </li>

              {routes.map((route) => (
                <li key={route}>
                  <Link href={'/' + route.toLowerCase()}>
                    <a
                      className={`transition duration-500 ${
                        !router.pathname.includes(route.toLowerCase()) &&
                        'opacity-80 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100'
                      }`}
                    >
                      {route}
                    </a>
                  </Link>
                </li>
              ))}
            </>
          )}
        </motion.ul>
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
