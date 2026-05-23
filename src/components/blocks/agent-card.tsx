import * as React from 'react';

import { Pressable, View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type AgentCardVariant = 'tile' | 'row';

interface AgentCardProps {
  /** Square pass tile or button-like horizontal row. Always fills its parent width. */
  variant?: AgentCardVariant;
  /** Agent display icon URL. */
  iconUrl?: string;
  /** Agent display name. Used by the `row` variant. */
  name?: string;
  /** Contract / pass progress from 0–1. Fills the card from the bottom. */
  progressRatio?: number;
  /** Dims the card and reveals the `lockOverlay` slot. */
  locked?: boolean;
  /** Lock indicator shown when `locked` is true. Tile overlays it; row shows it after the name. */
  lockOverlay?: React.ReactNode;
  /** Absolutely-positioned node rendered over the icon (e.g. an owned check). */
  imageOverlay?: React.ReactNode;
  /** Tap handler. When omitted the card renders without `Pressable`. */
  onPress?: () => void;
  /** Show the skeleton placeholder instead of the real card. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * Agent pass card — square grid tile by default, with an optional horizontal
 * row variant for agent pickers. Data-free: the consumer resolves the icon URL
 * and decides which overlays to pass in.
 */
function AgentCard({
  variant = 'tile',
  iconUrl,
  name,
  progressRatio = 0,
  locked = false,
  lockOverlay,
  imageOverlay,
  onPress,
  isLoading = false,
  className,
}: AgentCardProps) {
  const progressPct = Math.min(100, Math.max(0, progressRatio * 100));

  if (isLoading) {
    if (variant === 'row') {
      return (
        <View
          className={cn(
            'relative w-full overflow-hidden px-4 py-2',
            className
          )}
          style={{
            width: '100%',
            minHeight: 56,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}>
          <Skeleton className="size-10 rounded-lg" />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Skeleton className="h-6 w-32 rounded-md" />
          </View>
        </View>
      );
    }

    return (
      <Skeleton
        className={cn('aspect-square w-full rounded-xl', className)}
        style={{ width: '100%' }}
      />
    );
  }

  const icon = iconUrl ? (
    <Image
      source={iconUrl}
      className="z-10"
      style={{ width: '100%', height: '100%' }}
      contentFit="cover"
    />
  ) : null;

  const row =
    variant === 'row' ? (
      <View
        className={cn(
          'bg-card relative w-full overflow-hidden rounded-xl px-4 py-2',
          locked && 'opacity-50',
          className
        )}
        style={{
          width: '100%',
          minHeight: 56,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
        {progressPct > 0 ? (
          <View
            className="bg-val-green-ui/10 absolute top-0 bottom-0 left-0"
            style={{ width: `${progressPct}%` }}
          />
        ) : null}

        <View
          className="bg-secondary relative shrink-0 items-center justify-center overflow-hidden rounded-lg"
          style={{ width: 40, height: 40, zIndex: 1 }}>
          {icon}
          {imageOverlay}
        </View>

        <View
          style={{
            flex: 1,
            minWidth: 0,
            zIndex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <Text
            className="text-foreground text-base font-bold tracking-tight uppercase"
            style={{ flexShrink: 1, minWidth: 0 }}
            numberOfLines={1}>
            {name}
          </Text>
          {locked && lockOverlay ? (
            <View style={{ flexShrink: 0 }}>{lockOverlay}</View>
          ) : null}
        </View>
      </View>
    ) : null;

  if (row) {
    if (!onPress) return row;

    return (
      <Pressable
        onPress={locked ? undefined : onPress}
        style={({ pressed }) => ({
          opacity: pressed && !locked ? 0.8 : 1,
          width: '100%',
        })}>
        {row}
      </Pressable>
    );
  }

  const card = (
    <View
      className={cn(
        'bg-card w-full overflow-hidden rounded-xl',
        locked && 'opacity-50',
        className
      )}
      style={{ width: '100%' }}>
      <View className="relative aspect-square w-full">
        {/* Progress fill from bottom (behind icon) */}
        {progressPct > 0 ? (
          <View
            className="bg-val-green-ui/30 absolute right-0 bottom-0 left-0 z-0"
            style={{ height: `${progressPct}%` }}
          />
        ) : null}

        {icon}

        {imageOverlay}

        {locked ? lockOverlay : null}
      </View>
    </View>
  );

  if (!onPress) return card;

  return (
    <Pressable
      onPress={locked ? undefined : onPress}
      style={({ pressed }) => ({
        opacity: pressed && !locked ? 0.8 : 1,
        width: '100%',
      })}>
      {card}
    </Pressable>
  );
}

export { AgentCard };
export type { AgentCardProps, AgentCardVariant };
