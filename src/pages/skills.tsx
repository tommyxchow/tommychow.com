import Layout from '../components/Layout';
import Section from '../components/Section';
import SkillBadge from '../components/SkillBadge';
import { Skill } from '../types';

const Skills = ({ skills }: SkillProps) => {
  const frameworkSkills = skills.filter((skill) =>
    [
      'Django',
      'Flask',
      'Flutter',
      'MobX',
      'Next.js',
      'React',
      'React Native',
      'SwiftUI',
      'Tailwind CSS',
    ].includes(skill.name)
  );

  const languageSkills = skills.filter((skill) =>
    [
      'C',
      'C++',
      'CSS',
      'Dart',
      'HTML',
      'JavaScript',
      'Python',
      'Scala',
      'Swift',
      'TypeScript',
    ].includes(skill.name)
  );

  const toolSkills = skills.filter((skill) =>
    [
      'Docker',
      'Figma',
      'Git',
      'GitHub',
      'GitHub Actions',
      'Heroku',
      'Vercel',
      'VS Code',
      'Xcode',
    ].includes(skill.name)
  );

  return (
    <Layout title='Skills | Tommy Chow' description={"Tommy Chow's skills."}>
      <h1 className='text-2xl font-bold'>Skills</h1>

      <p>
        Here&apos;s an ongoing list of notable technologies I&apos;ve worked
        with ever since I began pursuing a computer science degree in 2019.
      </p>

      <Section header='Frameworks and Libraries'>
        <ul className='flex flex-wrap gap-2'>
          {frameworkSkills.map((skill) => (
            <li key={skill.name}>
              <SkillBadge {...skill} />
            </li>
          ))}
        </ul>
      </Section>

      <Section header='Languages'>
        <ul className='flex flex-wrap gap-2'>
          {languageSkills.map((skill) => (
            <li key={skill.name}>
              <SkillBadge {...skill} />
            </li>
          ))}
        </ul>
      </Section>

      <Section header='Tools'>
        <ul className='flex flex-wrap gap-2'>
          {toolSkills.map((skill) => (
            <li key={skill.name}>
              <SkillBadge {...skill} />
            </li>
          ))}
        </ul>
      </Section>

      <p>
        I&apos;m constantly exploring and learning both the new and old in the
        full-stack world. Thanks to the experiences, concepts, and patterns
        I&apos;ve obtained from utilizing all of these, I&apos;ve become very
        capable of adapting and transferring between technologies.
      </p>
    </Layout>
  );
};

interface SkillProps {
  skills: Skill[];
}

export default Skills;
