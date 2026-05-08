import type { Meta, StoryObj } from '@storybook/react';

import { NightMarketPoster } from '@/components/blocks/night-market-poster';

const meta: Meta<typeof NightMarketPoster> = {
  title: 'Blocks/NightMarketPoster',
  component: NightMarketPoster,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NightMarketPoster>;

const offers = [
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: 'Prime Vandal',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 1170,
    discountPercent: 34,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'EXCLUSIVE',
    tierColor: 'rgb(245, 149, 91)',
    name: 'Reaver Phantom',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 925,
    discountPercent: 48,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: 'Oni Guardian',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/b8ddad9b-4622-3e0e-6821-56bf2e901bcf/fullrender.png',
    originalPrice: 1275,
    discountedPrice: 995,
    discountPercent: 22,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: 'Glitchpop Judge',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/6d785ae8-4332-9946-e491-368a5fab442d/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 1510,
    discountPercent: 15,
    weaponCategory: 'EEquippableCategory::Shotgun',
  },
  {
    tierLabel: 'EXCLUSIVE',
    tierColor: 'rgb(245, 149, 91)',
    name: 'Reaver Vandal',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 888,
    discountPercent: 50,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    tierLabel: 'PREMIUM',
    tierColor: 'rgb(209, 84, 141)',
    name: 'Prime Phantom',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png',
    originalPrice: 1775,
    discountedPrice: 1245,
    discountPercent: 30,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
];

export const Default: Story = {
  args: {
    offers,
    countdownValue: '72H 00M',
    playerTag: '@N0CT#TW1',
  },
};
