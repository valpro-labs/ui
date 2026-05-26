import React from 'react';

import { View } from 'react-native';

import { OwnedItemCard } from '@/components/blocks/owned-item-card';
import type { OwnedItemCardProps } from '@/components/blocks/owned-item-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const DEFAULT_REWARD_THUMBNAIL_SIZE = 40;
const OWNED_ITEM_REFERENCE_SIZE = 114;

type RewardThumbnailVariant = OwnedItemCardProps['itemVariant'];

interface RewardItemProps extends Pick<OwnedItemCardProps, 'iconUrl'> {
  amount?: number;
  className?: string;
  hideTier?: boolean;
  iconStyle?: OwnedItemCardProps['iconStyle'];
  isCompleted?: boolean;
  isLoading?: boolean;
  isNext?: boolean;
  name: string;
  progressionXp?: number;
  thumbnailSize?: number;
  thumbnailVariant?: RewardThumbnailVariant;
  tierLabel?: string;
  xp?: number;
}

interface RewardItemSkeletonProps {
  className?: string;
  thumbnailSize?: number;
}

function RewardItem({
  iconUrl,
  iconStyle,
  thumbnailVariant = 'default',
  thumbnailSize = DEFAULT_REWARD_THUMBNAIL_SIZE,
  name,
  amount,
  tierLabel,
  progressionXp,
  xp,
  isCompleted = false,
  isNext = false,
  hideTier = false,
  isLoading = false,
  className,
}: RewardItemProps) {
  if (isLoading) {
    return <RewardItemSkeleton thumbnailSize={thumbnailSize} className={className} />;
  }

  const showProgress = !isCompleted && isNext && !!xp && progressionXp !== undefined;
  const progressPct = showProgress ? Math.min(100, (progressionXp / xp) * 100) : 0;
  const thumbnailScale = thumbnailSize / OWNED_ITEM_REFERENCE_SIZE;

  return (
    <View
      className={cn(
        'relative flex-row items-center gap-x-4 overflow-hidden px-4 py-3',
        isCompleted && 'bg-val-green-ui/20',
        className
      )}>
      {showProgress ? (
        <View
          className="bg-val-green-ui/10 absolute top-0 bottom-0 left-0"
          style={{ width: `${progressPct}%` }}
        />
      ) : null}
      <View
        className="bg-secondary shrink-0 items-center justify-center overflow-hidden rounded-lg"
        style={{ height: thumbnailSize, width: thumbnailSize }}>
        <View
          style={{
            height: OWNED_ITEM_REFERENCE_SIZE,
            transform: [{ scale: thumbnailScale }],
            width: OWNED_ITEM_REFERENCE_SIZE,
          }}>
          <OwnedItemCard
            iconUrl={iconUrl}
            itemVariant={thumbnailVariant}
            iconStyle={iconStyle}
            className="bg-secondary h-full w-full"
          />
        </View>
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

function RewardItemSkeleton({
  thumbnailSize = DEFAULT_REWARD_THUMBNAIL_SIZE,
  className,
}: RewardItemSkeletonProps) {
  return (
    <View className={cn('flex-row items-center gap-x-4 px-4 py-3', className)}>
      <Skeleton className="rounded-lg" style={{ height: thumbnailSize, width: thumbnailSize }} />
      <View className="flex-1 gap-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-24" />
      </View>
    </View>
  );
}

export { RewardItem, RewardItemSkeleton };
export type { RewardItemProps, RewardItemSkeletonProps, RewardThumbnailVariant };
