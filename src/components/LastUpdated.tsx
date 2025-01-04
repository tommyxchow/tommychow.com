import { repoLink } from '@/lib/links';
import { formatDate } from '@/lib/utils';
import { HoverUnderline } from './HoverUnderline';

export function LastUpdated() {
  return (
    <p>
      Last updated on{' '}
      <HoverUnderline>
        <a href={repoLink} target='_blank'>
          {formatDate(new Date(), true)}
        </a>
      </HoverUnderline>
    </p>
  );
}
