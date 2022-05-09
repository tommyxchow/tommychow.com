import type { NextPage } from 'next';
import { allBadges } from '../components/badge';
import Landing from '../components/landing';
import Layout from '../components/layout';
import { ProjectInfo } from '../components/project-card';

const Home: NextPage = () => {
  const myProjects: ProjectInfo[] = [
    {
      name: 'Frosty (Mobile App)',
      date: 'May 2022',
      description:
        'Twitch client for iOS and Android with BTTV, FFZ, and 7TV support.',
      imageLink: '/frosty-app.png',
      projectLink: 'https://github.com/tommyxchow/frosty',
      badges: [allBadges.openSource, allBadges.flutter],
      priority: true,
    },
    {
      name: 'Frosty (Website)',
      date: 'May 2022',
      description: 'Marketing website for the Frosty app.',
      imageLink: '/frosty-website.png',
      projectLink: 'https://github.com/tommyxchow/frostyapp.io',
      badges: [allBadges.nextJs, allBadges.tailwind, allBadges.typeScript],
      priority: true,
    },
  ];

  const schoolProjects: ProjectInfo[] = [
    {
      name: 'Study Seeker',
      date: 'May 2022',
      description:
        'Responsive social media platform aimed to help students find the best match for a potential study partner.',
      imageLink: '/study-seeker.jpg',
      projectLink: 'https://webdev.cse.buffalo.edu/hci/teams/commitment',
      badges: [allBadges.react, allBadges.css],
      priority: true,
    },
    {
      name: 'Zeal',
      date: 'December 2021',
      description:
        'Social web app that streamlines creating, exploring, and joining events.',
      imageLink: '/zeal.jpg',
      projectLink: 'https://github.com/Prakshal-Jain/Zeal',
      badges: [allBadges.react, allBadges.django],
      priority: true,
    },
    {
      name: 'The Gallery',
      date: 'May 2020',
      description:
        'Basic web app developed to learn the foundations of internet protocols and full-stack web development.',
      imageLink: '/gallery.jpg',
      projectLink: 'https://github.com/tommyxchow/the-gallery',
      badges: [allBadges.python, allBadges.html, allBadges.css],
    },
    {
      name: 'Stock Chart Visualizer',
      date: 'May 2019',
      description:
        'Simple web app that allows entering any stock ticker to see the relevant price history and volume charts.',
      imageLink: '/stonks.jpg',
      projectLink: 'https://github.com/tommyxchow/stock-chart-visualizer',
      badges: [allBadges.python, allBadges.html, allBadges.css],
    },
  ];

  return (
    <Layout description="Tommy Chow's Personal Website">
      <Landing />
    </Layout>
  );
};

export default Home;
