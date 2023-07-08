interface HomeSectionProps {
  header?: string;
  children: React.ReactNode;
}

export default function Section({ header, children }: HomeSectionProps) {
  return (
    <section className='flex flex-col gap-2'>
      {header && <h2 className='text-lg font-bold'>{header}</h2>}

      <div className='text-neutral-800 dark:text-neutral-200'>{children}</div>
    </section>
  );
}
