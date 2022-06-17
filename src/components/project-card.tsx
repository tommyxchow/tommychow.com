import Image from 'next/image';
import React, { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import Badge, { BadgeInfo } from './badge';

const ProjectCard = (project: ProjectInfo) => {
  return (
    <div className='relative flex w-72 shrink-0 snap-start scroll-mx-8 flex-col overflow-hidden rounded-xl bg-neutral-800 shadow-lg transition first:ml-8 last:mr-8 first:last:mr-0 hover:shadow-xl sm:w-full sm:first:ml-0 sm:hover:scale-105'>
      <a
        className='group relative flex h-64 w-full items-center justify-center'
        href={project.projectLink}
        target='_blank'
        rel='noreferrer'
      >
        <div className='absolute z-10 flex flex-col items-center gap-2 opacity-0 transition group-hover:opacity-100'>
          <HiExternalLink size={30} />
          <p className='text-sm font-semibold uppercase tracking-wider opacity-100'>
            Check it out!
          </p>
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

      <div className='px-4 py-6'>
        <div className='mb-4 space-y-2'>
          <p className='text-sm font-medium uppercase tracking-wider text-neutral-400'>
            {project.date}
          </p>
          <a
            className='group flex items-center text-lg font-semibold underline-offset-2 transition hover:underline'
            href={project.projectLink}
            target='_blank'
            rel='noreferrer'
          >
            {project.name}
            <FaExternalLinkAlt size={15} className='ml-2' />
          </a>
          <div className='flex flex-wrap items-center gap-2'>
            {project.badges.map((badge) => (
              <Badge key={badge.text} {...badge} />
            ))}
          </div>
        </div>
        <p className='text-sm'>{project.description}</p>
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
