import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { NightMarketIcon } from '@/components/blocks/night-market-icon';

const meta: Meta<typeof NightMarketIcon> = {
  title: 'Blocks/NightMarketIcon',
  component: NightMarketIcon,
  argTypes: {
    size: { control: { type: 'number' } },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof NightMarketIcon>;

export const Default: Story = {
  args: { size: 36 },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <NightMarketIcon size={24} />
      <NightMarketIcon size={36} />
      <NightMarketIcon size={54} />
      <NightMarketIcon size={80} />
    </View>
  ),
};
