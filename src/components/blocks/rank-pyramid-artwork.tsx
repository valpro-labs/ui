import * as React from 'react';

import { View, type ImageStyle, type StyleProp } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Path, Svg } from '@/lib/svg-shim';
import { cn } from '@/lib/utils';

const RANK_PYRAMID_HEIGHT_RATIO = Math.sqrt(3) / 2;
const RANK_PYRAMID_BORDER_SCALE = 1.8;
const RANK_PYRAMID_BORDER_OFFSET_Y = -1;

function getRankPyramidArtworkFrame(size: number) {
  const width = size;
  const height = size * RANK_PYRAMID_HEIGHT_RATIO;
  const borderWidth = width * RANK_PYRAMID_BORDER_SCALE;
  const borderHeight = height * RANK_PYRAMID_BORDER_SCALE;
  const borderLeft = -(width * (RANK_PYRAMID_BORDER_SCALE - 1)) / 2;
  const borderTop =
    RANK_PYRAMID_BORDER_OFFSET_Y - (height * (RANK_PYRAMID_BORDER_SCALE - 1)) / 2;
  const minX = Math.min(0, borderLeft);
  const minY = Math.min(0, borderTop);
  const maxX = Math.max(width, borderLeft + borderWidth);
  const maxY = Math.max(height, borderTop + borderHeight);

  return {
    width,
    height,
    borderWidth,
    borderHeight,
    borderLeft,
    borderTop,
    offsetX: -minX,
    offsetY: -minY,
    visualWidth: maxX - minX,
    visualHeight: maxY - minY,
  };
}

interface TrianglePosition {
  row: number;
  col: number;
  up: boolean;
  path: string;
  bbox: { x: number; y: number; w: number; h: number };
}

function buildTrianglePositions(
  width: number,
  height: number,
  numRows: number
): TrianglePosition[] {
  const positions: TrianglePosition[] = [];
  const rowHeight = height / numRows;

  for (let row = 0; row < numRows; row++) {
    const count = 2 * row + 1;
    const topRowWidth = width / numRows;
    const rowWidth = topRowWidth * (row + 1);
    const triWidth = rowWidth / (row + 1);
    const xOffset = (width - rowWidth) / 2;
    const yTop = row * rowHeight;
    const yBottom = yTop + rowHeight;

    for (let col = 0; col < count; col++) {
      const isUp = col % 2 === 0;
      const pairIndex = Math.floor(col / 2);

      let path: string;
      let bbox: { x: number; y: number; w: number; h: number };

      if (isUp) {
        const left = xOffset + pairIndex * triWidth;
        const right = left + triWidth;
        const topX = (left + right) / 2;
        path = `M ${topX} ${yTop} L ${right} ${yBottom} L ${left} ${yBottom} Z`;
        bbox = { x: left, y: yTop, w: triWidth, h: rowHeight };
      } else {
        const left = xOffset + pairIndex * triWidth;
        const right = left + triWidth;
        const topX = (left + right) / 2 + triWidth / 2;
        path = `M ${left + triWidth / 2} ${yTop} L ${right + triWidth / 2} ${yTop} L ${topX} ${yBottom} Z`;
        bbox = { x: left + triWidth / 2, y: yTop, w: triWidth, h: rowHeight };
      }

      positions.push({ row, col, up: isUp, path, bbox });
    }
  }

  return positions;
}

function useColorVar(name: string): string {
  const value = useCSSVariable(name);
  return typeof value === 'string' ? value : '';
}

interface RankPyramidTier {
  /** Icon URL to use when the slot is geometrically up-facing. */
  upIcon?: string;
  /** Icon URL to use when the slot is geometrically down-facing. */
  downIcon?: string;
}

type RankPyramidArtworkProps = React.ComponentProps<typeof View> & {
  /** Pre-sorted (highest tier first) list of filled slots. Excess entries beyond the triangle count are ignored. */
  filledTiers?: ReadonlyArray<RankPyramidTier>;
  /** Background border image URL drawn behind the triangles. */
  borderIcon?: string;
  /** Inner pyramid grid width in px. Height derives to equilateral proportions. */
  size?: number;
  /** Number of rows to draw. */
  rows?: number;
  /** Whether to draw empty triangle slots. */
  showEmptyTriangles?: boolean;
  /** Fill color for empty triangle slots. Defaults to the card token. */
  emptyFillColor?: string;
  /** Optional border tint override. Defaults to the muted-foreground token. */
  tintColor?: string;
  /** Extra style merged onto the border image. */
  imageStyle?: StyleProp<ImageStyle>;
};

function RankPyramidArtwork({
  filledTiers,
  borderIcon,
  size = 100,
  rows = 3,
  showEmptyTriangles = true,
  emptyFillColor,
  tintColor,
  imageStyle,
  className,
  style,
  ...props
}: RankPyramidArtworkProps) {
  const frame = getRankPyramidArtworkFrame(size);
  const { width, height } = frame;

  const triangles = React.useMemo(
    () => buildTrianglePositions(width, height, rows),
    [width, height, rows]
  );

  const slots = React.useMemo(
    () => (filledTiers ?? []).slice(0, triangles.length),
    [filledTiers, triangles.length]
  );

  const foreground = useColorVar('--color-foreground');
  const mutedForeground = useColorVar('--color-muted-foreground');
  const card = useColorVar('--color-card');
  const resolvedTintColor = (tintColor ?? mutedForeground) || undefined;
  const resolvedEmptyFillColor = emptyFillColor ?? card;

  return (
    <View
      className={cn(className)}
      style={[{ width, height }, style]}
      {...props}>
      {borderIcon ? (
        <Image
          source={borderIcon}
          style={[
            {
              position: 'absolute',
              width: frame.borderWidth,
              height: frame.borderHeight,
              left: frame.borderLeft,
              top: frame.borderTop,
              tintColor: resolvedTintColor,
            },
            imageStyle,
          ]}
          contentFit="contain"
          pointerEvents="none"
        />
      ) : null}

      {showEmptyTriangles ? (
        <Svg
          style={{ position: 'absolute' }}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}>
          {triangles.map((tri, index) => {
            const isFilled = index < slots.length;
            if (isFilled) return null;
            return (
              <Path
                key={`${tri.row}-${tri.col}`}
                d={tri.path}
                fill={resolvedEmptyFillColor}
                stroke={foreground}
                strokeWidth={0.5}
                strokeOpacity={0.3}
              />
            );
          })}
        </Svg>
      ) : null}

      {slots.map((slot, index) => {
        const tri = triangles[index]!;
        const iconUrl = tri.up ? slot.upIcon : slot.downIcon;
        if (!iconUrl) return null;
        return (
          <Image
            key={`img-${tri.row}-${tri.col}`}
            source={iconUrl}
            style={{
              position: 'absolute',
              left: tri.bbox.x,
              top: tri.bbox.y,
              width: tri.bbox.w,
              height: tri.bbox.h,
            }}
            contentFit="fill"
          />
        );
      })}
    </View>
  );
}

export {
  getRankPyramidArtworkFrame,
  RankPyramidArtwork,
  RANK_PYRAMID_BORDER_OFFSET_Y,
  RANK_PYRAMID_BORDER_SCALE,
  RANK_PYRAMID_HEIGHT_RATIO,
};
export type { RankPyramidArtworkProps, RankPyramidTier };
