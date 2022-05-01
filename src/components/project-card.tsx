import Image from 'next/image';
import React, { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import Badge, { BadgeInfo } from './badge';

const ProjectCard = (project: ProjectInfo) => {
  return (
    <div className='w-72 shrink-0 snap-start scroll-ml-8 overflow-hidden rounded-lg bg-neutral-800 shadow-lg transition first:ml-8 last:mr-8 first:last:mr-0 hover:shadow-xl md:w-full md:first:ml-0 md:hover:scale-105'>
      <a
        className='group relative flex h-64 items-center justify-center md:h-72'
        href={project.projectLink}
        target='_blank'
        rel='noreferrer'
      >
        <div className='absolute z-10 flex flex-col items-center gap-2 opacity-0 transition group-hover:opacity-100'>
          <HiExternalLink size={30} />
          <p className='text-sm uppercase tracking-wider'>Check it out!</p>
        </div>
        <div className='relative h-full w-full transition group-hover:opacity-30 group-active:opacity-10'>
          <Image
            priority={project.priority}
            src={project.imageLink}
            alt='Project Thumbnail'
            layout='fill'
            objectFit='cover'
            objectPosition='top'
          />
        </div>
      </a>

      <div className='p-4'>
        <div className='mb-4'>
          <a
            className='group flex items-center text-lg font-medium transition hover:underline'
            href={project.projectLink}
            target='_blank'
            rel='noreferrer'
          >
            {project.name}
            <FaExternalLinkAlt
              size={15}
              className='ml-2 opacity-0 transition group-hover:opacity-100'
            />
          </a>
          <p className='mb-2 mt-1 text-sm opacity-50'>{project.date}</p>
          <div className='flex flex-wrap items-center gap-2'>
            {project.badges.map((badge) => (
              <Badge key={badge.text} {...badge} />
            ))}
          </div>
        </div>
        <p className='text-sm opacity-75'>{project.description}</p>
      </div>
    </div>
  );
};

export interface ProjectInfo {
  name: string;
  date: string;
  description: string;
  imageLink: string;
  projectLink: string;
  badges: BadgeInfo[];
  priority?: boolean;
}

export default ProjectCard;
