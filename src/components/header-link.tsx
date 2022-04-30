import React from 'react';

const HeaderLink = (link: HeaderLinkInfo) => {
  return (
    <a
      className='flex items-center gap-1 opacity-80 transition hover:opacity-100 active:scale-95'
      href={link.href}
      target='_blank'
      rel='noreferrer'
    >
      {link.icon}
      <p>{link.title}</p>
    </a>
  );
};

export interface HeaderLinkInfo {
  icon?: React.ReactNode;
  title: string;
  href: string;
}

export default HeaderLink;
