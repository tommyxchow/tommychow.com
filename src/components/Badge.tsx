type BadgeProps = {
  icon: React.ReactNode;
  title: string;
  href?: string;
};

export default function Badge({ icon, title, href }: BadgeProps) {
  if (href === undefined) {
    return (
      <div className='flex w-fit items-center gap-2 rounded-full bg-neutral-200 px-4 py-2 dark:bg-neutral-900'>
        {icon}
        <p className='text-sm font-medium'>{title}</p>
      </div>
    );
  }

  return (
    <a
      className='flex w-fit items-center gap-2 rounded-full bg-neutral-200 px-4 py-2 shadow-md transition hover:opacity-60 active:scale-95 active:shadow-none dark:bg-neutral-900'
      href={href}
      target='_blank'
    >
      {icon}
      <span className='text-sm font-semibold'>{title}</span>
    </a>
  );
}
