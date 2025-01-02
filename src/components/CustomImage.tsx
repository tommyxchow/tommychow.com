import Image, { type ImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';

interface CustomImageProps extends ImageProps {
  caption?: string;
}

export function CustomImage({
  alt,
  caption,
  className,
  ...rest
}: CustomImageProps) {
  const image = (
    <Image
      className={twMerge('object-cover shadow-lg', className)}
      alt={alt}
      placeholder={typeof rest.src === 'string' ? 'empty' : 'blur'}
      {...rest}
    />
  );

  if (caption) {
    return (
      <figure>
        {image}

        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  return image;
}
