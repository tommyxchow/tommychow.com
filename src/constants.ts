import { ProjectInfo } from './types';

export const githubLink = 'https://github.com/tommyxchow';
export const linkedInLink = 'https://www.linkedin.com/in/tommy-chow/';
export const email = 'tommyxchow@gmail.com';

export const projects: ProjectInfo[] = [
  {
    name: 'Frosty for Twitch',
    thumbnailLink: '/projects/frosty-app.png',
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
  },
  {
    name: 'Frosty Website',
    thumbnailLink: '/projects/frosty-website.png',
    shortDescription: 'Marketing website for the Frosty app.',
    longDescription:
      'The homepage and marketing website for Frosty, a mobile Twitch.tv client for iOS and Android. Built with Next.js, styled with Tailwind CSS, and deployed with Vercel.',
    background: '',

    links: [
      { title: 'Source', href: 'https://github.com/tommyxchow/frostyapp.io' },
      { title: 'Live Demo', href: 'https://frostyapp.io' },
    ],
    id: 'frosty-website',
    screenshotLinks: [],
  },
  {
    name: 'Study Seeker',
    shortDescription:
      'Responsive social media platform aimed to help students find the best match for a potential study partner.',
    background: '',

    thumbnailLink: '/projects/study-seeker.png',
    dateCompleted: '2022-05-06',
    longDescription:
      'Study Seeker is a web app that allows students to find the best match for a potential study partner. Instead of only being able to see a name and email like a typical Piazza post, Study Seeker allows you to view all the relevant info about a potential study partner at a glance. Students can customize their profile to have details like their major, classes taken, interests, and more in order to find the most compatible match for a study buddy. After their study session, students can also leave a detailed review to let others know how great or not-so-great they were as a study buddy. On the homepage, students can also see featured users that have the top rating across the site.',
    links: [
      { title: 'Source', href: 'https://github.com/tommyxchow/study-seeker' },
      {
        title: 'Figma',
        href: 'https://www.figma.com/file/QVP0FV2JZDv4nsMHetIabX/StudySeeker?node-id=0%3A1',
      },
      {
        title: 'Live Demo',
        href: 'https://webdev.cse.buffalo.edu/hci/teams/commitment',
      },
    ],
    id: 'study-seeker',
    screenshotLinks: [],
  },
  {
    name: 'Zeal',
    shortDescription:
      'Social web app that streamlines creating, exploring, and joining events.',
    background: '',

    thumbnailLink: '/projects/zeal.png',
    dateCompleted: '2021-12-04',
    longDescription:
      'Zeal is a web app that aims to help event organizers and participants easily discover, create, and join events. It was originally planned as a resource for helping students and hackathons find teammates through writing a prompt that would be analyzed by OpenAI, but it was severely scaled down due to us recognizing that the work and scope would be far too large for a class project.',
    links: [
      { title: 'Source', href: 'https://github.com/tommyxchow/zeal' },
      {
        title: 'Figma',
        href: 'https://www.figma.com/file/aR9EqyzY9YERRAejHNCRDB/Zeal?node-id=0%3A1',
      },
      {
        title: 'Live Demo',
        href: 'https://zeal5.herokuapp.com/',
      },
    ],
    id: 'zeal',
    screenshotLinks: [],
  },
  {
    name: 'The Gallery',
    thumbnailLink: '/projects/gallery.jpg',
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
  },
  {
    name: 'Stock Chart Visualizer',
    thumbnailLink: '/projects/stonks.png',
    dateCompleted: '2019-05-18',
    longDescription:
      'This project was completed as part of an intro to computer science course during my freshman year at UB. It is a simple web app that allows you to enter any stock ticker and obtain the relevant price history and volume charts. There are also timeline options ranging from one day to five years.',
    shortDescription:
      'Web app that allows entering any stock ticker to see the relevant price history and volume charts.',
    background: '',

    links: [
      {
        title: 'Source',
        href: 'https://github.com/tommyxchow/stock-chart-visualizer',
      },
      {
        title: 'Demo Link',
        href: 'https://replit.com/@TommyChow/Stock-Chart-Visualizer',
      },
    ],
    id: 'stock-chart-visualizer',
  },
];
