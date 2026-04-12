import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { RankCard } from '@/components/blocks/rank-card';

const diamond2Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/19/largeicon.png';
const ascendant1Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/largeicon.png';
const immortal3Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/26/largeicon.png';
const unrankedTier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/0/largeicon.png';

const meta: Meta<typeof RankCard> = {
  title: 'Blocks/RankCard',
  component: RankCard,
  decorators: [
    (Story) => (
      <View className="bg-card rounded-2xl px-4 py-3">
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
  },
};

export const Ascendant: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: ascendant1Tier,
    tierName: 'Ascendant 1',
    rankedRating: 12,
  },
};

export const Immortal: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: immortal3Tier,
    tierName: 'Immortal 3',
    rankedRating: 284,
  },
};

export const Unranked: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: unrankedTier,
    tierName: 'Unranked',
    rankedRating: 0,
  },
};

export const Loading: Story = {
  args: {
    seasonTitle: 'E11 A2',
    isLoading: true,
  },
};
