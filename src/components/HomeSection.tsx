import React from 'react';

const HomeSection = ({ header, className, children }: HomeSectionProps) => {
  return (
    <section className={`pb-16 last:pb-0 ${className}`}>
      <h2 className='mb-2 text-2xl font-semibold md:text-3xl lg:mb-4 lg:text-4xl'>
        {header}
      </h2>
      {children}
    </section>
  );
};

interface HomeSectionProps {
  header: string;
  className: string;
  children: React.ReactNode;
}

export default HomeSection;
