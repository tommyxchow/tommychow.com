import { ProjectInfo } from './types';

export const githubLink = 'https://github.com/tommyxchow';
export const linkedInLink = 'https://www.linkedin.com/in/tommy-chow/';
export const email = 'tommyxchow@gmail.com';
export const source = 'https://github.com/tommyxchow/tommychow.com';

export const projects: ProjectInfo[] = [
  {
    name: 'Frosty',
    thumbnailLink: '/projects/frosty/thumbnail.png',
    shortDescription: 'Mobile Twitch client with 7TV, BTTV, and FFZ support.',
    longDescription:
      'Frosty is a mobile app built from the ground up aimed at enhancing the mobile Twitch.tv experience. It brings quality-of-life features and third-party emotes from 7TV, BetterTTV (BTTV), and FrankerFaceZ (FFZ) — popular extensions for Twitch used by millions — to both iOS and Android.',
    highlights: [
      'Designed and developed by myself',
      'Available on both iOS and Android',
      'Completely free and open-source (AGPLv3)',
      '25,000+ downloads',
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
    ],
  },
  {
    name: 'frostyapp.io',
    thumbnailLink: '/projects/frosty-website/thumbnail.png',
    shortDescription: 'Marketing website for the Frosty app.',
    longDescription:
      'The homepage and marketing website for Frosty, a mobile Twitch.tv client for iOS and Android.',
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
    longDescription:
      'Study Seeker is a web app that allows students to find the best match for a potential study partner. Instead of only being able to see a name and email like a typical Piazza post, Study Seeker allows you to view all the relevant info about a potential study partner at a glance. Students can customize their profile to have details like their major, classes taken, interests, and more in order to find the most compatible match for a study buddy. After their study session, students can also leave a detailed review to let others know how great or not-so-great they were as a study buddy. On the homepage, students can also see featured users that have the top rating across the site.',
    highlights: [
      'Part of a frontend UI/UX university course',
      'Developed with an Agile team of six',
      'Utilized A/B and usability testing',
      'Fully responsive',
    ],
    links: [
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
    longDescription:
      'Zeal is a web app that aims to help event organizers and participants easily discover, create, and join events. It was originally planned as a resource for helping students and hackathons find teammates through writing a prompt that OpenAI would analyze. Eventually, it was severely scaled down due to us recognizing that the work and scope would be far too large for a class project.',
    highlights: [
      'Part of a software engineering university course',
      'Developed with an Agile team of five',
      'User stories and tasks organized on ZenHub',
      'Responsible for deployment via Heroku and Docker',
    ],
    links: [
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
    longDescription:
      'The Gallery is a web app that features the ability to upload and share images, leave comments, and chat with other users. It was completed with no web frameworks in an effort to learn the foundations and ins-and-outs of certain protocols and backend web development.',
    shortDescription:
      'Image-sharing web app developed to learn the foundations of web development.',
    highlights: [
      'Part of a web apps university course',
      'Developed by myself',
      'Zero web frameworks used',
      'HTTP, WebSockets, forms, auth, and SSR completed manually',
    ],
    links: [
      { title: 'Source', href: 'https://github.com/tommyxchow/the-gallery' },
    ],
    id: 'the-gallery',
    technologies: ['CSS', 'Docker', 'HTML', 'JavaScript', 'Python'],
  },
  {
    name: 'Stock Chart Visualizer',
    thumbnailLink: '/projects/stocks/thumbnail.png',
    dateCompleted: '2019-05-18',
    longDescription:
      'This project was completed as part of an intro to computer science course during my freshman year at UB. It is a simple web app that allows you to enter any stock ticker and obtain the relevant price history and volume charts. There are also timeline options ranging from one day to five years.',
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
        title: 'Demo',
        href: 'https://replit.com/@TommyChow/Stock-Chart-Visualizer',
      },
      {
        title: 'Source',
        href: 'https://github.com/tommyxchow/stock-chart-visualizer',
      },
    ],
    id: 'stock-chart-visualizer',
    technologies: ['CSS', 'HTML', 'Python'],
  },
];
