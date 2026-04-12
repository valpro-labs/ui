import type { Meta, StoryObj } from '@storybook/react';
import { CaretRight } from 'phosphor-react';
import { View } from 'react-native';

import { RankCard } from '@/components/blocks/rank-card';
import { type RankPyramidTier } from '@/components/blocks/rank-pyramid';

const TIER_SET = '03621f52-342b-cf4e-4f86-9350a49c6d04';

function tier(n: number): RankPyramidTier {
  return {
    upIcon: `https://media.valorant-api.com/competitivetiers/${TIER_SET}/${n}/ranktriangleupicon.png`,
    downIcon: `https://media.valorant-api.com/competitivetiers/${TIER_SET}/${n}/ranktriangledownicon.png`,
  };
}

const diamond2Tier = `https://media.valorant-api.com/competitivetiers/${TIER_SET}/19/largeicon.png`;
const ascendant1Tier = `https://media.valorant-api.com/competitivetiers/${TIER_SET}/21/largeicon.png`;
const immortal3Tier = `https://media.valorant-api.com/competitivetiers/${TIER_SET}/26/largeicon.png`;
const unrankedTier = `https://media.valorant-api.com/competitivetiers/${TIER_SET}/0/largeicon.png`;

const diamondMix = [tier(20), tier(19), tier(19), tier(18), tier(18), tier(17)];
const ascendantMix = [tier(22), tier(22), tier(21), tier(21), tier(20)];
const immortalClimb = [tier(26), tier(25), tier(25), tier(24), tier(24), tier(23), tier(22)];

function Chevron() {
  return <CaretRight size={14} weight="bold" color="rgba(237,233,226,0.6)" />;
}

const meta: Meta<typeof RankCard> = {
  title: 'Blocks/RankCard',
  component: RankCard,
  decorators: [
    (Story) => (
      <View className="bg-card overflow-hidden rounded-2xl">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RankCard>;

export const Default: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: diamond2Tier,
    tierName: 'Diamond 2',
    rankedRating: 47,
    rrLabel: 'RR',
    actRankLabel: 'ACT RANK',
    filledTiers: diamondMix,
  },
};

export const Pressable: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: ascendant1Tier,
    tierName: 'Ascendant 1',
    rankedRating: 12,
    rrLabel: 'RR',
    actRankLabel: 'ACT RANK',
    filledTiers: ascendantMix,
    chevron: <Chevron />,
    onPress: () => {},
  },
};

export const Immortal: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: immortal3Tier,
    tierName: 'Immortal 3',
    rankedRating: 284,
    rrLabel: 'RR',
    actRankLabel: 'ACT RANK',
    filledTiers: immortalClimb,
    chevron: <Chevron />,
    onPress: () => {},
  },
};

export const Unranked: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: unrankedTier,
    tierName: 'Unranked',
    rankedRating: 0,
    rrLabel: 'RR',
    actRankLabel: 'ACT RANK',
    filledTiers: [],
  },
};

export const Loading: Story = {
  args: {
    seasonTitle: 'E11 A2',
    actRankLabel: 'ACT RANK',
    isLoading: true,
  },
};
