import * as React from 'react';

import { View } from 'react-native';

import { MissionCard } from '@/components/blocks/mission-card';
import { MissionCardSkeleton } from '@/components/blocks/mission-card-skeleton';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface MissionListItem {
  /** Stable identifier used for the React key. Defaults to the array index if omitted. */
  id?: string | number;
  /** Mission display title. */
  title: string;
  /** XP amount awarded on completion. */
  xpReward: number;
  /** Current progress count. */
  progress: number;
  /** Target count required to complete. */
  total: number;
  /**
   * Localized label shown after the XP amount (e.g. `i18n.t('components.missionCard.xp')`).
   * Omit to fall through to MissionCard's default of `"XP"`.
   */
  xpLabel?: string;
}

interface MissionListProps {
  /** Missions to render, in display order. Ignored while `isLoading` is true. */
  missions: ReadonlyArray<MissionListItem>;
  /** Show skeleton rows instead of the real missions. */
  isLoading?: boolean;
  /** Number of skeleton rows to render while loading. Defaults to 3. */
  skeletonCount?: number;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * List of `MissionCard` rows wrapped in the same rounded card container the
 * home screen uses for weekly/daily missions, with `Separator` between rows.
 *
 * Purely presentational: the consumer provides the resolved mission data.
 * No data fetching or i18n baked in.
 *
 * When `isLoading` is true, renders `skeletonCount` `MissionCardSkeleton`
 * rows with the same wrapper and separators so the layout doesn't shift
 * between the loading and loaded states.
 */
function MissionList({
  missions,
  isLoading = false,
  skeletonCount = 3,
  className,
}: MissionListProps) {
  const wrapperClassName = cn('bg-card overflow-hidden rounded-2xl', className);

  if (isLoading) {
    return (
      <View className={wrapperClassName}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <React.Fragment key={index}>
            {index > 0 && <Separator />}
            <View className="px-4 py-3">
              <MissionCardSkeleton />
            </View>
          </React.Fragment>
        ))}
      </View>
    );
  }

  return (
    <View className={wrapperClassName}>
      {missions.map((mission, index) => (
        <React.Fragment key={mission.id ?? index}>
          {index > 0 && <Separator />}
          <View className="px-4 py-3">
            <MissionCard
              title={mission.title}
              xpReward={mission.xpReward}
              progress={mission.progress}
              total={mission.total}
              xpLabel={mission.xpLabel}
            />
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

export { MissionList };
export type { MissionListProps, MissionListItem };
