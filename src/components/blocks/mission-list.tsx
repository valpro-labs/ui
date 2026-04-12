import * as React from 'react';

import { View } from 'react-native';

import { MissionCard } from '@/components/blocks/mission-card';
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
  /** Missions to render, in display order. */
  missions: ReadonlyArray<MissionListItem>;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * List of `MissionCard` rows wrapped in the same rounded card container the
 * home screen uses for weekly/daily missions, with `Separator` between rows.
 *
 * Purely presentational: the consumer provides the resolved mission data.
 * No data fetching or i18n baked in.
 */
function MissionList({ missions, className }: MissionListProps) {
  return (
    <View className={cn('bg-card overflow-hidden rounded-2xl', className)}>
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
