import React from 'react';

const Section = ({ header, children }: HomeSectionProps) => {
  return (
    <section className='flex flex-col gap-2'>
      <h2 className='text-sm font-medium uppercase tracking-wider'>{header}</h2>
      {children}
    </section>
  );
};

interface HomeSectionProps {
  header: string;
  children: React.ReactNode;
}

export default Section;
