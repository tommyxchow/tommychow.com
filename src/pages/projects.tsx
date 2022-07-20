import Image from 'next/image';
import Layout from '../components/layout';

const Projects = () => {
  const projects: ProjectInfo[] = [
    {
      name: 'Frosty for Twitch',
      date: '2022-06-22',
      description:
        'Twitch.tv client for iOS and Android with BTTV, FFZ, and 7TV support.',
      imageLink: '/projects/frosty-app.png',
      projectLink: 'https://github.com/tommyxchow/frosty',
    },
    {
      name: 'Frosty Website',
      date: '2022-06-22',
      description: 'Marketing website for the Frosty app.',
      imageLink: '/projects/frosty-website.png',
      projectLink: 'https://github.com/tommyxchow/frostyapp.io',
    },
    {
      name: 'Study Seeker',
      date: '2022-05-06',
      description:
        'Responsive social media platform aimed to help students find the best match for a potential study partner.',
      imageLink: '/projects/study-seeker.png',
      projectLink: 'https://github.com/tommyxchow/study-seeker',
    },
    {
      name: 'Zeal',
      date: '2021-12-04',
      description:
        'Social web app that streamlines creating, exploring, and joining events.',
      imageLink: '/projects/zeal.png',
      projectLink: 'https://github.com/tommyxchow/zeal',
    },
    {
      name: 'The Gallery',
      date: '2021-05-18',
      description:
        'Image sharing web app developed to learn internet protocols and full-stack web development.',
      imageLink: '/projects/gallery.jpg',
      projectLink: 'https://github.com/tommyxchow/the-gallery',
    },
    {
      name: 'Stock Chart Visualizer',
      date: '2019-05-18',
      description:
        'My first web app. Allows entering any stock ticker to see the relevant price history and volume charts.',
      imageLink: '/projects/stonks.jpg',
      projectLink: 'https://github.com/tommyxchow/stock-chart-visualizer',
    },
  ];

  return (
    <Layout
      title='Projects | Tommy Chow'
      description={"Tommy Chow's projects."}
    >
      <p className='mb-12 md:text-lg lg:col-span-2 lg:text-2xl'>
        I focus on creating mobile and web experiences that motivate me to learn
        and solve meaningful problems. All of my work is free and open-source by
        default.
      </p>

      <p className='mb-12 md:text-lg lg:col-span-2 lg:text-2xl'>
        To see all my projects check out my GitHub profile.
      </p>

      <ul className='col-span-full grid flex-col gap-8 md:grid-cols-2 lg:row-start-2'>
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </ul>
    </Layout>
  );
};

const ProjectCard = ({
  name,
  date,
  description,
  imageLink,
  projectLink,
}: ProjectInfo) => {
  return (
    <li className='group relative aspect-video'>
      <a href={projectLink} target='_blank' rel='noopener noreferrer'>
        <div className='absolute z-10 flex h-full w-full flex-col items-center justify-center gap-4 p-12 opacity-0 transition hover:bg-black hover:bg-opacity-80 hover:opacity-100'>
          <h2 className='text-2xl font-semibold text-neutral-100'>{name}</h2>
          <p className='text-center text-sm text-neutral-100'>{description}</p>
        </div>

        <Image
          src={imageLink}
          alt={`Thumbnail for ${name}.`}
          layout='fill'
          objectFit='cover'
        />
      </a>
    </li>
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
