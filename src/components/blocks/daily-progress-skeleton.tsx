import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';

interface DailyProgressSkeletonProps {
  /** Number of milestones to render. Defaults to 4 to match a standard daily ticket. */
  count?: number;
}

/**
 * Loading placeholder for `DailyProgress`. Matches the real component's
 * outer frame (four 76×76 slots, 12px gap, row centered) and renders a
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
const SKELETON_SIZE = Math.round(((42 * 2 + 2.5) * (76 / 100)) / Math.SQRT2) + 2;

function DailyProgressSkeleton({ count = 4 }: DailyProgressSkeletonProps) {
  return (
    <View className="items-center justify-center">
      <View
        className="flex-row items-center justify-center"
        style={{ height: 76, gap: 12 }}>
        {Array.from({ length: count }).map((_, index) => (
          <View
            key={index}
            style={{ width: 76, height: 76, alignItems: 'center', justifyContent: 'center' }}>
            <Skeleton
              className="rounded-md"
              style={{
                width: SKELETON_SIZE,
                height: SKELETON_SIZE,
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
