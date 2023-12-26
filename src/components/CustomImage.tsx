import Image, { type ImageProps } from 'next/image';

interface CustomImageProps extends ImageProps {
  caption?: string;
}

export function CustomImage({ alt, caption, ...rest }: CustomImageProps) {
  return (
    <figure>
      <Image className='shadow-lg' alt={alt} placeholder='blur' {...rest} />

      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
