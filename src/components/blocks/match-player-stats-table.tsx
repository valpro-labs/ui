import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface MatchPlayerStatsRow {
  /** Stable id — used as React key. */
  id: string;
  /** Player display name. Truncated with `numberOfLines={1}`. */
  name: string;
  /** Agent display icon URL. Falls back to a muted placeholder square. */
  agentIconUrl?: string;
  /** Pre-formatted K–D string, e.g. `"21-14"`. */
  kd: string;
  /** First-kill count, pre-formatted. */
  fk: string;
  /** First-death count, pre-formatted. */
  fd: string;
  /** Average damage per round, pre-formatted (or `"—"` for empty). */
  adr: string;
  /** KAST percentage, pre-formatted (e.g. `"72%"` or `"—"`). */
  kast: string;
}

interface MatchPlayerStatsColumnLabels {
  player: string;
  kd: string;
  fk: string;
  fd: string;
  adr: string;
  kast: string;
}

interface MatchPlayerStatsTableProps {
  /** One row per player, in display order. */
  rows: MatchPlayerStatsRow[];
  /**
   * Column header labels. Defaults to English — override to localise or to
   * match your app's existing copy.
   */
  columnLabels?: Partial<MatchPlayerStatsColumnLabels>;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

const DEFAULT_LABELS: MatchPlayerStatsColumnLabels = {
  player: 'PLAYER',
  kd: 'K–D',
  fk: 'FK',
  fd: 'FD',
  adr: 'ADR',
  kast: 'KAST',
};

/**
 * Scoreboard-style stats table used on the match-detail screen — agent icon
 * + name on the left, then fixed-width numeric columns for K–D, first kills,
 * first deaths, average damage per round, and KAST.
 *
 * Data-free: the consumer pre-formats every numeric column (including the
 * `"—"` fallback for deathmatch / missing rounds) and pre-computes the row
 * order. Render two tables side by side (ally team, enemy team) when the
 * app needs the split layout; this block is a single table.
 */
function MatchPlayerStatsTable({ rows, columnLabels, className }: MatchPlayerStatsTableProps) {
  if (rows.length === 0) return null;
  const labels = { ...DEFAULT_LABELS, ...columnLabels };

  return (
    <View className={cn('bg-card overflow-hidden rounded-2xl', className)}>
      <StatsHeader labels={labels} />
      <Separator className="bg-black/50! dark:bg-black/30!" />
      {rows.map((row, index) => (
        <View key={row.id}>
          {index > 0 && <Separator className="bg-black/50! dark:bg-black/30!" />}
          <StatsRow row={row} />
        </View>
      ))}
    </View>
  );
}

function StatsHeader({ labels }: { labels: MatchPlayerStatsColumnLabels }) {
  return (
    <View className="flex-row items-center px-3 py-2">
      <Text variant="muted" className="flex-1 text-xs font-semibold tracking-wider">
        {labels.player}
      </Text>
      <Text variant="muted" className="w-14 text-center text-xs font-semibold tracking-wider">
        {labels.kd}
      </Text>
      <Text variant="muted" className="w-8 text-center text-xs font-semibold tracking-wider">
        {labels.fk}
      </Text>
      <Text variant="muted" className="w-8 text-center text-xs font-semibold tracking-wider">
        {labels.fd}
      </Text>
      <Text variant="muted" className="w-10 text-center text-xs font-semibold tracking-wider">
        {labels.adr}
      </Text>
      <Text variant="muted" className="w-12 text-center text-xs font-semibold tracking-wider">
        {labels.kast}
      </Text>
    </View>
  );
}

function StatsRow({ row }: { row: MatchPlayerStatsRow }) {
  return (
    <View className="flex-row items-center px-3 py-2.5">
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
      <Text className="w-14 text-center text-sm tabular-nums">{row.kd}</Text>
      <Text className="w-8 text-center text-sm tabular-nums">{row.fk}</Text>
      <Text className="w-8 text-center text-sm tabular-nums">{row.fd}</Text>
      <Text className="w-10 text-center text-sm tabular-nums">{row.adr}</Text>
      <Text className="w-12 text-center text-sm tabular-nums">{row.kast}</Text>
    </View>
  );
}

export { MatchPlayerStatsTable };
export type {
  MatchPlayerStatsTableProps,
  MatchPlayerStatsRow,
  MatchPlayerStatsColumnLabels,
};
