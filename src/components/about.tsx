import Image from 'next/image';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import ResumeSection from './resume-section';

const About = () => {
  const imageNames = ['nyc', 'queens', 'ub'];

  return (
    <ResumeSection id='about' icon={<FaUser />} heading='About Me'>
      <p className='mb-8 md:text-lg'>
        I graduated from the University at Buffalo in May 2022 with a Bachelors
        of Science in Computer Science. I&apos;m a passionate mobile and web
        developer who enjoys working with declarative front-end frameworks
        including Flutter, React, and SwiftUI. For more insight into my
        development experience, check out my GitHub profile!
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
          href='https://thekey.company/products/c3-tangerine-switches-r2'
          target='_blank'
          rel='noreferrer'
        >
          Tangerine switches
        </a>
        .
      </p>

      {imageNames.map((imageName) => (
        <div
          key={imageName}
          className='relative mb-4 h-52 w-full overflow-hidden rounded-xl sm:h-72 md:h-96'
        >
          <Image
            src={`/about/${imageName}.jpeg`}
            layout='fill'
            objectFit='cover'
            alt='Daytime landscape shot of the New York City skyline'
          />
        </div>
      ))}
    </ResumeSection>
  );
};

export default About;
