import { Skill } from '../data/skills';

const SkillBadge = ({ icon, name }: Skill) => {
  return (
    <div className='flex w-fit items-center gap-2 rounded-full bg-neutral-200 px-4 py-2 font-medium shadow dark:bg-neutral-900'>
      {icon}
      <p className='text-sm'>{name}</p>
    </div>
  );
};

export default SkillBadge;
