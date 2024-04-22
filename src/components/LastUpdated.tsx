import { githubLink } from '@/lib/links';
import { HoverUnderline } from './HoverUnderline';

export function LastUpdated() {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <p className='text-sm opacity-60'>
      Last updated on{' '}
      <HoverUnderline>
        <a href={githubLink} target='_blank'>
          {formattedDate}
        </a>
      </HoverUnderline>
    </p>
  );
}
