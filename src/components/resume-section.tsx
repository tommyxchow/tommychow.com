import React from 'react';

const ResumeSection = (props: ResumeSectionProps) => {
  return (
    <section className='mb-12 flex flex-col'>
      <div className='mb-4 flex items-center gap-2'>
        <div className='text-lg md:text-2xl'>{props.icon}</div>
        <h2 className='text-xl font-bold md:text-3xl'>{props.heading}</h2>
      </div>
      {props.children}
    </section>
  );
};

interface ResumeSectionProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  heading: string;
}

export default ResumeSection;
