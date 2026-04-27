import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const LEVEL_BORDER_WIDTH = 76;
const LEVEL_BORDER_HEIGHT = 32;
const LEVEL_FONT_SIZE = 11;

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
  return (
    <View
      pointerEvents="none"
      style={[
        {
          width: LEVEL_BORDER_WIDTH,
          height: LEVEL_BORDER_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      className={cn(className)}>
      {borderIcon ? (
        <Image source={borderIcon} style={StyleSheet.absoluteFill} contentFit="contain" />
      ) : (
        <View
          style={[StyleSheet.absoluteFill, { borderRadius: LEVEL_BORDER_HEIGHT / 2 }]}
          className="bg-black/35"
        />
      )}
      {level !== undefined ? (
        <View
          style={StyleSheet.absoluteFill}
          className="items-center justify-center"
          pointerEvents="none">
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
            style={{
              width: 44,
              fontSize: LEVEL_FONT_SIZE,
              lineHeight: LEVEL_FONT_SIZE,
              textAlign: 'center',
              includeFontPadding: false,
              textAlignVertical: 'center',
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
            className="font-black text-white">
            {level}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export { LevelBorder };
export type { LevelBorderProps };
