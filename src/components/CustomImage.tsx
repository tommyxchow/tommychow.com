'use client';

import Image, { type ImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';

export function CustomImage({ className, alt, ...rest }: ImageProps) {
  return (
    <Image
      className={twMerge('shadow-lg', className)}
      alt={alt}
      placeholder='blur'
      {...rest}
    />
  );
}
