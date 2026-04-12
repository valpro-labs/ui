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

// ── Utilities ──
export { cn } from '@/lib/utils';
