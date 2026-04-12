import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { OfferCard, type OfferCardProps } from '@/components/blocks/offer-card';

// ── Real Valorant asset URLs ─────────────────────────────────────────────
// Chroma fullRender images from the public valorant-api.com CDN.
const vandalChroma =
  'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png';
const frenzyChroma =
  'https://media.valorant-api.com/weaponskinchromas/b8ddad9b-4622-3e0e-6821-56bf2e901bcf/fullrender.png';
const goOperatorChroma =
  'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png';
const doombringerChroma =
  'https://media.valorant-api.com/weaponskinchromas/6d785ae8-4332-9946-e491-368a5fab442d/fullrender.png';

// Content tier icons + accent colors (hex minus the alpha byte).
const selectTierIcon =
  'https://media.valorant-api.com/contenttiers/12683d76-48d7-84a3-4e09-6985794f0445/displayicon.png';
const deluxeTierIcon =
  'https://media.valorant-api.com/contenttiers/0cebb8be-46d7-c12a-d306-e9907bfc5a25/displayicon.png';
const premiumTierIcon =
  'https://media.valorant-api.com/contenttiers/60bca009-4182-7998-dee7-b8a2558dc369/displayicon.png';
const exclusiveTierIcon =
  'https://media.valorant-api.com/contenttiers/e046854e-406c-37f4-6607-19a9ba8426fc/displayicon.png';

const currencyIcon =
  'https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png';

// ── One sample per content tier, with a distinct weapon category for each
// so the tier accent color AND weapon-category width scaling both land in
// the same view. ────────────────────────────────────────────────────────
// `tierColor` takes the 8-char `#RRGGBBAA` hex Riot ships in
// `ContentTier.highlightColor`. The trailing `33` byte = ~20% alpha,
// which tints the image background and discount badge without
// overpowering the skin art — matches the in-game store look.
const select: OfferCardProps = {
  name: 'Immortalized Vandal',
  iconUrl: vandalChroma,
  tierIconUrl: selectTierIcon,
  tierColor: '5a9fe233',
  currencyIconUrl: currencyIcon,
  price: 1775,
  weaponCategory: 'EEquippableCategory::Rifle',
};

const deluxe: OfferCardProps = {
  name: 'Task Force 809 Frenzy',
  iconUrl: frenzyChroma,
  tierIconUrl: deluxeTierIcon,
  tierColor: '00958733',
  currencyIconUrl: currencyIcon,
  price: 1275,
  weaponCategory: 'EEquippableCategory::Sidearm',
};

const premium: OfferCardProps = {
  name: 'Valorant Go! Vol. 2 Operator',
  iconUrl: goOperatorChroma,
  tierIconUrl: premiumTierIcon,
  tierColor: 'd1548d33',
  currencyIconUrl: currencyIcon,
  price: 2175,
  discount: 25,
  weaponCategory: 'EEquippableCategory::Sniper',
};

const exclusive: OfferCardProps = {
  name: 'Doombringer Odin',
  iconUrl: doombringerChroma,
  tierIconUrl: exclusiveTierIcon,
  tierColor: 'f5955b33',
  currencyIconUrl: currencyIcon,
  price: 2475,
  weaponCategory: 'EEquippableCategory::Heavy',
};

const tiers = [select, deluxe, premium, exclusive];

const meta: Meta<typeof OfferCard> = {
  title: 'Blocks/OfferCard',
  component: OfferCard,
};

export default meta;
type Story = StoryObj<typeof OfferCard>;

export const LoadingList: Story = {
  args: { name: '', isLoading: true, variant: 'list' },
};

export const LoadingGrid: Story = {
  args: { name: '', isLoading: true, variant: 'grid' },
};

/**
 * Full catalog: list rows stacked on the left, 2×2 grid on the right.
 * Covers Rifle / Heavy / Sniper / Sidearm so the weapon-category width
 * scaling is visible, and a Sniper row carries the discount badge.
 */
export const Showcase: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  parameters: { viewport: { defaultViewport: 'desktop' } },
  args: { name: '', isLoading: false },
  render: ({ isLoading }) => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
      <View style={{ flex: 1, gap: 8 }}>
        {tiers.map((t, i) => (
          <OfferCard key={i} {...t} isLoading={isLoading} />
        ))}
      </View>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {tiers.map((t, i) => (
          <View key={i} style={{ width: '48%' }}>
            <OfferCard {...t} variant="grid" isLoading={isLoading} />
          </View>
        ))}
      </View>
    </View>
  ),
};
