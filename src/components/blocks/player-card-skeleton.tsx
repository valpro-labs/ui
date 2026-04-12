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

      {/* Name row. Skeleton heights track each Text's font-size (visible
          glyph mass), not its line-box — so a tag skeleton doesn't look
          chunkier than the "#TAG" it stands in for. The row itself is
          fixed at `h-7` (28px) to match the real card, whose height is
          dictated by tag's `text-lg` line-box.
          - name  text-2xl (24px font) → h-6
          - tag   text-lg  (18px font) → h-4.5
          - title text-sm  (14px font) → h-3.5 */}
      <View className="px-4 py-2">
        <View className="h-7 flex-row items-center justify-between gap-x-4">
          <View className="shrink flex-row items-center gap-x-2">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-4.5 w-10 rounded-md" />
          </View>
          <Skeleton className="h-3.5 w-24 shrink-0 rounded-md" />
        </View>
      </View>
    </View>
  );
}

export { PlayerCardSkeleton };
export type { PlayerCardSkeletonProps };
