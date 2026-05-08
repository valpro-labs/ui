import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
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

type NightMarketPosterProps = {
  /** Six offers arranged in a 2x3 grid. */
  offers: NightMarketOffer[];
  /** Small kicker on the top-left. */
  kickerLabel?: string;
  /** Big headline, typically broken into two lines like `"ALL"` and `"6."`. */
  titleTopLine?: string;
  titleBottomLine?: string;
  /** Small label above the countdown. */
  countdownLabel?: string;
  /** Primary countdown text. */
  countdownValue: string;
  /** Footer player tag. */
  playerTag: string;
  /** Footer brand label. */
  brandLabel?: string;
  /** Currency suffix shown next to prices. */
  priceSuffix?: string;
  /** Override the default 1080px canvas width. */
  width?: number;
  /** Override the default 1920px canvas height. */
  height?: number;
};

const BACKGROUND = 'rgb(15, 12, 21)';
const CARD_BACKGROUND = 'rgb(28, 24, 38)';
const TEXT_PRIMARY = 'rgb(237, 233, 226)';
const TEXT_GOLD = 'rgb(240, 203, 116)';
const VALPRO_RED = 'rgb(255, 70, 85)';


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
            width: '100%',
            height: offer.weaponCategory === 'EEquippableCategory::Sidearm' ? '45%' : '100%',
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

/**
 * Night Market share poster inspired by the in-client 2x3 discount board:
 * oversized left headline, countdown on the right, and six discounted offers
 * in a dense neon-accent grid.
 */
function NightMarketPoster({
  offers,
  kickerLabel = 'NIGHT MARKET',
  titleTopLine = 'ALL',
  titleBottomLine = '6.',
  countdownLabel = 'ENDS IN',
  countdownValue,
  playerTag,
  brandLabel = 'VALPRO',
  priceSuffix = 'VP',
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
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

            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{
                  color: TEXT_PRIMARY,
                  opacity: 0.5,
                  fontSize: 24,
                  lineHeight: 28,
                  fontWeight: '700',
                  letterSpacing: 3.6,
                }}>
                {countdownLabel}
              </Text>
              <Text
                style={{
                  color: TEXT_GOLD,
                  fontSize: 44,
                  lineHeight: 48,
                  fontWeight: '900',
                  letterSpacing: -0.9,
                }}>
                {countdownValue}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, gap: 18 }}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flex: 1, flexDirection: 'row', gap: 18 }}>
              {row.map((offer) => (
                <OfferCard key={`${offer.name}-${rowIndex}`} offer={offer} priceSuffix={priceSuffix} />
              ))}
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

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View
              style={{
                width: 14,
                height: 14,
                backgroundColor: VALPRO_RED,
                transform: [{ rotate: '45deg' }],
              }}
            />
            <Text
              style={{
                color: TEXT_PRIMARY,
                fontSize: 14,
                lineHeight: 18,
                fontWeight: '800',
                letterSpacing: 3.5,
              }}>
              {brandLabel}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export { NightMarketPoster };
export type { NightMarketPosterProps, NightMarketOffer };
