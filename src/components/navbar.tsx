import React from 'react';
import { FaGithub, FaLinkedin, FaMoon } from 'react-icons/fa';

const NavBar = () => {
  return (
    <div className='h-12'>
      <div className='fixed inset-0 z-50 flex h-12 items-center justify-end gap-4 bg-gray-900 p-2'>
        <FaMoon className='h-6 w-6 transition hover:scale-110' />
      </div>
    </div>
  );
};

export default NavBar;
