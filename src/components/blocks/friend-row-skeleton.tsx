import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface FriendRowSkeletonProps {
  /** Extra classes merged onto the outer row wrapper. */
  className?: string;
}

/**
 * Loading placeholder for `FriendRow`. Mirrors the real row's
 * 44×44 avatar tile + two-line text stack so the list doesn't shift once
 * roster + presence data resolves.
 */
function FriendRowSkeleton({ className }: FriendRowSkeletonProps) {
  return (
    <View className={cn('flex-row items-center gap-x-3 px-3.5 py-3', className)}>
      <Skeleton style={{ width: 44, height: 44, borderRadius: 10 }} />
      <View className="flex-1 gap-y-1">
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="h-3 w-40 rounded-md" />
      </View>
    </View>
  );
}

export { FriendRowSkeleton };
export type { FriendRowSkeletonProps };
