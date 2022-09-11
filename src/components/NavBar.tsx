import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();

  const routes = ['Projects', 'About'];

  return (
    <nav className='px-4 py-8 font-medium uppercase tracking-wider sm:items-end sm:px-0 sm:py-32'>
      <ul className='sticky top-16 flex gap-2 sm:flex-col sm:items-end '>
        <Link href='/'>
          <a
            className={`whitespace-nowrap transition ${
              router.pathname !== '/' && 'opacity-60 hover:opacity-100'
            }`}
          >
            Intro
          </a>
        </Link>

        {routes.map((route) => (
          <li key={route} className='flex flex-col'>
            <Link href={'/' + route.toLowerCase()}>
              <a
                className={`transition ${
                  !router.pathname.includes(route.toLowerCase()) &&
                  'opacity-60 hover:opacity-100'
                }`}
              >
                {route}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
