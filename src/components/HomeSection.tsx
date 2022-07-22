import React from 'react';

const Section = ({ header, children }: HomeSectionProps) => {
  return (
    <section className='grid sm:grid-cols-3 sm:gap-8'>
      <h2 className='mb-2 text-xl font-semibold'>{header}</h2>
      <div className='col-span-2'>{children}</div>
    </section>
  );
};

interface HomeSectionProps {
  header: string;
  children: React.ReactNode;
}

export default Section;
