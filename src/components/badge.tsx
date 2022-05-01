import React from 'react';

const Badge = (badge: BadgeInfo) => {
  return (
    <div
      className={`w-fit rounded-sm bg-opacity-50 py-0.5 px-1 text-xs font-semibold uppercase tracking-wider ${badge.badgeColor}`}
    >
      {badge.text}
    </div>
  );
};

export interface BadgeInfo {
  text: string;
  textColor?: string;
  badgeColor: string;
}

export const allBadges = {
  openSource: { text: 'Open-Source', badgeColor: 'bg-[#3DA639]' },
  flutter: { text: 'Flutter', badgeColor: 'bg-[#027DFD]' },
  dart: { text: 'Dart', badgeColor: 'bg-[#0553B1]' },
  nextJs: { text: 'Next.js', badgeColor: 'bg-black' },
  typeScript: { text: 'TypeScript', badgeColor: 'bg-[#3178C6]' },
  javaScript: {
    text: 'JavaScript',
    badgeColor: 'bg-[#F7DF1E]',
    textColor: 'text-black',
  },
  react: { text: 'React', badgeColor: 'bg-[#59EBFF]', textColor: 'text-black' },
  tailwind: { text: 'Tailwind', badgeColor: 'bg-[#38BDF8]' },
  django: { text: 'Django', badgeColor: 'bg-[#092E20]' },
  python: { text: 'Python', badgeColor: 'bg-[#3776AB]' },
  html: { text: 'HTML', badgeColor: 'bg-[#F14A29]' },
  css: { text: 'CSS', badgeColor: 'bg-[#264DE4]' },
};

export default Badge;
