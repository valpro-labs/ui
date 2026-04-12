import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { BundleCard, type BundleCardProps } from '@/components/blocks/bundle-card';
import { Text } from '@/components/ui/text';

// ── Real Valorant bundle art from the public valorant-api.com CDN ────────
const rgx =
  'https://media.valorant-api.com/bundles/35815cab-429d-79e4-43f5-e0af8fdac22b/displayicon.png';
const altitude =
  'https://media.valorant-api.com/bundles/a4937ee9-4148-8ff2-2c11-c28891880306/displayicon.png';
const xenohunter =
  'https://media.valorant-api.com/bundles/3941ad01-4e3b-46e0-ba3a-ab94f7c67f98/displayicon.png';
const rgxAlt =
  'https://media.valorant-api.com/bundles/d958b181-4e7b-dc60-7c3c-e3a3a376a8d2/displayicon.png';

const currencyIcon =
  'https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png';

const rgxBundle: BundleCardProps = {
  name: 'RGX 11z Pro',
  iconUrl: rgx,
  currencyIconUrl: currencyIcon,
  price: 8700,
  countdownText: '2d 14h',
};

const altitudeBundle: BundleCardProps = {
  name: 'Altitude',
  iconUrl: altitude,
  currencyIconUrl: currencyIcon,
  price: 7440,
  countdownText: '5d 8h',
};

const xenohunterBundle: BundleCardProps = {
  name: 'Xenohunter',
  iconUrl: xenohunter,
  currencyIconUrl: currencyIcon,
  price: 8220,
};

const rgxAltBundle: BundleCardProps = {
  name: 'RGX 11z Pro (Alt)',
  iconUrl: rgxAlt,
  currencyIconUrl: currencyIcon,
  price: 8700,
  countdownText: '12h 30m',
};

const missingBundle: BundleCardProps = {
  name: 'Unknown Bundle',
  price: 0,
  missingFallback: <Text className="text-muted-foreground text-2xl font-bold">?</Text>,
};

const meta: Meta<typeof BundleCard> = {
  title: 'Blocks/BundleCard',
  component: BundleCard,
};

export default meta;
type Story = StoryObj<typeof BundleCard>;

/**
 * Full catalog: list rows stacked on the left, 2×2 grid on the right.
 * Includes a countdown-less bundle and the missing-art fallback so the
 * variants all land in one view.
 */
export const Showcase: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  parameters: { viewport: { defaultViewport: 'desktop' } },
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
      <View style={{ flex: 1, gap: 8 }}>
        <BundleCard {...rgxBundle} />
        <BundleCard {...altitudeBundle} />
        <BundleCard {...xenohunterBundle} />
        <BundleCard {...missingBundle} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <View style={{ width: '48%' }}>
          <BundleCard {...rgxBundle} variant="grid" />
        </View>
        <View style={{ width: '48%' }}>
          <BundleCard {...altitudeBundle} variant="grid" />
        </View>
        <View style={{ width: '48%' }}>
          <BundleCard {...xenohunterBundle} variant="grid" />
        </View>
        <View style={{ width: '48%' }}>
          <BundleCard {...rgxAltBundle} variant="grid" />
        </View>
      </View>
    </View>
  ),
};
