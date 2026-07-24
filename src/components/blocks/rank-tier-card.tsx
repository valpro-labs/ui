import { View } from 'react-native';

import { RankTierCardSkeleton } from '@/components/blocks/rank-tier-card-skeleton';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface RankTierCardProps {
  /** Section header above the tier icon, e.g. `"E11 A2"`. */
  seasonTitle: string;
  /** Competitive tier display icon URL. */
  tierIcon?: string;
  /** Tier name, e.g. `"Diamond 2"`. */
  tierName?: string;
  /** Tier name accent color from the competitive tier API, with or without the leading `#`. */
  tierColor?: string;
  /** Ranked Rating value. */
  rankedRating?: number;
  /** Suffix shown after the RR value (default `"RR"`). Pass `""` to hide. */
  rrLabel?: string;
  /** Optional leaderboard position shown as `Rank {n}` below the rank summary. */
  leaderboardRank?: number;
  /** Show the ranked rating row under the tier name. */
  showRankedRating?: boolean;
  /** Show the skeleton placeholder instead of the real content. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer column wrapper. */
  className?: string;
  /** Extra classes merged onto the icon/name/rating body wrapper. */
  bodyClassName?: string;
}

function normalizeHex(input?: string): string | undefined {
  if (!input) return undefined;
  return input.startsWith('#') ? input : `#${input}`;
}

function withAlpha(color: string | undefined, alpha: string): string | undefined {
  if (!color) return undefined;
  return color.length === 9 ? `${color.slice(0, 7)}${alpha}` : color;
}

/**
 * Rank tier summary column — season label, tier icon, tier name, and RR,
 * stacked and horizontally centered. Composes into the career rank card or
 * any other surface that needs to display a player's current tier.
 *
 * Data-free: the consumer resolves tier metadata.
 */
function RankTierCard({
  seasonTitle,
  tierIcon,
  tierName,
  tierColor,
  rankedRating,
  rrLabel = 'RR',
  leaderboardRank,
  showRankedRating = true,
  isLoading = false,
  className,
  bodyClassName,
}: RankTierCardProps) {
  if (isLoading) {
    return (
      <RankTierCardSkeleton
        showRankedRating={showRankedRating}
        className={className}
        bodyClassName={bodyClassName}
      />
    );
  }

  const color = normalizeHex(tierColor);

  return (
    <View className={cn('items-center gap-y-2.5', className)}>
      <Text className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
        {seasonTitle}
      </Text>
      <View className={cn('items-center gap-y-1', bodyClassName)}>
        <View className="h-16 w-16">
          {tierIcon ? (
            <Image
              source={tierIcon}
              style={{ width: '100%', height: '100%' }}
              contentFit="contain"
            />
          ) : null}
        </View>
        {tierName ? (
          <Text
            className="text-foreground text-base font-bold tracking-wide uppercase"
            style={color ? { color } : undefined}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {tierName}
          </Text>
        ) : null}
        {showRankedRating ? (
          <Text className="text-muted-foreground text-sm font-medium">
            {rankedRating ?? 0}
            {rrLabel ? ` ${rrLabel}` : ''}
          </Text>
        ) : null}
        {leaderboardRank != null ? (
          <View
            className="rounded-full border-2 px-5 py-1"
            style={
              color
                ? { backgroundColor: withAlpha(color, '24'), borderColor: withAlpha(color, '80') }
                : undefined
            }>
            <Text
              className="text-xs font-bold tabular-nums"
              style={color ? { color } : undefined}>
              Rank {leaderboardRank}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export { RankTierCard };
export type { RankTierCardProps };
