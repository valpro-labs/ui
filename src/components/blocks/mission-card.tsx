import * as React from 'react';

import { View } from 'react-native';

import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface MissionCardProps {
  /** Mission display title. */
  title: string;
  /** XP amount awarded on completion. */
  xpReward: number;
  /** Current progress count. */
  progress: number;
  /** Target count required to complete. */
  total: number;
  /** Label shown after the XP amount. Pass a localized string. Default: `"XP"`. */
  xpLabel?: string;
  /** Extra classes applied to the root wrapper. */
  className?: string;
}

/**
 * Compacts large counts the way the weekly-mission row does on the home screen —
 * e.g. 1500 → "2K". Stays a plain number below 1000.
 */
function formatCount(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(0).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

/**
 * Single weekly/daily mission row.
 *
 * Title + XP reward on top, progress bar + numeric progress on the bottom.
 * The bar turns fully green once the mission is complete (progress >= total).
 *
 * Data-free: pass in the fields you already have on the caller side. Compose
 * multiple of these with a `<Separator />` between them to reproduce the home
 * screen's weekly mission list.
 */
function MissionCard({
  title,
  xpReward,
  progress,
  total,
  xpLabel = 'XP',
  className,
}: MissionCardProps) {
  const percent = total > 0 ? Math.min(progress / total, 1) : 0;
  const completed = percent >= 1;

  return (
    <View className={cn('w-full gap-y-1', className)}>
      {/* Top: title + XP reward */}
      <View className="flex flex-row items-center justify-between gap-x-2">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-foreground flex-1 text-base font-medium">
          {title}
        </Text>
        <Text
          className={cn(
            'shrink-0 text-xs font-bold tabular-nums',
            completed ? 'text-val-green-ui' : 'text-val-green-ui/50'
          )}>
          +{xpReward.toLocaleString()} {xpLabel}
        </Text>
      </View>

      {/* Bottom: progress bar + N / Total */}
      <View className="flex flex-row items-center gap-x-3">
        <Progress
          value={percent * 100}
          className="bg-muted h-1.5 flex-1"
          indicatorClassName={cn(
            'shadow-[0_0_8px_rgba(34,255,197,0.5)]',
            completed ? 'bg-val-green-ui' : 'bg-val-green-ui/50'
          )}
        />
        <View className="w-20 shrink-0 flex-row items-center justify-center gap-x-0.5">
          <Text className="text-muted-foreground flex-1 text-right text-xs leading-none tabular-nums">
            {formatCount(progress)}
          </Text>
          <Text className="text-muted-foreground text-xs leading-none">/</Text>
          <Text className="text-muted-foreground text-xs leading-none tabular-nums">
            {formatCount(total)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export { MissionCard };
export type { MissionCardProps };
