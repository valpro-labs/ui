import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { NightMarketBrandMark } from '@/components/blocks/night-market-brand-mark';
import { Text } from '@/components/ui/text';
import { resolveWeaponCategoryWidth } from '@/lib/weapon-grid-transform';
import { Defs, RadialGradient, Rect, Stop, Svg } from '@/lib/svg-shim';

type NightMarketOffer = {
  /** Tier text shown above the item name, e.g. `"PREMIUM"`. */
  tierLabel: string;
  /** Accent color used for the border, glow, and tier text. */
  tierColor: string;
  /** Item display name. */
  name: string;
  /** Weapon render URL. */
  iconUrl: string;
  /** Original price shown with strikethrough. */
  originalPrice: number;
  /** Discounted price shown as the primary value. */
  discountedPrice: number;
  /** Discount percent badge, e.g. `34` for `-34%`. */
  discountPercent: number;
  /** Riot `EEquippableCategory::*` string used to scale the render. */
  weaponCategory?: string;
};

type NightMarketOfferCardStyle = 'neon' | 'polaroid';

type NightMarketPosterProps = {
  /** Six offers arranged in a 2x3 grid. */
  offers: NightMarketOffer[];
  /** Small kicker on the top-left. */
  kickerLabel?: string;
  /** Big headline, typically broken into two lines like `"ALL"` and `"6."`. */
  titleTopLine?: string;
  titleBottomLine?: string;
  /** Footer player tag. */
  playerTag: string;
  /** Footer brand label. */
  brandLabel?: string;
  /** Currency suffix shown next to prices. */
  priceSuffix?: string;
  /** Visual treatment for the six offer cards. Defaults to the neon market board. */
  offerCardStyle?: NightMarketOfferCardStyle;
  /** Override the default 1080px canvas width. */
  width?: number;
  /** Override the default 1920px canvas height. */
  height?: number;
};

const BACKGROUND = 'rgb(15, 12, 21)';
const CARD_BACKGROUND = 'rgb(28, 24, 38)';
const TEXT_PRIMARY = 'rgb(237, 233, 226)';
const TEXT_GOLD = 'rgb(240, 203, 116)';

function withAlpha(color: string, alpha: number): string {
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }

  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  return color;
}

function chunkOffers(offers: NightMarketOffer[]): NightMarketOffer[][] {
  const rows: NightMarketOffer[][] = [];

  for (let index = 0; index < offers.length; index += 2) {
    rows.push(offers.slice(index, index + 2));
  }

  return rows;
}

function OfferCard({
  offer,
  priceSuffix,
}: {
  offer: NightMarketOffer;
  priceSuffix: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: CARD_BACKGROUND,
        borderWidth: 1.5,
        borderColor: withAlpha(offer.tierColor, 0.32),
      }}>
      <View
        style={{
          flex: 1,
          minHeight: 0,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: 'rgb(22, 18, 30)',
        }}>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: offer.tierColor,
            opacity: 0.11,
          }}
        />
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
            right: 0,
            bottom: 0,
            left: 0,
            height: 4,
            backgroundColor: offer.tierColor,
          }}
        />
      </View>

      <View
        style={{
          height: 90,
          paddingHorizontal: 14,
          paddingTop: 12,
          paddingBottom: 14,
          backgroundColor: CARD_BACKGROUND,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text
            numberOfLines={2}
            style={{
              color: TEXT_PRIMARY,
              fontSize: 30,
              lineHeight: 32,
              fontWeight: '900',
              letterSpacing: -0.5,
            }}>
            {offer.name}
          </Text>
        </View>
        <Text
          style={{
            color: offer.tierColor,
            fontSize: 32,
            lineHeight: 34,
            fontWeight: '900',
            textAlign: 'right',
          }}>
          {offer.discountedPrice} {priceSuffix}
        </Text>
      </View>
    </View>
  );
}

function PolaroidOfferCard({
  offer,
  priceSuffix,
}: {
  offer: NightMarketOffer;
  priceSuffix: string;
}) {
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
              color: CARD_BACKGROUND,
              fontSize: 18,
              lineHeight: 20,
              fontWeight: '900',
              letterSpacing: -0.4,
            }}>
            -{offer.discountPercent}%
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text
          numberOfLines={2}
          style={{
            color: 'rgb(18, 18, 18)',
            fontSize: 26,
            lineHeight: 28,
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
              fontSize: 16,
              lineHeight: 20,
              fontWeight: '700',
              textDecorationLine: 'line-through',
            }}>
            {offer.originalPrice}
          </Text>
          <Text
            style={{
              color: offer.tierColor,
              fontSize: 30,
              lineHeight: 34,
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

/**
 * Night Market share poster inspired by the in-client 2x3 discount board:
 * oversized left headline and six discounted offers in a dense neon-accent grid.
 */
function NightMarketPoster({
  offers,
  kickerLabel = 'NIGHT MARKET',
  titleTopLine = 'ALL',
  titleBottomLine = '6.',
  playerTag,
  brandLabel = 'VALPRO',
  priceSuffix = 'VP',
  offerCardStyle = 'neon',
  width = 1080,
  height = 1920,
}: NightMarketPosterProps) {
  const rows = chunkOffers(offers);
  const glowSize = width * 0.92;

  return (
    <View
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: BACKGROUND,
      }}>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: height * 0.2,
          left: (width - glowSize) / 2,
          width: glowSize,
          height: glowSize,
          opacity: 0.95,
        }}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="nightMarketGlow" cx="0.5" cy="0.5" r="0.5">
              <Stop offset="0" stopColor="rgb(209,84,141)" stopOpacity="0.2" />
              <Stop offset="0.48" stopColor="rgb(209,84,141)" stopOpacity="0.08" />
              <Stop offset="1" stopColor="rgb(209,84,141)" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#nightMarketGlow)" />
        </Svg>
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: 200,
          paddingRight: 52,
          paddingBottom: 180,
          paddingLeft: 52,
        }}>
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              marginBottom: 8,
              color: TEXT_GOLD,
              fontSize: 30,
              lineHeight: 34,
              fontWeight: '800',
              letterSpacing: 13.5,
            }}>
            {kickerLabel}
          </Text>

          <Text
            style={{
              color: TEXT_PRIMARY,
              fontSize: 100,
              lineHeight: 86,
              fontWeight: '900',
              fontStyle: 'italic',
              letterSpacing: -6,
            }}>
            {titleTopLine}
            {'\n'}
            {titleBottomLine}
          </Text>
        </View>

        <View style={{ flex: 1, gap: 18 }}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flex: 1, flexDirection: 'row', gap: 18 }}>
              {row.map((offer) =>
                offerCardStyle === 'polaroid' ? (
                  <PolaroidOfferCard key={`${offer.name}-${rowIndex}`} offer={offer} priceSuffix={priceSuffix} />
                ) : (
                  <OfferCard key={`${offer.name}-${rowIndex}`} offer={offer} priceSuffix={priceSuffix} />
                )
              )}
            </View>
          ))}
        </View>

        <View
          style={{
            marginTop: 22,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: TEXT_PRIMARY,
              opacity: 0.5,
              fontSize: 24,
              lineHeight: 28,
              fontWeight: '700',
              letterSpacing: 3.6,
              fontFamily: 'Menlo',
            }}>
            {playerTag}
          </Text>

          <NightMarketBrandMark label={brandLabel} />
        </View>
      </View>
    </View>
  );
}

export { NightMarketPoster };
export type { NightMarketPosterProps, NightMarketOffer, NightMarketOfferCardStyle };
