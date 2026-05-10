import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface RewardItemSkeletonProps {
  /** Extra classes merged onto the outer row wrapper. */
  className?: string;
}

/**
 * Loading placeholder for `RewardItem`. Mirrors the real row's 40px icon tile
 * plus two-line reward text stack so reward lists stay steady while data loads.
 */
function RewardItemSkeleton({ className }: RewardItemSkeletonProps) {
  return (
    <View
      className={cn(
        'relative flex-row items-center gap-x-4 overflow-hidden px-4 py-3',
        className
      )}>
      <Skeleton className="size-10 rounded-lg" />

      <View className="flex-1">
        <Skeleton className="h-6 w-40 rounded-md" />
        <Skeleton className="mt-0.5 h-4 w-16 rounded-md" />
      </View>
    </View>
  );
}

export { RewardItemSkeleton };
export type { RewardItemSkeletonProps };
