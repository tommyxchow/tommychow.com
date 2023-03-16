import CustomImage from '../components/CustomImage';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout title='About | Tommy Chow' description='About Tommy Chow.'>
      <div className='flex flex-col gap-4 text-neutral-700 dark:text-neutral-300'>
        <p>
          I was born, raised, and currently live in NYC, specifically in Queens.
          Growing up, I spent my leisure time playing the piano, being an avid
          tech enthusiast, and playing an excessive amount of PC and console
          games.
        </p>

        <p>
          In 2019, after completing one semester of studying finance at Baruch
          College, I made an impulsive decision to transfer to the University at
          Buffalo to pursue a computer science degree instead. Despite having no
          prior programming experience, I was able to learn rapidly and
          discovered my passion for mobile and web development. I graduated with
          honors in 2022 with a Bachelor of Science in Computer Science.
        </p>

        <p>
          As a developer, I am skilled in working with mobile and web frameworks
          such as Flutter, Next.js, React Native, and SwiftUI. I concentrate on
          the front-end, but I also have experience in back-end and DevOps. From
          time to time, I delve into the concepts of design, UI, and UX.
        </p>

        <p>
          One of my favorite hobbies is building and customizing mechanical
          keyboards. My current keyboard is the QK75 with GMK Monokai Material
          keycaps and Gateron Oil King switches. My previous keyboard was a RAMA
          WORKS M65-B with GMK Oblivion V2 keycaps and Boba U4 Silent switches.
        </p>

        <div className='relative aspect-[4/3] shadow-lg'>
          <CustomImage
            src='/assets/images/about/keyboard-1.webp'
            alt='Photo of my keyboard, a custom build of the RAMA WORKS M65-B.'
          />
        </div>
      </div>
    </Layout>
  );
};

export default About;
