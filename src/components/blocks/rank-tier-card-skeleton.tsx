import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface RankTierCardSkeletonProps {
  /** Show the ranked rating placeholder row. */
  showRankedRating?: boolean;
  /** Extra classes merged onto the outer column wrapper. */
  className?: string;
  /** Extra classes merged onto the icon/name/rating body wrapper. */
  bodyClassName?: string;
}

/**
 * Loading placeholder for `RankTierCard`. Mirrors the season label, 64×64 tier
 * icon, tier name, and optional RR row so the layout doesn't shift once rank
 * data resolves.
 */
function RankTierCardSkeleton({
  showRankedRating = true,
  className,
  bodyClassName,
}: RankTierCardSkeletonProps) {
  return (
    <View className={cn('items-center gap-y-2.5', className)}>
      <Skeleton className="h-4 w-12 rounded-md" />
      <View className={cn('items-center gap-y-1', bodyClassName)}>
        <Skeleton style={{ width: 64, height: 64 }} className="rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
        {showRankedRating ? <Skeleton className="h-5 w-14 rounded-md" /> : null}
      </View>
    </View>
  );
}

export { RankTierCardSkeleton };
export type { RankTierCardSkeletonProps };
