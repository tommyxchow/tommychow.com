import { type ProjectInfo } from '@/app/projects/projects';
import { CustomImage } from './CustomImage';

export default function ProjectCard({
  name,
  description,
  thumbnail,
  url,
}: ProjectInfo) {
  return (
    <a aria-labelledby={name} href={url} target='_blank'>
      <article className='-mx-4 flex flex-col gap-4 p-4 transition-[background] hover:bg-zinc-200 dark:hover:bg-zinc-900 sm:flex-row sm:items-center sm:rounded-lg'>
        <div className='sm:w-1/3 sm:shrink-0'>
          <CustomImage
            priority
            src={thumbnail}
            alt={`Thumbnail for ${name}.`}
          />
        </div>

        <div className='flex flex-col gap-2 sm:justify-evenly'>
          <h3 id={name} className='font-semibold'>
            {name}
          </h3>

          <p className='text-zinc-500 dark:text-zinc-400'>{description}</p>
        </div>
      </article>
    </a>
  );
}
