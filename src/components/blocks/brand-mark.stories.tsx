import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { BrandMark } from '@/components/blocks/brand-mark';

const meta: Meta<typeof BrandMark> = {
  title: 'Blocks/BrandMark',
  component: BrandMark,
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
type Story = StoryObj<typeof BrandMark>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <BrandMark label="VALPRO" size={24} />
      <BrandMark label="VALPRO" size={36} />
      <BrandMark label="VALPRO" size={52} />
    </View>
  ),
};

export const CustomLabel: Story = {
  args: {
    label: 'NIGHT MARKET',
    size: 30,
  },
};
