import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaMoon } from 'react-icons/fa';

const NavBar = () => {
  const sections = ['Landing', 'About', 'Projects', 'Dark'];

  const scroll = useViewportScroll();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const about = document.getElementById('about');
    console.log(about?.getBoundingClientRect());

    scroll.scrollY.attach((position) => {
      if (position < about!.getBoundingClientRect().top) {
        setCurrentPageIndex(0);
      } else {
        setCurrentPageIndex(1);
      }
    });
  });

  return (
    <AnimatePresence>
      {currentPageIndex > 0 && (
        <motion.nav
          className='fixed flex min-h-screen flex-col items-end justify-center px-8'
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
          exit={{ x: -200 }}
        >
          {sections.map((section, index) => (
            <motion.a
              key={section}
              href={`#${section.toLowerCase()}`}
              className='uppercase tracking-wider'
              initial={{ opacity: 0.5 }}
              animate={{ opacity: currentPageIndex == index ? 1 : 0.5 }}
            >
              {section}
            </motion.a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default NavBar;
