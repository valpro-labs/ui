import * as React from 'react';

import { Pressable, View } from 'react-native';

import { RankPyramid, type RankPyramidTier } from '@/components/blocks/rank-pyramid';
import { RankTierCard } from '@/components/blocks/rank-tier-card';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface RankProgress {
  /** Current progress value. For normal ranked tiers this is usually the current RR. */
  value: number;
  /** Maximum progress value. Defaults to `100` for normal RR tiers. */
  max?: number;
  /** Left-side label below the bar. Defaults to `"RANK RATING"`. */
  label?: string;
  /** Right-side value below the bar. Defaults to `"value/max"`. */
  valueLabel?: string;
}

interface RankCardProps {
  /** Season header shown above the tier icon, e.g. `"E11 A2"`. */
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
  /** Optional full-width rank-rating rail shown below the rank summary row. */
  rankProgress?: RankProgress;
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
  /** Extra classes merged onto the outer wrapper. */
  className?: string;
}

function normalizeHex(input?: string): string | undefined {
  if (!input) return undefined;
  return input.startsWith('#') ? input : `#${input}`;
}

function getProgressPercent(progress: RankProgress): number {
  const max = progress.max ?? 100;
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, (progress.value / max) * 100));
}

function getProgressValueLabel(progress: RankProgress): string {
  return progress.valueLabel ?? `${progress.value}/${progress.max ?? 100}`;
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
  tierColor,
  rankedRating,
  rrLabel,
  rankProgress,
  actRankLabel,
  filledTiers,
  borderIcon,
  pyramidSize = 80,
  chevron,
  onPress,
  isLoading = false,
  className,
}: RankCardProps) {
  const color = normalizeHex(tierColor);
  const progressPercent = rankProgress ? getProgressPercent(rankProgress) : undefined;

  const content = (
    <View className={cn('px-4 py-3', className)}>
      <View className="flex-row items-center">
        <View className="flex-1 flex-row items-start justify-center gap-x-6">
          <RankTierCard
            className="w-36"
            seasonTitle={seasonTitle}
            tierIcon={tierIcon}
            tierName={tierName}
            tierColor={tierColor}
            rankedRating={rankedRating}
            rrLabel={rrLabel}
            showRankedRating={!rankProgress}
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

        <View style={{ minWidth: 14, opacity: chevron && onPress ? 1 : 0 }}>
          {chevron}
        </View>
      </View>

      {!isLoading && rankProgress ? (
        <View className="mt-3">
          <Progress
            value={progressPercent}
            className="bg-muted/70 h-1.5"
            indicatorStyle={color ? { backgroundColor: color } : undefined}
          />
          <View className="mt-1 flex-row items-center justify-between">
            <Text className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {rankProgress.label ?? 'RANK RATING'}
            </Text>
            <Text className="text-foreground text-xs font-semibold tabular-nums">
              {getProgressValueLabel(rankProgress)}
            </Text>
          </View>
        </View>
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
export type { RankCardProps, RankProgress };
