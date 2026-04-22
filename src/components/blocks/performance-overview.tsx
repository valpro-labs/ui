import * as React from 'react';

import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface PerformanceOverviewRow {
  /** Left-hand label, e.g. `"Kills"`. */
  label: string;
  /** Ally-side total — rendered on the left of the bar and tints the green segment. */
  allyValue: number;
  /** Enemy-side total — rendered on the right of the bar and tints the red segment. */
  enemyValue: number;
}

interface PerformanceOverviewProps {
  /** One row per metric. Order is preserved top-to-bottom. */
  rows: PerformanceOverviewRow[];
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * Team performance overview card — each row shows an ally total, a
 * proportional ally/enemy split bar, and an enemy total. The bar always
 * sums to full width; a 1-pixel marker at 50% makes it easy to see which
 * side is ahead.
 *
 * Data-free: the consumer pre-aggregates totals (kills, deaths, assists,
 * or any other scalar metric) and supplies the labels. Pair with
 * `<SectionTitle>` above for a header.
 */
function PerformanceOverview({ rows, className }: PerformanceOverviewProps) {
  if (rows.length === 0) return null;

  return (
    <View className={cn('bg-card gap-y-3 rounded-2xl p-4', className)}>
      {rows.map((row) => (
        <View key={row.label} className="flex-row items-center gap-x-3">
          <Text variant="muted" className="w-12 text-sm">
            {row.label}
          </Text>
          <Text className="w-8 text-right text-sm font-medium tabular-nums">
            {row.allyValue}
          </Text>
          <View className="flex-1">
            <MetricBar a={row.allyValue} b={row.enemyValue} />
          </View>
          <Text className="w-8 text-sm font-medium tabular-nums">{row.enemyValue}</Text>
        </View>
      ))}
    </View>
  );
}

function MetricBar({ a, b }: { a: number; b: number }) {
  const total = a + b;
  const aShare = total > 0 ? a / total : 0.5;
  const bShare = 1 - aShare;

  return (
    <View className="bg-muted/30 relative h-2 flex-row overflow-hidden rounded-full">
      {aShare > 0 && <View style={{ flex: aShare }} className="bg-val-green/70" />}
      {bShare > 0 && <View style={{ flex: bShare }} className="bg-val-red/70" />}
      <View className="bg-foreground/40 absolute top-0 bottom-0 left-1/2 w-px" />
    </View>
  );
}

export { PerformanceOverview };
export type { PerformanceOverviewProps, PerformanceOverviewRow };
