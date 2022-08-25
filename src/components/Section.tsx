import React from 'react';

const Section = ({ header, children }: HomeSectionProps) => {
  return (
    <section className='grid gap-2 sm:grid-cols-4 sm:gap-0'>
      <h2 className='font-serif italic text-neutral-500 dark:text-neutral-400'>
        {header}
      </h2>
      <div className='sm:col-span-3'>{children}</div>
    </section>
  );
};

interface HomeSectionProps {
  header: string;
  children: React.ReactNode;
}

export default Section;
