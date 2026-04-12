import type { Meta, StoryObj } from '@storybook/react';

import { Wallet } from '@/components/blocks/wallet';

// Real Valorant currency icons from valorant-api.com
const valorantPoints =
  'https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png';
const radianitePoints =
  'https://media.valorant-api.com/currencies/e59aa87c-4cbf-517a-5983-6e81511be9b7/displayicon.png';
const kingdomCredits =
  'https://media.valorant-api.com/currencies/85ca954a-41f2-ce94-9b45-8ca3dd39a00d/displayicon.png';

const sampleBalances = [
  { key: 'vp', iconUrl: valorantPoints, amount: 5175 },
  { key: 'rp', iconUrl: radianitePoints, amount: 420 },
  { key: 'kc', iconUrl: kingdomCredits, amount: 12850 },
];

const meta: Meta<typeof Wallet> = {
  title: 'Blocks/Wallet',
  component: Wallet,
};

export default meta;
type Story = StoryObj<typeof Wallet>;

export const Default: Story = {
  args: { balances: sampleBalances },
};

export const Loading: Story = {
  args: { balances: sampleBalances, isLoading: true },
};

export const Empty: Story = {
  args: {
    balances: [
      { key: 'vp', iconUrl: valorantPoints },
      { key: 'rp', iconUrl: radianitePoints },
      { key: 'kc', iconUrl: kingdomCredits },
    ],
  },
};

export const TwoCurrencies: Story = {
  args: {
    balances: [
      { key: 'vp', iconUrl: valorantPoints, amount: 2000 },
      { key: 'kc', iconUrl: kingdomCredits, amount: 9999 },
    ],
  },
};
