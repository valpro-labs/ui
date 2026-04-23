import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { Defs, RadialGradient, Rect, Stop, Svg } from '@/lib/svg-shim';
import { getWeaponCategoryWidth } from '@/lib/weapon-grid-transform';

// 1080×1920 share poster ("Daily Four"). Cross-platform: the radial highlight
// uses `<Svg>` + `<RadialGradient>` instead of a CSS gradient, the name block
// uses `numberOfLines={3}` instead of `-webkit-line-clamp`, and the design
// relies on `boxShadow` (RN 0.76+). The handwritten name expects the
// `Caveat` font to be registered by the consumer (web: `@fontsource/caveat`,
// native: expo-font). The original mix-blend-mode noise overlay is dropped
// since RN has no equivalent.

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
  /** Riot `EEquippableCategory::*` string used to scale the weapon image so same-category skins land at a consistent on-card size. Defaults to a Rifle-sized 80%. */
  weaponCategory?: string;
};

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
const CARD_TEXT = 'rgb(18, 18, 18)';
const ACCENT = 'rgb(255, 70, 85)';

// Lighten an `rgb(r, g, b)` string to a 20%-opacity `rgba(…)` for the image backdrop.
function toTintedBackground(rgb: string): string {
  return rgb.replace('rgb', 'rgba').replace(')', ', 0.2)');
}

function OfferTile({
  offer,
  priceSuffix,
}: {
  offer: ShopDiaryOffer;
  priceSuffix: string;
}) {
  const widthPercent = offer.weaponCategory
    ? getWeaponCategoryWidth(offer.weaponCategory)
    : 80;

  return (
    <View
      style={{
        flex: 1,
        padding: 22,
        backgroundColor: CARD_BG,
        boxShadow: '0 24px 50px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}>
      {/* Image slot — fixed aspect so every card matches in size + ratio. */}
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
          style={{ width: `${widthPercent}%`, height: '80%' }}
          contentFit="contain"
        />
      </View>

      <Text
        numberOfLines={3}
        style={{
          marginTop: 14,
          color: CARD_TEXT,
          fontFamily: 'Caveat',
          fontSize: 40,
          fontWeight: '700',
          lineHeight: 40,
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
            fontSize: 18,
            fontWeight: '700',
            letterSpacing: 2.7,
            fontFamily: 'Menlo',
          }}>
          #{offer.index}
        </Text>
        <Text
          style={{
            color: offer.tierColor,
            fontSize: 30,
            fontWeight: '900',
            fontFamily: 'Menlo',
          }}>
          {offer.price} {priceSuffix}
        </Text>
      </View>
    </View>
  );
}

/**
 * "Daily Four" share poster — a 1080×1920 magazine-style layout wrapping
 * the day's shop rotation. Header carries a brand wordmark + issue date,
 * the body is a 2×2 grid of offer tiles (each with a fixed-aspect image
 * slot so every card matches in size and ratio regardless of skin render).
 *
 * Purely presentational — consumer supplies the offers, labels, and font
 * registration for `Caveat` (the handwritten display face).
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

  // Chunk offers into rows of two so the 2×2 grid renders via flexbox
  // without relying on CSS grid (which RN doesn't support).
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
      {/* Radial highlight behind the grid. */}
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

      {/* Header */}
      <View style={{ position: 'absolute', top: 140, left: 60, right: 60, zIndex: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
            marginBottom: 10,
          }}>
          <View style={{ width: 14, height: 14, backgroundColor: ACCENT, borderRadius: 2 }} />
          <Text
            style={{
              color: CARD_BG,
              fontSize: 26,
              fontWeight: '900',
              letterSpacing: 11.7,
            }}>
            {brandLabel}
          </Text>
          <View style={{ flex: 1, height: 2, backgroundColor: 'rgba(237,233,226,0.25)' }} />
          <Text
            style={{
              color: CARD_BG,
              opacity: 0.55,
              fontSize: 22,
              fontWeight: '700',
              letterSpacing: 5.5,
              fontFamily: 'Menlo',
            }}>
            {dateLabel}
          </Text>
        </View>
        <Text
          style={{
            color: CARD_BG,
            fontSize: 30,
            fontWeight: '800',
            letterSpacing: 10.5,
            opacity: 0.7,
          }}>
          {issueLabel}
        </Text>
      </View>

      {/* Offer grid — two rows of two, flex-based. */}
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
              <OfferTile key={offer.index} offer={offer} priceSuffix={priceSuffix} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

export { ShopDiaryPoster };
export type { ShopDiaryPosterProps, ShopDiaryOffer };
