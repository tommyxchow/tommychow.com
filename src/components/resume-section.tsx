import React from 'react';

const ResumeSection = (props: ResumeSectionProps) => {
  return (
    <div className='mb-16 flex flex-col'>
      <div className='flex items-center gap-2'>
        {props.icon}
        <h2 className='text-xl font-semibold md:text-2xl'>{props.heading}</h2>
      </div>
      {props.children}
    </div>
  );
};

interface ResumeSectionProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  heading: string;
}

export default ResumeSection;
