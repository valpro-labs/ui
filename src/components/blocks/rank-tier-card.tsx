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
  /** Show the ranked rating row under the tier name. */
  showRankedRating?: boolean;
  /** Show the skeleton placeholder instead of the real content. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer column wrapper. */
  className?: string;
}

function normalizeHex(input?: string): string | undefined {
  if (!input) return undefined;
  return input.startsWith('#') ? input : `#${input}`;
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
  showRankedRating = true,
  isLoading = false,
  className,
}: RankTierCardProps) {
  if (isLoading) {
    return <RankTierCardSkeleton showRankedRating={showRankedRating} className={className} />;
  }

  const color = normalizeHex(tierColor);

  return (
    <View className={cn('items-center', className)}>
      <Text className="text-muted-foreground mb-1 text-xs font-medium tracking-widest uppercase">
        {seasonTitle}
      </Text>
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
          className="text-foreground mt-1 text-base font-bold tracking-wide uppercase"
          style={color ? { color } : undefined}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {tierName}
        </Text>
      ) : null}
      {showRankedRating ? (
        <Text className="text-muted-foreground mt-0.5 text-sm font-medium">
          {rankedRating ?? 0}
          {rrLabel ? ` ${rrLabel}` : ''}
        </Text>
      ) : null}
    </View>
  );
}

export { RankTierCard };
export type { RankTierCardProps };
