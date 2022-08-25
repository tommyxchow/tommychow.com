import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { githubLink } from '../constants';
import { ProjectInfo } from '../types';

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <Layout
      title='Projects | Tommy Chow'
      description={"Tommy Chow's projects."}
      header='Selected Projects'
    >
      <p>
        I enjoy creating mobile and web experiences that are useful, solve
        meaningful problems, and motivate me to learn. The projects here are
        meant to showcase my growth, diversity, and versatility as a software
        developer.
        <br />
        <br />
        Overall, I was able to gain hands-on experience with a variety of topics
        including open-source, popular frameworks, UI and UX design, usability
        and A/B testing, wireframing, deployment, CI/CD, common Agile practices,
        and teamwork/leadership.
        <br />
        <br />
        All of my work is free and open-source by default. To see them all,
        check out{' '}
        <ExternalLink href={githubLink}>my GitHub profile</ExternalLink>!
      </p>

      <ul className='mb-8 flex flex-col gap-4 sm:mb-16 sm:gap-8'>
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </ul>
    </Layout>
  );
};

interface ProjectsProps {
  projects: ProjectInfo[];
}

export default Projects;
