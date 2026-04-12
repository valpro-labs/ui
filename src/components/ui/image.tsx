import { Image as ExpoImage, type ImageProps as ExpoImageProps } from 'expo-image';

import { cn } from '@/lib/utils';

export type ImageProps = ExpoImageProps & {
  className?: string;
};

function Image({ className, ...props }: ImageProps) {
  // UniWind resolves className on native; expo-image forwards remaining props natively.
  return <ExpoImage className={cn(className)} {...props} />;
}

export { Image };
