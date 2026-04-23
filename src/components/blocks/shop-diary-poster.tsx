import * as React from 'react';

import { getWeaponCategoryWidth } from '@/lib/weapon-grid-transform';

// 1080×1920 share poster ("Daily Four") — web-only. The design relies on
// radial-gradient, mix-blend-mode, Google fonts, transform: rotate, and
// an inline SVG noise filter, none of which port cleanly to React Native.
// Consumers that need this on native must render it via WebView or
// server-side image generation.

type ShopDiaryOffer = {
  /** Position badge shown in the card footer, e.g. `"01"`. */
  index: string;
  /** CSS color for the price accent and image tint. */
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
  /** Brand wordmark shown top-left and bottom-right. */
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

// SVG noise baked into the poster as a mix-blend-mode overlay.
const NOISE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence baseFrequency="0.9" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>`;

// Lighten a `rgb(r, g, b)` string to a 20%-opacity `rgba(…)` for the image backdrop.
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
    <div
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: 22,
        background: CARD_BG,
        boxShadow: '0 24px 50px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
      {/* Image slot — fixed landscape aspect so every card matches in size + ratio. */}
      <div
        style={{
          width: '100%',
          aspectRatio: '9 / 10',
          background: toTintedBackground(offer.tierColor),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
        <img
          src={offer.iconUrl}
          alt={offer.name}
          style={{
            width: `${widthPercent}%`,
            maxHeight: '80%',
            objectFit: 'contain',
          }}
        />
      </div>

      <div
        style={{
          marginTop: 14,
          color: CARD_TEXT,
          fontFamily: 'Caveat, "Bradley Hand", cursive',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1,
          overflow: 'hidden',
          overflowWrap: 'anywhere',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
        {offer.name}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginTop: 'auto',
          paddingTop: 6,
        }}>
        <div
          style={{
            color: CARD_TEXT,
            opacity: 0.55,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.15em',
            fontFamily: 'Menlo, monospace',
          }}>
          #{offer.index}
        </div>
        <div
          style={{
            color: offer.tierColor,
            fontSize: 30,
            fontWeight: 900,
            fontFamily: 'Menlo, monospace',
          }}>
          {offer.price} {priceSuffix}
        </div>
      </div>
    </div>
  );
}

/**
 * "Daily Four" share poster — a 1080×1920 magazine-style layout wrapping
 * the day's shop rotation. Header carries a brand wordmark + issue date,
 * the body is a 2×2 grid of offer tiles (each with a 1:1 image slot so
 * every card matches in size and ratio regardless of skin render), and
 * the footer pairs a refresh countdown with a signed Riot ID.
 *
 * Purely presentational — consumer supplies the offers, labels, and
 * signature. Web-only (relies on radial-gradient, mix-blend-mode,
 * Google-fonts Caveat, and an inline SVG noise filter).
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
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap"
      />
      <div
        style={{
          width,
          height,
          position: 'relative',
          overflow: 'hidden',
          background: BACKGROUND,
          fontFamily: 'Inter, sans-serif',
        }}>
        <div
          style={{
            position: 'absolute',
            top: 500,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1000,
            height: 1000,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,70,85,0.133) 0%, transparent 65%)',
          }}
        />

        {/* Header */}
        <div style={{ position: 'absolute', top: 140, left: 60, right: 60, zIndex: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 10,
            }}>
            <div style={{ width: 14, height: 14, background: ACCENT, borderRadius: 2 }} />
            <div
              style={{
                color: CARD_BG,
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: '0.45em',
              }}>
              {brandLabel}
            </div>
            <div style={{ flex: 1, height: 2, background: 'rgba(237,233,226,0.25)' }} />
            <div
              style={{
                color: CARD_BG,
                opacity: 0.55,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '0.25em',
                fontFamily: 'Menlo, monospace',
              }}>
              {dateLabel}
            </div>
          </div>
          <div
            style={{
              color: CARD_BG,
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: '0.35em',
              opacity: 0.7,
            }}>
            {issueLabel}
          </div>
        </div>

        {/* Offer grid */}
        <div
          style={{
            position: 'absolute',
            top: 320,
            right: 60,
            bottom: 140,
            left: 60,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 28,
          }}>
          {offers.map((offer) => (
            <OfferTile key={offer.index} offer={offer} priceSuffix={priceSuffix} />
          ))}
        </div>

        {/* Noise overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${NOISE_SVG}")`,
            backgroundSize: '200px 200px',
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    </>
  );
}

export { ShopDiaryPoster };
export type { ShopDiaryPosterProps, ShopDiaryOffer };
