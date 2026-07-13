import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface MissionCardSkeletonProps {
  /** Extra classes applied to the root wrapper. */
  className?: string;
  /** Stable variation used to give repeated skeleton rows different widths. */
  variant?: number;
}

const skeletonVariants = [
  { title: '52%', progress: '91%', xp: 56, count: 48 },
  { title: '42%', progress: '80%', xp: 44, count: 56 },
  { title: '56%', progress: '86%', xp: 52, count: 40 },
  { title: '46%', progress: '96%', xp: 48, count: 52 },
  { title: '50%', progress: '83%', xp: 56, count: 44 },
] as const;

/**
 * Loading placeholder for `MissionCard`. Mirrors the real card's layout —
 * same outer wrapper, same two-row structure, same gaps — so dropping in
 * skeleton rows doesn't shift the surrounding layout when data resolves.
 *
 * Only the `<Text>` + progress bar content gets replaced with `<Skeleton>`.
 */
function MissionCardSkeleton({ className, variant = 0 }: MissionCardSkeletonProps) {
  const variantIndex = Number.isFinite(variant)
    ? Math.abs(Math.trunc(variant)) % skeletonVariants.length
    : 0;
  const widths = skeletonVariants[variantIndex];

  return (
    <View className={cn('w-full gap-y-1', className)}>
      {/* Top: title placeholder + XP placeholder.
          Heights match the underlying Text line-heights so the row is the
          same total height as the loaded card:
          - title: `text-base` → 24px line-height → `h-6`
          - XP:    `text-xs font-bold` → 16px line-height → `h-4` */}
      <View className="flex flex-row items-center justify-between gap-x-2">
        <View className="min-w-0 flex-1">
          <Skeleton className="h-6 rounded-md" style={{ width: widths.title }} />
        </View>
        <Skeleton className="h-4 shrink-0 rounded-md" style={{ width: widths.xp }} />
      </View>

      {/* Bottom: progress bar placeholder + N / Total placeholder */}
      <View className="flex flex-row items-center gap-x-3">
        <View className="h-1.5 flex-1">
          <Skeleton className="h-full rounded-full" style={{ width: widths.progress }} />
        </View>
        <View className="w-20 shrink-0 flex-row items-center justify-end gap-x-0.5">
          <Skeleton className="h-3 rounded-md" style={{ width: widths.count }} />
        </View>
      </View>
    </View>
  );
}

export { MissionCardSkeleton };
export type { MissionCardSkeletonProps };
