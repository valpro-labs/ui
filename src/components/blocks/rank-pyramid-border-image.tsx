import * as React from 'react';

import { View, type ImageStyle, type StyleProp } from 'react-native';

import {
  getRankPyramidArtworkFrame,
  RankPyramidArtwork,
  RANK_PYRAMID_BORDER_SCALE,
} from '@/components/blocks/rank-pyramid-artwork';
import { cn } from '@/lib/utils';

type RankPyramidBorderImageProps = React.ComponentProps<typeof View> & {
  /** Season border display icon URL. */
  borderIcon?: string;
  /** Square artwork box size in px. */
  size?: number;
  /** Draw the inner triangle grid on top of the border image. */
  showTriangles?: boolean;
  /** Number of triangle rows. */
  triangleRows?: number;
  /** Fill color for the triangle grid. Defaults to the card token. */
  triangleFillColor?: string;
  /** Optional tint override. Defaults to the muted-foreground token. */
  tintColor?: string;
  /** Extra style merged onto the border image. */
  imageStyle?: StyleProp<ImageStyle>;
};

function RankPyramidBorderImage({
  borderIcon,
  size = 120,
  showTriangles = false,
  triangleRows = 3,
  triangleFillColor,
  tintColor,
  imageStyle,
  className,
  style,
  ...props
}: RankPyramidBorderImageProps) {
  const pyramidSize = size / RANK_PYRAMID_BORDER_SCALE;
  const frame = getRankPyramidArtworkFrame(pyramidSize);
  const pyramidLeft = (size - frame.visualWidth) / 2 + frame.offsetX;
  const pyramidTop = (size - frame.visualHeight) / 2 + frame.offsetY;

  return (
    <View
      className={cn(className)}
      style={[{ width: size, height: size }, style]}
      {...props}>
      <RankPyramidArtwork
        borderIcon={borderIcon}
        size={pyramidSize}
        rows={triangleRows}
        showEmptyTriangles={showTriangles}
        emptyFillColor={triangleFillColor}
        tintColor={tintColor}
        imageStyle={imageStyle}
        pointerEvents="none"
        style={{ position: 'absolute', left: pyramidLeft, top: pyramidTop }}
      />
    </View>
  );
}

export { RankPyramidBorderImage };
export type { RankPyramidBorderImageProps };
