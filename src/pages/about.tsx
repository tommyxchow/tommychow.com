import ExternalLink from '../components/ExternalLink';
import Section from '../components/HomeSection';
import Layout from '../components/Layout';
import { githubLink } from '../constants';

const About = () => {
  return (
    <Layout title='About | Tommy Chow' description='About Tommy Chow.'>
      <Section header='About'>
        <p>
          I graduated from the{' '}
          <ExternalLink
            text='University at Buffalo'
            href='https://www.buffalo.edu/'
          />{' '}
          in May 2022 with a Bachelor of Science in Computer Science. I&apos;m a
          passionate mobile and web developer based in New York City who enjoys
          UI and UX design and working with declarative front-end frameworks
          including <ExternalLink text='Flutter' href='https://flutter.dev/' />,{' '}
          <ExternalLink text='React' href='https://reactjs.org/' />, and{' '}
          <ExternalLink
            text='SwiftUI'
            href='https://developer.apple.com/xcode/swiftui/'
          />
          .
          <br />
          <br />
          Beyond the software development world, I was born and raised in{' '}
          <ExternalLink
            text='Queens, NY'
            href='https://en.wikipedia.org/wiki/Queens'
          />
          , where I discovered my favorite foods such as sushi, fried chicken,
          halal, and Korean BBQ. When I&apos;m not busy eating or programming,
          I&apos;ll probably be playing video games online with friends and
          watching live streams on{' '}
          <ExternalLink text='Twitch' href='https://www.twitch.tv/' />.
          <br />
          <br />A somewhat unusual hobby that I have is building and customizing
          mechanical keyboards (check out{' '}
          <ExternalLink
            text='/r/MechanicalKeyboards'
            href='https://www.reddit.com/r/MechanicalKeyboards'
          />{' '}
          if you&apos;re curious!). My current keyboard is the{' '}
          <ExternalLink
            text='RAMA WORKS M65-B'
            href='https://rama.works/m65-b'
          />{' '}
          with{' '}
          <ExternalLink
            text='GMK Oblivion V2 keycaps'
            href='https://drop.com/buy/drop-oblotzky-gmk-oblivion-v2-custom-keycap-set'
          />{' '}
          and{' '}
          <ExternalLink
            text='Boba U4 Silent switches'
            href='https://stupidbulletstech.com/products/gazzew-boba-u4-silent-tactile-with-clear-top'
          />
          .
        </p>
      </Section>
    </Layout>
  );
};

export default About;
