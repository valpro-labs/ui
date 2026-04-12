import * as React from 'react';

import { Pressable, View } from 'react-native';

import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  /** Agent display icon URL. */
  iconUrl?: string;
  /** Contract / pass progress from 0–1. Fills the card from the bottom. */
  progressRatio?: number;
  /** Dims the card and reveals the `lockOverlay` slot. */
  locked?: boolean;
  /** Replace the default lock indicator when `locked` is true. */
  lockOverlay?: React.ReactNode;
  /** Absolutely-positioned node rendered over the icon (e.g. an owned check). */
  imageOverlay?: React.ReactNode;
  /** Tap handler. When omitted the card renders without `Pressable`. */
  onPress?: () => void;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * Agent pass grid tile — square card with the agent portrait, a bottom-up
 * progress fill, and optional lock / active states. Data-free: the consumer
 * resolves the icon URL and decides which overlays to pass in.
 */
function AgentCard({
  iconUrl,
  progressRatio = 0,
  locked = false,
  lockOverlay,
  imageOverlay,
  onPress,
  className,
}: AgentCardProps) {
  const card = (
    <View
      className={cn(
        'bg-card overflow-hidden rounded-xl',
        locked && 'opacity-50',
        className
      )}>
      <View className="relative aspect-square w-full">
        {/* Progress fill from bottom (behind icon) */}
        {progressRatio > 0 ? (
          <View
            className="bg-val-green-ui/30 absolute right-0 bottom-0 left-0 z-0"
            style={{ height: `${Math.min(100, Math.max(0, progressRatio * 100))}%` }}
          />
        ) : null}

        {iconUrl ? (
          <Image
            source={iconUrl}
            className="z-10"
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        ) : null}

        {imageOverlay}

        {locked ? lockOverlay : null}
      </View>
    </View>
  );

  if (!onPress) return card;

  return (
    <Pressable
      onPress={locked ? undefined : onPress}
      style={({ pressed }) => ({ opacity: pressed && !locked ? 0.8 : 1 })}>
      {card}
    </Pressable>
  );
}

export { AgentCard };
export type { AgentCardProps };
