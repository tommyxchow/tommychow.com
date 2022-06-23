import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const sectionNames = ['Intro', 'Skills', 'Projects', 'About'];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const sections = ['intro', 'skills', 'projects', 'about'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id == 'intro') {
            if (entry.intersectionRatio < 1) {
              setShowNavBar(true);
            } else {
              setShowNavBar(false);
            }
          }

          if (entry.intersectionRatio >= 0.5) {
            setCurrentPageIndex(sections.indexOf(entry.target.id));
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections
      .map((section) => document.getElementById(section))
      .forEach((section) => observer.observe(section!));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className='pointer-events-none fixed z-50 flex min-h-screen w-full items-end justify-center pb-8'>
      <motion.ul
        className='flex gap-4 rounded-xl bg-neutral-800 p-4 shadow-xl lg:p-6'
        initial={{ y: 250 }}
        animate={{ y: showNavBar ? 0 : 250 }}
      >
        {sectionNames.map((sectionName, index) => (
          <li
            key={sectionName}
            className='pointer-events-auto text-sm font-semibold transition active:scale-95 sm:text-base lg:text-xl'
          >
            <motion.a
              href={`#${sectionName.toLowerCase()}`}
              animate={{ opacity: currentPageIndex == index ? 1 : 0.25 }}
            >
              {sectionName}
            </motion.a>
          </li>
        ))}
      </motion.ul>
    </nav>
  );
};

export default NavBar;
