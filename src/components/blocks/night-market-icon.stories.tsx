import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
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

function CircleChip({ diameter, children }: { diameter: number; children: ReactNode }) {
  return (
    <View
      style={{
        width: diameter,
        height: diameter,
        borderRadius: diameter / 2,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
}

export const Default: Story = {
  render: () => (
    <CircleChip diameter={56}>
      <NightMarketIcon size={36} />
    </CircleChip>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <CircleChip diameter={40}>
        <NightMarketIcon size={26} />
      </CircleChip>
      <CircleChip diameter={56}>
        <NightMarketIcon size={36} />
      </CircleChip>
      <CircleChip diameter={72}>
        <NightMarketIcon size={46} />
      </CircleChip>
      <CircleChip diameter={96}>
        <NightMarketIcon size={62} />
      </CircleChip>
    </View>
  ),
};
