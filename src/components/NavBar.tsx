import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiArrowLeft } from 'react-icons/hi2';

const NavBar = () => {
  const router = useRouter();

  const routes = ['Projects', 'Skills', 'About'];

  return (
    <nav className='font-semibold'>
      <AnimatePresence mode='wait'>
        <motion.ul
          key={router.asPath.split('/')[2]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          className='flex w-full max-w-lg gap-4'
        >
          {router.asPath.split('/')[2] ? (
            <li>
              <Link className='flex items-center gap-2' href='/projects'>
                <HiArrowLeft aria-label='Go back to all projects' />
                <p>Projects</p>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  className={`whitespace-nowrap transition duration-500 ${
                    router.pathname !== '/' &&
                    'opacity-80 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100'
                  }`}
                  href='/'
                >
                  Home
                </Link>
              </li>

              {routes.map((route) => (
                <li key={route}>
                  <Link
                    className={`transition duration-500 ${
                      !router.pathname.includes(route.toLowerCase()) &&
                      'opacity-80 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100'
                    }`}
                    href={'/' + route.toLowerCase()}
                  >
                    {route}
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
