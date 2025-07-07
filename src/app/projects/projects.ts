import { type StaticImageData } from 'next/image'
import frostyThumbnail from './images/frosty.webp'
import hatchetThumbnail from './images/hatchet.webp'
import stawksThumbnail from './images/stawks.webp'
import vewdditThumbnail from './images/vewddit.webp'

export interface ProjectInfo {
  name: string
  description: string
  thumbnail: StaticImageData
  url: string
  githubUrl: string
}

export const projects = [
  {
    name: 'Frosty',
    description: 'Mobile Twitch client with third-party emote support',
    thumbnail: frostyThumbnail,
    url: 'https://frostyapp.io/',
    githubUrl: 'https://github.com/tommyxchow/frosty',
  },
  {
    name: 'Hatchet',
    description: 'Modern Hacker News reader with clean interface',
    thumbnail: hatchetThumbnail,
    url: 'https://hatchetnews.vercel.app/',
    githubUrl: 'https://github.com/tommyxchow/hatchet',
  },
  {
    name: 'Vewddit',
    description: 'Reddit media browser with AI-powered comment summaries',
    thumbnail: vewdditThumbnail,
    url: 'https://vewddit.vercel.app/',
    githubUrl: 'https://github.com/tommyxchow/vewddit',
  },
  {
    name: 'Stawks',
    description: 'Stock analytics dashboard with charts and market insights',
    thumbnail: stawksThumbnail,
    url: 'https://stawks.vercel.app/',
    githubUrl: 'https://github.com/tommyxchow/stawks',
  },
] satisfies ProjectInfo[]
