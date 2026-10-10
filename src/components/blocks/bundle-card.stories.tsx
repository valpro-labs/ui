import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { BundleCard, type BundleCardProps } from '@/components/blocks/bundle-card';
import { Text } from '@/components/ui/text';

// ── Real Valorant bundle art from the public valorant-api.com CDN ────────
const champions2026 =
  'https://media.valorant-api.com/bundles/82a19267-4739-d2d0-2a6a-5db2e69e3d89/displayicon.png';
const altitude =
  'https://media.valorant-api.com/bundles/a4937ee9-4148-8ff2-2c11-c28891880306/displayicon.png';
const xenohunter =
  'https://media.valorant-api.com/bundles/3941ad01-4e3b-46e0-ba3a-ab94f7c67f98/displayicon.png';
const rgxAlt =
  'https://media.valorant-api.com/bundles/d958b181-4e7b-dc60-7c3c-e3a3a376a8d2/displayicon.png';

const currencyIcon =
  'https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png';

const champions2026Bundle: BundleCardProps = {
  name: 'Champions 2026',
  iconUrl: champions2026,
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

export const Loading: Story = {
  args: { isLoading: true },
};

/**
 * Full catalog: list rows stacked on the left, 2×2 grid on the right.
 * Includes a countdown-less bundle and the missing-art fallback so the
 * variants all land in one view.
 */
export const Showcase: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  parameters: { viewport: { defaultViewport: 'desktop' } },
  args: { isLoading: false },
  render: ({ isLoading }) => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
      <View style={{ flex: 1, gap: 8 }}>
        <BundleCard {...champions2026Bundle} isLoading={isLoading} />
        <BundleCard {...altitudeBundle} isLoading={isLoading} />
        <BundleCard {...xenohunterBundle} isLoading={isLoading} />
        <BundleCard {...missingBundle} isLoading={isLoading} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <View style={{ width: '48%' }}>
          <BundleCard {...champions2026Bundle} variant="grid" isLoading={isLoading} />
        </View>
        <View style={{ width: '48%' }}>
          <BundleCard {...altitudeBundle} variant="grid" isLoading={isLoading} />
        </View>
        <View style={{ width: '48%' }}>
          <BundleCard {...xenohunterBundle} variant="grid" isLoading={isLoading} />
        </View>
        <View style={{ width: '48%' }}>
          <BundleCard {...rgxAltBundle} variant="grid" isLoading={isLoading} />
        </View>
      </View>
    </View>
  ),
};
