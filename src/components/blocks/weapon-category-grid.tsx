import * as React from 'react';

import { Pressable, View } from 'react-native';

import { SectionTitle } from '@/components/blocks/section-title';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/**
 * Per-category default image width (% of card width) used to scale
 * weapon art inside grid tiles. Exported for convenience; consumers
 * can override per item via `widthPercent`.
 */
const WEAPON_CATEGORY_WIDTH_GRID = {
  'EEquippableCategory::Sidearm': 50,
  'EEquippableCategory::SMG': 80,
  'EEquippableCategory::Shotgun': 78,
  'EEquippableCategory::Rifle': 80,
  'EEquippableCategory::Melee': 60,
  'EEquippableCategory::Sniper': 82,
  'EEquippableCategory::Heavy': 85,
} as const;

interface WeaponCategoryGridItem {
  /** Stable React key. */
  key: string;
  /** Resolved weapon / equipped-skin image URL shown centered in the tile. */
  imageUrl?: string;
  /** Image width as a percentage of card width (0-100). Defaults to 80. */
  widthPercent?: number;
  /** Optional equipped gun buddy icon pinned to the bottom-left. */
  buddyIconUrl?: string;
  /** Called when the tile is tapped. */
  onPress?: () => void;
}

interface WeaponCategoryGridSection {
  /** Stable React key for the section. */
  key: string;
  /** Uppercased category label shown above the grid (e.g. "RIFLES"). */
  title: string;
  /** Weapons in display order. */
  items: ReadonlyArray<WeaponCategoryGridItem>;
}

interface WeaponCategoryGridProps {
  /** Sections in display order. */
  sections: ReadonlyArray<WeaponCategoryGridSection>;
  /** Render skeleton cards instead of real tiles. */
  isLoading?: boolean;
  /**
   * Icon rendered on each card's right edge indicating it's tappable.
   * Typically a small right-facing chevron. Consumer-supplied so the
   * block stays icon-agnostic.
   */
  chevronIcon?: React.ReactNode;
  /** Extra classes merged onto the outer wrapper. */
  className?: string;
}

/**
 * Weapon-loadout grid — one section per weapon category with a
 * two-column grid of tiles. Each tile shows the equipped skin art
 * centered on the card background, an optional buddy icon pinned
 * bottom-left, and a consumer-supplied chevron on the right edge.
 *
 * Data-free: consumer pre-groups weapons into sections, resolves the
 * equipped skin URL + buddy icon URL + per-category width, and passes
 * press handlers. Wrap in a `ScrollView` upstream if you need
 * pull-to-refresh.
 */
function WeaponCategoryGrid({
  sections,
  isLoading = false,
  chevronIcon,
  className,
}: WeaponCategoryGridProps) {
  return (
    <View className={cn('flex gap-y-4', className)}>
      {sections.map((section) => (
        <View key={section.key}>
          <SectionTitle title={section.title} />
          <View className="flex-row flex-wrap gap-2">
            {section.items.map((item) => (
              <View key={item.key} className="w-[48%] grow">
                {isLoading ? (
                  <Skeleton className="aspect-video w-full rounded-xl" />
                ) : (
                  <Pressable
                    onPress={item.onPress}
                    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                    <WeaponGridCard
                      imageUrl={item.imageUrl}
                      widthPercent={item.widthPercent ?? 80}
                      buddyIconUrl={item.buddyIconUrl}
                      chevronIcon={chevronIcon}
                    />
                  </Pressable>
                )}
              </View>
            ))}
            {section.items.length % 2 !== 0 && <View className="w-[48%] grow" />}
          </View>
        </View>
      ))}
    </View>
  );
}

interface WeaponGridCardProps {
  imageUrl?: string;
  widthPercent: number;
  buddyIconUrl?: string;
  chevronIcon?: React.ReactNode;
}

function WeaponGridCard({
  imageUrl,
  widthPercent,
  buddyIconUrl,
  chevronIcon,
}: WeaponGridCardProps) {
  return (
    <View className="bg-card relative aspect-video w-full items-center justify-center overflow-hidden rounded-xl">
      {imageUrl ? (
        <Image
          source={imageUrl}
          style={{ width: `${widthPercent}%`, height: '90%' }}
          contentFit="contain"
        />
      ) : null}
      {buddyIconUrl ? (
        <View className="absolute bottom-1 left-0">
          <Image
            source={buddyIconUrl}
            style={{ width: 36, height: 36 }}
            contentFit="contain"
          />
        </View>
      ) : null}
      {chevronIcon ? (
        <View className="absolute top-0 right-1 bottom-0 justify-center">
          {chevronIcon}
        </View>
      ) : null}
    </View>
  );
}

export { WeaponCategoryGrid, WEAPON_CATEGORY_WIDTH_GRID };
export type {
  WeaponCategoryGridProps,
  WeaponCategoryGridSection,
  WeaponCategoryGridItem,
};
