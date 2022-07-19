import Layout from '../components/layout';

const About = () => {
  return (
    <Layout title='About | Tommy Chow' description='About Tommy Chow.'>
      <p className='font-medium'>
        I graduated from the University at Buffalo in May 2022 with a Bachelor
        of Science in Computer Science. I&apos;m a passionate mobile and web
        developer based in NYC who enjoys UI and UX design and working with
        declarative front-end frameworks including Flutter, React, and SwiftUI.
        For more insight into my development experience, check out my GitHub
        profile!
        <br />
        <br />
        Beyond the software development world, I was born and raised in Queens,
        NY, where I discovered my favorite foods such as sushi, fried chicken,
        halal, and Korean BBQ. When I&apos;m not busy eating or programming,
        I&apos;ll probably be playing video games online with friends and
        watching live streams on Twitch.
        <br />
        <br />A somewhat unusual hobby that I have is building and customizing
        mechanical keyboards (check out{' '}
        <a
          className='hover:underline'
          href={'https://www.reddit.com/r/MechanicalKeyboards'}
          target='_blank'
          rel='noreferrer'
        >
          /r/MechanicalKeyboards on Reddit
        </a>{' '}
        if you&apos;re curious!). My current keyboard is the{' '}
        <a
          className='hover:underline'
          href='https://rama.works/m65-b'
          target='_blank'
          rel='noreferrer'
        >
          RAMA WORKS M65-B
        </a>{' '}
        with{' '}
        <a
          className='hover:underline'
          href='https://drop.com/buy/drop-oblotzky-gmk-oblivion-v2-custom-keycap-set'
          target='_blank'
          rel='noreferrer'
        >
          GMK Oblivion V2 keycaps
        </a>{' '}
        and{' '}
        <a
          className='hover:underline'
          href='https://stupidbulletstech.com/products/gazzew-boba-u4-silent-tactile-with-clear-top'
          target='_blank'
          rel='noreferrer'
        >
          Boba U4 Silent switches
        </a>
        .
      </p>
    </Layout>
  );
};

export default About;
