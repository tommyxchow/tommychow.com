import React from 'react';
import { FaHashtag } from 'react-icons/fa';

const ResumeSection = (props: ResumeSectionProps) => {
  return (
    <section className='flex min-h-screen flex-col justify-center p-8'>
      <div
        id={props.id}
        className='group mb-4 -ml-6 flex items-center gap-2 md:-ml-8'
      >
        <a
          href={'#' + props.id}
          className='opacity-0 transition group-hover:opacity-100 md:text-xl'
        >
          <FaHashtag />
        </a>
        <div className='text-lg md:text-2xl'>{props.icon} </div>
        <h2 className='text-xl font-semibold md:text-3xl'>{props.heading}</h2>
      </div>
      {props.children}
    </section>
  );
};

interface ResumeSectionProps {
  id: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  heading: string;
}

export default ResumeSection;
