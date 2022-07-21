import React from 'react';

const HomeSection = ({ header, className, children }: HomeSectionProps) => {
  return (
    <section className={`py-8 first:pt-0 last:pb-0 md:py-16 ${className}`}>
      <h2 className='mb-2 text-xl font-semibold md:text-2xl lg:mb-4 lg:text-3xl'>
        {header}
      </h2>
      {children}
    </section>
  );
};

interface HomeSectionProps {
  header: string;
  className?: string;
  children: React.ReactNode;
}

export default HomeSection;
