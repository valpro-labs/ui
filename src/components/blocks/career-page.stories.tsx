import type { Meta, StoryObj } from '@storybook/react';
import { CaretRight, ChartBar, Crosshair } from 'phosphor-react';
import { Pressable, ScrollView, View } from 'react-native';

import { MatchCard } from '@/components/blocks/match-card';
import { RankCard } from '@/components/blocks/rank-card';
import { type RankPyramidTier } from '@/components/blocks/rank-pyramid';
import { SectionTitle } from '@/components/blocks/section-title';
import { Text } from '@/components/ui/text';

const TIER_SET = '03621f52-342b-cf4e-4f86-9350a49c6d04';

function pyramidTier(n: number): RankPyramidTier {
  return {
    upIcon: `https://media.valorant-api.com/competitivetiers/${TIER_SET}/${n}/ranktriangleupicon.png`,
    downIcon: `https://media.valorant-api.com/competitivetiers/${TIER_SET}/${n}/ranktriangledownicon.png`,
  };
}

const ascendant1Tier = `https://media.valorant-api.com/competitivetiers/${TIER_SET}/21/largeicon.png`;

const BORDER_LEVEL_2 =
  'https://media.valorant-api.com/seasonborders/48bfd197-49c0-59bd-5833-ad9feff49516/displayicon.png';

const bindMap =
  'https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/listviewicon.png';
const havenMap =
  'https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/listviewicon.png';
const ascentMap =
  'https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/listviewicon.png';
const splitMap =
  'https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/listviewicon.png';

const jettAgent =
  'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png';
const phoenixAgent =
  'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png';
const reynaAgent =
  'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png';
const sageAgent =
  'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png';
const omenAgent =
  'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png';

const ascendant1TierSmall = `https://media.valorant-api.com/competitivetiers/${TIER_SET}/21/largeicon.png`;
const diamond3Tier = `https://media.valorant-api.com/competitivetiers/${TIER_SET}/20/largeicon.png`;
const diamond2Tier = `https://media.valorant-api.com/competitivetiers/${TIER_SET}/19/largeicon.png`;

function CrosshairIcon() {
  return <Crosshair size={18} weight="bold" color="#ede9e2" />;
}

function ScoreIcon() {
  return <ChartBar size={14} weight="fill" color="rgba(237,233,226,0.6)" />;
}

function Chevron() {
  return <CaretRight size={14} weight="bold" color="rgba(237,233,226,0.6)" />;
}

function QueueFilter() {
  return (
    <Pressable
      className="bg-muted/50 flex-row items-center gap-x-1 rounded-full px-3 py-1"
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
      <Text className="text-foreground text-xs font-semibold">All</Text>
      <CaretRight size={12} weight="bold" color="rgba(237,233,226,0.6)" />
    </Pressable>
  );
}

interface MatchFixture {
  id: string;
  mapUrl: string;
  agentUrl: string;
  tierUrl: string;
  mmrChange: number;
  resultLabel: string;
  result: 'win' | 'loss' | 'draw';
  myTeamScore: number;
  enemyTeamScore: number;
  kda: string;
  score: number;
}

const matches: MatchFixture[] = [
  {
    id: '1',
    mapUrl: ascentMap,
    agentUrl: jettAgent,
    tierUrl: ascendant1TierSmall,
    mmrChange: 18,
    resultLabel: 'VICTORY',
    result: 'win',
    myTeamScore: 13,
    enemyTeamScore: 9,
    kda: '21/14/8',
    score: 4280,
  },
  {
    id: '2',
    mapUrl: bindMap,
    agentUrl: phoenixAgent,
    tierUrl: diamond3Tier,
    mmrChange: -22,
    resultLabel: 'DEFEAT',
    result: 'loss',
    myTeamScore: 7,
    enemyTeamScore: 13,
    kda: '12/16/4',
    score: 2940,
  },
  {
    id: '3',
    mapUrl: havenMap,
    agentUrl: reynaAgent,
    tierUrl: diamond3Tier,
    mmrChange: 15,
    resultLabel: 'VICTORY',
    result: 'win',
    myTeamScore: 13,
    enemyTeamScore: 11,
    kda: '24/17/3',
    score: 4520,
  },
  {
    id: '4',
    mapUrl: splitMap,
    agentUrl: sageAgent,
    tierUrl: diamond2Tier,
    mmrChange: -19,
    resultLabel: 'DEFEAT',
    result: 'loss',
    myTeamScore: 10,
    enemyTeamScore: 13,
    kda: '8/14/11',
    score: 2610,
  },
  {
    id: '5',
    mapUrl: ascentMap,
    agentUrl: omenAgent,
    tierUrl: diamond2Tier,
    mmrChange: 0,
    resultLabel: 'DRAW',
    result: 'draw',
    myTeamScore: 12,
    enemyTeamScore: 12,
    kda: '15/15/9',
    score: 3210,
  },
];

const meta: Meta = {
  title: 'Pages/Career',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    isLoading: { control: 'boolean' },
  },
  args: { isLoading: false },
};

export default meta;
type Story = StoryObj<{ isLoading: boolean }>;

/**
 * Career tab composition: `<RankCard>` with the competitive season summary
 * on top, then the match-history list — one `<MatchCard>` per match. The
 * real screen adds a queue-filter dropdown in the header's right slot;
 * shown here as a static pill. Toggle `isLoading` in the controls panel
 * to swap the rank card + matches for their skeletons.
 */
export const Default: Story = {
  render: ({ isLoading }) => (
    <ScrollView className="bg-background flex-1">
      <View className="gap-y-4 px-4 pt-4">
        <View>
          <SectionTitle title="Rank" />
          <View className="bg-card overflow-hidden rounded-2xl">
            {isLoading ? (
              <RankCard
                seasonTitle="V26"
                actRankLabel="ACT RANK"
                isLoading
                filledTiers={[]}
              />
            ) : (
              <RankCard
                seasonTitle="V26"
                tierIcon={ascendant1Tier}
                tierName="Ascendant 1"
                rankedRating={47}
                rrLabel="RR"
                actRankLabel="ACT RANK"
                filledTiers={[
                  pyramidTier(22),
                  pyramidTier(22),
                  pyramidTier(21),
                  pyramidTier(21),
                  pyramidTier(20),
                ]}
                borderIcon={BORDER_LEVEL_2}
                chevron={<Chevron />}
                onPress={() => {}}
              />
            )}
          </View>
        </View>

        <SectionTitle
          title="Match History"
          rightElement={isLoading ? undefined : <QueueFilter />}
        />
      </View>
      <View className="gap-y-2 px-4 pb-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <MatchCard
                key={i}
                resultLabel=""
                myTeamScore={0}
                enemyTeamScore={0}
                kda=""
                isLoading
              />
            ))
          : matches.map((m) => (
              <MatchCard
                key={m.id}
                mapIconUrl={m.mapUrl}
                agentIconUrl={m.agentUrl}
                tierIconUrl={m.tierUrl}
                mmrChange={m.mmrChange}
                resultLabel={m.resultLabel}
                result={m.result}
                myTeamScore={m.myTeamScore}
                enemyTeamScore={m.enemyTeamScore}
                kda={m.kda}
                score={m.score}
                kdaIcon={<CrosshairIcon />}
                scoreIcon={<ScoreIcon />}
              />
            ))}
      </View>
    </ScrollView>
  ),
};
