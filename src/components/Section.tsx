import React from 'react';

const Section = ({ header, children }: HomeSectionProps) => {
  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-xl font-medium'>{header}</h2>
      <div className='sm:col-span-3'>{children}</div>
    </section>
  );
};

interface HomeSectionProps {
  header: string;
  children: React.ReactNode;
}

export default Section;
