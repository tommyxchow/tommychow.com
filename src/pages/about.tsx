import Image from 'next/image';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout title='About | Tommy Chow' description='About Tommy Chow.'>
      <p>
        As a developer, I enjoy working with mobile and web frameworks including{' '}
        <ExternalLink href='https://flutter.dev/'>Flutter</ExternalLink>,{' '}
        <ExternalLink href='https://nextjs.org/'>Next.js</ExternalLink>, and{' '}
        <ExternalLink href='https://developer.apple.com/xcode/swiftui/'>
          SwiftUI
        </ExternalLink>
        . I focus on the front end but often dabble in the back end and DevOps.
        Occasionally, I’ll learn and research concepts in design, UI, and UX.
      </p>

      <p>
        I was born, raised, and currently live in NYC (
        <ExternalLink href='https://en.wikipedia.org/wiki/Queens'>
          Queens
        </ExternalLink>
        ). Growing up, I’d spend my free time researching the latest tech and
        playing video games (COD, League, MapleStory, every game made by Valve,
        and most triple-A single-player games to name a few).
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
        These days, I spend my free time learning new frameworks, working on
        side projects, watching streams on{' '}
        <ExternalLink href='https://www.twitch.tv/'>Twitch.tv</ExternalLink>,
        and playing video games with friends.
      </p>

      <p>
        A somewhat unusual hobby that I have is building and customizing
        mechanical keyboards (check out{' '}
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
        <Image
          src='/photos/keyboard.JPEG'
          alt='Photo of my keyboard, a custom build of the RAMA WORKS M65-B.'
          layout='fill'
        />
      </div>
    </Layout>
  );
};

export default About;
