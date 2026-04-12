import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PlayerCardSkeletonProps {
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * Loading placeholder for `PlayerCard`. Mirrors the real card's frame —
 * same rounded wrapper, same 452:128 banner aspect ratio, same name-row
 * padding — so the layout doesn't shift once the player data resolves.
 */
function PlayerCardSkeleton({ className }: PlayerCardSkeletonProps) {
  return (
    <View className={cn('bg-card overflow-hidden rounded-2xl', className)}>
      {/* Banner placeholder. The outer wrapper clips the corners, so the
          skeleton itself stays square. */}
      <Skeleton style={{ aspectRatio: 452 / 128 }} className="w-full rounded-none" />

      {/* Name row. Heights match the real Text line-heights so the row
          lands at the same total height as the loaded card:
          - name:  `text-2xl leading-none` → 24px → `h-6`
          - tag:   `text-lg` → 28px → `h-7`-ish, visually closer to `h-6`
          - title: `text-sm` → 20px → `h-5` */}
      <View className="px-4 py-2">
        <View className="flex-row items-baseline justify-between gap-x-4">
          <View className="shrink flex-row items-baseline gap-x-2">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-5 w-10 rounded-md" />
          </View>
          <Skeleton className="h-4 w-24 shrink-0 rounded-md" />
        </View>
      </View>
    </View>
  );
}

export { PlayerCardSkeleton };
export type { PlayerCardSkeletonProps };
