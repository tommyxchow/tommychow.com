import Layout from '../components/Layout';
import Section from '../components/Section';
import SkillBadge from '../components/SkillBadge';
import { skills } from '../data/skills';

export default function Skills() {
  const sections = ['Frameworks', 'Languages', 'Tools'];

  return (
    <Layout title='Skills' description='My skills'>
      {sections.map((section) => (
        <Section header={section} key={section}>
          <ul className='mt-2 flex flex-wrap gap-2'>
            {skills
              .filter((skill) => skill.type === section.slice(0, -1))
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
