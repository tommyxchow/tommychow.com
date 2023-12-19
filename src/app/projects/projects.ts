import { type StaticImageData } from 'next/image';
import frostyThumbnail from './images/frosty.webp';
import hatchetThumbnail from './images/hatchet.webp';
import stawksThumbnail from './images/stawks.webp';
import vewdditThumbnail from './images/vewddit.webp';

export interface ProjectInfo {
  name: string;
  thumbnail: StaticImageData;
  description: string;
  dateCompleted?: string;
  url: string;
  githubUrl: string;
  technologies: string[];
}

export const projects = [
  {
    name: 'Hatchet',
    description: 'A fast, modern, and simple web client for Hacker News.',
    thumbnail: hatchetThumbnail,
    dateCompleted: '2023-12-01',
    url: 'https://hatchetnews.vercel.app/',
    githubUrl: 'https://github.com/tommyxchow/hatchet',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  },
  {
    name: 'Vewddit',
    description: 'A web app for Reddit focused on browsing visual media.',
    thumbnail: vewdditThumbnail,
    dateCompleted: '2023-11-01',
    url: 'https://vewddit.vercel.app/',
    githubUrl: 'https://github.com/tommyxchow/vewddit',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  },
  {
    name: 'Frosty',
    description:
      'Watch and chat on Twitch with your favorite third-party emotes on mobile.',
    thumbnail: frostyThumbnail,
    dateCompleted: '2023-01-15',
    url: 'https://frostyapp.io/',
    githubUrl: 'https://github.com/tommyxchow/frosty',
    technologies: [
      'Dart',
      'Fastlane',
      'Figma',
      'Firebase',
      'Flutter',
      'GitHub Actions',
      'MobX',
    ],
  },
  {
    name: 'Stawks',
    description:
      'View price history charts, financial details, and relevant news for stocks.',
    thumbnail: stawksThumbnail,
    dateCompleted: '2022-11-15',
    url: 'https://stawks.vercel.app/',
    githubUrl: 'https://github.com/tommyxchow/stawks',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
  },
] satisfies ProjectInfo[];
