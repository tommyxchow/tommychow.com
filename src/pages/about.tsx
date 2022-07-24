import Image from 'next/image';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout title='About | Tommy Chow' description='About Tommy Chow.'>
      <h1 className='text-2xl font-bold'>About</h1>

      <p>
        I graduated from the{' '}
        <ExternalLink href='https://www.buffalo.edu/'>
          University at Buffalo
        </ExternalLink>{' '}
        in May 2022 with a Bachelor of Science in Computer Science. I&apos;m a
        passionate mobile and web developer based in New York City who enjoys UI
        and UX design and working with declarative front-end frameworks
        including{' '}
        <ExternalLink href='https://flutter.dev/'>Flutter</ExternalLink>,{' '}
        <ExternalLink href='https://reactjs.org/'>React</ExternalLink>, and{' '}
        <ExternalLink href='https://developer.apple.com/xcode/swiftui/'>
          SwiftUI
        </ExternalLink>
        .
      </p>

      <div className='space-y-8'>
        <div className='relative aspect-video'>
          <Image
            priority
            src='/photos/nyc.JPEG'
            alt='Landscape shot from the airplane window seat of the New York City skyline during sunset.'
            layout='fill'
            objectFit='cover'
            quality={100}
          />
        </div>

        <div className='relative aspect-video'>
          <Image
            priority
            src='/photos/flushing.JPEG'
            alt='Night shot of main street in Flushing, NY.'
            layout='fill'
            objectFit='cover'
            quality={100}
          />
        </div>
      </div>

      <p>
        Beyond the software development world, I was born and raised in{' '}
        <ExternalLink href='https://en.wikipedia.org/wiki/Queens'>
          Queens, NY
        </ExternalLink>
        , where I discovered my favorite foods such as sushi, fried chicken,
        halal, and Korean BBQ. When I&apos;m not busy eating or programming,
        I&apos;ll probably be playing video games online with friends and
        watching live streams on{' '}
        <ExternalLink href='https://www.twitch.tv/'>Twitch</ExternalLink>.
      </p>

      <div className='relative aspect-[3/4]'>
        <Image
          src='/photos/bbq.JPEG'
          alt='POV of me eating Korean at Picnic Garden in Queens, NY. I am also watching xQc on Twitch on my phone.'
          layout='fill'
          quality={100}
        />
      </div>

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

      <div className='relative aspect-[4/3]'>
        <Image
          src='/photos/keyboard.JPEG'
          alt='Photo of my keyboard, a custom build of the RAMA WORKS M65-B.'
          layout='fill'
          quality={100}
        />
      </div>
    </Layout>
  );
};

export default About;
