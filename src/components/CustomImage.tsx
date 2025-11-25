import Image, { type ImageProps } from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { twMerge } from 'tailwind-merge'

interface CustomImageProps extends ImageProps {
  caption?: string
  canZoom?: boolean
}

export function CustomImage({
  caption,
  canZoom,
  alt,
  className,
  ...rest
}: CustomImageProps) {
  const image = (
    <figure>
      <Image
        className={twMerge('object-cover shadow-lg', className)}
        alt={alt}
        placeholder={typeof rest.src === 'string' ? 'empty' : 'blur'}
        {...rest}
      />

      {caption && <figcaption className='visible'>{caption}</figcaption>}
    </figure>
  )

  return canZoom ? <Zoom classDialog='custom-zoom'>{image}</Zoom> : image
}
