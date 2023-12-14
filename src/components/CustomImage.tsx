'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function CustomImage({ className, priority, alt, src }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      className={twMerge(
        'shadow-xl transition duration-500 ease-out',
        isLoading ? 'opacity-0' : 'opacity-100',
        className,
      )}
      fill={typeof src === 'string' && true}
      priority={priority}
      onLoad={() => setIsLoading(false)}
      alt={alt}
      src={src}
    />
  );
}
