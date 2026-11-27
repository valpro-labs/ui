import * as React from 'react';

import { View } from 'react-native';

import { CardSurface } from '@/components/ui/card-surface';
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
  /** Optional server name, shown after `duration` when provided. */
  server?: string;
  /** Captions under the date, duration and server values (e.g. "Date", "Duration", "Server"). */
  dateLabel?: string;
  durationLabel?: string;
  serverLabel?: string;
  /** Extra classes merged onto the outer wrapper. */
  className?: string;
}

/**
 * Metadata card shown under the map banner on the match-detail screen —
 * the game mode as the title, then date, duration and (optional) server in
 * equal columns, each value over its caption.
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
  server,
  dateLabel,
  durationLabel,
  serverLabel,
  className,
}: MatchInfoRowProps) {
  const facts = [
    { key: 'date', value: date, label: dateLabel },
    { key: 'duration', value: duration, label: durationLabel },
    ...(server ? [{ key: 'server', value: server, label: serverLabel }] : []),
  ];
  return (
    // The mode as the card title, then the match facts in equal columns (value over caption),
    // so long server names or locales never push the layout around.
    <CardSurface className={cn('bg-card rounded-3xl', className)}>
      <View className="min-w-0 flex-row items-center gap-x-2 px-4 pt-3">
        {modeIcon ? <View className="shrink-0">{modeIcon}</View> : null}
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-foreground min-w-0 shrink text-sm font-semibold">
          {mode}
        </Text>
      </View>
      <View className="flex-row py-3">
        {facts.map((fact, index) => (
          <View
            key={fact.key}
            className={cn('min-w-0 shrink grow basis-auto items-center px-2', index > 0 && 'border-border border-l')}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-foreground text-sm font-semibold tabular-nums">
              {fact.value}
            </Text>
            {fact.label ? (
              <Text numberOfLines={1} className="text-muted-foreground mt-0.5 text-xs">
                {fact.label}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </CardSurface>
  );
}

export { MatchInfoRow };
export type { MatchInfoRowProps };
