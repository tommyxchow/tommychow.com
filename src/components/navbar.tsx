import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const NavBar = () => {
  const sectionNames = ['Landing', 'Projects', 'About'];

  const scroll = useViewportScroll();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const landing = document.getElementById('landing');
    const projects = document.getElementById('projects');
    const about = document.getElementById('about');

    scroll.scrollY.attach(() => {
      if (landing!.getBoundingClientRect().top >= 0) {
        setShowNavBar(false);
      } else {
        setShowNavBar(true);
      }

      if (projects!.getBoundingClientRect().top > 0) {
        setCurrentPageIndex(0);
      } else if (about!.getBoundingClientRect().top > 0) {
        setCurrentPageIndex(1);
      } else {
        setCurrentPageIndex(2);
      }
    });
  });

  return (
    <AnimatePresence>
      <nav className='pointer-events-none fixed z-50 flex min-h-screen w-full items-end justify-center p-4 lg:flex-col lg:justify-end'>
        {sectionNames.map((sectionName, index) => (
          <motion.a
            key={sectionName}
            href={`#${sectionName.toLowerCase()}`}
            className='pointer-events-auto bg-black px-4 py-2 text-sm font-medium uppercase tracking-wider sm:text-base lg:text-xl'
            initial={{ y: 150 }}
            animate={{
              y: showNavBar ? 0 : 150,
            }}
          >
            <motion.p
              animate={{ opacity: currentPageIndex == index ? 1 : 0.5 }}
            >
              {sectionName}
            </motion.p>
          </motion.a>
        ))}
      </nav>
    </AnimatePresence>
  );
};

export default NavBar;
