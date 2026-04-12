import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface MissionCardSkeletonProps {
  /** Extra classes applied to the root wrapper. */
  className?: string;
}

/**
 * Loading placeholder for `MissionCard`. Mirrors the real card's layout —
 * same outer wrapper, same two-row structure, same gaps — so dropping in
 * skeleton rows doesn't shift the surrounding layout when data resolves.
 *
 * Only the `<Text>` + progress bar content gets replaced with `<Skeleton>`.
 */
function MissionCardSkeleton({ className }: MissionCardSkeletonProps) {
  return (
    <View className={cn('w-full gap-y-1', className)}>
      {/* Top: title placeholder + XP placeholder.
          Heights match the underlying Text line-heights so the row is the
          same total height as the loaded card:
          - title: `text-base` → 24px line-height → `h-6`
          - XP:    `text-xs font-bold` → 16px line-height → `h-4` */}
      <View className="flex flex-row items-center justify-between gap-x-2">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-14 shrink-0 rounded-md" />
      </View>

      {/* Bottom: progress bar placeholder + N / Total placeholder */}
      <View className="flex flex-row items-center gap-x-3">
        <Skeleton className="h-1.5 flex-1 rounded-full" />
        <View className="w-14 shrink-0 flex-row items-center justify-center gap-x-0.5">
          <Skeleton className="h-3 w-10 rounded-md" />
        </View>
      </View>
    </View>
  );
}

export { MissionCardSkeleton };
export type { MissionCardSkeletonProps };
