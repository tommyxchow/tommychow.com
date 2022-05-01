import React from 'react';

const ResumeSection = (props: ResumeSectionProps) => {
  return (
    <section className='mb-16 flex flex-col'>
      <div className='mb-4 flex items-center gap-2'>
        {props.icon}
        <h2 className='text-xl font-semibold md:text-3xl'>{props.heading}</h2>
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
