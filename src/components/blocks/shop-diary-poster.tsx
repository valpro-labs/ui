import * as React from 'react';

import { Platform, View, type ViewStyle } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { getWeaponCategoryWidth } from '@/lib/weapon-grid-transform';
import { cn } from '@/lib/utils';

interface ShopDiaryOffer {
  /** Rarity tier label rendered in the corner badge (e.g. `"SELECT"`). */
  tierLabel: string;
  /**
   * Accent hex driving the image wash, tier badge, and price color.
   * Accepts `#RRGGBB`, `RRGGBB`, or 8-char `#RRGGBBAA` (alpha byte ignored so
   * the same palette used for `OfferCard` slots in here too).
   */
  tierColor: string;
  /** Skin display name — rendered in the handwritten accent font below the photo. */
  name: string;
  /** Price value. Formatted with `toLocaleString()` at render time. */
  price: number;
  /** Artwork URL — typically a chroma `fullrender` from valorant-api.com. */
  iconUrl: string;
  /**
   * Riot `EEquippableCategory::*` string (e.g. `"EEquippableCategory::Rifle"`).
   * Used to scale the skin image so same-category weapons land at a
   * consistent on-card size — sidearms read smaller than rifles, melees
   * sit comfortably inside the photo window. Ignored when
   * `imageWidthPercent` is provided.
   */
  weaponCategory?: string;
  /** Explicit image width percent override (0–100). Wins over `weaponCategory`. */
  imageWidthPercent?: number;
}

interface ShopDiaryPosterProps {
  /** Header date stamp (e.g. `"APR 23 · 2026"`). */
  dateLabel: string;
  /** Short per-card date stamp in each polaroid footer (e.g. `"APR 23"`). Falls back to `dateLabel`. */
  shortDateLabel?: string;
  /** The four daily offers rendered in a 2×2 polaroid grid. */
  offers: readonly [ShopDiaryOffer, ShopDiaryOffer, ShopDiaryOffer, ShopDiaryOffer];
  /** Pre-formatted refresh countdown in the footer (e.g. `"REFRESH 14H 22M"`). Omit to hide. */
  refreshLabel?: string;
  /** Handwritten signature in the footer (e.g. `"— N0CT#TW1"`). Omit to hide. */
  signature?: string;
  /** Large italic headline. Defaults to `"shop\ndiary."` — pass an empty string to hide. */
  title?: string;
  /** Overline above the headline. Defaults to `"THE DAILY FOUR"` — pass an empty string to hide. */
  overline?: string;
  /** Currency abbreviation rendered after each price. Defaults to `"VP"`. */
  currencyLabel?: string;
  /** Brand wordmark (header + footer). Defaults to `"VALPRO"`. */
  brand?: string;
  /**
   * Font stack for the handwritten headline / item names / signature.
   * Consumer is responsible for loading the font (Google Fonts on web,
   * `expo-font` on native). Falls back to the browser's cursive stack.
   */
  handwritingFontFamily?: string;
  /**
   * Font stack for the monospaced date / price / refresh stamps.
   * Defaults to the system monospace stack.
   */
  monoFontFamily?: string;
  /** Extra classes merged onto the outer 1080×1920 wrapper. */
  className?: string;
}

const DEFAULT_HANDWRITING_FONT = 'Caveat, "Bradley Hand", cursive';
const DEFAULT_MONO_FONT = 'Menlo, Monaco, Consolas, "Courier New", monospace';

// Poster palette — matches the dark "shop diary" aesthetic, independent of
// the app's light/dark theme tokens (the poster ships as a shareable asset
// and needs to render consistently wherever it's embedded).
const POSTER_BG = 'rgb(20, 20, 26)';
const CARD_BG = 'rgb(237, 233, 226)'; // val-white, inlined so the card is solid even on a light-theme page
const CARD_FG = 'rgb(18, 18, 18)';
const VAL_RED = 'rgb(255, 70, 85)';

const POSTER_WIDTH = 1080;
const POSTER_HEIGHT = 1920;

function normalizeHex(input: string): string {
  const raw = input.startsWith('#') ? input.slice(1) : input;
  // Discard any alpha byte (8-char hex) and pad 3-char shorthand up to 6.
  const rgb =
    raw.length === 3
      ? `${raw[0]}${raw[0]}${raw[1]}${raw[1]}${raw[2]}${raw[2]}`
      : raw.slice(0, 6).padEnd(6, '0');
  return `#${rgb}`;
}

// SVG feTurbulence grain overlay. Data-URI works inline in CSS on web; on
// native the filter isn't supported so we just skip the overlay (the poster
// still looks fine without it).
const GRAIN_DATA_URL =
  'url("data:image/svg+xml;utf8,' +
  '<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'>' +
  '<filter id=\'n\'><feTurbulence baseFrequency=\'0.9\' numOctaves=\'2\' seed=\'5\'/>' +
  '<feColorMatrix values=\'0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0\'/></filter>' +
  '<rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")';

/**
 * 1080×1920 "Shop Diary · The Daily Four" poster — a shareable vertical
 * composition with a 2×2 polaroid grid of the day's store offers, each
 * polaroid showing the rarity tier, handwritten skin name, and price in
 * the tier's accent color. Designed to be exported as a PNG / shared to
 * social, so it renders at its intrinsic pixel size and ignores the app's
 * light/dark theme — wrap in a `transform: scale(...)` container if you
 * need to fit it to a smaller viewport.
 *
 * Data-free: the caller resolves the four offers (name, price, artwork
 * URL, tier accent) and pre-formats the date + refresh countdown strings.
 * The handwritten font is a visual accent; load Caveat (or similar)
 * yourself and pass it via `handwritingFontFamily` to match the design,
 * otherwise the browser's cursive fallback kicks in.
 */
function ShopDiaryPoster({
  dateLabel,
  shortDateLabel,
  offers,
  refreshLabel,
  signature,
  title = 'shop\ndiary.',
  overline = 'THE DAILY FOUR',
  currencyLabel = 'VP',
  brand = 'VALPRO',
  handwritingFontFamily = DEFAULT_HANDWRITING_FONT,
  monoFontFamily = DEFAULT_MONO_FONT,
  className,
}: ShopDiaryPosterProps) {
  const shortDate = shortDateLabel ?? dateLabel;

  // Radial background glow — real CSS gradient on web, flat-tinted circle
  // stand-in on native (RN doesn't parse `background: radial-gradient(...)`).
  const glowStyle = Platform.select<ViewStyle>({
    web: {
      // @ts-expect-error — react-native-web forwards `background` to the DOM node.
      background: `radial-gradient(circle, ${VAL_RED.replace('rgb', 'rgba').replace(')', ', 0.133)')} 0%, transparent 65%)`,
    },
    default: {
      backgroundColor: 'rgba(255, 70, 85, 0.08)',
    },
  });

  const grainStyle = Platform.select<ViewStyle>({
    web: {
      // @ts-expect-error — web-only background shorthand.
      backgroundImage: GRAIN_DATA_URL,
      backgroundSize: '200px 200px',
      mixBlendMode: 'overlay',
    },
    default: {},
  });

  return (
    <View
      className={cn('relative overflow-hidden', className)}
      style={{ width: POSTER_WIDTH, height: POSTER_HEIGHT, backgroundColor: POSTER_BG }}>
      {/* Background glow */}
      <View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: 500,
            left: POSTER_WIDTH / 2 - 500,
            width: 1000,
            height: 1000,
            borderRadius: 500,
          },
          glowStyle,
        ]}
      />

      {/* ── Header ─────────────────────────────────────────── */}
      <View style={{ position: 'absolute', top: 140, left: 60, right: 60, zIndex: 20 }}>
        <View className="flex-row items-center" style={{ gap: 14, marginBottom: 10 }}>
          <View style={{ width: 14, height: 14, backgroundColor: VAL_RED, borderRadius: 2 }} />
          <Text
            style={{
              color: CARD_BG,
              fontSize: 26,
              fontWeight: '900',
              letterSpacing: 0.45 * 26,
            }}>
            {brand}
          </Text>
          <View style={{ flex: 1, height: 2, backgroundColor: 'rgba(237, 233, 226, 0.25)' }} />
          <Text
            style={{
              color: CARD_BG,
              opacity: 0.55,
              fontSize: 22,
              fontWeight: '700',
              letterSpacing: 0.25 * 22,
              fontFamily: monoFontFamily,
            }}>
            {dateLabel}
          </Text>
        </View>

        {overline ? (
          <Text
            style={{
              color: CARD_BG,
              fontSize: 30,
              fontWeight: '800',
              letterSpacing: 0.35 * 30,
              opacity: 0.7,
            }}>
            {overline}
          </Text>
        ) : null}

        {title ? (
          <Text
            style={{
              color: CARD_BG,
              fontSize: 110,
              fontWeight: '900',
              letterSpacing: -0.06 * 110,
              lineHeight: 110 * 0.88,
              fontStyle: 'italic',
              fontFamily: handwritingFontFamily,
            }}>
            {title}
          </Text>
        ) : null}
      </View>

      {/* ── 2×2 Polaroid grid ──────────────────────────────── */}
      <View
        style={{
          position: 'absolute',
          top: 540,
          left: 60,
          right: 60,
          bottom: 320,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 28,
        }}>
        {offers.map((offer, index) => (
          <PolaroidCard
            key={index}
            offer={offer}
            index={index}
            dateLabel={shortDate}
            currencyLabel={currencyLabel}
            handwritingFontFamily={handwritingFontFamily}
            monoFontFamily={monoFontFamily}
          />
        ))}
      </View>

      {/* ── Footer ─────────────────────────────────────────── */}
      <View style={{ position: 'absolute', bottom: 140, left: 60, right: 60, zIndex: 30 }}>
        <View className="flex-row items-center" style={{ gap: 14, marginBottom: 12 }}>
          <View style={{ flex: 1, height: 2, backgroundColor: 'rgba(237, 233, 226, 0.25)' }} />
          {refreshLabel ? (
            <Text
              style={{
                color: CARD_BG,
                opacity: 0.55,
                fontSize: 22,
                fontWeight: '700',
                letterSpacing: 0.25 * 22,
                fontFamily: monoFontFamily,
              }}>
              {refreshLabel}
            </Text>
          ) : null}
        </View>
        <View className="flex-row items-center justify-between">
          {signature ? (
            <Text
              style={{
                color: CARD_BG,
                fontFamily: handwritingFontFamily,
                fontSize: 48,
                fontStyle: 'italic',
                transform: [{ rotate: '-3deg' }],
              }}>
              {signature}
            </Text>
          ) : (
            <View />
          )}
          <View className="flex-row items-center" style={{ gap: 10 }}>
            <View style={{ width: 18, height: 18, backgroundColor: VAL_RED, borderRadius: 3 }} />
            <Text
              style={{
                color: CARD_BG,
                fontSize: 30,
                fontWeight: '900',
                letterSpacing: 0.35 * 30,
              }}>
              {brand}
            </Text>
          </View>
        </View>
      </View>

      {/* Grain noise overlay (web only) */}
      <View pointerEvents="none" style={[{ position: 'absolute', inset: 0 }, grainStyle]} />
    </View>
  );
}

interface PolaroidCardProps {
  offer: ShopDiaryOffer;
  index: number;
  dateLabel: string;
  currencyLabel: string;
  handwritingFontFamily: string;
  monoFontFamily: string;
}

function PolaroidCard({
  offer,
  index,
  dateLabel,
  currencyLabel,
  handwritingFontFamily,
  monoFontFamily,
}: PolaroidCardProps) {
  const tierHex = normalizeHex(offer.tierColor);
  const washBg = `${tierHex}33`; // 20% alpha
  // Polaroid frame is fixed; the skin art scales per weapon category
  // (or an explicit override) so a Sidearm doesn't visually dominate
  // a Rifle when they share the grid.
  const imageWidthPercent =
    offer.imageWidthPercent ??
    (offer.weaponCategory ? getWeaponCategoryWidth(offer.weaponCategory) : 80);

  const shadowStyle = Platform.select<ViewStyle>({
    web: {
      boxShadow: '0px 24px 50px rgba(0, 0, 0, 0.5), 0px 8px 16px rgba(0, 0, 0, 0.3)',
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 24 },
      shadowOpacity: 0.5,
      shadowRadius: 50,
      elevation: 16,
    },
  });

  const numberLabel = `#${String(index + 1).padStart(2, '0')} · ${dateLabel}`;

  return (
    <View
      style={[
        {
          // 2-up grid inside a 960×1060 area with 28px gap → 466×516 per card.
          width: (POSTER_WIDTH - 60 * 2 - 28) / 2,
          height: (POSTER_HEIGHT - 540 - 320 - 28) / 2,
          padding: 22,
          paddingBottom: 60,
          backgroundColor: CARD_BG,
        },
        shadowStyle,
      ]}>
      {/* Photo window */}
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: washBg,
        }}>
        <Image
          source={offer.iconUrl}
          style={{ width: `${imageWidthPercent}%`, height: '85%' }}
          contentFit="contain"
        />
        <View
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: tierHex,
            paddingHorizontal: 12,
            paddingVertical: 5,
          }}>
          <Text
            style={{
              color: CARD_BG,
              fontSize: 18,
              fontWeight: '900',
              letterSpacing: 0.12 * 18,
            }}>
            {offer.tierLabel}
          </Text>
        </View>
      </View>

      {/* Handwritten name */}
      <Text
        style={{
          marginTop: 14,
          color: CARD_FG,
          fontFamily: handwritingFontFamily,
          fontSize: 40,
          fontWeight: '700',
          lineHeight: 40,
        }}>
        {offer.name}
      </Text>

      {/* Index · date · price */}
      <View
        className="flex-row items-baseline justify-between"
        style={{ marginTop: 6 }}>
        <Text
          style={{
            color: CARD_FG,
            opacity: 0.55,
            fontSize: 18,
            fontWeight: '700',
            letterSpacing: 0.15 * 18,
            fontFamily: monoFontFamily,
          }}>
          {numberLabel}
        </Text>
        <Text
          style={{
            color: tierHex,
            fontSize: 30,
            fontWeight: '900',
            fontFamily: monoFontFamily,
          }}>
          {offer.price.toLocaleString()} {currencyLabel}
        </Text>
      </View>
    </View>
  );
}

export { ShopDiaryPoster };
export type { ShopDiaryPosterProps, ShopDiaryOffer };
