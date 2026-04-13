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

// Season border displayIcons from /v1/seasons/competitive (EpisodeV26-2_Act5).
// Tiers: L0=0 wins, L1=9, L2=25, L3=50, L5=100.
const BORDER_LEVEL_0 =
  'https://media.valorant-api.com/seasonborders/06289abe-489d-690b-edf1-51b9c063f3da/displayicon.png';
const BORDER_LEVEL_1 =
  'https://media.valorant-api.com/seasonborders/d3b30fbf-445e-0bce-bf98-b2b58e5807c6/displayicon.png';
const BORDER_LEVEL_3 =
  'https://media.valorant-api.com/seasonborders/dc20c281-4086-c7aa-8420-9f851d0e44ed/displayicon.png';
const BORDER_LEVEL_5 =
  'https://media.valorant-api.com/seasonborders/ba974f74-4131-a4ba-378a-c9993b9edef0/displayicon.png';

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
    borderIcon: BORDER_LEVEL_1,
    size: 80,
  },
};

export const Empty: Story = {
  args: {
    filledTiers: [],
    borderIcon: BORDER_LEVEL_0,
    size: 80,
  },
};

export const PartiallyFilled: Story = {
  args: {
    filledTiers: diamondMix.slice(0, 3),
    borderIcon: BORDER_LEVEL_1,
    size: 80,
  },
};

export const FullyFilled: Story = {
  args: {
    filledTiers: Array.from({ length: 9 }, () => tier(24)),
    borderIcon: BORDER_LEVEL_3,
    size: 80,
  },
};

export const ExpandedByDefault: Story = {
  args: {
    filledTiers: highClimb,
    borderIcon: BORDER_LEVEL_5,
    size: 120,
    defaultExpanded: true,
  },
};
