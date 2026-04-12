import { View, StyleSheet } from 'react-native';

import { PlayerCardSkeleton } from '@/components/blocks/player-card-skeleton';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface PlayerCardProps {
  /** Riot game name. */
  name: string;
  /** Riot tagline (without the leading `#`). */
  tag: string;
  /** URL for the wide card art banner. Renders the muted fallback when omitted. */
  cardWideArt?: string;
  /** Player title shown to the right of the name. */
  title?: string;
  /** Show the skeleton placeholder instead of the real card. */
  isLoading?: boolean;
  /** Extra classes merged onto the name area row. */
  nameAreaClassName?: string;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * Player identity card — wide banner art on top, Riot `name #tag` with an
 * optional player title on the bottom. Purely presentational: the consumer
 * provides the resolved art URL and strings.
 *
 * Pair with `PlayerCardSkeleton` while data is loading so the surrounding
 * layout doesn't shift.
 */
function PlayerCard({
  name,
  tag,
  cardWideArt,
  title,
  isLoading = false,
  nameAreaClassName,
  className,
}: PlayerCardProps) {
  if (isLoading) {
    return <PlayerCardSkeleton className={className} />;
  }
  return (
    <View className={cn('bg-card overflow-hidden rounded-2xl', className)}>
      {/* Banner */}
      <View
        style={{ aspectRatio: 452 / 128 }}
        className="bg-muted relative w-full overflow-hidden">
        {cardWideArt ? (
          <Image source={cardWideArt} style={StyleSheet.absoluteFill} contentFit="cover" />
        ) : null}
        <View style={StyleSheet.absoluteFill} className="bg-black/20" />
      </View>

      {/* Name Area */}
      <View className={cn('px-4 py-2', nameAreaClassName)}>
        <View className="flex-row items-baseline justify-between gap-x-4">
          <View className="min-w-0 shrink flex-row items-baseline gap-x-2">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ includeFontPadding: false }}
              className="text-foreground min-w-0 shrink text-2xl leading-none font-bold tracking-tight">
              {name}
            </Text>
            <Text className="text-muted-foreground shrink-0 text-lg font-bold">#{tag}</Text>
          </View>
          {title ? (
            <Text
              numberOfLines={1}
              className="text-muted-foreground shrink-0 text-sm font-medium tracking-wide uppercase">
              {title}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export { PlayerCard };
export type { PlayerCardProps };
