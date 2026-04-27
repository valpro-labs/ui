import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';

import { OwnedItemCard } from '@/components/blocks/owned-item-card';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const LEVEL_BORDER_WIDTH = 76;
const LEVEL_BORDER_HEIGHT = 32;
const DEFAULT_LEVEL_BORDER_SCALE = 1.12;

interface LevelBorderProps {
  /** Account level shown in the center of the border. */
  level?: number | string;
  /** URL for the account level border art. */
  borderIcon?: string;
  /** Scale applied only to the border art behind the level text. */
  borderScale?: number;
  /** Extra classes merged onto the outer wrapper. */
  className?: string;
  /** Extra inline style for positioning or layout. */
  style?: StyleProp<ViewStyle>;
}

/**
 * VALORANT account level badge: border art with the level centered on top.
 * Consumers provide the already-resolved border asset URL.
 */
function LevelBorder({
  level,
  borderIcon,
  borderScale = DEFAULT_LEVEL_BORDER_SCALE,
  className,
  style,
}: LevelBorderProps) {
  const isOverThousand = Number(level) >= 1000;
  const artWidth = LEVEL_BORDER_WIDTH * borderScale;
  const artHeight = LEVEL_BORDER_HEIGHT * borderScale;

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
      <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
        <View
          style={{
            width: artWidth,
            height: artHeight,
          }}>
          <OwnedItemCard
            iconUrl={borderIcon}
            fill={false}
            className="h-full w-full aspect-auto rounded-none bg-transparent"
          />
        </View>
      </View>
      {level !== undefined ? (
        <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
          <Text
            style={isOverThousand ? { fontSize: 10 } : undefined}
            className="text-val-white text-xs font-bold">
            {level}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export { LevelBorder };
export type { LevelBorderProps };
