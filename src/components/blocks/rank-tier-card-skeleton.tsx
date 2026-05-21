import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface RankTierCardSkeletonProps {
  /** Show the ranked rating placeholder row. */
  showRankedRating?: boolean;
  /** Extra classes merged onto the outer column wrapper. */
  className?: string;
}

/**
 * Loading placeholder for `RankTierCard`. Mirrors the season label, 64×64 tier
 * icon, tier name, and optional RR row so the layout doesn't shift once rank
 * data resolves.
 */
function RankTierCardSkeleton({ showRankedRating = true, className }: RankTierCardSkeletonProps) {
  return (
    <View className={cn('items-center', className)}>
      <Skeleton className="h-4 w-12 rounded-md" style={{ marginBottom: 10 }} />
      <Skeleton style={{ width: 64, height: 64 }} className="rounded-md" />
      <Skeleton className="mt-1 h-6 w-24 rounded-md" />
      {showRankedRating ? <Skeleton className="mt-0.5 h-5 w-14 rounded-md" /> : null}
    </View>
  );
}

export { RankTierCardSkeleton };
export type { RankTierCardSkeletonProps };
