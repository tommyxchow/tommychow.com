import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const LinkTable = (props: LinkTableProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xs uppercase tracking-wider opacity-80 md:text-sm'>
        {props.header}
      </h2>

      {props.links.map((link) => (
        <div className='flex items-center gap-2' key={link.title}>
          {link.icon}
          <h3 className='md:text-lg'>{`${link.title}${
            link.external == true ? '' : ' ->'
          }`}</h3>
          {link.external && <FaExternalLinkAlt />}
        </div>
      ))}
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
