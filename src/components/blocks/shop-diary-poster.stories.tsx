import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import {
  ShopDiaryPoster,
  type ShopDiaryOffer,
} from '@/components/blocks/shop-diary-poster';

const OFFERS: ShopDiaryOffer[] = [
  {
    index: '01',
    tierColor: 'rgb(90, 159, 226)',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png',
    name: 'Immortalized Vandal',
    price: 1775,
    weaponCategory: 'EEquippableCategory::Rifle',
  },
  {
    index: '02',
    tierColor: 'rgb(0, 153, 135)',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/b8ddad9b-4622-3e0e-6821-56bf2e901bcf/fullrender.png',
    name: 'Task Force 809 Frenzy',
    price: 1275,
    weaponCategory: 'EEquippableCategory::Sidearm',
  },
  {
    index: '03',
    tierColor: 'rgb(209, 84, 141)',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png',
    name: 'Valorant Go! Vol. 2 Operator',
    price: 2175,
    weaponCategory: 'EEquippableCategory::Sniper',
  },
  {
    index: '04',
    tierColor: 'rgb(245, 149, 91)',
    iconUrl:
      'https://media.valorant-api.com/weaponskinchromas/6d785ae8-4332-9946-e491-368a5fab442d/fullrender.png',
    name: 'Doombringer Odin',
    price: 2475,
    weaponCategory: 'EEquippableCategory::Heavy',
  },
];

const meta: Meta<typeof ShopDiaryPoster> = {
  title: 'Blocks/ShopDiaryPoster',
  component: ShopDiaryPoster,
  parameters: { layout: 'centered' },
  args: {
    offers: OFFERS,
    brandLabel: 'VALPRO',
    issueLabel: 'Daily Offer',
    dateLabel: 'APR 23 · 2026',
  },
};

export default meta;
type Story = StoryObj<typeof ShopDiaryPoster>;

/**
 * Full 1080×1920 share poster wrapping today's four daily offers.
 * Offer data (names, prices, chroma URLs, tier colors) mirrors
 * `Pages/Store` so the same skins appear across stories.
 */
export const Default: Story = {};
