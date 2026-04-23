import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import {
  ShopDiaryPoster,
  type ShopDiaryOffer,
} from '@/components/blocks/shop-diary-poster';

// ── Real Valorant asset URLs ─────────────────────────────────────────────
// Matches the four chromas used by `offer-card.stories.tsx`, so the poster
// showcases the same daily-four palette as the store feed.
const vandalChroma =
  'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png';
const frenzyChroma =
  'https://media.valorant-api.com/weaponskinchromas/b8ddad9b-4622-3e0e-6821-56bf2e901bcf/fullrender.png';
const goOperatorChroma =
  'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png';
const doombringerChroma =
  'https://media.valorant-api.com/weaponskinchromas/6d785ae8-4332-9946-e491-368a5fab442d/fullrender.png';

const offers: readonly [
  ShopDiaryOffer,
  ShopDiaryOffer,
  ShopDiaryOffer,
  ShopDiaryOffer,
] = [
  {
    tierLabel: 'SELECT',
    tierColor: '#5a9fe2',
    name: 'Immortalized Vandal',
    price: 1775,
    iconUrl: vandalChroma,
  },
  {
    tierLabel: 'DELUXE',
    tierColor: '#009987',
    name: 'Task Force 809 Frenzy',
    price: 1275,
    iconUrl: frenzyChroma,
  },
  {
    tierLabel: 'PREMIUM',
    tierColor: '#d1548d',
    name: 'Valorant Go! Vol. 2 Operator',
    price: 2175,
    iconUrl: goOperatorChroma,
  },
  {
    tierLabel: 'EXCLUSIVE',
    tierColor: '#f5955b',
    name: 'Doombringer Odin',
    price: 2475,
    iconUrl: doombringerChroma,
  },
];

const meta: Meta<typeof ShopDiaryPoster> = {
  title: 'Blocks/ShopDiaryPoster',
  component: ShopDiaryPoster,
  // The poster renders at its intrinsic 1080×1920 canvas — switch to the
  // Desktop viewport so the full composition is visible in Storybook.
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export default meta;
type Story = StoryObj<typeof ShopDiaryPoster>;

/**
 * Default poster — wrapped in a `transform: scale(...)` container so the
 * 1080×1920 canvas fits into the Storybook viewport without clipping.
 * In production, export the unscaled component to a PNG or embed it at
 * full size on the share page.
 */
export const Default: Story = {
  args: {
    dateLabel: 'APR 23 · 2026',
    shortDateLabel: 'APR 23',
    offers,
    refreshLabel: 'REFRESH 14H 22M',
    signature: '— N0CT#TW1',
  },
  render: (args) => (
    <View
      style={{
        width: 540,
        height: 960,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{ transform: [{ scale: 0.5 }] }}>
        <ShopDiaryPoster {...args} />
      </View>
    </View>
  ),
};

/**
 * Full-bleed 1080×1920 render with no scaling — useful for visual regression
 * or when exporting to a PNG via Storybook's screenshot addon.
 */
export const FullSize: Story = {
  args: {
    dateLabel: 'APR 23 · 2026',
    shortDateLabel: 'APR 23',
    offers,
    refreshLabel: 'REFRESH 14H 22M',
    signature: '— N0CT#TW1',
  },
};

/**
 * Minimal variant — no refresh countdown, no signature. Drops the
 * auxiliary text so the poster works as a clean catalogue shot.
 */
export const Minimal: Story = {
  args: {
    dateLabel: 'APR 23 · 2026',
    offers,
  },
  render: (args) => (
    <View
      style={{
        width: 540,
        height: 960,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{ transform: [{ scale: 0.5 }] }}>
        <ShopDiaryPoster {...args} />
      </View>
    </View>
  ),
};
