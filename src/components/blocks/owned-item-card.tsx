import * as React from 'react';

import { View, type ImageStyle, type StyleProp } from 'react-native';

import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface OwnedItemCardProps {
  /** Thumbnail URL — the owned item's icon. */
  iconUrl?: string;
  /**
   * Fill the tile edge-to-edge. Set `true` for player cards, sprays,
   * and flex items whose art is full-bleed; `false` renders the icon
   * at 80% with padding (weapons, buddies).
   */
  fill?: boolean;
  /**
   * Extra style merged onto the inner image — useful for per-item
   * scale / translate / rotate transforms (e.g. positioning weapon
   * art inside a grid tile). Applied after the default width/height
   * so width/height can still be overridden if the caller wants.
   */
  iconStyle?: StyleProp<ImageStyle>;
  /** Render the red selection ring. */
  isSelected?: boolean;
  /** Dim the tile to 30% — used to flag stackable items the viewer has run out of. */
  isDepleted?: boolean;
  /** Badge pinned to the top-left — typically the equipped checkmark. */
  equippedBadge?: React.ReactNode;
  /** Badge pinned to the bottom-right — typically the favorite star. */
  favoriteBadge?: React.ReactNode;
  /** Remaining stack count rendered in the top-right (`X{count}`). Omit to hide. */
  remainingCount?: number;
  /** Show the skeleton placeholder instead of the real tile. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer tile wrapper. */
  className?: string;
}

/**
 * Square owned-inventory tile used in every customize picker — player
 * cards, titles, sprays, gun buddies, weapon skins. Shows the item's
 * icon, optional equipped + favorite badges, a red selection ring, and
 * an optional `X{n}` remaining count.
 *
 * Data-free: the consumer resolves the icon URL + favorite / equipped
 * state and supplies the badge icons as `ReactNode` (e.g. phosphor
 * `<Check weight="fill" />`, `<Star weight="fill" />`). Does not read
 * theme / asset / favorites stores. Pair with a `<Pressable>` wrapper
 * upstream for tap handling.
 *
 * Per-item image styling: consumers can pass `iconStyle` to layer
 * scale / translate / rotate transforms onto the inner image — needed
 * for weapon skins, where each gun's art has to be re-positioned to
 * fit a square tile.
 */
function OwnedItemCard({
  iconUrl,
  fill = false,
  iconStyle,
  isSelected = false,
  isDepleted = false,
  equippedBadge,
  favoriteBadge,
  remainingCount,
  isLoading = false,
  className,
}: OwnedItemCardProps) {
  if (isLoading) {
    return <Skeleton className={cn('aspect-square w-full rounded-xl', className)} />;
  }

  return (
    <View
      className={cn(
        'bg-card relative aspect-square w-full items-center justify-center overflow-hidden rounded-xl',
        isSelected && 'ring-val-green-ui ring-2',
        isDepleted && 'opacity-30',
        className
      )}>
      {iconUrl ? (
        <Image
          source={iconUrl}
          style={[
            {
              width: fill ? '100%' : '80%',
              height: fill ? '100%' : '80%',
            },
            iconStyle,
          ]}
          contentFit="contain"
        />
      ) : (
        <View className="bg-muted h-full w-full" />
      )}

      {isSelected ? (
        <View className="bg-val-green-ui/20 absolute inset-0" pointerEvents="none" />
      ) : null}

      {equippedBadge ? <View className="absolute top-1 left-1">{equippedBadge}</View> : null}
      {favoriteBadge ? (
        <View className="absolute right-1 bottom-1">{favoriteBadge}</View>
      ) : null}
      {remainingCount != null ? (
        <View className="absolute top-1 right-1">
          <Text className="text-muted-foreground text-sm font-bold">X{remainingCount}</Text>
        </View>
      ) : null}
    </View>
  );
}

export { OwnedItemCard };
export type { OwnedItemCardProps };
