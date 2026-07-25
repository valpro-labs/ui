import type { Meta, StoryObj } from '@storybook/react';

import { NightMarketPolaroidPoster } from '@/components/blocks/night-market-polaroid-poster';
import type { NightMarketOffer } from '@/components/blocks/night-market-offer';

const offers: NightMarketOffer[] = [
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: 'Prime Vandal',
    iconUrl: 'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 1170,
    discountPercent: 34,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'EXCLUSIVE',
    tierColor: 'rgb(245, 149, 91)',
    name: 'Glitchpop Phantom',
    iconUrl: 'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 925,
    discountPercent: 48,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: 'Oni Guardian',
    iconUrl: 'https://media.valorant-api.com/weaponskinchromas/b8ddad9b-4622-3e0e-6821-56bf2e901bcf/fullrender.png',
    originalPrice: 1275,
    discountedPrice: 995,
    discountPercent: 22,
    weaponCategory: 'EEquippableCategory::Sidearm',
  },
  {
    tierLabel: 'PREMIUM', tierColor: 'rgb(209, 84, 141)', name: 'Champions Judge', iconUrl: 'https://media.valorant-api.com/weaponskinchromas/6d785ae8-4332-9946-e491-368a5fab442d/fullrender.png', originalPrice: 1775, discountedPrice: 1510, discountPercent: 15, weaponCategory: 'EEquippableCategory::Shotgun',
  },
  {
    tierLabel: 'EXCLUSIVE', tierColor: 'rgb(245, 149, 91)', name: 'Reaver Vandal', iconUrl: 'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png', originalPrice: 1775, discountedPrice: 888, discountPercent: 50, weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'PREMIUM', tierColor: 'rgb(209, 84, 141)', name: 'RGX Phantom', iconUrl: 'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png', originalPrice: 1775, discountedPrice: 1245, discountPercent: 30, weaponCategory: 'EEquippableCategory::Rifle',
  },
];

const meta: Meta<typeof NightMarketPolaroidPoster> = {
  title: 'Blocks/NightMarketPolaroidPoster',
  component: NightMarketPolaroidPoster,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'desktop' } },
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export default meta;
type Story = StoryObj<typeof NightMarketPolaroidPoster>;

export const Default: Story = {
  args: { offers, countdownValue: '72H 00M', playerTag: '@N0CT#TW1' },
};
