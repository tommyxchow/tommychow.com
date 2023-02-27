const Section = ({ header, children }: HomeSectionProps) => {
  return (
    <section className='flex flex-col gap-2'>
      <h2 className='font-medium'>{header}</h2>

      <div className='text-neutral-700 dark:text-neutral-300'>{children}</div>
    </section>
  );
};

interface HomeSectionProps {
  header: string;
  children: React.ReactNode;
}

export default Section;
