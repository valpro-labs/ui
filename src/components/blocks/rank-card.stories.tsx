import type { Meta, StoryObj } from '@storybook/react';
import { CaretRight, Shield } from 'phosphor-react';
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

const TIER_COLORS = {
  unranked: 'ffffffff',
  iron: '4f514fff',
  bronze: 'a5855dff',
  silver: 'bbc2c2ff',
  gold: 'eccf56ff',
  platinum: '59a9b6ff',
  diamond: 'b489c4ff',
  ascendant: '6ae2afff',
  immortal: 'bb3d65ff',
  radiant: 'ffffaaff',
} as const;

// Season border displayIcons from /v1/seasons/competitive (EpisodeV26-2_Act5).
// Tiers: L0=0 wins, L1=9, L2=25, L3=50, L5=100.
const BORDER_LEVEL_0 =
  'https://media.valorant-api.com/seasonborders/06289abe-489d-690b-edf1-51b9c063f3da/displayicon.png';
const BORDER_LEVEL_1 =
  'https://media.valorant-api.com/seasonborders/d3b30fbf-445e-0bce-bf98-b2b58e5807c6/displayicon.png';
const BORDER_LEVEL_2 =
  'https://media.valorant-api.com/seasonborders/48bfd197-49c0-59bd-5833-ad9feff49516/displayicon.png';
const BORDER_LEVEL_3 =
  'https://media.valorant-api.com/seasonborders/dc20c281-4086-c7aa-8420-9f851d0e44ed/displayicon.png';
const BORDER_LEVEL_5 =
  'https://media.valorant-api.com/seasonborders/ba974f74-4131-a4ba-378a-c9993b9edef0/displayicon.png';

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
    tier: 19,
    tierName: 'Diamond 2',
    tierColor: TIER_COLORS.diamond,
    rankedRating: 47,
    rrLabel: 'RR',
    rankProgress: { value: 47 },
    actRankLabel: 'ACT RANK',
    filledTiers: diamondMix,
    borderIcon: BORDER_LEVEL_1,
  },
};

export const Pressable: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: ascendant1Tier,
    tier: 21,
    tierName: 'Ascendant 1',
    tierColor: TIER_COLORS.ascendant,
    rankedRating: 12,
    rrLabel: 'RR',
    rankProgress: { value: 12 },
    actRankLabel: 'ACT RANK',
    filledTiers: ascendantMix,
    borderIcon: BORDER_LEVEL_2,
    chevron: <Chevron />,
    onPress: () => {},
  },
};

export const ProgressIcon: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: diamond2Tier,
    tier: 19,
    tierName: 'Diamond 2',
    tierColor: TIER_COLORS.diamond,
    rankedRating: 47,
    rrLabel: 'RR',
    rankProgress: { value: 47 },
    rankProgressIcon: (
      <Shield size={18} color="rgba(237,233,226,0.6)" style={{ transform: 'translateY(-1px)' }} />
    ),
    onRankProgressIconPress: () => {},
    actRankLabel: 'ACT RANK',
    filledTiers: diamondMix,
    borderIcon: BORDER_LEVEL_1,
  },
};

export const Immortal: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: immortal3Tier,
    tier: 26,
    tierName: 'Immortal 3',
    tierColor: TIER_COLORS.immortal,
    rankedRating: 284,
    rrLabel: 'RR',
    actRankLabel: 'ACT RANK',
    filledTiers: immortalClimb,
    borderIcon: BORDER_LEVEL_5,
    chevron: <Chevron />,
    onPress: () => {},
  },
};

export const Unranked: Story = {
  args: {
    seasonTitle: 'E11 A2',
    tierIcon: unrankedTier,
    tier: 0,
    tierName: 'Unranked',
    tierColor: TIER_COLORS.unranked,
    rankedRating: 0,
    rrLabel: 'RR',
    rankProgress: { value: 0 },
    actRankLabel: 'ACT RANK',
    filledTiers: [],
    borderIcon: BORDER_LEVEL_0,
  },
};

export const Loading: Story = {
  args: {
    seasonTitle: 'E11 A2',
    actRankLabel: 'ACT RANK',
    isLoading: true,
  },
};

const ALL_TIERS: ReadonlyArray<{ id: number; name: string }> = [
  { id: 3, name: 'Iron 1' },
  { id: 4, name: 'Iron 2' },
  { id: 5, name: 'Iron 3' },
  { id: 6, name: 'Bronze 1' },
  { id: 7, name: 'Bronze 2' },
  { id: 8, name: 'Bronze 3' },
  { id: 9, name: 'Silver 1' },
  { id: 10, name: 'Silver 2' },
  { id: 11, name: 'Silver 3' },
  { id: 12, name: 'Gold 1' },
  { id: 13, name: 'Gold 2' },
  { id: 14, name: 'Gold 3' },
  { id: 15, name: 'Platinum 1' },
  { id: 16, name: 'Platinum 2' },
  { id: 17, name: 'Platinum 3' },
  { id: 18, name: 'Diamond 1' },
  { id: 19, name: 'Diamond 2' },
  { id: 20, name: 'Diamond 3' },
  { id: 21, name: 'Ascendant 1' },
  { id: 22, name: 'Ascendant 2' },
  { id: 23, name: 'Ascendant 3' },
  { id: 24, name: 'Immortal 1' },
  { id: 25, name: 'Immortal 2' },
  { id: 26, name: 'Immortal 3' },
  { id: 27, name: 'Radiant' },
];

function borderForTier(id: number): string {
  if (id >= 24) return BORDER_LEVEL_5;
  if (id >= 18) return BORDER_LEVEL_3;
  if (id >= 12) return BORDER_LEVEL_2;
  if (id >= 6) return BORDER_LEVEL_1;
  return BORDER_LEVEL_0;
}

function colorForTier(id: number): string {
  if (id >= 27) return TIER_COLORS.radiant;
  if (id >= 24) return TIER_COLORS.immortal;
  if (id >= 21) return TIER_COLORS.ascendant;
  if (id >= 18) return TIER_COLORS.diamond;
  if (id >= 15) return TIER_COLORS.platinum;
  if (id >= 12) return TIER_COLORS.gold;
  if (id >= 9) return TIER_COLORS.silver;
  if (id >= 6) return TIER_COLORS.bronze;
  if (id >= 3) return TIER_COLORS.iron;
  return TIER_COLORS.unranked;
}

function progressForTier(id: number) {
  if (id >= 24) {
    return undefined;
  }

  return { value: 50 };
}

function ratingForTier(id: number): number {
  return id >= 24 ? 280 : 50;
}

export const AllTiers: Story = {
  render: () => (
    <View>
      {ALL_TIERS.map((t, i) => (
        <View key={t.id}>
          {i > 0 ? <View className="border-border/30 border-t" /> : null}
          <RankCard
            seasonTitle="E11 A2"
            tierIcon={`https://media.valorant-api.com/competitivetiers/${TIER_SET}/${t.id}/largeicon.png`}
            tier={t.id}
            tierName={t.name}
            tierColor={colorForTier(t.id)}
            rankedRating={ratingForTier(t.id)}
            rrLabel="RR"
            rankProgress={progressForTier(t.id)}
            actRankLabel="ACT RANK"
            filledTiers={[tier(t.id)]}
            borderIcon={borderForTier(t.id)}
          />
        </View>
      ))}
    </View>
  ),
};
