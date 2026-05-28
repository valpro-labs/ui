import * as React from 'react';

import { Pressable, View } from 'react-native';

import { RankPyramid, type RankPyramidTier } from '@/components/blocks/rank-pyramid';
import { RankTierCard } from '@/components/blocks/rank-tier-card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const RANK_PYRAMID_VISUAL_OFFSET_Y = -8;
const RANK_SUMMARY_MIN_HEIGHT = 100;
const CHEVRON_WIDTH = 14;
const CHEVRON_RIGHT_OFFSET = 12;

interface RankProgress {
  /** Current progress value. For normal ranked tiers this is usually the current RR. */
  value: number;
  /** Maximum progress value. Defaults to `100` for normal RR tiers. */
  max?: number;
  /** Deprecated: progress no longer renders a text label. */
  label?: string;
  /** Right-side value next to the bar. Defaults to `"value/max"`. */
  valueLabel?: string;
}

interface RankCardProps {
  /** Season header shown above the tier icon, e.g. `"E11 A2"`. */
  seasonTitle: string;
  /** Competitive tier display icon URL. */
  tierIcon?: string;
  /** Competitive tier id. Tier `0` is unranked and hides RR unless progress is supplied. */
  tier?: number;
  /** Tier name, e.g. `"Diamond 2"`. */
  tierName?: string;
  /** Tier name accent color from the competitive tier API, with or without the leading `#`. */
  tierColor?: string;
  /** Ranked Rating value. */
  rankedRating?: number;
  /** Suffix shown after the RR value (default `"RR"`). Pass `""` to hide. */
  rrLabel?: string;
  /** Optional rank-rating rail shown below the rank summary. */
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
  /** Show the rank-rating rail placeholder while loading. */
  showRankProgressSkeleton?: boolean;
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

function getRankedRatingProgress(
  rankedRating: number | undefined,
  rrLabel: string | undefined
): RankProgress {
  const rating = rankedRating ?? 0;
  return {
    value: 100,
    valueLabel: rrLabel === '' ? rating.toString() : `${rating} ${rrLabel ?? 'RR'}`,
  };
}

function RankProgressRail({
  color,
  progress,
  progressPercent,
  showSkeleton,
}: {
  color?: string;
  progress?: RankProgress;
  progressPercent?: number;
  showSkeleton: boolean;
}) {
  return (
    <View className="w-full flex-row items-center gap-x-2">
      {showSkeleton ? (
        <>
          <Skeleton className="h-1 flex-1 rounded-full" />
          <Skeleton className="h-3 w-11 shrink-0 rounded-md" />
        </>
      ) : (
        <>
          <Progress
            value={progressPercent}
            className="bg-muted/70 h-1 flex-1"
            indicatorStyle={color ? { backgroundColor: color } : undefined}
          />
          {progress ? (
            <Text
              className="text-muted-foreground shrink-0 text-xs leading-none font-semibold tabular-nums"
              numberOfLines={1}>
              {getProgressValueLabel(progress)}
            </Text>
          ) : null}
        </>
      )}
    </View>
  );
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
  tier,
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
  showRankProgressSkeleton = true,
  className,
}: RankCardProps) {
  const color = normalizeHex(tierColor);
  const isUnrankedTier = tier === 0;
  const visibleRankProgress =
    rankProgress ?? (isUnrankedTier ? undefined : getRankedRatingProgress(rankedRating, rrLabel));
  const progressPercent = visibleRankProgress ? getProgressPercent(visibleRankProgress) : undefined;
  const showProgressSkeleton = !isUnrankedTier && isLoading && showRankProgressSkeleton;
  const showProgressRail = showProgressSkeleton || (!isLoading && !!visibleRankProgress);
  const showChevron = !!chevron && !!onPress;

  const content = (
    <View className={cn('relative px-4 py-3', className)}>
      <View className="flex-row" style={{ minHeight: RANK_SUMMARY_MIN_HEIGHT }}>
        <View className="flex-1 flex-row items-stretch justify-center gap-x-6">
          <RankTierCard
            className="w-36 self-stretch"
            bodyClassName="flex-1 justify-center"
            seasonTitle={seasonTitle}
            tierIcon={tierIcon}
            tierName={tierName}
            tierColor={tierColor}
            rankedRating={rankedRating}
            rrLabel={rrLabel}
            showRankedRating={!isUnrankedTier && !visibleRankProgress && !showProgressSkeleton}
            isLoading={isLoading}
          />

          <View className="items-center">
            <Text
              className="text-muted-foreground text-xs font-medium tracking-widest uppercase"
              style={{ marginBottom: 10 }}>
              {actRankLabel}
            </Text>
            <RankPyramid
              filledTiers={isLoading ? undefined : filledTiers}
              borderIcon={isLoading ? undefined : borderIcon}
              reserveBorderSpace={isLoading}
              size={pyramidSize}
              visualOffsetY={RANK_PYRAMID_VISUAL_OFFSET_Y}
            />
          </View>
        </View>
      </View>
      {showProgressRail ? (
        <View>
          <RankProgressRail
            color={color}
            progress={visibleRankProgress}
            progressPercent={progressPercent}
            showSkeleton={showProgressSkeleton}
          />
        </View>
      ) : null}

      {showChevron ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            right: CHEVRON_RIGHT_OFFSET,
            bottom: 0,
            width: CHEVRON_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {chevron}
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
