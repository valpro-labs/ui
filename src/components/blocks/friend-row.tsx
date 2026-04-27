import * as React from 'react';

import { View } from 'react-native';

import { FriendRowSkeleton } from '@/components/blocks/friend-row-skeleton';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type FriendStatus = 'online' | 'away' | 'busy' | 'offline' | 'none';

const STATUS_DOT: Record<FriendStatus, string> = {
  online: 'bg-val-green-ui/80',
  away: 'bg-val-yellow',
  busy: 'bg-blue-400',
  offline: '',
  none: '',
};

const STATUS_TEXT: Record<FriendStatus, string> = {
  online: 'text-val-green-ui/80',
  away: 'text-val-yellow',
  busy: 'text-blue-400',
  offline: 'text-muted-foreground',
  none: 'text-muted-foreground',
};

interface FriendAvatarProps {
  avatarUrl: string;
  status: FriendStatus;
}

function FriendAvatar({ avatarUrl, status }: FriendAvatarProps) {
  return (
    <View>
      <Image
        source={avatarUrl}
        style={{ width: 44, height: 44, borderRadius: 10 }}
        contentFit="cover"
      />
      <View className="bg-card absolute -right-1 -bottom-1 size-4 items-center justify-center rounded-full">
        {status === 'offline' ? (
          <View className="border-border size-3 rounded-full border-2 bg-transparent" />
        ) : (
          <View className={cn('size-3 rounded-full', STATUS_DOT[status])} />
        )}
      </View>
    </View>
  );
}

interface FriendInfoProps {
  name: string;
  gameLabel?: string;
  status: FriendStatus;
  ownerBadge?: React.ReactNode;
}

function FriendInfo({ name, gameLabel, status, ownerBadge }: FriendInfoProps) {
  return (
    <View className="flex-1">
      <View className="flex-row items-center gap-x-1">
        <Text className="text-foreground text-base font-semibold" numberOfLines={1}>
          {name}
        </Text>
        {ownerBadge}
      </View>
      {gameLabel ? (
        <Text className={cn('text-xs', STATUS_TEXT[status])} numberOfLines={1}>
          {gameLabel}
        </Text>
      ) : null}
    </View>
  );
}

interface FriendRowProps {
  /** Friend display name. */
  name: string;
  /** Secondary line under the name — typically the presence / game label. */
  gameLabel?: string;
  /** Drives the status dot color and the `gameLabel` tint. */
  status: FriendStatus;
  /** Avatar (player card) URL — fills the left 44×44 tile. */
  avatarUrl?: string;
  /** Badge shown to the right of the name (e.g. phosphor `<Crown />` for party owner). */
  ownerBadge?: React.ReactNode;
  /** Slot rendered between the text block and the optional chevron. */
  rightContent?: React.ReactNode;
  /** Chevron rendered on the far right. Consumer supplies (e.g. phosphor `<CaretRight />`). */
  chevron?: React.ReactNode;
  /** Row opacity (0–1). Consumers use this to dim non-Valorant / offline variants. */
  opacity?: number;
  /** Show the skeleton placeholder instead of the real row. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer row wrapper. */
  className?: string;
}

/**
 * Single friend entry in the friends list — avatar with status dot, name
 * (optionally flagged with a party-owner badge), presence label underneath,
 * optional right-aligned slot, optional chevron.
 *
 * Data-free: the consumer resolves the avatar URL, formats the presence
 * label, maps XMPP presence → `FriendStatus`, and supplies the owner /
 * chevron icons as `ReactNode`. The row renders no card chrome — stack
 * instances inside a `bg-card rounded-2xl overflow-hidden` container with
 * `<Separator />` between them to match the app's friends list.
 */
function FriendRow({
  name,
  gameLabel,
  status,
  avatarUrl,
  ownerBadge,
  rightContent,
  chevron,
  opacity = 1,
  isLoading = false,
  className,
}: FriendRowProps) {
  if (isLoading) {
    return <FriendRowSkeleton className={className} />;
  }

  return (
    <View
      className={cn('flex-row items-center gap-x-3 px-3.5 py-3', className)}
      style={opacity === 1 ? undefined : { opacity }}>
      {avatarUrl ? <FriendAvatar avatarUrl={avatarUrl} status={status} /> : null}

      <FriendInfo name={name} gameLabel={gameLabel} status={status} ownerBadge={ownerBadge} />

      {rightContent}
      {chevron}
    </View>
  );
}

export { FriendAvatar, FriendInfo, FriendRow };
export type { FriendAvatarProps, FriendInfoProps, FriendRowProps, FriendStatus };
