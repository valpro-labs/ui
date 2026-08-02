import * as React from 'react';

import { Pressable, View } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface OfferCardProps {
  /** Item display name shown in the info bar. */
  name: string;
  /** Primary item image (e.g. weapon skin render). */
  iconUrl?: string;
  /** Small tier icon shown before the name. */
  tierIconUrl?: string;
  /** Tier accent color (hex, with or without the leading `#`). Applied to the image background and discount badge. */
  tierColor?: string;
  /** Currency icon next to the price. */
  currencyIconUrl?: string;
  /** Price in the item's currency. Omit to hide the price block. */
  price?: number;
  /** Discount percentage (0-100). Renders the slanted discount badge when set. */
  discount?: number;
  /** Badge pinned to the top-left of the image - typically the equipped checkmark. */
  equippedBadge?: React.ReactNode;
  /** Badge pinned to the bottom-right of the image - typically the favorite star. */
  favoriteBadge?: React.ReactNode;
  /** Badge pinned to the bottom-left of the image - typically the lock state icon. */
  lockedBadge?: React.ReactNode;
  /** Layout shape: `list` (wide 10:4) vs `grid` (16:9). */
  variant?: 'list' | 'grid';
  /** Visual density. Defaults to `compact` for grid and `regular` for list. */
  size?: 'compact' | 'regular';
  /** Image width as a percentage of card width (0-100). Defaults to 80. */
  imageWidthPercent?: number;
  /** Tap handler. When omitted the card renders without `Pressable`. */
  onPress?: () => void;
  /** Absolutely-positioned node rendered over the image (e.g. an "owned" overlay). */
  imageOverlay?: React.ReactNode;
  /** Show the skeleton placeholder instead of the real card. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

function normalizeHex(input?: string): string | undefined {
  if (!input) return undefined;
  return input.startsWith('#') ? input : `#${input}`;
}

/**
 * Single store offer (typically a weapon skin) - image on top, info bar
 * on the bottom with tier icon + name + price. Layout shared between the
 * wide list row and the narrower 2-up grid tile.
 *
 * Data-free: the consumer resolves the skin/tier/currency assets and
 * passes URLs + strings. Status badges can be supplied directly for the
 * common equipped / favorite / locked states; use `imageOverlay` for other
 * overlays such as an owned or sold-out state.
 */
function OfferCard({
  name,
  iconUrl,
  tierIconUrl,
  tierColor,
  currencyIconUrl,
  price,
  discount,
  equippedBadge,
  favoriteBadge,
  lockedBadge,
  variant = 'list',
  size,
  imageWidthPercent,
  onPress,
  imageOverlay,
  isLoading = false,
  className,
}: OfferCardProps) {
  const foregroundRaw = useCSSVariable('--color-foreground');
  const foreground = typeof foregroundRaw === 'string' ? foregroundRaw : undefined;
  const isGrid = variant === 'grid';
  const resolvedSize = size ?? (isGrid ? 'compact' : 'regular');
  const isCompact = resolvedSize === 'compact';
  const badgeInsetClassName = isCompact ? 'top-1.5 left-2' : 'top-2 left-3';
  const lockedBadgeInsetClassName = isCompact ? 'bottom-1.5 left-2' : 'bottom-2 left-3';
  const favoriteBadgeInsetClassName = isCompact ? 'right-2 bottom-1.5' : 'right-3 bottom-2';

  if (isLoading) {
    return (
      <Skeleton
        className={cn('w-full rounded-xl', isGrid ? 'aspect-video' : 'aspect-10/4', className)}
      />
    );
  }

  const color = normalizeHex(tierColor);
  const widthPercent = imageWidthPercent ?? 80;

  const card = (
    <View
      className={cn(
        'bg-card w-full overflow-hidden rounded-xl',
        isGrid ? 'aspect-video' : 'aspect-10/4',
        className
      )}>
      <View
        className="bg-secondary relative flex-1 items-center justify-center"
        style={color ? { backgroundColor: color } : undefined}>
        {iconUrl ? (
          <Image
            source={iconUrl}
            style={{
              width: `${widthPercent}%`,
              height: isGrid ? '90%' : '60%',
            }}
            contentFit="contain"
          />
        ) : null}

        {discount !== undefined ? (
          <View className="absolute top-0 left-0">
            <View className="flex-row overflow-hidden">
              <View
                className="px-1.5"
                style={color ? { backgroundColor: color } : undefined}>
                <Text
                  className={cn(
                    'text-foreground dark:text-val-white font-black tracking-tighter',
                    isCompact ? 'text-sm' : 'text-base'
                  )}>
                  -{discount}%
                </Text>
              </View>
              <View
                className={cn(
                  'border-r-transparent',
                  isCompact ? 'border-t-20 border-r-10' : 'border-t-24 border-r-12'
                )}
                style={{ borderTopColor: color ?? 'transparent' }}
              />
            </View>
          </View>
        ) : null}

        {imageOverlay}

        {equippedBadge ? (
          <>
            <View className={cn('absolute', badgeInsetClassName)}>{equippedBadge}</View>
          </>
        ) : null}

        {favoriteBadge ? (
          <>
            <View className={cn('absolute', favoriteBadgeInsetClassName)}>
              {favoriteBadge}
            </View>
          </>
        ) : null}

        {lockedBadge ? (
          <View className={cn('absolute', lockedBadgeInsetClassName)}>{lockedBadge}</View>
        ) : null}
      </View>

      <View
        className={cn(
          'flex-row items-center justify-between',
          isCompact ? 'px-2 py-1.5' : 'px-3 py-2'
        )}>
        <View
          className={cn('flex-1 flex-row items-center', isCompact ? 'gap-1' : 'gap-1.5')}>
          {tierIconUrl ? (
            <Image
              source={tierIconUrl}
              style={{ width: isCompact ? 14 : 18, height: isCompact ? 14 : 18 }}
              contentFit="contain"
            />
          ) : null}
          <Text
            className={cn(
              'text-foreground flex-1 font-semibold tracking-tight uppercase',
              isCompact ? 'text-sm' : 'text-base'
            )}
            numberOfLines={1}>
            {name}
          </Text>
        </View>

        {price !== undefined ? (
          <View className={cn('flex-row items-center', isCompact ? 'gap-0.5' : 'gap-1')}>
            {currencyIconUrl ? (
              <Image
                source={currencyIconUrl}
                style={{
                  width: isCompact ? 12 : 16,
                  height: isCompact ? 12 : 16,
                  tintColor: foreground,
                }}
                contentFit="contain"
              />
            ) : null}
            <Text className={cn('text-foreground font-bold', isCompact ? 'text-sm' : 'text-base')}>
              {price.toLocaleString()}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return card;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
      {card}
    </Pressable>
  );
}

export { OfferCard };
export type { OfferCardProps };
