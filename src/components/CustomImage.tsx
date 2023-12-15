'use client';

import Image, { type ImageProps } from 'next/image';

export function CustomImage({ priority, alt, src }: ImageProps) {
  return (
    <Image
      className='shadow-lg'
      fill={typeof src === 'string' && true}
      priority={priority}
      alt={alt}
      src={src}
      placeholder='blur'
    />
  );
}
