import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import {
  AccessoryCard,
  type AccessoryCardProps,
} from '@/components/blocks/accessory-card';

// ── Real Valorant asset URLs — from the public valorant-api.com CDN ─────
const sprayIcon =
  'https://media.valorant-api.com/sprays/7e2ba2e8-4597-060a-b41e-81acedca414e/displayicon.png';
const buddyIcon =
  'https://media.valorant-api.com/buddylevels/6c3b1a9e-4067-7ed6-fc6c-fea61e0a057c/displayicon.png';
const playerCardIcon =
  'https://media.valorant-api.com/playercards/c59b3a9b-467b-54b7-3e4d-a0a3107cbefe/largeart.png';

// Player titles ship as plain text in valorant-api (no displayIcon). Real apps
// render the `titleText` against a bundled title glyph; for Storybook we
// synthesize one with an inline SVG so `tinted` has something visible to tint.
const titleGlyph =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 40">' +
      '<text x="120" y="30" text-anchor="middle" font-family="Inter, sans-serif" ' +
      'font-size="28" font-weight="900" fill="#000">CHAMPION</text>' +
      '</svg>'
  );

const currencyIcon =
  'https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png';

// ── One sample per accessory type ───────────────────────────────────────
const spray: AccessoryCardProps = {
  name: "Abilities Don't Kill Spray",
  iconUrl: sprayIcon,
  currencyIconUrl: currencyIcon,
  price: 325,
};

const buddy: AccessoryCardProps = {
  name: '809 Buddy',
  iconUrl: buddyIcon,
  currencyIconUrl: currencyIcon,
  price: 475,
};

const playerCard: AccessoryCardProps = {
  name: 'Valorant Go! Vol. 1 Card',
  iconUrl: playerCardIcon,
  currencyIconUrl: currencyIcon,
  price: 1375,
};

const title: AccessoryCardProps = {
  name: 'Champion Title',
  iconUrl: titleGlyph,
  tinted: true,
  currencyIconUrl: currencyIcon,
  price: 900,
};

const accessories = [spray, buddy, playerCard, title];

const meta: Meta<typeof AccessoryCard> = {
  title: 'Blocks/AccessoryCard',
  component: AccessoryCard,
};

export default meta;
type Story = StoryObj<typeof AccessoryCard>;

/**
 * All four store accessory types together: list rows stacked on the left,
 * 2×2 grid on the right. Covers spray / buddy / player card / tinted title
 * glyph so the info-bar layout + `tinted` behavior are all visible at once.
 */
export const Showcase: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  parameters: { viewport: { defaultViewport: 'desktop' } },
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
      <View style={{ flex: 1, gap: 8 }}>
        {accessories.map((a, i) => (
          <AccessoryCard key={i} {...a} />
        ))}
      </View>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {accessories.map((a, i) => (
          <View key={i} style={{ width: '48%' }}>
            <AccessoryCard {...a} variant="grid" />
          </View>
        ))}
      </View>
    </View>
  ),
};
