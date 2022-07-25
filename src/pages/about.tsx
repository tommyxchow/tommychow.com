import Image from 'next/image';
import ExternalLink from '../components/ExternalLink';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout title='About | Tommy Chow' description='About Tommy Chow.'>
      <h1 className='text-2xl font-bold'>About</h1>
      <p>
        I was born, raised, and currently live in{' '}
        <ExternalLink href='https://en.wikipedia.org/wiki/Queens'>
          Queens, NY
        </ExternalLink>
        . During my youth, I&apos;d jailbreak and root smartphones, research and
        build gaming computers, and of course play plenty of PC games (
        <ExternalLink href='https://store.steampowered.com/app/240/CounterStrike_Source/'>
          Counter-Strike: Source
        </ExternalLink>
        ,{' '}
        <ExternalLink href='https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/'>
          Counter-Strike: Global Offensive
        </ExternalLink>
        , and{' '}
        <ExternalLink href='https://store.steampowered.com/app/4000/Garrys_Mod/'>
          Garry&apos;s Mod
        </ExternalLink>{' '}
        to name a few).
      </p>

      <div className='space-y-8'>
        <div className='relative aspect-video shadow-lg'>
          <Image
            priority
            src='/photos/nyc.JPEG'
            alt='Landscape shot from the airplane window seat of the New York City skyline during sunset.'
            layout='fill'
            objectFit='cover'
          />
        </div>

        <div className='relative aspect-video shadow-lg'>
          <Image
            priority
            src='/photos/flushing.JPEG'
            alt='Night shot of main street in Flushing, NY.'
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>

      <p>
        After graduating from high school, I began to pursue a finance degree at{' '}
        <ExternalLink href='https://www.baruch.cuny.edu/'>
          Baruch College
        </ExternalLink>{' '}
        in Fall 2018. Midway through the semester, I realized that the business
        and finance career probably wasn’t for me, so I decided to transfer to
        the{' '}
        <ExternalLink href='https://www.buffalo.edu/'>
          University at Buffalo (UB)
        </ExternalLink>{' '}
        the following semester to pursue a computer science degree.
        <br />
        <br />
        Despite spontaneously transferring to a field I had no prior experience
        in, I soon realized how much I loved creatively building solutions to
        solve real problems just by sitting at my computer. I already enjoy and
        spend a lot of time sitting at my computer, so getting paid to do it as
        a career sounded cool to me. Eventually, after taking a web apps course
        (<ExternalLink href='https://cse312.com/'>CSE 312</ExternalLink>) at UB,
        I discovered my strong passion for frontend and mobile development.
      </p>

      <div className='relative aspect-[3/4] shadow-lg'>
        <Image
          priority
          src='/photos/ub.JPEG'
          alt='Day shot of the South Campus at the University at Buffalo.'
          layout='fill'
          objectFit='cover'
        />
      </div>

      <p>
        These days, I&apos;ll mostly be at my computer working on my side
        projects, watching live streams on{' '}
        <ExternalLink href='https://www.twitch.tv/'>Twitch.tv</ExternalLink>,
        and playing video games with friends.
        <br />
        <br />
        If you want to make me happy, your best bet is with some of my favorite
        foods. My food palette is far from unique, but I do love eating Korean
        BBQ and fried chicken, sushi, chicken over rice from halal carts, and of
        course bubble tea.
      </p>

      <div className='relative aspect-[3/4] shadow-lg'>
        <Image
          src='/photos/bbq.JPEG'
          alt='POV of me eating Korean at Picnic Garden in Queens, NY. I am also watching xQc on Twitch on my phone.'
          layout='fill'
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
