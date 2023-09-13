import Badge from '../components/Badge';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { skills } from '../data/skills';

export default function Skills() {
  const sections = ['Frameworks and Libraries', 'Languages', 'Tools'];

  return (
    <Layout headline='My Skills' title='Skills | Tommy Chow'>
      {sections.map((section) => (
        <Section header={section} key={section}>
          <ul className='mt-2 flex flex-wrap gap-2'>
            {skills
              .filter((skill) => section.includes(skill.type))
              .map((skill) => (
                <li key={skill.name}>
                  <Badge icon={skill.icon} title={skill.name} />
                </li>
              ))}
          </ul>
        </Section>
      ))}
    </Layout>
  );
}
