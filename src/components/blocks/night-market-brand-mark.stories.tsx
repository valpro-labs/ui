import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { NightMarketBrandMark } from '@/components/blocks/night-market-brand-mark';

const meta: Meta<typeof NightMarketBrandMark> = {
  title: 'Blocks/NightMarketBrandMark',
  component: NightMarketBrandMark,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    size: { control: { type: 'number', min: 12, max: 96, step: 1 } },
  },
  args: {
    label: 'VALPRO',
    size: 32,
  },
};

export default meta;
type Story = StoryObj<typeof NightMarketBrandMark>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <NightMarketBrandMark label="VALPRO" size={24} />
      <NightMarketBrandMark label="VALPRO" size={36} />
      <NightMarketBrandMark label="VALPRO" size={52} />
    </View>
  ),
};

export const CustomLabel: Story = {
  args: {
    label: 'NIGHT MARKET',
    size: 30,
  },
};
