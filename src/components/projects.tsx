import { motion, Variants } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';
import { allBadges } from './badge';
import ProjectCard, { ProjectInfo } from './project-card';
import ResumeSection from './resume-section';

const Projects = () => {
  const projects: ProjectInfo[] = [
    {
      name: 'Frosty (Mobile App)',
      date: '2022-06-22',
      description:
        'Twitch.tv client for iOS and Android with BTTV, FFZ, and 7TV support.',
      imageLink: '/frosty-app.png',
      projectLink: 'https://github.com/tommyxchow/frosty',
      badges: [allBadges.openSource, allBadges.flutter],
      priority: true,
    },
    {
      name: 'Frosty (Website)',
      date: '2022-06-22',
      description: 'Marketing website for the Frosty app.',
      imageLink: '/frosty-website.png',
      projectLink: 'https://github.com/tommyxchow/frostyapp.io',
      badges: [allBadges.nextJs, allBadges.tailwind, allBadges.typeScript],
      priority: true,
    },
    {
      name: 'Study Seeker',
      date: '2022-05-06',
      description:
        'Responsive social media platform aimed to help students find the best match for a potential study partner.',
      imageLink: '/study-seeker.jpg',
      projectLink: 'https://webdev.cse.buffalo.edu/hci/teams/commitment',
      badges: [allBadges.react, allBadges.css],
      priority: true,
    },
    {
      name: 'Zeal',
      date: '2021-12-04',
      description:
        'Social web app that streamlines creating, exploring, and joining events.',
      imageLink: '/zeal.jpg',
      projectLink: 'https://github.com/Prakshal-Jain/Zeal',
      badges: [allBadges.react, allBadges.django],
      priority: true,
    },
    {
      name: 'The Gallery',
      date: '2021-05-18',
      description:
        'Image sharing web app developed to learn internet protocols and full-stack web development.',
      imageLink: '/gallery.jpg',
      projectLink: 'https://github.com/tommyxchow/the-gallery',
      badges: [allBadges.python, allBadges.html, allBadges.css],
    },
    {
      name: 'Stock Chart Visualizer',
      date: '2019-05-18',
      description:
        'My first web app. Allows entering any stock ticker to see the relevant price history and volume charts.',
      imageLink: '/stonks.jpg',
      projectLink: 'https://github.com/tommyxchow/stock-chart-visualizer',
      badges: [allBadges.python, allBadges.html, allBadges.css],
    },
  ];

  const variants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <ResumeSection id='projects' icon={<FaLightbulb />} heading='Projects'>
      <motion.p variants={variants} className='mb-8 md:text-lg'>
        Below are some of the projects that I&apos;ve worked on directly which
        contributed immensely to my growth as a developer. I was able to gain
        hands-on experience with open-source, popular frameworks, UI and UX
        design, usability and A/B testing, wireframing, deployment, CI/CD,
        common Agile practices, teamwork, leadership, and more!
      </motion.p>

      <motion.ul
        variants={variants}
        className='-mx-8 flex snap-x gap-8 overflow-auto py-6 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-8 lg:grid-cols-3'
      >
        {projects.map((project) => (
          <li key={project.name}>
            <ProjectCard {...project} />
          </li>
        ))}
      </motion.ul>
    </ResumeSection>
  );
};

export default Projects;
