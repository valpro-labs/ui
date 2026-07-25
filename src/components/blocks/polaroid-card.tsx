import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { resolveWeaponCategoryWidth } from '@/lib/weapon-grid-transform';

const LATIN_ONLY = /^[\x20-\u024F\s]*$/;
const CARD_BG = 'rgb(237, 233, 226)';
const CARD_TEXT = 'rgb(18, 18, 18)';

type ShopDiaryOffer = {
  /** Position badge shown in the card footer, e.g. `"01"`. */
  index: string;
  /** Color for the price accent and image tint. */
  tierColor: string;
  /** Weapon render URL. */
  iconUrl: string;
  /** Display name. */
  name: string;
  /** Numeric price shown next to the tier color. */
  price: number;
  /** Riot `EEquippableCategory::*` string used to scale the weapon image. */
  weaponCategory?: string;
};

type PolaroidCardProps = {
  /** Offer data rendered inside the polaroid-style card. */
  offer: ShopDiaryOffer;
  /** Currency suffix shown after the price. Defaults to `"VP"`. */
  priceSuffix?: string;
};

function toTintedBackground(rgb: string): string {
  return rgb.replace('rgb', 'rgba').replace(')', ', 0.2)');
}

/** Polaroid-style offer card used in the Shop Diary share poster. */
function PolaroidCard({ offer, priceSuffix = 'VP' }: PolaroidCardProps) {
  return (
    <View
      style={{
        flex: 1,
        padding: 22,
        backgroundColor: CARD_BG,
        boxShadow: '0 24px 50px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}>
      <View
        style={{
          width: '100%',
          aspectRatio: 9 / 10,
          backgroundColor: toTintedBackground(offer.tierColor),
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        <Image
          source={offer.iconUrl}
          accessibilityLabel={offer.name}
          style={{
            width: `${resolveWeaponCategoryWidth(offer.weaponCategory, 'grid')}%`,
            height: offer.weaponCategory === 'EEquippableCategory::Sidearm' ? '40%' : '80%',
          }}
          contentFit="contain"
        />
      </View>

      <Text
        numberOfLines={2}
        style={{
          marginTop: 14,
          color: CARD_TEXT,
          fontFamily: LATIN_ONLY.test(offer.name) ? 'Bradley Hand' : undefined,
          fontSize: 52,
          fontWeight: '700',
          lineHeight: 68,
        }}>
        {offer.name}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 'auto',
          paddingTop: 6,
        }}>
        <Text
          style={{
            color: CARD_TEXT,
            opacity: 0.55,
            fontSize: 34,
            lineHeight: 38,
            fontWeight: '700',
            letterSpacing: 4.8,
            fontFamily: 'Menlo',
          }}>
          #{offer.index}
        </Text>
        <Text
          style={{
            color: offer.tierColor,
            fontSize: 44,
            lineHeight: 48,
            fontWeight: '900',
            fontFamily: 'Menlo',
          }}>
          {offer.price} {priceSuffix}
        </Text>
      </View>
    </View>
  );
}

export { PolaroidCard };
export type { PolaroidCardProps, ShopDiaryOffer };
