import { StaticImageData } from 'next/dist/client/image';
import detoxScreenshot1 from '../../public/assets/images/projects/detox/screenshot-1.webp';
import detoxScreenshot2 from '../../public/assets/images/projects/detox/screenshot-2.webp';
import detoxScreenshot3 from '../../public/assets/images/projects/detox/screenshot-3.webp';
import detoxThumbnail from '../../public/assets/images/projects/detox/thumbnail.webp';
import frostyWebsiteThumbnail from '../../public/assets/images/projects/frosty-website/thumbnail.webp';
import frostyThumbnail from '../../public/assets/images/projects/frosty/thumbnail.webp';
import stawksThumbnail from '../../public/assets/images/projects/stawks/thumbnail.webp';
import { LinkInfo } from './links';

export type ProjectInfo = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  thumbnail: StaticImageData;
  dateCompleted?: string;
  links?: LinkInfo[];
  screenshots?: StaticImageData[];
  technologies: string[];
  category: 'Professional' | 'Personal';
};

export default [
  {
    name: 'Frosty',
    thumbnail: frostyThumbnail,
    shortDescription: 'Mobile Twitch client with 7TV, BTTV, and FFZ support.',
    longDescription:
      "Between September 2021 and March 2022, I built and released Frosty, a cross-platform, open-source mobile app for Twitch featuring live streams and chat, custom emote support, customizable settings, and more.\nMy primary objective was to incorporate quality-of-life features from third-party web extensions that were lacking on Twitch's official mobile app. After unsuccessful attempts with SwiftUI and React Native, I switched to Flutter and began learning and building from scratch almost every day.\nWith some marketing through Reddit posts, a partnership with 7TV, and a successfully filled niche, Frosty gained over 200,000 downloads, 50,000 monthly active users, and a 4+ star rating on both app stores as of 2023.",

    links: [
      { title: 'Visit', href: 'https://frostyapp.io' },
      { title: 'Source', href: 'https://github.com/tommyxchow/frosty' },
    ],
    id: 'frosty',
    technologies: [
      'Dart',
      'Fastlane',
      'Figma',
      'Firebase',
      'Flutter',
      'GitHub Actions',
      'MobX',
    ],
    category: 'Personal',
  },
  {
    name: 'Detox',
    thumbnail: detoxThumbnail,
    shortDescription:
      "Web app that uses AI to analyze a user's Twitter feed for toxicity and provides them with a personalized MBTI score.",
    longDescription:
      "In March 2023, I led the frontend development for Wildr's Detox, a web app that utilizes an in-house AI model to analyze a user's Twitter feed for toxicity and render a personalized MBTI score.\nOur goal was to prepare a minimum viable product and market it at SXSW within two weeks. We collaborated with engineers, designers, marketing, and executives on a daily basis to efficiently ship the website using Next.js, Tailwind CSS, and AWS.\nAt SXSW, we received overwhelmingly positive feedback from attendees and gained hundreds of users during the event.\nUnfortunately, due to changes and limitations with the new Twitter API, we were forced to shut down the website a month later.",
    id: 'detox',
    technologies: [
      'AWS',
      'Firebase',
      'React',
      'React Query',
      'Next.js',
      'Tailwind CSS',
      'TypeScript',
    ],
    category: 'Professional',
    dateCompleted: '2023-03-20',
    screenshots: [detoxScreenshot1, detoxScreenshot2, detoxScreenshot3],
  },
  {
    id: 'stawks',
    name: 'Stawks',
    thumbnail: stawksThumbnail,
    dateCompleted: '2022-11-15',
    shortDescription:
      'Web app that renders charts, details, and news for stocks.',
    longDescription:
      'In November 2022, I designed and developed Stawks, a responsive web application that provides price history charts, financial details, and relevant news for a given stock ticker.\nMy goal was to experiment with data visualization and build a successor to my first-ever web app in 2019 using a modern tech stack. To do so, I utilized Figma to design a prototype and Next.js, Typescript, Chart.js, and Tailwind CSS to build a clean and highly performant frontend. By utilizing Next.js, I was able to achieve high performance through Incremental Static Regeneration (ISR), resulting in exceptional scores on Lighthouse.',
    links: [{ title: 'Visit', href: 'https://stawks.vercel.app/' }],
    technologies: [
      'Chart.js',
      'React',
      'Next.js',
      'Tailwind CSS',
      'TypeScript',
      'Vercel',
    ],
    category: 'Personal',
  },
  {
    name: 'frostyapp.io',
    thumbnail: frostyWebsiteThumbnail,
    shortDescription: 'Marketing website for the Frosty app.',
    longDescription:
      'In August 2022, I completed a complete redesign of frostyapp.io, the landing and marketing page for the Frosty app.\nDuring the preceding months, I researched other popular and flashy landing pages, inspiring me to bring more clarity, animation, and interaction in a redesign. Ultimately, I used Next.js, Tailwind CSS, and Framer Motion to create an interactive showcase of the Frosty app that allows you to preview it and browse screenshots of specific features.\nAs of 2023, frostyapp.io has 200,000+ impressions and 15,000+ views per month.',
    links: [
      { title: 'Visit', href: 'https://frostyapp.io' },
      { title: 'Source', href: 'https://github.com/tommyxchow/frostyapp.io' },
    ],
    id: 'frosty-website',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    category: 'Personal',
    dateCompleted: '2022-08-20',
  },
] satisfies ProjectInfo[];
