import type { Meta, StoryObj } from '@storybook/react';
import { ChartBar } from 'phosphor-react';
import { View } from 'react-native';

import { PlayerRow } from '@/components/blocks/player-row';
import { Separator } from '@/components/ui/separator';

const jettAgent =
  'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png';
const phoenixAgent =
  'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png';
const reynaAgent =
  'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png';
const sageAgent =
  'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png';
const viperAgent =
  'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png';

const ascendant1Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/smallicon.png';
const diamond3Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/20/smallicon.png';
const platinum2Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/16/smallicon.png';

function ScoreIcon() {
  return <ChartBar size={12} weight="fill" color="rgba(0,0,0,0.5)" />;
}

const meta: Meta<typeof PlayerRow> = {
  title: 'Blocks/PlayerRow',
  component: PlayerRow,
  argTypes: {
    role: { control: { type: 'inline-radio' }, options: ['me', 'ally', 'enemy'] },
  },
  decorators: [
    (Story) => (
      <View className="bg-card overflow-hidden rounded-2xl">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PlayerRow>;

export const Me: Story = {
  args: {
    agentIconUrl: jettAgent,
    name: 'Rick#NA1',
    role: 'me',
    kda: '21/14/8',
    avgScore: 280,
    tierIconUrl: ascendant1Tier,
    scoreIcon: <ScoreIcon />,
  },
};

export const Ally: Story = {
  args: {
    agentIconUrl: phoenixAgent,
    name: 'Alex#APAC',
    role: 'ally',
    kda: '15/12/6',
    avgScore: 220,
    tierIconUrl: diamond3Tier,
    scoreIcon: <ScoreIcon />,
  },
};

export const Enemy: Story = {
  args: {
    agentIconUrl: reynaAgent,
    name: 'Mia#EU1',
    role: 'enemy',
    kda: '18/16/3',
    avgScore: 245,
    tierIconUrl: platinum2Tier,
    scoreIcon: <ScoreIcon />,
  },
};

export const NoTier: Story = {
  args: {
    agentIconUrl: viperAgent,
    name: 'Val#NA1',
    role: 'ally',
    kda: '10/8/4',
    avgScore: 180,
    scoreIcon: <ScoreIcon />,
  },
};

/**
 * Full scoreboard card — me + 4 allies on top, 5 enemies below, matching
 * how the match-detail screen stacks player rows inside a single rounded
 * card with separators between rows.
 */
export const Scoreboard: Story = {
  decorators: [],
  render: () => (
    <View className="bg-card overflow-hidden rounded-2xl">
      <PlayerRow
        agentIconUrl={jettAgent}
        name="Rick#NA1"
        role="me"
        kda="21/14/8"
        avgScore={280}
        tierIconUrl={ascendant1Tier}
        scoreIcon={<ScoreIcon />}
      />
      <Separator className="bg-black/50! dark:bg-black/30!" />
      <PlayerRow
        agentIconUrl={phoenixAgent}
        name="Alex#APAC"
        role="ally"
        kda="15/12/6"
        avgScore={220}
        tierIconUrl={diamond3Tier}
        scoreIcon={<ScoreIcon />}
      />
      <Separator className="bg-black/50! dark:bg-black/30!" />
      <PlayerRow
        agentIconUrl={sageAgent}
        name="Tia#NA1"
        role="ally"
        kda="8/11/14"
        avgScore={175}
        tierIconUrl={platinum2Tier}
        scoreIcon={<ScoreIcon />}
      />
      <Separator className="bg-black/50! dark:bg-black/30!" />
      <PlayerRow
        agentIconUrl={reynaAgent}
        name="Mia#EU1"
        role="enemy"
        kda="18/16/3"
        avgScore={245}
        tierIconUrl={platinum2Tier}
        scoreIcon={<ScoreIcon />}
      />
      <Separator className="bg-black/50! dark:bg-black/30!" />
      <PlayerRow
        agentIconUrl={viperAgent}
        name="Sho#JP1"
        role="enemy"
        kda="12/17/5"
        avgScore={190}
        tierIconUrl={diamond3Tier}
        scoreIcon={<ScoreIcon />}
      />
    </View>
  ),
};
