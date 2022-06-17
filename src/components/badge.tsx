import React from 'react';

const Badge = (badge: BadgeInfo) => {
  return (
    <div
      className={`w-fit rounded-full bg-opacity-50 py-1 px-2 text-xs font-semibold uppercase tracking-wider shadow-md ${badge.badgeColor}`}
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
  flutter: { text: 'Flutter', badgeColor: 'bg-[#02569B]' },
  dart: { text: 'Dart', badgeColor: 'bg-[#0175C2]' },
  nextJs: { text: 'Next.js', badgeColor: 'bg-black' },
  typeScript: { text: 'TypeScript', badgeColor: 'bg-[#3178C6]' },
  javaScript: {
    text: 'JavaScript',
    badgeColor: 'bg-[#F7DF1E]',
    textColor: 'text-black',
  },
  react: { text: 'React', badgeColor: 'bg-[#61DAFB]', textColor: 'text-black' },
  tailwind: { text: 'Tailwind', badgeColor: 'bg-[#06B6D4]' },
  django: { text: 'Django', badgeColor: 'bg-[#092E20]' },
  python: { text: 'Python', badgeColor: 'bg-[#3776AB]' },
  html: { text: 'HTML', badgeColor: 'bg-[#E34F26]' },
  css: { text: 'CSS', badgeColor: 'bg-[#1572B6]' },
};

export default Badge;
