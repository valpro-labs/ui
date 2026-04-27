import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface MatchMultiKillCounts {
  /** 2-kill rounds. */
  k2: number;
  /** 3-kill rounds. */
  k3: number;
  /** 4-kill rounds. */
  k4: number;
  /** Ace (5-kill) rounds. */
  k5: number;
}

interface MatchMultiKillRow {
  /** Stable id — used as React key. */
  id: string;
  /** Player display name. Truncated with `numberOfLines={1}`. */
  name: string;
  /** Agent display icon URL. Falls back to a muted placeholder square. */
  agentIconUrl?: string;
  /** When true, the row gets a yellow tint to mark the viewing player. */
  isCurrentPlayer?: boolean;
  /** Per-tier counts. Zero values render muted. */
  counts: MatchMultiKillCounts;
}

interface MatchMultiKillColumnLabels {
  player: string;
  k2: string;
  k3: string;
  k4: string;
  k5: string;
}

interface MatchMultiKillTableProps {
  /** One row per player, in display order. */
  rows: MatchMultiKillRow[];
  /**
   * Column header labels. Defaults to English / `NK` shorthand — override to
   * localise or to match your app's existing copy.
   */
  columnLabels?: Partial<MatchMultiKillColumnLabels>;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

const DEFAULT_LABELS: MatchMultiKillColumnLabels = {
  player: 'PLAYER',
  k2: '2K',
  k3: '3K',
  k4: '4K',
  k5: '5K',
};

const TIER_KEYS: (keyof MatchMultiKillCounts)[] = ['k2', 'k3', 'k4', 'k5'];

/**
 * Multi-kill tally table used on the match-detail screen — agent icon +
 * name on the left, then fixed-width columns counting 2K / 3K / 4K / 5K
 * rounds per player. Zero counts render muted so the rows with actual
 * multi-kills read at a glance.
 *
 * Data-free: the consumer pre-computes the tier counts and the row order.
 * Render two tables (ally / enemy) when the app needs the team split; this
 * block is a single table. Pair with `<SectionTitle>` above for a header +
 * team-filter slot.
 */
function MatchMultiKillTable({ rows, columnLabels, className }: MatchMultiKillTableProps) {
  if (rows.length === 0) return null;
  const labels = { ...DEFAULT_LABELS, ...columnLabels };

  return (
    <View className={cn('bg-card overflow-hidden rounded-2xl', className)}>
      <MultiKillHeader labels={labels} />
      <Separator className="bg-black/50! dark:bg-black/30!" />
      {rows.map((row, index) => (
        <View key={row.id}>
          {index > 0 && <Separator className="bg-black/50! dark:bg-black/30!" />}
          <MultiKillRow row={row} />
        </View>
      ))}
    </View>
  );
}

function MultiKillHeader({ labels }: { labels: MatchMultiKillColumnLabels }) {
  return (
    <View className="flex-row items-center px-3 py-2">
      <Text variant="muted" className="flex-1 text-xs font-semibold tracking-wider">
        {labels.player}
      </Text>
      {TIER_KEYS.map((key) => (
        <Text
          key={key}
          variant="muted"
          className="w-10 text-center text-xs font-semibold tracking-wider">
          {labels[key]}
        </Text>
      ))}
    </View>
  );
}

function MultiKillRow({ row }: { row: MatchMultiKillRow }) {
  return (
    <View
      className={cn(
        'flex-row items-center px-3 py-2.5',
        row.isCurrentPlayer && 'bg-val-yellow/20 dark:bg-val-yellow/20'
      )}>
      <View className="flex-1 flex-row items-center gap-x-2">
        {row.agentIconUrl ? (
          <Image
            source={row.agentIconUrl}
            style={{ width: 28, height: 28, borderRadius: 4 }}
            contentFit="cover"
          />
        ) : (
          <View className="bg-muted h-7 w-7 rounded" />
        )}
        <Text className="flex-1 text-sm font-medium" numberOfLines={1}>
          {row.name}
        </Text>
      </View>
      {TIER_KEYS.map((key) => {
        const value = row.counts[key];
        return (
          <Text
            key={key}
            className={cn(
              'w-10 text-center text-sm tabular-nums',
              value === 0 && 'text-muted-foreground'
            )}>
            {value}
          </Text>
        );
      })}
    </View>
  );
}

export { MatchMultiKillTable };
export type {
  MatchMultiKillTableProps,
  MatchMultiKillRow,
  MatchMultiKillCounts,
  MatchMultiKillColumnLabels,
};
