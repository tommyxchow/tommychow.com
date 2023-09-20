import profilePicture from '../../public/assets/images/me.jpg';
import Badge from '../components/Badge';
import CustomImage from '../components/CustomImage';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { currentJob, links } from '../data/links';
import projects from '../data/projects';

const Home = () => {
  return (
    <Layout title='Tommy Chow'>
      <div>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-md'>
              <CustomImage
                priority
                src={profilePicture}
                alt='Portrait photo of me wearing my graduation gown with a flowery backdrop.'
              />
            </div>
            <hgroup>
              <h1 className='text-2xl font-bold'>Tommy Chow</h1>
              <p className='font-medium text-neutral-600 dark:text-neutral-400'>
                Software Engineer
              </p>
            </hgroup>
          </div>

          <ul className='flex flex-wrap gap-2'>
            {links.slice(0, 4).map((link) => (
              <li key={link.title}>
                <Badge icon={link.icon} title={link.title} href={link.href} />
              </li>
            ))}
          </ul>
        </div>

        <section className='prose prose-neutral mt-8 dark:prose-invert prose-a:no-underline'>
          <h3>Hey!</h3>
          <p>
            I&apos;m Tommy, a software engineer based in NYC. I enjoy designing
            and developing performant, usable, and beautiful experiences on
            mobile and web.
          </p>

          <p>
            During 2023, I was part of the frontend software engineering team at{' '}
            <ExternalLink href={currentJob}>Wildr</ExternalLink>, a social media
            startup based in San Francisco. I built a variety of new products
            and features including &quot;Challenges&quot; and &quot;Detox&quot;.
          </p>

          <p>
            Between 2021-2022, I designed, developed, and launched{' '}
            <ExternalLink href='https://www.frostyapp.io/'>Frosty</ExternalLink>
            , an open-source mobile app for Twitch. It now has 250,000+
            downloads and 50,000+ monthly users.
          </p>
        </section>

        <section className='prose prose-neutral mt-8 dark:prose-invert prose-a:no-underline'>
          <h3>Featured</h3>
          <div className='flex flex-col gap-4'>
            <ProjectCard project={projects[0]} />
            <ProjectCard project={projects[1]} />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
