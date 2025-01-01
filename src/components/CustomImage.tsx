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
  return (
    <figure>
      <Image
        className={twMerge('rounded object-cover shadow-lg', className)}
        alt={alt}
        placeholder={typeof rest.src === 'string' ? 'empty' : 'blur'}
        {...rest}
      />

      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
