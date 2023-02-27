import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiArrowLeft } from 'react-icons/hi';

const NavBar = () => {
  const router = useRouter();

  const routes = ['Skills', 'Projects', 'About'];

  return (
    <nav className='sticky inset-0 z-50 flex h-fit w-full justify-center overflow-auto bg-neutral-100 bg-opacity-50 py-4 font-medium backdrop-blur dark:bg-black dark:bg-opacity-50 sm:px-0'>
      <AnimatePresence mode='wait'>
        <motion.ul
          key={router.asPath.split('/')[2]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          className='flex w-full max-w-lg gap-4 px-4 sm:px-0'
        >
          {router.asPath.split('/')[2] ? (
            <li>
              <Link href='/projects'>
                <HiArrowLeft aria-label='Go back to all projects' />
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
                  <h1>Home</h1>
                </Link>

                {router.pathname === '/' && (
                  <motion.div
                    layoutId='underline'
                    layout
                    className='border border-sky-600 dark:border-sky-400'
                  />
                )}
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
                    <h1>{route}</h1>
                  </Link>

                  {router.pathname.includes(route.toLowerCase()) && (
                    <motion.div
                      layoutId='underline'
                      layout
                      className='border border-sky-600 dark:border-sky-400'
                    />
                  )}
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
