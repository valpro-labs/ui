import * as React from 'react';

import { View, type ImageStyle, type StyleProp } from 'react-native';

import {
  RankPyramidArtwork,
  RANK_PYRAMID_BORDER_OFFSET_Y,
  RANK_PYRAMID_BORDER_SCALE,
  RANK_PYRAMID_HEIGHT_RATIO,
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
  const pyramidHeight = pyramidSize * RANK_PYRAMID_HEIGHT_RATIO;
  const borderHeight = pyramidHeight * RANK_PYRAMID_BORDER_SCALE;
  const borderLeftInPyramid = -(pyramidSize * (RANK_PYRAMID_BORDER_SCALE - 1)) / 2;
  const borderTopInPyramid =
    RANK_PYRAMID_BORDER_OFFSET_Y - (pyramidHeight * (RANK_PYRAMID_BORDER_SCALE - 1)) / 2;
  const pyramidLeft = -borderLeftInPyramid;
  const pyramidTop = (size - borderHeight) / 2 - borderTopInPyramid;

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
