import Layout from '../components/Layout';
import Section from '../components/Section';
import SkillBadge from '../components/SkillBadge';
import { skills } from '../data/skills';

export default function Skills() {
  const sections = ['Frameworks and Libraries', 'Languages', 'Tools'];

  return (
    <Layout title='Skills | Tommy Chow'>
      {sections.map((section) => (
        <Section header={section} key={section}>
          <ul className='mt-2 flex flex-wrap gap-2'>
            {skills
              .filter((skill) => section.includes(skill.type))
              .map((skill) => (
                <li key={skill.name}>
                  <SkillBadge {...skill} />
                </li>
              ))}
          </ul>
        </Section>
      ))}
    </Layout>
  );
}
