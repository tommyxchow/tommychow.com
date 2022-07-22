import React from 'react';

const HomeSection = ({ header, className, children }: HomeSectionProps) => {
  return (
    <section className={`${className}`}>
      <h2 className='mb-2 text-xl font-semibold'>{header}</h2>
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
