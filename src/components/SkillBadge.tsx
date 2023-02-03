import { Skill } from '../data/skills';

const SkillBadge = ({ icon, name }: Skill) => {
  return (
    <div className='flex w-fit items-center gap-2 rounded-full bg-neutral-200 px-3 py-1 shadow dark:bg-neutral-900'>
      {icon}
      {name}
    </div>
  );
};

export default SkillBadge;
