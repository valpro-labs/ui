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
// Real diamond's rendered tip-to-tip width = OUTER_R(42) * 2 * (SIZE/VIEWBOX)
// = 84 * 0.76 = 64px. Rotated square's visible width is its diagonal, so the
// skeleton side length = 64 / sqrt(2) ≈ 45.3.
const SKELETON_SIZE = Math.round((42 * 2 * (76 / 100)) / Math.SQRT2);

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
