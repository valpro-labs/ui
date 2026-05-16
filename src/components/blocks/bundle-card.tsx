import * as React from 'react';

import { Pressable, View } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
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
  /** Pre-formatted countdown text (e.g. `"2h 3m"`). Rendered over the image. */
  countdownText?: string;
  /** Layout: `list` (default) vs `grid` (tighter padding + smaller text). */
  variant?: 'list' | 'grid';
  /** Tap handler. When omitted the card renders without `Pressable`. */
  onPress?: () => void;
  /** Absolutely-positioned node rendered over the image (e.g. an "owned" overlay). */
  imageOverlay?: React.ReactNode;
  /** Rendered over the image when `iconUrl` is missing (e.g. a placeholder icon). */
  missingFallback?: React.ReactNode;
  /** Show the skeleton placeholder instead of the real card. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * Store bundle tile — hero art fills the card, info bar is pinned to the
 * bottom edge with bundle name and total price.
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
  isLoading = false,
  className,
}: BundleCardProps) {
  const foregroundRaw = useCSSVariable('--color-foreground');
  const foreground = typeof foregroundRaw === 'string' ? foregroundRaw : undefined;
  const isGrid = variant === 'grid';

  if (isLoading) {
    return <Skeleton className={cn('aspect-video w-full rounded-xl', className)} />;
  }

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
        {countdownText ? (
          <View
            className={cn(
              'absolute rounded-md bg-black/60',
              isGrid ? 'right-1.5 bottom-1.5 px-1.5 py-0.5' : 'right-2 bottom-2 px-2 py-1'
            )}>
            <Text
              className={cn(
                'text-val-white font-semibold tabular-nums',
                isGrid ? 'text-xs' : 'text-sm'
              )}
              numberOfLines={1}>
              {countdownText}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Info bar */}
      <View
        className={cn(
          'flex-row items-center justify-between',
          isGrid ? 'gap-1.5 px-2 py-1.5' : 'gap-3 px-3 py-2'
        )}>
        <View className="min-w-0 flex-1 flex-row items-center gap-1.5">
          <Text
            className={cn(
              'text-foreground min-w-0 flex-1 font-semibold tracking-tight uppercase',
              isGrid ? 'text-sm' : 'text-base'
            )}
            numberOfLines={1}>
            {name}
          </Text>
        </View>

        {price !== undefined && (
          <View
            className={cn('shrink-0 flex-row items-center', isGrid ? 'gap-0.5' : 'gap-1')}>
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
                isGrid ? 'text-sm' : 'text-base'
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
