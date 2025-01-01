import { type ProjectInfo } from '@/app/projects/projects';
import { CustomImage } from './CustomImage';

export default function ProjectCard({
  name,
  description,
  thumbnail,
  url,
}: ProjectInfo) {
  return (
    <a href={url} target='_blank'>
      <article className='-mx-4 flex flex-col gap-4 p-4 transition-[background] hover:bg-zinc-200 sm:rounded-lg dark:hover:bg-zinc-900'>
        <CustomImage priority src={thumbnail} alt={`Thumbnail for ${name}.`} />

        <div className='flex justify-between gap-4'>
          <h3 className='font-medium'>{name}</h3>

          <p className='text-zinc-500 dark:text-zinc-400'>{description}</p>
        </div>
      </article>
    </a>
  );
}
