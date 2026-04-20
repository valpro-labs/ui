import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface KillMatrixPlayer {
  /** Stable id — used as React key and as the row/column identifier. */
  id: string;
  /** Agent display icon URL. Falls back to a muted placeholder square. */
  agentIconUrl?: string;
}

interface KillMatrixCell {
  /** Kills the ally (row) has on the enemy (column). */
  allyKills: number;
  /** Kills the enemy (column) has on the ally (row). */
  enemyKills: number;
}

interface KillMatrixProps {
  /** Row players — typically the viewer's team. */
  allyPlayers: KillMatrixPlayer[];
  /** Column players — typically the opposing team. */
  enemyPlayers: KillMatrixPlayer[];
  /**
   * 2D grid of cells, `cells[allyIndex][enemyIndex]`. Missing entries render
   * as `0:0` with a neutral tint. Consumer computes this from match data.
   */
  cells: (KillMatrixCell | undefined)[][];
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * Kill-matrix card used on the match-detail screen — rows are the viewer's
 * teammates, columns are enemy players, and each cell shows
 * `<ally kills>:<enemy kills>` against the paired opponent. Cells are tinted
 * green when the ally leads the exchange, red when the enemy leads, and
 * muted when they are even.
 *
 * Data-free: the consumer resolves agent icons and pre-computes the cell
 * grid (including any first-kills / weapon filters). Pair with
 * `<SectionTitle>` above for a header + filter tabs slot.
 */
function KillMatrix({ allyPlayers, enemyPlayers, cells, className }: KillMatrixProps) {
  if (allyPlayers.length === 0 || enemyPlayers.length === 0) return null;

  return (
    <View className={cn('bg-card gap-y-1 rounded-2xl p-2', className)}>
      <View className="flex-row items-center gap-x-1">
        <View className="w-10" />
        {enemyPlayers.map((enemy) => (
          <View key={enemy.id} className="flex-1 items-center py-1">
            <AgentIcon uri={enemy.agentIconUrl} />
          </View>
        ))}
      </View>
      {allyPlayers.map((ally, allyIndex) => (
        <View key={ally.id} className="flex-row items-center gap-x-1">
          <View className="w-10 items-center">
            <AgentIcon uri={ally.agentIconUrl} />
          </View>
          {enemyPlayers.map((enemy, enemyIndex) => {
            const cell = cells[allyIndex]?.[enemyIndex] ?? { allyKills: 0, enemyKills: 0 };
            const { allyKills, enemyKills } = cell;
            return (
              <View
                key={enemy.id}
                className={cn(
                  'flex-1 items-center justify-center rounded-md py-3',
                  allyKills > enemyKills && 'bg-val-green/25 dark:bg-val-green/10',
                  enemyKills > allyKills && 'bg-val-red/25 dark:bg-val-red/10',
                  allyKills === enemyKills && 'bg-muted/50'
                )}>
                <Text className="text-sm font-medium tabular-nums">
                  {allyKills}:{enemyKills}
                </Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

function AgentIcon({ uri }: { uri?: string }) {
  if (!uri) {
    return <View className="bg-muted h-8 w-8 rounded" />;
  }
  return (
    <Image source={uri} style={{ width: 32, height: 32, borderRadius: 4 }} contentFit="cover" />
  );
}

export { KillMatrix };
export type { KillMatrixProps, KillMatrixPlayer, KillMatrixCell };
