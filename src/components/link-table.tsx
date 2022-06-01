import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const LinkTable = (props: LinkTableProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xs font-semibold uppercase tracking-wider opacity-80 xl:text-base'>
        {props.header}
      </h2>

      <div className='flex flex-wrap gap-8'>
        {props.links.map((link) => (
          <a
            className='flex w-fit items-center gap-2 hover:underline'
            key={link.title}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel='noreferrer'
          >
            {link.icon}
            <h3 className='lg:text-lg xl:text-xl'>{`${link.title}${
              link.external == true ? '' : ' ->'
            }`}</h3>
            {link.external && <FaExternalLinkAlt />}
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
