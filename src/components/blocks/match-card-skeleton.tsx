import { StyleSheet, View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface MatchCardSkeletonProps {
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * Loading placeholder for `MatchCard`. Mirrors the real card's three-column
 * frame — agent square on the left, centred score stack, KDA/combat-score
 * rows on the right — so the layout doesn't shift once match data resolves.
 */
function MatchCardSkeleton({ className }: MatchCardSkeletonProps) {
  return (
    <View className={cn('bg-card overflow-hidden rounded-xl', className)}>
      <View className="relative h-18 flex-row items-center">
        {/* Left: agent icon + mode/tier slot */}
        <View className="flex-1 flex-row items-center gap-x-1">
          <Skeleton style={{ width: 72, height: 72 }} className="rounded-xl" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </View>

        {/* Centre: result label + score */}
        <View
          style={StyleSheet.absoluteFill}
          className="items-center justify-center"
          pointerEvents="none">
          <Skeleton className="h-5 w-12 rounded-md" />
          <View className="mt-1 flex-row items-center gap-x-1">
            <Skeleton className="h-4 w-5 rounded-md" />
            <View className="bg-muted h-0.5 w-3 rounded-full" />
            <Skeleton className="h-4 w-5 rounded-md" />
          </View>
        </View>

        {/* Spacer for the absolute-centred column. */}
        <View className="flex-1" />

        {/* Right: KDA + combat score */}
        <View className="flex-1 items-start gap-y-0.5 pl-4">
          <View className="flex-row items-center gap-x-2">
            <Skeleton className="h-5 w-6 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
          </View>
          <View className="flex-row items-center gap-x-2">
            <Skeleton className="h-4 w-6 rounded-md" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </View>
        </View>
      </View>
    </View>
  );
}

export { MatchCardSkeleton };
export type { MatchCardSkeletonProps };
