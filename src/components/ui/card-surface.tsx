import type { ComponentProps } from 'react';

import { Platform, PlatformColor, View } from 'react-native';

import { cn } from '@/lib/utils';

type CardSurfaceProps = ComponentProps<typeof View>;

const IOS_BACKGROUND_COLORS: Record<string, string> = {
  'bg-background': 'systemGroupedBackground',
  'bg-card': 'secondarySystemGroupedBackground',
  'bg-secondary': 'systemGray5',
  'bg-muted': 'tertiarySystemFill',
};

function CardSurface({ className, style, ...props }: CardSurfaceProps) {
  const classes = cn('bg-card', className);
  const backgroundToken = classes.split(' ').find((token) => IOS_BACKGROUND_COLORS[token]);

  return (
    <View
      {...props}
      className={classes}
      style={[
        Platform.OS === 'ios' && backgroundToken
          ? { backgroundColor: PlatformColor(IOS_BACKGROUND_COLORS[backgroundToken]) }
          : undefined,
        style,
      ]}
    />
  );
}

export { CardSurface };
export type { CardSurfaceProps };
