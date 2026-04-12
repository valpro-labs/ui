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
              style={{ width: 54, height: 54, transform: [{ rotate: '45deg' }] }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export { DailyProgressSkeleton };
export type { DailyProgressSkeletonProps };
