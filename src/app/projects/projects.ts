import { type StaticImageData } from 'next/image';
import frostyThumbnail from './images/frosty.webp';
import hatchetThumbnail from './images/hatchet.webp';
import stawksThumbnail from './images/stawks.webp';
import vewdditThumbnail from './images/vewddit.webp';

export interface ProjectInfo {
  name: string;
  description: string;
  thumbnail: StaticImageData;
  url: string;
  githubUrl: string;
}

export const projects = [
  {
    name: 'Frosty',
    description:
      'Watch Twitch streams and chat with third-party emotes on iOS and Android',
    thumbnail: frostyThumbnail,
    url: 'https://frostyapp.io/',
    githubUrl: 'https://github.com/tommyxchow/frosty',
  },
  {
    name: 'Hatchet',
    description: 'A more modern way to browse and read Hacker News',
    thumbnail: hatchetThumbnail,
    url: 'https://hatchetnews.vercel.app/',
    githubUrl: 'https://github.com/tommyxchow/hatchet',
  },
  {
    name: 'Vewddit',
    description: 'Explore media on Reddit with AI comment summaries',
    thumbnail: vewdditThumbnail,
    url: 'https://vewddit.vercel.app/',
    githubUrl: 'https://github.com/tommyxchow/vewddit',
  },
  {
    name: 'Stawks',
    description:
      'View price history charts, financial details, and relevant news for stocks',
    thumbnail: stawksThumbnail,
    url: 'https://stawks.vercel.app/',
    githubUrl: 'https://github.com/tommyxchow/stawks',
  },
] satisfies ProjectInfo[];
