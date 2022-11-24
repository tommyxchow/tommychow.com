import CustomImage from '../components/CustomImage';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout title='About | Tommy Chow' description='About Tommy Chow.'>
      <div className='flex flex-col gap-4'>
        <p>
          I was born, raised, and currently live in NYC (
          <ExternalLink href='https://en.wikipedia.org/wiki/Queens'>
            Queens
          </ExternalLink>
          ). Growing up, I&apos;d spend my free time researching the latest tech
          and playing video games (COD, League, MapleStory, every game made by
          Valve, and most triple-A single-player games to name a few).
        </p>

        <p>
          After one semester of pursuing a finance degree at{' '}
          <ExternalLink href='https://www.baruch.cuny.edu/'>
            Baruch College
          </ExternalLink>
          , in 2019 I spontaneously decided to transfer to the{' '}
          <ExternalLink href='https://www.buffalo.edu/'>
            University at Buffalo
          </ExternalLink>{' '}
          to pursue a computer science degree instead. Despite having no prior
          experience in programming, I was able to learn quickly and discover my
          passion for mobile and web development. In 2022, I graduated magna cum
          laude with a Bachelor of Science in Computer Science.
        </p>

        <p>
          As a developer, I enjoy working with mobile and web frameworks
          including{' '}
          <ExternalLink href='https://flutter.dev/'>Flutter</ExternalLink>,{' '}
          <ExternalLink href='https://nextjs.org/'>Next.js</ExternalLink>,{' '}
          <ExternalLink href='https://reactnative.dev/'>
            React Native
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href='https://developer.apple.com/xcode/swiftui/'>
            SwiftUI
          </ExternalLink>
          . I focus on the front end but often work in the back end and DevOps.
          Occasionally, I&apos;ll learn and research concepts in design, UI, and
          UX.
        </p>

        <p>
          One of my hobbies is building and customizing mechanical keyboards
          (check out{' '}
          <ExternalLink href='https://www.reddit.com/r/MechanicalKeyboards'>
            /r/MechanicalKeyboards
          </ExternalLink>{' '}
          if you&apos;re curious!). My current keyboard is the{' '}
          <ExternalLink href='https://rama.works/m65-b'>
            RAMA WORKS M65-B
          </ExternalLink>{' '}
          with{' '}
          <ExternalLink href='https://drop.com/buy/drop-oblotzky-gmk-oblivion-v2-custom-keycap-set'>
            GMK Oblivion V2 keycaps
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href='https://stupidbulletstech.com/products/gazzew-boba-u4-silent-tactile-with-clear-top'>
            Boba U4 Silent switches
          </ExternalLink>
          .
        </p>

        <div className='relative aspect-[4/3] shadow-lg'>
          <CustomImage
            src='/photos/keyboard.JPEG'
            alt='Photo of my keyboard, a custom build of the RAMA WORKS M65-B.'
          />
        </div>
      </div>
    </Layout>
  );
};

export default About;
