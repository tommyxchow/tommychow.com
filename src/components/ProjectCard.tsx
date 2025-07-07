import { type ProjectInfo } from '@/app/projects/projects'
import { CustomImage } from './CustomImage'

interface ProjectCardProps extends ProjectInfo {
  showThumbnail?: boolean
}

export default function ProjectCard({
  name,
  description,
  thumbnail,
  url,
  showThumbnail = false,
}: ProjectCardProps) {
  return (
    <a href={url} target='_blank'>
      <article className='flex flex-col gap-2 py-2 transition-opacity hover:opacity-60'>
        {showThumbnail && (
          <CustomImage
            priority
            src={thumbnail}
            alt={`Thumbnail for ${name}.`}
          />
        )}

        <div className='flex flex-col gap-1 font-medium sm:flex-row sm:items-baseline sm:justify-between'>
          <h3>{name}</h3>
          <p className='text-sm text-zinc-500 dark:text-zinc-400'>
            {description}
          </p>
        </div>
      </article>
    </a>
  )
}
