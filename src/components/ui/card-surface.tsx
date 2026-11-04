import type { ComponentProps } from 'react';

import { Platform, PlatformColor, View } from 'react-native';

import { cn } from '@/lib/utils';

type CardSurfaceProps = ComponentProps<typeof View>;

function CardSurface({ className, style, ...props }: CardSurfaceProps) {
  const classes = cn('bg-card', className);
  // Keep explicit background classes such as reward tiles' bg-secondary intact.
  const usesCardBackground = classes.split(' ').includes('bg-card');
  return (
    <View
      {...props}
      className={classes}
      style={[
        Platform.OS === 'ios' && usesCardBackground
          ? { backgroundColor: PlatformColor('secondarySystemGroupedBackground') }
          : undefined,
        style,
      ]}
    />
  );
}

export { CardSurface };
export type { CardSurfaceProps };
