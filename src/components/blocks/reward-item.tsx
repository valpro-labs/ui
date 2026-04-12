import { View } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface RewardItemProps {
  /** Reward icon URL. Falls back to a muted square placeholder when omitted. */
  iconUrl?: string;
  /** Tint the icon with `--color-foreground`. Useful for title / currency glyphs shipped as text masks. */
  tinted?: boolean;
  /** Reward display name (main label). */
  name: string;
  /** Quantity multiplier; suffixes `"x{amount}"` after the name when > 1. */
  amount?: number;
  /** Sub-label shown under the name — e.g. `"TIER 5"` or `"EPILOGUE 2"`. Consumer resolves the string (i18n, etc.). */
  tierLabel?: string;
  /** XP accumulated toward this level. Pair with `xp` to draw the next-level progress stripe. */
  progressionXp?: number;
  /** XP required to reach this level. */
  xp?: number;
  /** Paints the row with a green completed tint. */
  isCompleted?: boolean;
  /** Enables the progress stripe underlay (needs `xp` + `progressionXp`). */
  isNext?: boolean;
  /** Hide the tier sub-label while keeping its height, so adjacent rows line up. */
  hideTier?: boolean;
  /** Extra classes merged onto the outer row wrapper. */
  className?: string;
}

/**
 * One row inside a battle-pass / event-pass reward list — thumbnail on the
 * left, reward name + tier sub-label stacked on the right. Completed rows
 * get a green wash; the current "next" row gets an XP progress stripe.
 *
 * Data-free: the consumer resolves the reward metadata, chooses when to
 * render `"TIER N"` / `"EPILOGUE N"`, and passes the raw icon URL + flags.
 * Stack instances with `<Separator />` in between to rebuild the app's
 * `RewardList` container on the caller side.
 */
function RewardItem({
  iconUrl,
  tinted = false,
  name,
  amount,
  tierLabel,
  progressionXp,
  xp,
  isCompleted = false,
  isNext = false,
  hideTier = false,
  className,
}: RewardItemProps) {
  const foregroundRaw = useCSSVariable('--color-foreground');
  const foreground = typeof foregroundRaw === 'string' ? foregroundRaw : undefined;

  const showProgress = !isCompleted && isNext && !!xp && progressionXp !== undefined;
  const progressPct = showProgress ? Math.min(100, (progressionXp / xp) * 100) : 0;

  return (
    <View
      className={cn(
        'relative flex-row items-center gap-x-3 overflow-hidden px-4 py-3',
        isCompleted && 'bg-val-green-ui/20',
        className
      )}>
      {showProgress ? (
        <View
          className="bg-val-green-ui/10 absolute top-0 bottom-0 left-0"
          style={{ width: `${progressPct}%` }}
        />
      ) : null}

      <View className="size-10 items-center justify-center">
        {iconUrl ? (
          <Image
            source={iconUrl}
            style={{
              width: '100%',
              height: '100%',
              tintColor: tinted ? foreground : undefined,
            }}
            contentFit="contain"
          />
        ) : (
          <View className="bg-muted h-full w-full" />
        )}
      </View>

      <View className="flex-1">
        <Text
          className="text-foreground text-base font-bold tracking-tight uppercase"
          numberOfLines={1}>
          {name}
          {amount && amount > 1 ? ` x${amount}` : ''}
        </Text>
        {tierLabel ? (
          <View className={cn('mt-0.5 flex-row items-center gap-x-2', hideTier && 'opacity-0')}>
            <Text
              className={cn(
                'text-xs font-bold uppercase',
                isCompleted ? 'text-val-green-ui' : 'text-muted-foreground'
              )}>
              {tierLabel}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export { RewardItem };
export type { RewardItemProps };
