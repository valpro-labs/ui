import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface RankCardSkeletonProps {
  /** Extra classes merged onto the outer column wrapper. */
  className?: string;
}

/**
 * Loading placeholder for `RankCard`. Mirrors the season label, 64×64 tier
 * icon, tier name, and RR rows so the layout doesn't shift once rank data
 * resolves.
 */
function RankCardSkeleton({ className }: RankCardSkeletonProps) {
  return (
    <View className={cn('items-center', className)}>
      <Skeleton className="mb-1 h-4 w-12 rounded-md" />
      <Skeleton style={{ width: 64, height: 64 }} className="rounded-md" />
      <Skeleton className="mt-1 h-6 w-24 rounded-md" />
      <Skeleton className="mt-0.5 h-5 w-14 rounded-md" />
    </View>
  );
}

export { RankCardSkeleton };
export type { RankCardSkeletonProps };
