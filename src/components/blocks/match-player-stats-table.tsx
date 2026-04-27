import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface MatchPlayerStatsColumn {
  /** Stable key — used as React key and to look up `row.values[key]`. */
  key: string;
  /** Column header label, e.g. `"K"`, `"ACS"`, `"HS%"`. */
  label: string;
  /** Fixed pixel width for the column. Defaults to 36. */
  width?: number;
}

interface MatchPlayerStatsRow {
  /** Stable id — used as React key. */
  id: string;
  /** Player display name. Truncated with `numberOfLines={1}`. */
  name: string;
  /** Agent display icon URL. Falls back to a muted placeholder square. */
  agentIconUrl?: string;
  /** When true, the row gets a yellow tint to mark the viewing player. */
  isCurrentPlayer?: boolean;
  /** Pre-formatted cell values keyed by `column.key` — `"—"` for empty. */
  values: Record<string, string>;
}

interface MatchPlayerStatsTableProps {
  /** One row per player, in display order. */
  rows: MatchPlayerStatsRow[];
  /**
   * Column definitions in display order. The consumer drives the column set
   * — switch arrays to swap between KDA, combat (ACS / HS% / KAST / FK / FD),
   * deathmatch, etc. without changing the block.
   */
  columns: MatchPlayerStatsColumn[];
  /** Header label for the leftmost (player) column. */
  playerLabel: string;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

const DEFAULT_STAT_COLUMN_WIDTH = 36;

/**
 * Scoreboard-style stats table used on the match-detail screen — agent icon
 * + name on the left, then a consumer-defined set of fixed-width numeric
 * columns. Rows can be tinted (`isCurrentPlayer`) to highlight the viewing
 * player.
 *
 * Data-free: the consumer pre-formats every value (including the `"—"`
 * fallback for deathmatch / missing rounds), picks the column set, and
 * pre-computes the row order. Render two tables side by side (ally team,
 * enemy team) when the app needs the split layout; this block is a single
 * table.
 */
function MatchPlayerStatsTable({
  rows,
  columns,
  playerLabel,
  className,
}: MatchPlayerStatsTableProps) {
  if (rows.length === 0) return null;

  return (
    <View className={cn('bg-card overflow-hidden rounded-2xl', className)}>
      <StatsHeader columns={columns} playerLabel={playerLabel} />
      <Separator className="bg-black/50! dark:bg-black/30!" />
      {rows.map((row, index) => (
        <View key={row.id}>
          {index > 0 && <Separator className="bg-black/50! dark:bg-black/30!" />}
          <StatsRow row={row} columns={columns} />
        </View>
      ))}
    </View>
  );
}

function StatsHeader({
  columns,
  playerLabel,
}: {
  columns: MatchPlayerStatsColumn[];
  playerLabel: string;
}) {
  return (
    <View className="flex-row items-center px-3 py-2">
      <Text variant="muted" className="flex-1 text-xs font-semibold tracking-wider">
        {playerLabel}
      </Text>
      {columns.map((column) => (
        <Text
          key={column.key}
          variant="muted"
          className="text-center text-xs font-semibold tracking-wider"
          style={{ width: column.width ?? DEFAULT_STAT_COLUMN_WIDTH }}>
          {column.label}
        </Text>
      ))}
    </View>
  );
}

function StatsRow({
  row,
  columns,
}: {
  row: MatchPlayerStatsRow;
  columns: MatchPlayerStatsColumn[];
}) {
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
      {columns.map((column) => (
        <Text
          key={column.key}
          className="text-center text-sm tabular-nums"
          style={{ width: column.width ?? DEFAULT_STAT_COLUMN_WIDTH }}>
          {row.values[column.key] ?? '—'}
        </Text>
      ))}
    </View>
  );
}

export { MatchPlayerStatsTable };
export type { MatchPlayerStatsTableProps, MatchPlayerStatsRow, MatchPlayerStatsColumn };
