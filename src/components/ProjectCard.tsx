import { type ProjectInfo } from '@/app/projects/projects'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
  const cardContent = (
    <Card className='border-border/50 hover:border-border bg-background hover:bg-muted/30 h-full p-4 transition-colors'>
      {/* Mobile layout: horizontal with thumbnail on left */}
      <div className='flex h-full flex-row gap-4 md:flex-col md:gap-0'>
        {/* Thumbnail - shows on mobile on left, hidden on desktop unless showThumbnail */}
        <div className='flex-shrink-0 md:hidden'>
          <div
            className='bg-muted h-full w-20 rounded-md bg-cover bg-center'
            style={{ backgroundImage: `url(${thumbnail.src})` }}
            role='img'
            aria-label={`Thumbnail for ${name}`}
          />
        </div>

        {/* Desktop thumbnail - only shows if showThumbnail is true */}
        {showThumbnail && (
          <div className='mb-3 hidden flex-shrink-0 md:block'>
            <div
              className='bg-muted aspect-video rounded-md bg-cover bg-center'
              style={{ backgroundImage: `url(${thumbnail.src})` }}
              role='img'
              aria-label={`Thumbnail for ${name}`}
            />
          </div>
        )}

        {/* Content */}
        <div className='flex min-w-0 flex-1 flex-col justify-center md:h-full md:justify-start'>
          {/* Header */}
          <div className={`${showThumbnail ? 'mb-3' : 'mb-1'}`}>
            <h3 className='text-card-foreground font-semibold'>{name}</h3>
          </div>

          {/* Description */}
          <div className='md:mt-auto'>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <a href={url} target='_blank' className='block'>
      {!showThumbnail ? (
        <div className='block md:hidden'>{cardContent}</div>
      ) : (
        cardContent
      )}
      {!showThumbnail && (
        <div className='hidden md:block'>
          <Tooltip>
            <TooltipTrigger render={<div />}>{cardContent}</TooltipTrigger>
            <TooltipContent
              side='top'
              align='center'
              className='p-0'
              sideOffset={12}
            >
              <div className='aspect-video w-[var(--radix-tooltip-trigger-width)] overflow-hidden rounded-md'>
                <CustomImage
                  src={thumbnail}
                  alt={`Thumbnail for ${name}.`}
                  className='h-full w-full object-cover'
                />
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </a>
  )
}
