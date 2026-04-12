// ── Tier 1: Primitives (ui/) ──
export { Button, buttonVariants, buttonTextVariants } from '@/components/ui/button';
export type { ButtonProps } from '@/components/ui/button';

export { Text, TextClassContext, textVariants } from '@/components/ui/text';
export type { TextProps } from '@/components/ui/text';

export { Image } from '@/components/ui/image';
export type { ImageProps } from '@/components/ui/image';

export { Separator } from '@/components/ui/separator';
export type { SeparatorProps } from '@/components/ui/separator';

export { Skeleton } from '@/components/ui/skeleton';
export type { SkeletonProps } from '@/components/ui/skeleton';

export { Progress } from '@/components/ui/progress';
export type { ProgressProps } from '@/components/ui/progress';

// ── Tier 2: Blocks (blocks/) ──
export { MissionCard } from '@/components/blocks/mission-card';
export type { MissionCardProps } from '@/components/blocks/mission-card';
export { MissionCardSkeleton } from '@/components/blocks/mission-card-skeleton';
export type { MissionCardSkeletonProps } from '@/components/blocks/mission-card-skeleton';
export { MissionList } from '@/components/blocks/mission-list';
export type { MissionListProps, MissionListItem } from '@/components/blocks/mission-list';

export { DailyProgress } from '@/components/blocks/daily-progress';
export type { DailyProgressProps, DailyMilestone } from '@/components/blocks/daily-progress';
export { DailyProgressSkeleton } from '@/components/blocks/daily-progress-skeleton';
export type { DailyProgressSkeletonProps } from '@/components/blocks/daily-progress-skeleton';

export { PlayerCard } from '@/components/blocks/player-card';
export type { PlayerCardProps } from '@/components/blocks/player-card';
export { PlayerCardSkeleton } from '@/components/blocks/player-card-skeleton';
export type { PlayerCardSkeletonProps } from '@/components/blocks/player-card-skeleton';

export { AgentCard } from '@/components/blocks/agent-card';
export type { AgentCardProps } from '@/components/blocks/agent-card';
export { RoleCard } from '@/components/blocks/role-card';
export type { RoleCardProps } from '@/components/blocks/role-card';

export { SettingsRow } from '@/components/blocks/settings-row';
export type { SettingsRowProps } from '@/components/blocks/settings-row';
export { SettingsGroup } from '@/components/blocks/settings-group';
export type { SettingsGroupProps } from '@/components/blocks/settings-group';

export { MatchCard } from '@/components/blocks/match-card';
export type { MatchCardProps, MatchResult } from '@/components/blocks/match-card';
export { MatchCardSkeleton } from '@/components/blocks/match-card-skeleton';
export type { MatchCardSkeletonProps } from '@/components/blocks/match-card-skeleton';

export { OfferCard } from '@/components/blocks/offer-card';
export type { OfferCardProps } from '@/components/blocks/offer-card';

export { BundleCard } from '@/components/blocks/bundle-card';
export type { BundleCardProps } from '@/components/blocks/bundle-card';

export { AccessoryCard } from '@/components/blocks/accessory-card';
export type { AccessoryCardProps } from '@/components/blocks/accessory-card';

export { RewardItem } from '@/components/blocks/reward-item';
export type { RewardItemProps } from '@/components/blocks/reward-item';

export { Wallet } from '@/components/blocks/wallet';
export type { WalletProps, WalletBalance } from '@/components/blocks/wallet';

export { MapBanner } from '@/components/blocks/map-banner';
export type { MapBannerProps, MapBannerResult } from '@/components/blocks/map-banner';

export { MatchInfoRow } from '@/components/blocks/match-info-row';
export type { MatchInfoRowProps } from '@/components/blocks/match-info-row';

export { PlayerRow } from '@/components/blocks/player-row';
export type { PlayerRowProps, PlayerRowRole } from '@/components/blocks/player-row';

export { FriendRow } from '@/components/blocks/friend-row';
export type { FriendRowProps, FriendStatus } from '@/components/blocks/friend-row';
export { FriendRowSkeleton } from '@/components/blocks/friend-row-skeleton';
export type { FriendRowSkeletonProps } from '@/components/blocks/friend-row-skeleton';
export { FriendPartyOthersRow } from '@/components/blocks/friend-party-others-row';
export type { FriendPartyOthersRowProps } from '@/components/blocks/friend-party-others-row';

export { OwnedItemCard } from '@/components/blocks/owned-item-card';
export type { OwnedItemCardProps } from '@/components/blocks/owned-item-card';

export { ExpressionWheel } from '@/components/blocks/expression-wheel';
export type {
  ExpressionWheelProps,
  ExpressionWheelSlot,
} from '@/components/blocks/expression-wheel';

export { SkinTile } from '@/components/blocks/skin-tile';
export type { SkinTileProps } from '@/components/blocks/skin-tile';

export { SectionTitle } from '@/components/blocks/section-title';
export type { SectionTitleProps } from '@/components/blocks/section-title';

// ── Utilities ──
export { cn } from '@/lib/utils';
