import * as React from 'react';

import { Pressable, View } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface BundleCardProps {
  /** Bundle display name. */
  name?: string;
  /** Hero image that fills the card. */
  iconUrl?: string;
  /** Currency icon next to the price. */
  currencyIconUrl?: string;
  /** Total price in the bundle's currency. */
  price?: number;
  /** Pre-formatted countdown text (e.g. `"2h 3m"`). Rendered after the name. */
  countdownText?: string;
  /** Layout: `list` (default) vs `grid` (tighter padding + smaller text). */
  variant?: 'list' | 'grid';
  /** Tap handler. When omitted the card renders without `Pressable`. */
  onPress?: () => void;
  /** Absolutely-positioned node rendered over the image (e.g. an "owned" overlay). */
  imageOverlay?: React.ReactNode;
  /** Rendered over the image when `iconUrl` is missing (e.g. a placeholder icon). */
  missingFallback?: React.ReactNode;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * Store bundle tile — hero art fills the card, info bar is pinned to the
 * bottom edge with bundle name, optional countdown, and total price.
 *
 * Data-free: the consumer resolves bundle/currency assets and passes
 * URLs + strings. Countdown text is pre-formatted so this component
 * stays renderless — pair with a ticker on the caller side if needed.
 */
function BundleCard({
  name,
  iconUrl,
  currencyIconUrl,
  price,
  countdownText,
  variant = 'list',
  onPress,
  imageOverlay,
  missingFallback,
  className,
}: BundleCardProps) {
  const isGrid = variant === 'grid';
  const foregroundRaw = useCSSVariable('--color-foreground');
  const foreground = typeof foregroundRaw === 'string' ? foregroundRaw : undefined;

  const card = (
    <View className={cn('bg-card aspect-video overflow-hidden rounded-xl', className)}>
      {/* Image */}
      <View className="bg-val-blue relative flex-1 items-center justify-center overflow-hidden">
        {iconUrl ? (
          <Image source={iconUrl} style={{ width: '100%', height: '100%' }} />
        ) : null}
        {imageOverlay}
        {!iconUrl && missingFallback ? (
          <View
            className="absolute inset-0 items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            {missingFallback}
          </View>
        ) : null}
      </View>

      {/* Info bar pinned to the bottom with a 1px overlap to paper over seam rounding. */}
      <View
        className={cn(
          'bg-card absolute -right-px -bottom-px -left-px flex-row items-center justify-between',
          isGrid ? 'px-2 py-1.5' : 'px-3 py-2'
        )}>
        <View className="flex-1 flex-row items-center gap-1.5" style={{ minWidth: 0 }}>
          <Text
            className={cn(
              'text-foreground shrink font-semibold tracking-tight uppercase',
              isGrid ? 'text-xs' : 'text-sm'
            )}
            numberOfLines={1}>
            {name}
          </Text>
          {countdownText ? (
            <>
              <Text className="text-muted-foreground text-xs">|</Text>
              <Text
                className={cn('text-muted-foreground', isGrid ? 'text-xs' : 'text-sm')}>
                {countdownText}
              </Text>
            </>
          ) : null}
        </View>

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

export { BundleCard };
export type { BundleCardProps };
