import * as React from 'react';

import { View } from 'react-native';

import { FriendRowSkeleton } from '@/components/blocks/friend-row-skeleton';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type FriendStatus = 'online' | 'away' | 'busy' | 'offline' | 'none';
type FriendRowSize = 'regular' | 'large';

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
  avatarUrl?: string;
  status: FriendStatus;
  showPlaceholder?: boolean;
  /** Visual density. Use `large` for wider tablet layouts. */
  size?: FriendRowSize;
}

function FriendAvatar({
  avatarUrl,
  status,
  showPlaceholder = false,
  size = 'regular',
}: FriendAvatarProps) {
  if (!avatarUrl && !showPlaceholder) {
    return null;
  }

  const isLarge = size === 'large';
  const avatarSize = isLarge ? 56 : 44;
  const avatarRadius = isLarge ? 12 : 10;
  const statusOuterSize = isLarge ? 18 : 16;
  const statusInnerSize = isLarge ? 13 : 12;

  return (
    <View>
      <View
        className="bg-secondary overflow-hidden"
        style={{ width: avatarSize, height: avatarSize, borderRadius: avatarRadius }}>
        {avatarUrl ? (
          <Image
            source={avatarUrl}
            style={{ width: avatarSize, height: avatarSize }}
            contentFit="cover"
          />
        ) : null}
      </View>
      <View
        className="bg-card absolute -right-1 -bottom-1 items-center justify-center rounded-full"
        style={{ width: statusOuterSize, height: statusOuterSize }}>
        {status === 'offline' ? (
          <View
            className="border-border bg-card rounded-full border-2"
            style={{ width: statusInnerSize, height: statusInnerSize }}
          />
        ) : (
          <View
            className={cn('rounded-full', STATUS_DOT[status])}
            style={{ width: statusInnerSize, height: statusInnerSize }}
          />
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
  /** Visual density. Use `large` for wider tablet layouts. */
  size?: FriendRowSize;
}

function FriendInfo({ name, gameLabel, status, ownerBadge, size = 'regular' }: FriendInfoProps) {
  const isLarge = size === 'large';

  return (
    <View className={cn('flex-1', isLarge && 'gap-y-0.5')}>
      <View className="flex-row items-center gap-x-1">
        <Text
          className={cn('text-foreground font-semibold', isLarge ? 'text-lg' : 'text-base')}
          numberOfLines={1}>
          {name}
        </Text>
        {ownerBadge}
      </View>
      {gameLabel ? (
        <Text
          className={cn(isLarge ? 'text-sm' : 'text-xs', STATUS_TEXT[status])}
          numberOfLines={1}>
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
  /** Show the muted avatar tile when `avatarUrl` is missing. */
  showAvatarPlaceholder?: boolean;
  /** Badge shown to the right of the name (e.g. phosphor `<Crown />` for party owner). */
  ownerBadge?: React.ReactNode;
  /** Slot rendered between the text block and the optional chevron. */
  rightContent?: React.ReactNode;
  /** Chevron rendered on the far right. Consumer supplies (e.g. phosphor `<CaretRight />`). */
  chevron?: React.ReactNode;
  /** Visual density. Use `large` for wider tablet layouts. */
  size?: FriendRowSize;
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
  showAvatarPlaceholder = false,
  ownerBadge,
  rightContent,
  chevron,
  size = 'regular',
  opacity = 1,
  isLoading = false,
  className,
}: FriendRowProps) {
  if (isLoading) {
    return <FriendRowSkeleton size={size} className={className} />;
  }

  const isLarge = size === 'large';

  return (
    <View
      className={cn(
        'flex-row items-center',
        isLarge ? 'gap-x-4 px-5 py-4' : 'gap-x-3 px-3.5 py-3',
        className
      )}
      style={opacity === 1 ? undefined : { opacity }}>
      <FriendAvatar
        avatarUrl={avatarUrl}
        status={status}
        showPlaceholder={showAvatarPlaceholder}
        size={size}
      />

      <FriendInfo
        name={name}
        gameLabel={gameLabel}
        status={status}
        ownerBadge={ownerBadge}
        size={size}
      />

      {rightContent}
      {chevron}
    </View>
  );
}

export { FriendAvatar, FriendInfo, FriendRow };
export type { FriendAvatarProps, FriendInfoProps, FriendRowProps, FriendRowSize, FriendStatus };
