import Image from 'next/image';
import React, { useState } from 'react';
import { HiExternalLink } from 'react-icons/hi';
import Badge, { BadgeInfo } from './badge';

const ProjectCard = (project: ProjectInfo) => {
  return (
    <div className='w-72 shrink-0 snap-start scroll-ml-8 overflow-hidden rounded-lg bg-slate-800 shadow-lg transition first:ml-8 last:mr-8 first:last:mr-0 hover:scale-105 hover:shadow-xl md:w-full md:first:ml-0'>
      <a
        className='group relative flex h-64 items-center justify-center md:h-72'
        href={project.projectLink}
        target='_blank'
        rel='noreferrer'
      >
        <HiExternalLink
          className='absolute z-10 opacity-0 transition group-hover:opacity-100'
          size={30}
        />
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

      <div className='p-5'>
        <div className='mb-3 flex flex-wrap items-center gap-2'>
          {project.badges.map((badge) => (
            <Badge key={badge.text} {...badge} />
          ))}
        </div>

        <div className='mb-2'>
          <a
            className='font-medium hover:underline'
            href={project.projectLink}
            target='_blank'
            rel='noreferrer'
          >
            {project.name}
          </a>
          <p className='text-sm opacity-50'>{project.date}</p>
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
