import * as React from 'react';

import { View, type ImageStyle, type StyleProp } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

type RankPyramidBorderImageProps = React.ComponentProps<typeof View> & {
  /** Season border display icon URL. */
  borderIcon?: string;
  /** Square image box size in px. */
  size?: number;
  /** Optional tint override. Defaults to the muted-foreground token. */
  tintColor?: string;
  /** Extra style merged onto the inner image. */
  imageStyle?: StyleProp<ImageStyle>;
};

function RankPyramidBorderImage({
  borderIcon,
  size = 120,
  tintColor,
  imageStyle,
  className,
  style,
  ...props
}: RankPyramidBorderImageProps) {
  const mutedForeground = useCSSVariable('--color-muted-foreground');
  const resolvedTintColor =
    tintColor ?? (typeof mutedForeground === 'string' ? mutedForeground : undefined);

  return (
    <View
      className={cn('items-center justify-center', className)}
      style={[{ width: size, height: size }, style]}
      {...props}>
      {borderIcon ? (
        <Image
          source={borderIcon}
          style={[{ width: '100%', height: '100%', tintColor: resolvedTintColor }, imageStyle]}
          contentFit="contain"
        />
      ) : null}
    </View>
  );
}

export { RankPyramidBorderImage };
export type { RankPyramidBorderImageProps };
