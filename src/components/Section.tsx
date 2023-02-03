const Section = ({ header, children }: HomeSectionProps) => {
  return (
    <section className='flex flex-col gap-2'>
      <h2 className='font-medium'>{header}</h2>

      <div className='text-neutral-600 dark:text-neutral-400'>{children}</div>
    </section>
  );
};

interface HomeSectionProps {
  header: string;
  children: React.ReactNode;
}

export default Section;
