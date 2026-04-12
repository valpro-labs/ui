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
      <View className="flex-row items-center gap-x-2">
        {modeIcon}
        <Text className="text-foreground text-sm font-semibold">{mode}</Text>
      </View>
      <View className="flex-row items-center gap-x-4">
        <View className="flex-row items-center gap-x-1.5">
          {dateIcon}
          <Text className="text-muted-foreground text-xs">{date}</Text>
        </View>
        <View className="flex-row items-center gap-x-1.5">
          {durationIcon}
          <Text className="text-muted-foreground text-xs">{duration}</Text>
        </View>
      </View>
    </View>
  );
}

export { MatchInfoRow };
export type { MatchInfoRowProps };
