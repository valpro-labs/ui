import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { RankPyramid, type RankPyramidTier } from '@/components/blocks/rank-pyramid';

const TIER_SET = '03621f52-342b-cf4e-4f86-9350a49c6d04';
function tier(n: number): RankPyramidTier {
  return {
    upIcon: `https://media.valorant-api.com/competitivetiers/${TIER_SET}/${n}/ranktriangleupicon.png`,
    downIcon: `https://media.valorant-api.com/competitivetiers/${TIER_SET}/${n}/ranktriangledownicon.png`,
  };
}

// Sorted high-to-low, matching the source app's ordering.
const diamondMix = [tier(20), tier(19), tier(19), tier(18), tier(18), tier(17)];
const highClimb = [tier(25), tier(24), tier(23), tier(22), tier(21), tier(20), tier(19), tier(18), tier(17)];

const meta: Meta<typeof RankPyramid> = {
  title: 'Blocks/RankPyramid',
  component: RankPyramid,
  decorators: [
    (Story) => (
      <View className="bg-card items-center justify-center rounded-2xl p-6">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RankPyramid>;

export const Default: Story = {
  args: {
    filledTiers: diamondMix,
    size: 80,
  },
};

export const Empty: Story = {
  args: {
    filledTiers: [],
    size: 80,
  },
};

export const PartiallyFilled: Story = {
  args: {
    filledTiers: diamondMix.slice(0, 3),
    size: 80,
  },
};

export const FullyFilled: Story = {
  args: {
    filledTiers: Array.from({ length: 9 }, () => tier(24)),
    size: 80,
  },
};

export const ExpandedByDefault: Story = {
  args: {
    filledTiers: highClimb,
    size: 120,
    defaultExpanded: true,
  },
};
