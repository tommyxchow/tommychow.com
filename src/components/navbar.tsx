import { motion, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const sectionNames = ['Intro', 'Skills', 'Projects', 'About'];

  const scroll = useViewportScroll();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const intro = document.getElementById('intro');
    const skills = document.getElementById('skills');
    const projects = document.getElementById('projects');
    const about = document.getElementById('about');

    scroll.scrollY.attach(() => {
      if (intro!.getBoundingClientRect().top >= 0) {
        setShowNavBar(false);
      } else {
        setShowNavBar(true);
      }

      if (skills!.getBoundingClientRect().top > 0) {
        setCurrentPageIndex(0);
      } else if (projects!.getBoundingClientRect().top > 0) {
        setCurrentPageIndex(1);
      } else if (
        about!.getBoundingClientRect().top > 0 &&
        projects!.getBoundingClientRect().bottom > 0
      ) {
        setCurrentPageIndex(2);
      } else {
        setCurrentPageIndex(3);
      }
    });
  });

  return (
    <nav className='pointer-events-none fixed z-50 flex min-h-screen w-full items-end justify-center pb-8 lg:justify-end lg:p-4'>
      <motion.div
        className='flex gap-4 rounded-xl bg-neutral-800 p-4 shadow-xl lg:flex-col lg:gap-2 lg:p-6'
        initial={{ y: 250 }}
        animate={{ y: showNavBar ? 0 : 250 }}
      >
        {sectionNames.map((sectionName, index) => (
          <a
            key={sectionName}
            href={`#${sectionName.toLowerCase()}`}
            className='pointer-events-auto text-sm font-semibold transition active:scale-95 sm:text-base lg:text-xl'
          >
            <motion.p
              animate={{ opacity: currentPageIndex == index ? 1 : 0.5 }}
            >
              {sectionName}
            </motion.p>
          </a>
        ))}
      </motion.div>
    </nav>
  );
};

export default NavBar;
