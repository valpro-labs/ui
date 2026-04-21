import * as React from 'react';

import { Pressable, View } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface AccessoryCardProps {
  /** Accessory display name. */
  name: string;
  /** Accessory icon. */
  iconUrl?: string;
  /** Tint the icon with the current `--color-foreground` token. Useful for title SVGs shipped as text masks. */
  tinted?: boolean;
  /** Currency icon next to the price. */
  currencyIconUrl?: string;
  /** Price in the accessory's currency. Omit to hide the price block. */
  price?: number;
  /** Layout: `list` (wide 10:4) vs `grid` (16:9). */
  variant?: 'list' | 'grid';
  /** Tap handler. When omitted the card renders without `Pressable`. */
  onPress?: () => void;
  /** Absolutely-positioned node rendered over the image (e.g. an "owned" overlay). */
  imageOverlay?: React.ReactNode;
  /** Show the skeleton placeholder instead of the real card. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

function useColorVar(name: string): string | undefined {
  const v = useCSSVariable(name);
  return typeof v === 'string' ? v : undefined;
}

/**
 * Store accessory tile (gun buddy, spray, player card, title …) — image
 * on top, info bar with name + price on the bottom. Shares the 10:4
 * list / 16:9 grid footprint with `OfferCard`, minus tier color and
 * discount chrome which don't apply to accessories.
 *
 * Data-free: the consumer resolves the asset URL + price + currency
 * and hands them in. Pair with an `imageOverlay` slot to layer owned /
 * sold-out states without forking the card.
 */
function AccessoryCard({
  name,
  iconUrl,
  tinted = false,
  currencyIconUrl,
  price,
  variant = 'list',
  onPress,
  imageOverlay,
  isLoading = false,
  className,
}: AccessoryCardProps) {
  const foreground = useColorVar('--color-foreground');
  const isGrid = variant === 'grid';

  if (isLoading) {
    return (
      <Skeleton
        className={cn('w-full rounded-xl', isGrid ? 'aspect-video' : 'aspect-10/4', className)}
      />
    );
  }

  const card = (
    <View
      className={cn(
        'bg-card w-full overflow-hidden rounded-xl',
        isGrid ? 'aspect-video' : 'aspect-10/4',
        className
      )}>
      {/* Image */}
      <View className="bg-secondary relative flex-1 items-center justify-center overflow-hidden">
        {iconUrl ? (
          <Image
            source={iconUrl}
            style={{
              width: '80%',
              height: '80%',
              borderRadius: 8,
              tintColor: tinted ? foreground : undefined,
            }}
            contentFit="contain"
          />
        ) : null}
        {imageOverlay}
      </View>

      {/* Info bar */}
      <View
        className={cn(
          'flex-row items-center justify-between',
          isGrid ? 'px-2 py-1.5' : 'px-3 py-2'
        )}>
        <Text
          className={cn(
            'text-foreground flex-1 font-semibold tracking-tight uppercase',
            isGrid ? 'text-xs' : 'text-sm'
          )}
          numberOfLines={1}>
          {name}
        </Text>

        {price !== undefined && (
          <View
            className={cn('flex-row items-center', isGrid ? 'gap-0.5' : 'gap-1')}>
            {currencyIconUrl ? (
              <Image
                source={currencyIconUrl}
                style={{
                  width: isGrid ? 12 : 16,
                  height: isGrid ? 12 : 16,
                  tintColor: foreground,
                }}
                contentFit="contain"
              />
            ) : null}
            <Text
              className={cn(
                'text-foreground font-bold',
                isGrid ? 'text-xs' : 'text-sm'
              )}>
              {price.toLocaleString()}
            </Text>
          </View>
        )}
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

export { AccessoryCard };
export type { AccessoryCardProps };
