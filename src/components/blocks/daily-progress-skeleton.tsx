import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';

interface DailyProgressSkeletonProps {
  /** Number of milestones to render. Defaults to 4 to match a standard daily ticket. */
  count?: number;
  /** Width/height of each milestone slot. Defaults to the regular loaded milestone size. */
  size?: number;
  /** Horizontal gap between milestone slots. Defaults to the regular loaded milestone gap. */
  spacing?: number;
}

/**
 * Loading placeholder for `DailyProgress`. Matches the real component's
 * outer frame (four 76x76 slots by default, 12px gap, row centered) and renders a
 * rotated square skeleton in each slot so the layout doesn't shift when
 * the diamond rings replace them.
 */
// Match the real diamond's outer extent including the progress-ring stroke
// (TRACK_WIDTH = 2.5 in the 100-unit viewBox) that extends outward from the
// centred path. Skeleton side = (outer tip-to-tip rendered) / sqrt(2) so the
// rotated square's visible diagonal lines up with the ring's outer edge.
//
// Plus a small visual buffer: `rounded-md` (~6px radius) shaves visible mass
// off the skeleton's corners once rotated, and SVG stroke anti-aliasing on
// the real ring edges puffs it a subpixel outward.
//
// tip-to-tip = (OUTER_R * 2 + TRACK_WIDTH) viewBox units = 86.5
// rendered   = 86.5 * (76 / 100) ≈ 65.74 px
// side       = 65.74 / sqrt(2) + buffer ≈ 46.5 + 2 ≈ 49
const DEFAULT_SIZE = 76;
const DEFAULT_SPACING = 12;
const OUTER_R = 42;
const TRACK_WIDTH = 2.5;
const SKELETON_BUFFER = 2;

function getSkeletonSize(size: number): number {
  const renderedTipToTip = (OUTER_R * 2 + TRACK_WIDTH) * (size / 100);
  return Math.round(renderedTipToTip / Math.SQRT2) + SKELETON_BUFFER;
}

function DailyProgressSkeleton({
  count = 4,
  size = DEFAULT_SIZE,
  spacing = DEFAULT_SPACING,
}: DailyProgressSkeletonProps) {
  const skeletonSize = getSkeletonSize(size);

  return (
    <View className="items-center justify-center">
      <View
        className="flex-row items-center justify-center"
        style={{ height: size, gap: spacing }}>
        {Array.from({ length: count }).map((_, index) => (
          <View
            key={index}
            style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Skeleton
              className="rounded-md"
              style={{
                width: skeletonSize,
                height: skeletonSize,
                transform: [{ rotate: '45deg' }],
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export { DailyProgressSkeleton };
export type { DailyProgressSkeletonProps };
