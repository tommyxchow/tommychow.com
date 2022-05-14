import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaMoon } from 'react-icons/fa';

const NavBar = () => {
  const sectionNames = ['Landing', 'Projects', 'About'];

  const scroll = useViewportScroll();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const landing = document.getElementById('landing');
    const about = document.getElementById('about');

    scroll.scrollY.attach(() => {
      if (landing!.getBoundingClientRect().top == 0) {
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
      <nav className='pointer-events-none fixed z-50 flex min-h-screen w-full items-end justify-center pb-2 lg:flex-col lg:justify-end lg:p-4'>
        {sectionNames.map((sectionName, index) => (
          <motion.a
            key={sectionName}
            href={
              currentPageIndex == 0
                ? undefined
                : `#${sectionName.toLowerCase()}`
            }
            initial={{ opacity: 0.5 }}
            animate={
              currentPageIndex == 0
                ? { opacity: 0 }
                : { opacity: currentPageIndex == index ? 1 : 0.5 }
            }
          >
            <p className='pointer-events-auto bg-black px-4 py-2 font-medium uppercase tracking-wider lg:text-xl'>
              {sectionName}
            </p>
          </motion.a>
        ))}
      </nav>
    </AnimatePresence>
  );
};

export default NavBar;
