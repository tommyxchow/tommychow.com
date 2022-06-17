import React from 'react';
import { FaArrowDown, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

const LinkTable = (props: LinkTableProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xs font-semibold uppercase tracking-wider underline-offset-4 xl:text-base'>
        {props.header}
      </h2>

      <div className='flex flex-wrap gap-8'>
        {props.links.map((link) => (
          <a
            className='group flex w-fit items-center gap-2 font-medium decoration-lime-400 underline-offset-4 transition hover:underline active:scale-95 lg:text-lg xl:text-xl'
            key={link.title}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel='noreferrer'
          >
            {link.icon}
            {link.title}
            <div className='opacity-0 transition group-hover:opacity-100'>
              {link.external ? <FaExternalLinkAlt /> : <FaArrowDown />}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export interface LinkTableProps {
  header: string;
  links: LinkInfo[];
}

export interface LinkInfo {
  icon?: React.ReactNode;
  title: string;
  href: string;
  external: boolean;
}

export default LinkTable;
