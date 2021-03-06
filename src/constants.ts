import { ProjectInfo } from './types';

export const githubLink = 'https://github.com/tommyxchow';
export const linkedInLink = 'https://www.linkedin.com/in/tommy-chow/';
export const email = 'tommyxchow@gmail.com';
export const source = 'https://github.com/tommyxchow/tommychow.com';

export const projects: ProjectInfo[] = [
  {
    name: 'Frosty for Twitch',
    thumbnailLink: '/projects/frosty/thumbnail.png',
    shortDescription:
      'Twitch.tv client for iOS and Android with BTTV, FFZ, and 7TV support.',
    longDescription:
      'Frosty is a mobile app built from the ground up aimed at enhancing the mobile Twitch.tv experience. It brings quality-of-life features and third-party emotes from BetterTTV (BTTV), FrankerFaceZ (FFZ), and 7TV — popular extensions for Twitch used by millions — to both iOS and Android.',
    background: '',
    links: [
      { title: 'Source', href: 'https://github.com/tommyxchow/frosty' },
      { title: 'Website', href: 'https://frostyapp.io' },
    ],
    id: 'frosty',
    technologies: ['Dart', 'Figma', 'Flutter', 'GitHub Actions', 'MobX'],
  },
  {
    name: 'Frosty Website',
    thumbnailLink: '/projects/frosty-website/thumbnail.png',
    shortDescription: 'Marketing website for the Frosty app.',
    longDescription:
      'The homepage and marketing website for Frosty, a mobile Twitch.tv client for iOS and Android. Built with Next.js, styled with Tailwind CSS, and deployed with Vercel.',
    background: '',

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
      'Responsive social media platform aimed to help students find the best match for a potential study partner.',
    background: '',

    thumbnailLink: '/projects/study-seeker/thumbnail.png',
    dateCompleted: '2022-05-06',
    longDescription:
      'Study Seeker is a web app that allows students to find the best match for a potential study partner. Instead of only being able to see a name and email like a typical Piazza post, Study Seeker allows you to view all the relevant info about a potential study partner at a glance. Students can customize their profile to have details like their major, classes taken, interests, and more in order to find the most compatible match for a study buddy. After their study session, students can also leave a detailed review to let others know how great or not-so-great they were as a study buddy. On the homepage, students can also see featured users that have the top rating across the site.',
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
      '/projects/study-seeker/screenshots/landing.png',
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
    background: '',

    thumbnailLink: '/projects/zeal/thumbnail.png',
    dateCompleted: '2021-12-04',
    longDescription:
      'Zeal is a web app that aims to help event organizers and participants easily discover, create, and join events. It was originally planned as a resource for helping students and hackathons find teammates through writing a prompt that OpenAI would analyze. Eventually, it was severely scaled down due to us recognizing that the work and scope would be far too large for a class project.',
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
      '/projects/zeal/screenshots/landing.png',
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
      'The Gallery is a web app that features the ability to upload and share images, leave comments, and chat with other users. It was completed with minimal frameworks in an effort to learn the foundations and ins-and-outs of certain protocols and backend web development.',
    shortDescription:
      'Image sharing web app developed to learn internet protocols and full-stack web development.',
    background: '',

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
      'Web app that allows entering any stock ticker to see the relevant price history and volume charts.',
    background: '',

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
