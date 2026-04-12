import { useMemo, useState } from 'react';

import { Pressable } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Path, Svg } from '@/lib/svg-shim';
import { cn } from '@/lib/utils';

const ROWS_COLLAPSED_DEFAULT = 3;
const ROWS_EXPANDED_DEFAULT = 7;
const BORDER_SCALE = 1.8;
const BORDER_OFFSET_Y = -1;

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

interface RankPyramidProps {
  /** Pre-sorted (highest tier first) list of filled slots. Excess entries beyond the triangle count are ignored. */
  filledTiers?: ReadonlyArray<RankPyramidTier>;
  /** Background border image URL drawn behind the triangles, tinted with the muted-foreground token. */
  borderIcon?: string;
  /** Outer width in px. Height derives to equilateral proportions. */
  size?: number;
  /** Row count when collapsed. */
  rowsCollapsed?: number;
  /** Row count when expanded. */
  rowsExpanded?: number;
  /** Starting expanded state. The component toggles on press. */
  defaultExpanded?: boolean;
  /** Extra classes merged onto the outer Pressable. */
  className?: string;
}

/**
 * Act-rank pyramid: a stack of up- and down-facing triangles representing
 * competitive wins, with an optional border image tinted behind it. Pressing
 * toggles between a compact `rowsCollapsed` view and an expanded `rowsExpanded`
 * view.
 *
 * Data-free: the consumer resolves tier triangle icons and border URLs and
 * passes them in as a pre-sorted list.
 */
function RankPyramid({
  filledTiers,
  borderIcon,
  size = 100,
  rowsCollapsed = ROWS_COLLAPSED_DEFAULT,
  rowsExpanded = ROWS_EXPANDED_DEFAULT,
  defaultExpanded = false,
  className,
}: RankPyramidProps) {
  const width = size;
  const height = size * (Math.sqrt(3) / 2);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const numRows = expanded ? rowsExpanded : rowsCollapsed;

  const triangles = useMemo(
    () => buildTrianglePositions(width, height, numRows),
    [width, height, numRows]
  );

  const slots = useMemo(
    () => (filledTiers ?? []).slice(0, triangles.length),
    [filledTiers, triangles.length]
  );

  const foreground = useColorVar('--color-foreground');
  const mutedForeground = useColorVar('--color-muted-foreground');
  const card = useColorVar('--color-card');

  return (
    <Pressable
      onPress={() => setExpanded((v) => !v)}
      style={{ width, height }}
      className={cn(className)}>
      {borderIcon ? (
        <Image
          source={borderIcon}
          style={{
            position: 'absolute',
            width: width * BORDER_SCALE,
            height: height * BORDER_SCALE,
            left: -(width * (BORDER_SCALE - 1)) / 2,
            top: BORDER_OFFSET_Y - (height * (BORDER_SCALE - 1)) / 2,
            tintColor: mutedForeground || undefined,
          }}
          contentFit="contain"
          pointerEvents="none"
        />
      ) : null}

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
              fill={card}
              stroke={foreground}
              strokeWidth={0.5}
              strokeOpacity={0.3}
            />
          );
        })}
      </Svg>

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
    </Pressable>
  );
}

export { RankPyramid };
export type { RankPyramidProps, RankPyramidTier };
