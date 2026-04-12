import type { Meta, StoryObj } from '@storybook/react';
import { ChartBar, Crosshair } from 'phosphor-react';
import * as React from 'react';
import { View } from 'react-native';

import { MatchCard } from '@/components/blocks/match-card';

const bindMap =
  'https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/listviewicon.png';
const havenMap =
  'https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/listviewicon.png';
const ascentMap =
  'https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/listviewicon.png';

const jettAgent =
  'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png';
const phoenixAgent =
  'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png';
const reynaAgent =
  'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png';

const competitiveMode =
  'https://media.valorant-api.com/gamemodes/96bd3920-4f36-d026-2b28-c683eb0bcac5/displayicon.png';
const deathmatchMode =
  'https://media.valorant-api.com/gamemodes/a8790ec5-4237-f2f0-e93b-08a8e89865b2/displayicon.png';

const ascendant1Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/largeicon.png';

function CrosshairIcon() {
  return <Crosshair size={18} weight="bold" color="#ede9e2" />;
}

function ScoreIcon() {
  return <ChartBar size={14} weight="fill" color="rgba(237,233,226,0.6)" />;
}

const meta: Meta<typeof MatchCard> = {
  title: 'Blocks/MatchCard',
  component: MatchCard,
  argTypes: {
    result: {
      control: { type: 'inline-radio' },
      options: ['win', 'loss', 'draw', 'placement'],
    },
    mmrChange: { control: { type: 'number', min: -50, max: 50, step: 1 } },
    myTeamScore: { control: { type: 'number', min: 0, max: 30, step: 1 } },
    enemyTeamScore: { control: { type: 'number', min: 0, max: 30, step: 1 } },
    score: { control: { type: 'number', min: 0, max: 10000, step: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof MatchCard>;

export const Victory: Story = {
  args: {
    mapIconUrl: bindMap,
    agentIconUrl: jettAgent,
    tierIconUrl: ascendant1Tier,
    mmrChange: 18,
    resultLabel: 'VICTORY',
    result: 'win',
    myTeamScore: 13,
    enemyTeamScore: 9,
    kda: '21/14/8',
    score: 4280,
    kdaIcon: <CrosshairIcon />,
    scoreIcon: <ScoreIcon />,
  },
};

export const Defeat: Story = {
  args: {
    ...Victory.args,
    mapIconUrl: havenMap,
    agentIconUrl: phoenixAgent,
    mmrChange: -22,
    resultLabel: 'DEFEAT',
    result: 'loss',
    myTeamScore: 7,
    enemyTeamScore: 13,
    kda: '12/16/4',
    score: 2940,
  },
};

export const Draw: Story = {
  args: {
    ...Victory.args,
    mapIconUrl: ascentMap,
    agentIconUrl: reynaAgent,
    mmrChange: 0,
    resultLabel: 'DRAW',
    result: 'draw',
    myTeamScore: 12,
    enemyTeamScore: 12,
    kda: '18/15/6',
    score: 3640,
  },
};

export const Unrated: Story = {
  args: {
    mapIconUrl: ascentMap,
    agentIconUrl: jettAgent,
    gameModeIconUrl: competitiveMode,
    resultLabel: 'VICTORY',
    result: 'win',
    myTeamScore: 13,
    enemyTeamScore: 10,
    kda: '19/12/5',
    score: 3920,
    kdaIcon: <CrosshairIcon />,
    scoreIcon: <ScoreIcon />,
  },
};

export const DeathmatchPlacement: Story = {
  args: {
    mapIconUrl: ascentMap,
    agentIconUrl: phoenixAgent,
    gameModeIconUrl: deathmatchMode,
    resultLabel: '2ND',
    result: 'placement',
    myTeamScore: 38,
    enemyTeamScore: 40,
    kda: '38/22/0',
    score: 0,
    kdaIcon: <CrosshairIcon />,
  },
};

export const NoMapBackground: Story = {
  args: {
    ...Victory.args,
    mapIconUrl: undefined,
  },
};

/**
 * Win / loss / draw / deathmatch in one frame so colour treatments and
 * icon-row layout can be compared at a glance.
 */
export const AllResults: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  parameters: { viewport: { defaultViewport: 'desktop' } },
  render: () => (
    <View style={{ gap: 8 }}>
      <MatchCard {...(Victory.args as React.ComponentProps<typeof MatchCard>)} />
      <MatchCard {...(Defeat.args as React.ComponentProps<typeof MatchCard>)} />
      <MatchCard {...(Draw.args as React.ComponentProps<typeof MatchCard>)} />
      <MatchCard {...(Unrated.args as React.ComponentProps<typeof MatchCard>)} />
      <MatchCard
        {...(DeathmatchPlacement.args as React.ComponentProps<typeof MatchCard>)}
      />
    </View>
  ),
};
