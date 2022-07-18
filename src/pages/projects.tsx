import Layout from '../components/layout';

const Projects = () => {
  const projects: ProjectInfo[] = [
    {
      name: 'Frosty',
      date: '2022-06-22',
      description:
        'Twitch.tv client for iOS and Android with BTTV, FFZ, and 7TV support.',
      imageLink: '/frosty-app.png',
      projectLink: 'https://github.com/tommyxchow/frosty',
    },
    {
      name: 'Study Seeker',
      date: '2022-05-06',
      description:
        'Responsive social media platform aimed to help students find the best match for a potential study partner.',
      imageLink: '/study-seeker.jpg',
      projectLink: 'https://github.com/tommyxchow/study-seeker',
    },
    {
      name: 'Zeal',
      date: '2021-12-04',
      description:
        'Social web app that streamlines creating, exploring, and joining events.',
      imageLink: '/zeal.jpg',
      projectLink: 'https://github.com/Prakshal-Jain/Zeal',
    },
    {
      name: 'The Gallery',
      date: '2021-05-18',
      description:
        'Image sharing web app developed to learn internet protocols and full-stack web development.',
      imageLink: '/gallery.jpg',
      projectLink: 'https://github.com/tommyxchow/the-gallery',
    },
    {
      name: 'Stock Chart Visualizer',
      date: '2019-05-18',
      description:
        'My first web app. Allows entering any stock ticker to see the relevant price history and volume charts.',
      imageLink: '/stonks.jpg',
      projectLink: 'https://github.com/tommyxchow/stock-chart-visualizer',
    },
  ];

  return (
    <Layout
      title={"Tommy Chow's Projects"}
      description={"Tommy Chow's Projects"}
    >
      <div className='flex flex-col gap-8'>
        <p>
          I focus on creating mobile and web experiences that motivate me to
          learn and solve meaningful problems. All of my work is free and
          open-source by default.
        </p>

        <ul className='flex flex-col gap-4'>
          {projects.map((project) => (
            <Project key={project.name} {...project} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

const Project = ({
  name,
  date,
  description,
  imageLink,
  projectLink,
}: ProjectInfo) => {
  return (
    <div>
      <h1 className='text-xl font-semibold'>{name}</h1>
      <p className='text-sm'>{description}</p>
    </div>
  );
};

interface ProjectInfo {
  name: string;
  date: string;
  description: string;
  imageLink: string;
  projectLink: string;
}

export default Projects;
