import * as React from 'react';

import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface MatchInfoRowProps {
  /** Primary label on the left — typically the game mode. */
  mode: string;
  /** First secondary label — typically the match date. */
  date: string;
  /** Second secondary label — typically the match duration. */
  duration: string;
  /** Icon rendered next to `mode`. Consumer supplies (e.g. phosphor `<GameController />`). */
  modeIcon?: React.ReactNode;
  /** Icon rendered next to `date`. */
  dateIcon?: React.ReactNode;
  /** Icon rendered next to `duration`. */
  durationIcon?: React.ReactNode;
  /** Extra classes merged onto the outer wrapper. */
  className?: string;
}

/**
 * Metadata strip shown under the map banner on the match-detail screen —
 * game mode on the left, date + duration on the right, each paired with a
 * caller-supplied icon.
 *
 * Data-free: the consumer formats all three strings and supplies the
 * icons as `ReactNode` slots. Wrapping in a `<View>` is unnecessary;
 * the row already renders its own `bg-card` card chrome.
 */
function MatchInfoRow({
  mode,
  date,
  duration,
  modeIcon,
  dateIcon,
  durationIcon,
  className,
}: MatchInfoRowProps) {
  return (
    <View
      className={cn(
        'bg-card flex-row items-center justify-between rounded-2xl px-4 py-3',
        className
      )}>
      <View className="min-w-0 flex-1 flex-row items-center gap-x-2 pr-3">
        {modeIcon ? <View className="shrink-0">{modeIcon}</View> : null}
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-foreground min-w-0 shrink text-sm font-semibold">
          {mode}
        </Text>
      </View>
      <View className="shrink-0 flex-row items-center gap-x-4">
        <View className="shrink-0 flex-row items-center gap-x-1.5">
          {dateIcon ? <View className="shrink-0">{dateIcon}</View> : null}
          <Text className="text-muted-foreground shrink-0 text-xs">{date}</Text>
        </View>
        <View className="shrink-0 flex-row items-center gap-x-1.5">
          {durationIcon ? <View className="shrink-0">{durationIcon}</View> : null}
          <Text className="text-muted-foreground shrink-0 text-xs">{duration}</Text>
        </View>
      </View>
    </View>
  );
}

export { MatchInfoRow };
export type { MatchInfoRowProps };
