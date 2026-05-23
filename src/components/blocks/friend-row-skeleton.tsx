import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface FriendRowSkeletonProps {
  /** Visual density. Use `large` for wider tablet layouts. */
  size?: 'regular' | 'large';
  /** Extra classes merged onto the outer row wrapper. */
  className?: string;
}

/**
 * Loading placeholder for `FriendRow`. Mirrors the real row's
 * 44×44 avatar tile + two-line text stack so the list doesn't shift once
 * roster + presence data resolves.
 */
function FriendRowSkeleton({ size = 'regular', className }: FriendRowSkeletonProps) {
  const isLarge = size === 'large';
  const avatarSize = isLarge ? 56 : 44;

  return (
    <View
      className={cn(
        'flex-row items-center',
        isLarge ? 'gap-x-4 px-5 py-4' : 'gap-x-3 px-3.5 py-3',
        className
      )}>
      <Skeleton
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: isLarge ? 12 : 10,
        }}
      />
      <View className={cn('flex-1', isLarge ? 'gap-y-1.5' : 'gap-y-1')}>
        <Skeleton className={cn('rounded-md', isLarge ? 'h-5 w-36' : 'h-4 w-28')} />
        <Skeleton className={cn('rounded-md', isLarge ? 'h-4 w-56' : 'h-3 w-40')} />
      </View>
    </View>
  );
}

export { FriendRowSkeleton };
export type { FriendRowSkeletonProps };
