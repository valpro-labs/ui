import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import type { NightMarketOffer } from '@/components/blocks/night-market-offer';
import { resolveWeaponCategoryWidth } from '@/lib/weapon-grid-transform';

type NightMarketPolaroidCardProps = {
  offer: NightMarketOffer;
  priceSuffix?: string;
};

function withAlpha(color: string, alpha: number): string {
  return color.startsWith('rgb(') ? color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`) : color;
}

/** A discounted Night Market offer in the cream polaroid treatment. */
function NightMarketPolaroidCard({
  offer,
  priceSuffix = 'VP',
}: NightMarketPolaroidCardProps) {
  return (
    <View
      style={{
        flex: 1,
        padding: 14,
        overflow: 'hidden',
        backgroundColor: 'rgb(237, 233, 226)',
        boxShadow: '0 16px 32px rgba(0,0,0,0.34), 0 5px 10px rgba(0,0,0,0.22)',
      }}>
      <View
        style={{
          flex: 1,
          minHeight: 0,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: withAlpha(offer.tierColor, 0.18),
        }}>
        <Image
          source={offer.iconUrl}
          accessibilityLabel={offer.name}
          style={{
            width: `${resolveWeaponCategoryWidth(offer.weaponCategory, 'grid')}%`,
            height: '100%',
          }}
          contentFit="contain"
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            paddingHorizontal: 10,
            paddingVertical: 6,
            backgroundColor: offer.tierColor,
          }}>
          <Text
            style={{
              color: 'rgb(28, 24, 38)',
              fontSize: 22,
              lineHeight: 24,
              fontWeight: '900',
              letterSpacing: -0.4,
            }}>
            -{offer.discountPercent}%
          </Text>
        </View>
      </View>

      <View
        style={{
          height: 116,
          paddingTop: 10,
          justifyContent: 'space-between',
        }}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.4}
          style={{
            color: 'rgb(18, 18, 18)',
            fontSize: 40,
            lineHeight: 44,
            fontWeight: '900',
            letterSpacing: -0.8,
          }}>
          {offer.name}
        </Text>
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: 10,
          }}>
          <Text
            style={{
              color: 'rgb(18, 18, 18)',
              opacity: 0.45,
              fontSize: 18,
              lineHeight: 22,
              fontWeight: '700',
              textDecorationLine: 'line-through',
            }}>
            {offer.originalPrice}
          </Text>
          <Text
            style={{
              color: offer.tierColor,
              fontSize: 44,
              lineHeight: 48,
              fontWeight: '900',
              letterSpacing: -0.8,
            }}>
            {offer.discountedPrice} {priceSuffix}
          </Text>
        </View>
      </View>
    </View>
  );
}

export { NightMarketPolaroidCard };
export type { NightMarketPolaroidCardProps };
