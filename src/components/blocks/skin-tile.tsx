import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

interface SkinTileProps {
  /**
   * Optional swatch / preview image used as the tile background. Chroma
   * tiles pass the chroma swatch; level tiles omit this and render on
   * the plain card background.
   */
  swatchUrl?: string;
  /** Render the selection ring + tinted wash. */
  isSelected?: boolean;
  /**
   * Content rendered inside the 45° rotated diamond overlay in the
   * tile's center. Consumer supplies a lock icon (not owned) or a
   * checkmark (equipped), already counter-rotated. Pass `null` for
   * owned-but-not-equipped tiles.
   */
  stateIcon?: React.ReactNode;
  /**
   * Badge pinned to the bottom-right — typically a favorite star.
   * Only used by chroma tiles in the source.
   */
  favoriteBadge?: React.ReactNode;
  /** Extra classes merged onto the outer tile wrapper. */
  className?: string;
}

/**
 * 48-square tile used for both skin levels and chromas in the weapon
 * detail view. Always renders a centered diamond overlay that hosts
 * lock / equipped state; chromas additionally fill the tile with a
 * swatch image and may pin a favorite badge.
 *
 * Data-free: consumer resolves ownership / equipped / favorite state
 * upstream and supplies the icons as `ReactNode`. Pair with a
 * `<Pressable>` wrapper for tap handling.
 */
function SkinTile({
  swatchUrl,
  isSelected = false,
  stateIcon,
  favoriteBadge,
  className,
}: SkinTileProps) {
  return (
    <View
      className={cn(
        'bg-card relative items-center justify-center overflow-hidden rounded-lg',
        isSelected && 'ring-val-green-ui ring-2',
        className
      )}
      style={{ width: 48, height: 48 }}>
      {swatchUrl ? (
        <Image
          source={swatchUrl}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
      ) : null}

      {isSelected ? (
        <View className="bg-val-green-ui/20 absolute inset-0" pointerEvents="none" />
      ) : null}

      <View className="absolute inset-0 items-center justify-center">
        <View
          className="items-center justify-center"
          style={{
            width: 18,
            height: 18,
            transform: [{ rotate: '45deg' }],
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.4)',
          }}>
          {stateIcon ? (
            <View style={{ transform: [{ rotate: '-45deg' }] }}>{stateIcon}</View>
          ) : null}
        </View>
      </View>

      {favoriteBadge ? (
        <View className="absolute right-0.5 bottom-0.5">{favoriteBadge}</View>
      ) : null}
    </View>
  );
}

export { SkinTile };
export type { SkinTileProps };
