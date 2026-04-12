import * as React from 'react';

import { Pressable, View } from 'react-native';

import { RankPyramid, type RankPyramidTier } from '@/components/blocks/rank-pyramid';
import { RankTierCard } from '@/components/blocks/rank-tier-card';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface RankCardProps {
  /** Season header shown above the tier icon, e.g. `"E11 A2"`. */
  seasonTitle: string;
  /** Competitive tier display icon URL. */
  tierIcon?: string;
  /** Tier name, e.g. `"Diamond 2"`. */
  tierName?: string;
  /** Ranked Rating value. */
  rankedRating?: number;
  /** Suffix shown after the RR value (default `"RR"`). Pass `""` to hide. */
  rrLabel?: string;
  /** Header shown above the pyramid, e.g. `"ACT RANK"`. */
  actRankLabel: string;
  /** Pre-sorted (highest first) filled-slot list forwarded to the pyramid. */
  filledTiers?: ReadonlyArray<RankPyramidTier>;
  /** Border icon URL drawn behind the pyramid. */
  borderIcon?: string;
  /** Pyramid outer width in px. Defaults to `80` to match the career screen. */
  pyramidSize?: number;
  /** Chevron rendered on the far right when `onPress` is set (e.g. phosphor `<CaretRight />`). */
  chevron?: React.ReactNode;
  /** Tap handler. When omitted the card renders without `Pressable` and hides the chevron slot. */
  onPress?: () => void;
  /** Show the skeleton placeholder for the tier column; the pyramid shows its empty-state. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer row wrapper. */
  className?: string;
}

/**
 * Career rank card — composes `RankTierCard` (season + tier icon + RR) next to
 * `RankPyramid` (act-rank wins), with an optional chevron + tap handler for
 * the rank-history drill-in.
 *
 * Data-free: the consumer resolves tier metadata, pre-sorts the pyramid's
 * filled-slot list, and supplies the chevron icon and navigation handler.
 */
function RankCard({
  seasonTitle,
  tierIcon,
  tierName,
  rankedRating,
  rrLabel,
  actRankLabel,
  filledTiers,
  borderIcon,
  pyramidSize = 80,
  chevron,
  onPress,
  isLoading = false,
  className,
}: RankCardProps) {
  const content = (
    <View className={cn('flex-row items-center px-4 py-3', className)}>
      <View className="flex-1 flex-row items-start justify-center gap-x-6">
        <RankTierCard
          seasonTitle={seasonTitle}
          tierIcon={tierIcon}
          tierName={tierName}
          rankedRating={rankedRating}
          rrLabel={rrLabel}
          isLoading={isLoading}
        />

        <View className="items-center self-stretch">
          <Text className="text-muted-foreground mb-1 text-xs font-medium tracking-widest uppercase">
            {actRankLabel}
          </Text>
          <View className="flex-1 justify-center">
            <RankPyramid
              filledTiers={isLoading ? undefined : filledTiers}
              borderIcon={isLoading ? undefined : borderIcon}
              size={pyramidSize}
            />
          </View>
        </View>
      </View>

      {chevron ? (
        <View style={{ opacity: onPress ? 1 : 0 }}>{chevron}</View>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => (pressed ? { opacity: 0.6 } : null)}>
        {content}
      </Pressable>
    );
  }

  return content;
}

export { RankCard };
export type { RankCardProps };
