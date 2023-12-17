import Image, { type ImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';

interface CustomImageProps extends ImageProps {
  caption?: string;
}

export function CustomImage({
  className,
  alt,
  caption,
  ...rest
}: CustomImageProps) {
  return (
    <figure>
      <Image
        className={twMerge('shadow-lg', className)}
        alt={alt}
        placeholder='blur'
        {...rest}
      />

      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
