import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type PlayerRowRole = 'me' | 'ally' | 'enemy';

interface PlayerRowProps {
  /** Agent display icon URL — fills the left square. */
  agentIconUrl?: string;
  /** Player display name. Falls back to nothing if omitted. */
  name?: string;
  /** Row tint: `me` → yellow, `ally` → green, `enemy` → red. */
  role: PlayerRowRole;
  /** Pre-formatted KDA, e.g. `"21/14/8"`. */
  kda?: string;
  /** Average combat score shown under the KDA line. */
  avgScore?: number;
  /** Competitive tier icon URL — small badge rendered before the name. */
  tierIconUrl?: string;
  /** Marker shown next to the avg-score line. Consumer supplies (e.g. phosphor `<ChartBar />`). */
  scoreIcon?: React.ReactNode;
  /** Extra classes merged onto the outer row wrapper. */
  className?: string;
}

/**
 * Single scoreboard row inside the match-detail player list — agent icon
 * on the left, optional tier badge, player name, KDA / avg-score on the
 * right. Background tint is driven by `role`:
 *  - `me` — yellow (highlights the viewer)
 *  - `ally` — green
 *  - `enemy` — red
 *
 * Data-free: the consumer resolves the agent + tier icons, formats KDA,
 * and decides role. Stack instances with a `<Separator />` between rows
 * inside a `bg-card rounded-2xl overflow-hidden` container to match the
 * app's scoreboard card.
 */
function PlayerRow({
  agentIconUrl,
  name,
  role,
  kda,
  avgScore,
  tierIconUrl,
  scoreIcon,
  className,
}: PlayerRowProps) {
  return (
    <View
      className={cn(
        'flex-row items-center',
        role === 'me' && 'bg-val-yellow/80 dark:bg-val-yellow/80',
        role === 'ally' && 'bg-val-green/80 dark:bg-val-green/60',
        role === 'enemy' && 'bg-val-red/80 dark:bg-val-red/65',
        className
      )}>
      <View className="aspect-square h-16">
        {agentIconUrl ? (
          <Image
            source={agentIconUrl}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        ) : null}
      </View>
      {tierIconUrl ? (
        <View className="h-10 w-10">
          <Image
            source={tierIconUrl}
            style={{ width: '100%', height: '100%' }}
            contentFit="contain"
          />
        </View>
      ) : null}
      <View className="flex-1 flex-row items-center gap-x-2 pr-4 pl-2">
        <Text className="flex-1 text-lg font-bold text-black dark:text-white" numberOfLines={1}>
          {name}
        </Text>
        {kda != null && avgScore != null ? (
          <View className="items-end">
            <Text className="text-lg font-bold text-black dark:text-white">{kda}</Text>
            <View className="flex-row items-center gap-x-1">
              {scoreIcon}
              <Text className="text-xs text-black/70 dark:text-white/70">
                {avgScore.toLocaleString()}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export { PlayerRow };
export type { PlayerRowProps, PlayerRowRole };
