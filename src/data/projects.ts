import { LinkInfo } from './links';

export const projects: ProjectInfo[] = [
  {
    id: 'stawks',
    name: 'Stawks',
    thumbnailLink: '/projects/stawks/thumbnail.png',
    shortDescription:
      'Web app that renders charts, details, and news for stocks.',
    highlights: [
      'Designed and developed by myself',
      'Utilized Chart.js to generate price history charts in several time frames',
      'Achieved high performance through incremental static regeneration with Next.js',
      'Data sourced from the IEX Cloud API',
    ],
    links: [{ title: 'Demo', href: 'https://stawks.vercel.app/' }],
    technologies: [
      'Chart.js',
      'React',
      'Next.js',
      'Tailwind CSS',
      'TypeScript',
      'Vercel',
    ],
  },
  {
    name: 'Frosty',
    thumbnailLink: '/projects/frosty/thumbnail.png',
    shortDescription: 'Mobile Twitch client with 7TV, BTTV, and FFZ support.',
    highlights: [
      'Designed and developed by myself',
      'Available on both iOS and Android',
      'Completely free and open-source (AGPLv3)',
      '70,000+ downloads',
      '10,000+ daily active users',
    ],
    links: [
      { title: 'Source', href: 'https://github.com/tommyxchow/frosty' },
      { title: 'Website', href: 'https://frostyapp.io' },
    ],
    id: 'frosty',
    technologies: [
      'Dart',
      'Fastlane',
      'Figma',
      'Flutter',
      'GitHub Actions',
      'MobX',
      'Sentry',
    ],
  },
  {
    name: 'frostyapp.io',
    thumbnailLink: '/projects/frosty-website/thumbnail.png',
    shortDescription: 'Marketing website for the Frosty app.',
    highlights: [
      'Designed and developed by myself',
      'Animated with Framer Motion',
    ],
    links: [
      { title: 'Demo', href: 'https://frostyapp.io' },
      { title: 'Source', href: 'https://github.com/tommyxchow/frostyapp.io' },
    ],
    id: 'frosty-website',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
  },
  {
    name: 'Study Seeker',
    shortDescription:
      'Social media platform aimed to help students find study partners.',

    thumbnailLink: '/projects/study-seeker/thumbnail.png',
    dateCompleted: '2022-05-06',
    highlights: [
      'Part of a frontend UI/UX university course',
      'Developed with an Agile team of six',
      'Utilized A/B and usability testing',
      'Fully responsive',
    ],
    links: [
      {
        title: 'Report',
        href: 'https://tommychow.notion.site/Study-Seeker-c42f020c7e3e445a93db95c403cac63b',
      },
      {
        title: 'Demo',
        href: 'https://webdev.cse.buffalo.edu/hci/teams/commitment',
      },
      {
        title: 'Figma',
        href: 'https://www.figma.com/file/QVP0FV2JZDv4nsMHetIabX/StudySeeker?node-id=0%3A1',
      },
      { title: 'Source', href: 'https://github.com/tommyxchow/study-seeker' },
    ],
    id: 'study-seeker',
    screenshotLinks: [
      '/projects/study-seeker/screenshots/home.png',
      '/projects/study-seeker/screenshots/search.png',
      '/projects/study-seeker/screenshots/profile.png',
      '/projects/study-seeker/screenshots/group.png',
      '/projects/study-seeker/screenshots/class.png',
    ],
    technologies: ['CSS', 'Figma', 'JavaScript', 'React'],
  },
  {
    name: 'Zeal',
    shortDescription:
      'Social web app that streamlines creating, exploring, and joining events.',

    thumbnailLink: '/projects/zeal/thumbnail.png',
    dateCompleted: '2021-12-04',
    highlights: [
      'Part of a software engineering university course',
      'Developed with an Agile team of five',
      'User stories and tasks organized on ZenHub',
      'Responsible for deployment via Heroku and Docker',
    ],
    links: [
      {
        title: 'Report',
        href: 'https://tommychow.notion.site/Zeal-b350a062459a40bc986ad29b9b092874',
      },
      {
        title: 'Demo',
        href: 'https://zeal5.herokuapp.com/',
      },
      {
        title: 'Figma',
        href: 'https://www.figma.com/file/aR9EqyzY9YERRAejHNCRDB/Zeal?node-id=0%3A1',
      },
      { title: 'Source', href: 'https://github.com/tommyxchow/zeal' },
    ],
    id: 'zeal',
    screenshotLinks: [
      '/projects/zeal/screenshots/profile.png',
      '/projects/zeal/screenshots/create.png',
      '/projects/zeal/screenshots/events.png',
    ],
    technologies: [
      'CSS',
      'Django',
      'Docker',
      'Figma',
      'Heroku',
      'JavaScript',
      'React',
    ],
  },
  {
    name: 'The Gallery',
    thumbnailLink: '/projects/the-gallery/thumbnail.png',
    dateCompleted: '2021-05-18',
    shortDescription:
      'Image-sharing web app developed to learn the foundations of web development.',
    highlights: [
      'Part of a web apps university course',
      'Developed by myself',
      'Zero web frameworks used',
      'HTTP, WebSockets, forms, auth, and SSR completed manually',
    ],
    links: [
      {
        title: 'Report',
        href: 'https://tommychow.notion.site/The-Gallery-72976df57529498ea41737e3904462eb',
      },
      { title: 'Source', href: 'https://github.com/tommyxchow/the-gallery' },
    ],
    id: 'the-gallery',
    technologies: ['CSS', 'Docker', 'HTML', 'JavaScript', 'Python'],
  },
  {
    name: 'Stock Chart Visualizer',
    thumbnailLink: '/projects/stocks/thumbnail.png',
    dateCompleted: '2019-05-18',
    shortDescription:
      'Web app that renders the price history and volume charts of stocks.',
    highlights: [
      'My first web app',
      'Developed by myself',
      'Utilized Replit as the IDE and bottle.py',
      'Sourced data from the IEX Cloud API',
    ],
    links: [
      {
        title: 'Report',
        href: 'https://tommychow.notion.site/Stock-Chart-Visualizer-d0e11594d5ee475cb5059dda4edc2a40',
      },
      {
        title: 'Demo',
        href: 'https://replit.com/@TommyChow/Stock-Chart-Visualizer',
      },
      {
        title: 'Source',
        href: 'https://github.com/tommyxchow/stock-chart-visualizer',
      },
    ],
    id: 'stock-chart-visualizer',
    technologies: ['CSS', 'HTML', 'Python', 'Replit'],
  },
];

export interface ProjectInfo {
  id: string;
  name: string;
  shortDescription: string;
  thumbnailLink: string;
  dateCompleted?: string;
  highlights: string[];
  links: LinkInfo[];
  screenshotLinks?: string[];
  technologies: string[];
}
