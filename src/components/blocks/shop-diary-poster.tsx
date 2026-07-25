import * as React from 'react';

import { View } from 'react-native';

import { PolaroidCard, type ShopDiaryOffer } from '@/components/blocks/polaroid-card';
import { Text } from '@/components/ui/text';
import { Defs, RadialGradient, Rect, Stop, Svg } from '@/lib/svg-shim';

type ShopDiaryPosterProps = {
  /** The four (or more/less) offers to lay out in the 2-column grid. */
  offers: ShopDiaryOffer[];
  /** Brand wordmark shown top-left. */
  brandLabel: string;
  /** Small kicker above the big title (e.g. `"THE DAILY FOUR"`). */
  issueLabel: string;
  /** Long date shown in the header (e.g. `"APR 23 · 2026"`). */
  dateLabel: string;
  /** Currency suffix shown after the price. Defaults to `"VP"`. */
  priceSuffix?: string;
  /** Override the default 1080px canvas width. */
  width?: number;
  /** Override the default 1920px canvas height. */
  height?: number;
};

const BACKGROUND = 'rgb(20, 20, 26)';
const CARD_BG = 'rgb(237, 233, 226)';
const ACCENT = 'rgb(255, 70, 85)';

/**
 * "Daily Four" share poster — a 1080×1920 magazine-style layout wrapping
 * the day's shop rotation. Header carries a brand wordmark + issue date,
 * while `PolaroidCard` renders each polaroid-style offer tile.
 */
function ShopDiaryPoster({
  offers,
  brandLabel,
  issueLabel,
  dateLabel,
  priceSuffix = 'VP',
  width = 1080,
  height = 1920,
}: ShopDiaryPosterProps) {
  const CIRCLE = 1000;
  const rows: ShopDiaryOffer[][] = [];

  for (let i = 0; i < offers.length; i += 2) {
    rows.push(offers.slice(i, i + 2));
  }

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
          top: 500,
          left: (width - CIRCLE) / 2,
          width: CIRCLE,
          height: CIRCLE,
        }}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="shopDiaryGlow" cx="0.5" cy="0.5" r="0.5">
              <Stop offset="0" stopColor="rgb(255,70,85)" stopOpacity="0.133" />
              <Stop offset="0.65" stopColor="rgb(255,70,85)" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#shopDiaryGlow)" />
        </Svg>
      </View>

      <View style={{ position: 'absolute', top: 140, left: 60, right: 60, zIndex: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
            marginBottom: 18,
          }}>
          <View style={{ width: 18, height: 18, backgroundColor: ACCENT, borderRadius: 2 }} />
          <Text
            style={{
              color: CARD_BG,
              fontSize: 46,
              lineHeight: 54,
              fontWeight: '900',
              letterSpacing: 20,
            }}>
            {brandLabel}
          </Text>
          <View style={{ flex: 1, height: 2, backgroundColor: 'rgba(237,233,226,0.25)' }} />
          <Text
            style={{
              color: CARD_BG,
              opacity: 0.55,
              fontSize: 28,
              lineHeight: 34,
              fontWeight: '700',
              letterSpacing: 6,
              fontFamily: 'Menlo',
            }}>
            {dateLabel}
          </Text>
        </View>
        <Text
          className="uppercase"
          style={{
            color: CARD_BG,
            fontSize: 34,
            lineHeight: 42,
            fontWeight: '800',
            letterSpacing: 11,
            opacity: 0.7,
          }}>
          {issueLabel}
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 320,
          right: 60,
          bottom: 140,
          left: 60,
          gap: 28,
        }}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flex: 1, flexDirection: 'row', gap: 28 }}>
            {row.map((offer) => (
              <PolaroidCard key={offer.index} offer={offer} priceSuffix={priceSuffix} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

export { ShopDiaryPoster };
export type { ShopDiaryPosterProps, ShopDiaryOffer };
