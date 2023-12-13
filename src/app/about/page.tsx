import CustomImage from '@/components/CustomImage';
import { Prose } from '@/components/Prose';
import keyboardPic from '../../../public/assets/images/about/keyboard-1.webp';

export default function AboutPage() {
  return (
    <Prose>
      <h2>About</h2>

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
        prior programming experience, I was able to learn rapidly and discovered
        my passion for mobile and web development. I graduated with honors in
        2022 with a Bachelor of Science in Computer Science.
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
        keycaps and Invokeys Black Sesame switches.
      </p>

      <div className='mt-4'>
        <CustomImage
          src={keyboardPic}
          alt='Photo of my keyboard, a custom build of the QK75.'
        />
      </div>
    </Prose>
  );
}
