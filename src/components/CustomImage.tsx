import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export default function CustomImage({ priority, alt, src }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      className={`shadow-lg transition duration-500 ease-out ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
      fill={typeof src === 'string' && true}
      priority={priority}
      onLoadingComplete={() => setIsLoading(false)}
      alt={alt}
      src={src}
      quality={100}
      sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
    />
  );
}
