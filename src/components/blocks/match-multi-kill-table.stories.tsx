import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import {
  MatchMultiKillTable,
  type MatchMultiKillRow,
} from '@/components/blocks/match-multi-kill-table';
import { SectionTitle } from '@/components/blocks/section-title';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const jettAgent =
  'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png';
const phoenixAgent =
  'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png';
const sageAgent =
  'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png';
const omenAgent =
  'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png';
const killjoyAgent =
  'https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png';
const reynaAgent =
  'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png';
const viperAgent =
  'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png';
const breachAgent =
  'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png';
const cypherAgent =
  'https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png';
const sovaAgent =
  'https://media.valorant-api.com/agents/ded3520f-4264-bfed-162d-b080e2abccf9/displayicon.png';

const myTeam: MatchMultiKillRow[] = [
  {
    id: 'me',
    name: 'Rick#NA1',
    agentIconUrl: jettAgent,
    counts: { k2: 4, k3: 2, k4: 1, k5: 0 },
  },
  {
    id: 'ally-1',
    name: 'Alex#APAC',
    agentIconUrl: phoenixAgent,
    counts: { k2: 3, k3: 1, k4: 0, k5: 0 },
  },
  {
    id: 'ally-3',
    name: 'Sho#JP1',
    agentIconUrl: omenAgent,
    counts: { k2: 2, k3: 1, k4: 0, k5: 0 },
  },
  {
    id: 'ally-4',
    name: 'Mika#EU1',
    agentIconUrl: killjoyAgent,
    counts: { k2: 2, k3: 0, k4: 0, k5: 0 },
  },
  {
    id: 'ally-2',
    name: 'Tia#NA1',
    agentIconUrl: sageAgent,
    counts: { k2: 1, k3: 0, k4: 0, k5: 0 },
  },
];

const enemyTeam: MatchMultiKillRow[] = [
  {
    id: 'enemy-0',
    name: 'Mia#EU1',
    agentIconUrl: reynaAgent,
    counts: { k2: 3, k3: 2, k4: 0, k5: 0 },
  },
  {
    id: 'enemy-2',
    name: 'Sun#KR1',
    agentIconUrl: breachAgent,
    counts: { k2: 2, k3: 1, k4: 0, k5: 0 },
  },
  {
    id: 'enemy-1',
    name: 'Leo#BR1',
    agentIconUrl: viperAgent,
    counts: { k2: 2, k3: 0, k4: 0, k5: 0 },
  },
  {
    id: 'enemy-3',
    name: 'Val#NA1',
    agentIconUrl: cypherAgent,
    counts: { k2: 1, k3: 0, k4: 0, k5: 0 },
  },
  {
    id: 'enemy-4',
    name: 'Ren#TW1',
    agentIconUrl: sovaAgent,
    counts: { k2: 1, k3: 0, k4: 0, k5: 0 },
  },
];

const meta: Meta<typeof MatchMultiKillTable> = {
  title: 'Blocks/MatchMultiKillTable',
  component: MatchMultiKillTable,
};

export default meta;
type Story = StoryObj<typeof MatchMultiKillTable>;

export const MyTeam: Story = {
  args: {
    rows: myTeam,
  },
};

export const EnemyTeam: Story = {
  args: {
    rows: enemyTeam,
  },
};

/**
 * Row with an ace (5K) — rare enough to highlight as its own story so the
 * non-zero column treatment for each tier is easy to eyeball.
 */
export const WithAce: Story = {
  args: {
    rows: [
      {
        id: 'me',
        name: 'Rick#NA1',
        agentIconUrl: jettAgent,
        counts: { k2: 3, k3: 2, k4: 1, k5: 1 },
      },
      ...myTeam.slice(1),
    ],
  },
};

export const LocalisedLabels: Story = {
  args: {
    rows: myTeam,
    columnLabels: {
      player: '玩家',
      k2: '雙殺',
      k3: '三殺',
      k4: '四殺',
      k5: '五殺',
    },
  },
};

type Team = 'ally' | 'enemy';

const TEAM_TABS: { value: Team; label: string }[] = [
  { value: 'ally', label: 'Ally' },
  { value: 'enemy', label: 'Enemy' },
];

/**
 * Full composition used on the match-detail screen — `<SectionTitle>` with
 * an ally / enemy team tab, and the single table below swapping its rows to
 * match. Consumer owns the tab state and the row buckets.
 */
export const WithSectionHeader: Story = {
  render: () => {
    const [team, setTeam] = useState<Team>('ally');
    const rows = team === 'ally' ? myTeam : enemyTeam;

    return (
      <View>
        <SectionTitle
          title="Multi Kills"
          rightElement={
            <View className="bg-muted/50 flex-row rounded-full p-0.5">
              {TEAM_TABS.map((tab) => (
                <Pressable
                  key={tab.value}
                  onPress={() => setTeam(tab.value)}
                  className={cn(
                    'rounded-full px-3 py-1',
                    team === tab.value && 'bg-background'
                  )}>
                  <Text
                    className={cn(
                      'text-xs font-semibold',
                      team === tab.value ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                    {tab.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          }
        />
        <MatchMultiKillTable rows={rows} />
      </View>
    );
  },
};
