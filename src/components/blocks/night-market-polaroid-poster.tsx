import * as React from 'react';

import { View } from 'react-native';

import type { NightMarketOffer } from '@/components/blocks/night-market-offer';
import { NightMarketPolaroidCard } from '@/components/blocks/night-market-polaroid-card';
import { Text } from '@/components/ui/text';
import { Defs, RadialGradient, Rect, Stop, Svg } from '@/lib/svg-shim';

type NightMarketPolaroidPosterProps = {
  offers: NightMarketOffer[];
  kickerLabel?: string;
  titleTopLine?: string;
  titleBottomLine?: string;
  playerTag: string;
  brandLabel?: string;
  priceSuffix?: string;
  width?: number;
  height?: number;
};

const BACKGROUND = 'rgb(15, 12, 21)';
const TEXT_PRIMARY = 'rgb(237, 233, 226)';
const TEXT_GOLD = 'rgb(240, 203, 116)';
const VALPRO_RED = 'rgb(255, 70, 85)';

function chunkOffers(offers: NightMarketOffer[]): NightMarketOffer[][] {
  const rows: NightMarketOffer[][] = [];

  for (let index = 0; index < offers.length; index += 2) {
    rows.push(offers.slice(index, index + 2));
  }

  return rows;
}

/** Night Market share poster rendered as a wall of six discounted polaroids. */
function NightMarketPolaroidPoster({
  offers,
  kickerLabel = 'NIGHT MARKET',
  titleTopLine = 'ALL',
  titleBottomLine = '6.',
  playerTag,
  brandLabel = 'VALPRO',
  priceSuffix = 'VP',
  width = 1080,
  height = 1920,
}: NightMarketPolaroidPosterProps) {
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
            <RadialGradient id="nightMarketPolaroidGlow" cx="0.5" cy="0.5" r="0.5">
              <Stop offset="0" stopColor="rgb(209,84,141)" stopOpacity="0.2" />
              <Stop offset="0.48" stopColor="rgb(209,84,141)" stopOpacity="0.08" />
              <Stop offset="1" stopColor="rgb(209,84,141)" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#nightMarketPolaroidGlow)" />
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
              {row.map((offer) => (
                <NightMarketPolaroidCard
                  key={`${offer.name}-${rowIndex}`}
                  offer={offer}
                  priceSuffix={priceSuffix}
                />
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

export { NightMarketPolaroidPoster };
export type { NightMarketPolaroidPosterProps };
