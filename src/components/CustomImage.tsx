'use client';

import Image, { type ImageProps } from 'next/image';

export function CustomImage({ priority, alt, src }: ImageProps) {
  return (
    <Image
      fill={typeof src === 'string' && true}
      priority={priority}
      alt={alt}
      src={src}
      placeholder='blur'
    />
  );
}
