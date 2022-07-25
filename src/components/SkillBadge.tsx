import { Skill } from '../types';

const SkillBadge = ({ icon, name, color }: Skill) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-full bg-opacity-20 px-3 py-1 font-medium shadow ${color}`}
    >
      {icon}
      {name}
    </div>
  );
};

export default SkillBadge;
