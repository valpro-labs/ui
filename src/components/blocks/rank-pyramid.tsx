import { useState } from 'react';

import { Pressable } from 'react-native';

import {
  getRankPyramidArtworkFrame,
  RankPyramidArtwork,
  type RankPyramidTier,
} from '@/components/blocks/rank-pyramid-artwork';
import { cn } from '@/lib/utils';

const ROWS_COLLAPSED_DEFAULT = 3;
const ROWS_EXPANDED_DEFAULT = 7;

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
  const [expanded, setExpanded] = useState(defaultExpanded);
  const numRows = expanded ? rowsExpanded : rowsCollapsed;
  const frame = getRankPyramidArtworkFrame(size);
  const height = borderIcon ? frame.visualHeight : frame.height;
  const artworkOffsetTop = borderIcon ? frame.offsetY : 0;

  return (
    <Pressable
      onPress={() => setExpanded((v) => !v)}
      style={{ width: size, height, overflow: 'visible' }}
      className={cn(className)}>
      <RankPyramidArtwork
        filledTiers={filledTiers}
        borderIcon={borderIcon}
        size={size}
        rows={numRows}
        pointerEvents="none"
        style={borderIcon ? { position: 'absolute', top: artworkOffsetTop } : undefined}
      />
    </Pressable>
  );
}

export { RankPyramid };
export type { RankPyramidProps, RankPyramidTier };
