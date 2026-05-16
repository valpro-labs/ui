import * as React from 'react';

import { View, type ImageStyle, type StyleProp } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { Defs, RadialGradient, Rect, Stop, Svg } from '@/lib/svg-shim';
import { cn } from '@/lib/utils';

type Corner = 'top-left' | 'bottom-left' | 'bottom-right';

function CornerGradient({ corner }: { corner: Corner }) {
  const isTopLeft = corner === 'top-left';
  const isLeft = corner !== 'bottom-right';
  const id = `owned-item-corner-${corner}`;

  return (
    <Svg
      width="50%"
      height="50%"
      style={{
        position: 'absolute',
        top: isTopLeft ? 0 : undefined,
        left: isLeft ? 0 : undefined,
        right: isLeft ? undefined : 0,
        bottom: isTopLeft ? undefined : 0,
      }}>
      <Defs>
        <RadialGradient id={id} cx={isLeft ? '0' : '1'} cy={isTopLeft ? '0' : '1'} r="1">
          <Stop offset="0" stopColor="black" stopOpacity="0.4" />
          <Stop offset="1" stopColor="black" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}

interface OwnedItemCardProps {
  /** Thumbnail URL - the owned item's icon. */
  iconUrl?: string;
  /**
   * Fill the tile edge-to-edge. Defaults to `true` since most owned
   * items (player cards, sprays, flex items, weapon skins with grid
   * transforms) are full-bleed. Pass `false` for gun buddies, which
   * render at 80% with padding. Ignored when `iconSize` is set.
   */
  fill?: boolean;
  /**
   * Explicit icon size as a percentage of the tile — e.g. `"50%"` for
   * currency / buddy, `"80%"` for weapon skins. Overrides `fill` when set.
   */
  iconSize?: `${number}%`;
  /**
   * Draw a soft radial darken behind the badge corners so the badges
   * stay legible on light / busy art. Only player cards use this in
   * the source app - sprays and flex items are full-bleed but skip
   * the shadow. Independent of `fill`.
   */
  badgeShadow?: boolean;
  /**
   * Extra style merged onto the inner image - useful for per-item
   * scale / translate / rotate transforms (e.g. positioning weapon
   * art inside a grid tile). Applied after the default width/height
   * so width/height can still be overridden if the caller wants.
   */
  iconStyle?: StyleProp<ImageStyle>;
  /** Tint the icon with `--color-foreground` — for title / currency glyphs shipped as masks. */
  tinted?: boolean;
  /** Render the red selection ring. */
  isSelected?: boolean;
  /** Dim the tile to 30% - used to flag stackable items the viewer has run out of. */
  isDepleted?: boolean;
  /** Badge pinned to the top-left - typically the equipped checkmark. */
  equippedBadge?: React.ReactNode;
  /** Badge pinned to the bottom-left - typically the tier icon. */
  tierBadge?: React.ReactNode;
  /** Badge pinned to the bottom-right - typically the favorite star. */
  favoriteBadge?: React.ReactNode;
  /** Remaining stack count rendered in the top-right (`X{count}`). Omit to hide. */
  remainingCount?: number;
  /** Show the skeleton placeholder instead of the real tile. */
  isLoading?: boolean;
  /**
   * XP accumulated toward this level. Pass with `xp` to draw a partial
   * progress stripe. Pass without `xp` (or `xp: 0`) to show an empty track.
   * Omit both to hide the stripe entirely.
   */
  progressionXp?: number;
  /** XP required to complete this level. */
  xp?: number;
  /** Progress stripe fills 100% green — tile is completed. */
  isCompleted?: boolean;
  /** Extra classes merged onto the outer tile wrapper. */
  className?: string;
}

/**
 * Square owned-inventory tile used in every customize picker - player
 * cards, titles, sprays, gun buddies, weapon skins. Shows the item's
 * icon, optional equipped + tier + favorite badges, a red selection
 * ring, and an optional `X{n}` remaining count.
 *
 * Data-free: the consumer resolves the icon URL + favorite / equipped
 * state and supplies the badge icons as `ReactNode` (e.g. phosphor
 * `<Check weight="fill" />`, `<Star weight="fill" />`). Does not read
 * theme / asset / favorites stores. Pair with a `<Pressable>` wrapper
 * upstream for tap handling.
 *
 * Per-item image styling: consumers can pass `iconStyle` to layer
 * scale / translate / rotate transforms onto the inner image - needed
 * for weapon skins, where each gun's art has to be re-positioned to
 * fit a square tile.
 */
function OwnedItemCard({
  iconUrl,
  fill = true,
  iconSize,
  badgeShadow = false,
  iconStyle,
  tinted = false,
  isSelected = false,
  isDepleted = false,
  equippedBadge,
  tierBadge,
  favoriteBadge,
  remainingCount,
  isLoading = false,
  progressionXp,
  xp,
  isCompleted = false,
  className,
}: OwnedItemCardProps) {
  const foregroundRaw = useCSSVariable('--color-foreground');
  const tintColor = tinted && typeof foregroundRaw === 'string' ? foregroundRaw : undefined;

  if (isLoading) {
    return <Skeleton className={cn('aspect-square w-full rounded-xl', className)} />;
  }

  return (
    <View
      className={cn(
        'bg-card ring-border ring-2 ring-offset-[0.5px] ring-offset-background relative aspect-square w-full items-center justify-center overflow-hidden rounded-xl',
        isSelected && 'ring-val-green-ui ring-2 ring-offset-[0.5px] ring-offset-background',
        isDepleted && 'opacity-30',
        className
      )}>
      {iconUrl ? (
        <Image
          source={iconUrl}
          style={[
            {
              width: iconSize ?? (fill ? '100%' : '80%'),
              height: iconSize ?? (fill ? '100%' : '80%'),
            },
            iconStyle,
          ]}
          contentFit="contain"
          tintColor={tintColor}
        />
      ) : (
        <View className="bg-muted h-full w-full" />
      )}

      {isSelected ? (
        <View className="bg-val-green-ui/20 absolute inset-0" pointerEvents="none" />
      ) : null}

      {equippedBadge ? (
        <>
          {badgeShadow ? <CornerGradient corner="top-left" /> : null}
          <View className="absolute top-1 left-1">{equippedBadge}</View>
        </>
      ) : null}

      {tierBadge ? (
        <>
          <View className="absolute bottom-1 left-1">{tierBadge}</View>
        </>
      ) : null}

      {favoriteBadge ? (
        <>
          {badgeShadow ? <CornerGradient corner="bottom-right" /> : null}
          <View className="absolute right-1 bottom-1">{favoriteBadge}</View>
        </>
      ) : null}

      {remainingCount != null ? (
        <View className="absolute top-1 right-1">
          <Text className="text-muted-foreground text-sm font-bold">X{remainingCount}</Text>
        </View>
      ) : null}

      {(isCompleted || progressionXp != null) ? (
        <View className="bg-border absolute right-0 bottom-0 left-0 h-1">
          <View
            className={cn('absolute top-0 bottom-0 left-0', isCompleted ? 'bg-val-green-ui' : 'bg-val-green-ui/50')}
            style={{
              width: isCompleted
                ? '100%'
                : `${Math.min((progressionXp ?? 0) / (xp ?? 1), 1) * 100}%`,
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

export { OwnedItemCard };
export type { OwnedItemCardProps };
