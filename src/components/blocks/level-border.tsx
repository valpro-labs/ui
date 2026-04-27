import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';

import { OwnedItemCard } from '@/components/blocks/owned-item-card';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const LEVEL_BORDER_WIDTH = 76;
const LEVEL_BORDER_HEIGHT = 32;

interface LevelBorderProps {
  /** Account level shown in the center of the border. */
  level?: number | string;
  /** URL for the account level border art. */
  borderIcon?: string;
  /** Extra classes merged onto the outer wrapper. */
  className?: string;
  /** Extra inline style for positioning or layout. */
  style?: StyleProp<ViewStyle>;
}

/**
 * VALORANT account level badge: border art with the level centered on top.
 * Consumers provide the already-resolved border asset URL.
 */
function LevelBorder({ level, borderIcon, className, style }: LevelBorderProps) {
  const isOverThousand = Number(level) >= 1000;

  return (
    <View
      pointerEvents="none"
      style={[
        {
          width: LEVEL_BORDER_WIDTH,
          height: LEVEL_BORDER_HEIGHT,
        },
        style,
      ]}
      className={cn('relative', className)}>
      <OwnedItemCard
        iconUrl={borderIcon}
        fill={false}
        className="h-full w-full aspect-auto rounded-none bg-transparent"
      />
      {level !== undefined ? (
        <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
          <Text
            style={isOverThousand ? { fontSize: 10 } : undefined}
            className="text-val-white text-xs">
            {level}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export { LevelBorder };
export type { LevelBorderProps };
