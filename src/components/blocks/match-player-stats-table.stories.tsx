import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import {
  MatchPlayerStatsTable,
  type MatchPlayerStatsRow,
} from '@/components/blocks/match-player-stats-table';
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

type Side = 'both' | 'atk' | 'def';

interface BucketedRow extends Omit<MatchPlayerStatsRow, 'kd' | 'fk' | 'fd' | 'adr' | 'kast'> {
  both: Pick<MatchPlayerStatsRow, 'kd' | 'fk' | 'fd' | 'adr' | 'kast'>;
  atk: Pick<MatchPlayerStatsRow, 'kd' | 'fk' | 'fd' | 'adr' | 'kast'>;
  def: Pick<MatchPlayerStatsRow, 'kd' | 'fk' | 'fd' | 'adr' | 'kast'>;
}

const myTeam: BucketedRow[] = [
  {
    id: 'me',
    name: 'Rick#NA1',
    agentIconUrl: jettAgent,
    both: { kd: '21-14', fk: '4', fd: '2', adr: '186', kast: '78%' },
    atk: { kd: '12-8', fk: '3', fd: '1', adr: '198', kast: '82%' },
    def: { kd: '9-6', fk: '1', fd: '1', adr: '172', kast: '73%' },
  },
  {
    id: 'ally-1',
    name: 'Alex#APAC',
    agentIconUrl: phoenixAgent,
    both: { kd: '15-12', fk: '2', fd: '3', adr: '148', kast: '68%' },
    atk: { kd: '8-7', fk: '1', fd: '2', adr: '158', kast: '70%' },
    def: { kd: '7-5', fk: '1', fd: '1', adr: '136', kast: '65%' },
  },
  {
    id: 'ally-2',
    name: 'Tia#NA1',
    agentIconUrl: sageAgent,
    both: { kd: '8-11', fk: '0', fd: '2', adr: '92', kast: '72%' },
    atk: { kd: '4-6', fk: '0', fd: '1', adr: '88', kast: '70%' },
    def: { kd: '4-5', fk: '0', fd: '1', adr: '96', kast: '75%' },
  },
  {
    id: 'ally-3',
    name: 'Sho#JP1',
    agentIconUrl: omenAgent,
    both: { kd: '14-13', fk: '1', fd: '2', adr: '132', kast: '66%' },
    atk: { kd: '7-6', fk: '1', fd: '1', adr: '140', kast: '68%' },
    def: { kd: '7-7', fk: '0', fd: '1', adr: '122', kast: '64%' },
  },
  {
    id: 'ally-4',
    name: 'Mika#EU1',
    agentIconUrl: killjoyAgent,
    both: { kd: '10-10', fk: '1', fd: '1', adr: '118', kast: '70%' },
    atk: { kd: '4-5', fk: '0', fd: '1', adr: '104', kast: '65%' },
    def: { kd: '6-5', fk: '1', fd: '0', adr: '130', kast: '75%' },
  },
];

const enemyTeam: BucketedRow[] = [
  {
    id: 'enemy-0',
    name: 'Mia#EU1',
    agentIconUrl: reynaAgent,
    both: { kd: '18-16', fk: '3', fd: '2', adr: '162', kast: '70%' },
    atk: { kd: '10-9', fk: '2', fd: '1', adr: '170', kast: '72%' },
    def: { kd: '8-7', fk: '1', fd: '1', adr: '152', kast: '68%' },
  },
  {
    id: 'enemy-1',
    name: 'Leo#BR1',
    agentIconUrl: viperAgent,
    both: { kd: '12-17', fk: '1', fd: '3', adr: '128', kast: '60%' },
    atk: { kd: '6-9', fk: '1', fd: '2', adr: '122', kast: '58%' },
    def: { kd: '6-8', fk: '0', fd: '1', adr: '134', kast: '62%' },
  },
  {
    id: 'enemy-2',
    name: 'Sun#KR1',
    agentIconUrl: breachAgent,
    both: { kd: '13-14', fk: '2', fd: '2', adr: '140', kast: '68%' },
    atk: { kd: '6-7', fk: '1', fd: '1', adr: '130', kast: '65%' },
    def: { kd: '7-7', fk: '1', fd: '1', adr: '152', kast: '70%' },
  },
  {
    id: 'enemy-3',
    name: 'Val#NA1',
    agentIconUrl: cypherAgent,
    both: { kd: '11-15', fk: '0', fd: '2', adr: '110', kast: '58%' },
    atk: { kd: '5-8', fk: '0', fd: '1', adr: '100', kast: '55%' },
    def: { kd: '6-7', fk: '0', fd: '1', adr: '120', kast: '62%' },
  },
  {
    id: 'enemy-4',
    name: 'Ren#TW1',
    agentIconUrl: sovaAgent,
    both: { kd: '9-14', fk: '1', fd: '3', adr: '102', kast: '55%' },
    atk: { kd: '4-7', fk: '1', fd: '2', adr: '96', kast: '52%' },
    def: { kd: '5-7', fk: '0', fd: '1', adr: '108', kast: '58%' },
  },
];

function pickSide(rows: BucketedRow[], side: Side): MatchPlayerStatsRow[] {
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    agentIconUrl: r.agentIconUrl,
    ...r[side],
  }));
}

const meta: Meta<typeof MatchPlayerStatsTable> = {
  title: 'Blocks/MatchPlayerStatsTable',
  component: MatchPlayerStatsTable,
};

export default meta;
type Story = StoryObj<typeof MatchPlayerStatsTable>;

export const MyTeam: Story = {
  args: {
    rows: pickSide(myTeam, 'both'),
  },
};

export const EnemyTeam: Story = {
  args: {
    rows: pickSide(enemyTeam, 'both'),
  },
};

export const LocalisedLabels: Story = {
  args: {
    rows: pickSide(myTeam, 'both'),
    columnLabels: {
      player: '玩家',
      kd: '擊殺－死亡',
      fk: '首殺',
      fd: '首死',
      adr: '場傷',
      kast: 'KAST',
    },
  },
};

/**
 * Deathmatch variant — every player in a single table with no attack /
 * defense split and `—` placeholders in the K–D column where rounds don't
 * apply.
 */
export const Deathmatch: Story = {
  args: {
    rows: [
      {
        id: 'p-1',
        name: 'Rick#NA1',
        agentIconUrl: jettAgent,
        kd: '38-22',
        fk: '—',
        fd: '—',
        adr: '—',
        kast: '—',
      },
      {
        id: 'p-2',
        name: 'Alex#APAC',
        agentIconUrl: phoenixAgent,
        kd: '34-28',
        fk: '—',
        fd: '—',
        adr: '—',
        kast: '—',
      },
      {
        id: 'p-3',
        name: 'Tia#NA1',
        agentIconUrl: sageAgent,
        kd: '29-30',
        fk: '—',
        fd: '—',
        adr: '—',
        kast: '—',
      },
    ],
  },
};

const SIDE_TABS: { value: Side; label: string }[] = [
  { value: 'both', label: 'Both' },
  { value: 'atk', label: 'Attack' },
  { value: 'def', label: 'Defense' },
];

/**
 * Full composition used on the match-detail screen — section header with an
 * attack / defense filter, then two stacked tables (my team, enemy team).
 * Consumer owns the filter state and picks the appropriate pre-formatted
 * bucket.
 */
export const Scoreboard: Story = {
  render: () => {
    const [side, setSide] = useState<Side>('both');

    return (
      <View className="gap-y-4">
        <View>
          <SectionTitle
            title="Player Stats"
            rightElement={
              <View className="bg-muted/50 flex-row rounded-full p-0.5">
                {SIDE_TABS.map((tab) => (
                  <Pressable
                    key={tab.value}
                    onPress={() => setSide(tab.value)}
                    className={cn(
                      'rounded-full px-3 py-1',
                      side === tab.value && 'bg-background'
                    )}>
                    <Text
                      className={cn(
                        'text-xs font-semibold',
                        side === tab.value ? 'text-foreground' : 'text-muted-foreground'
                      )}>
                      {tab.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            }
          />
          <MatchPlayerStatsTable rows={pickSide(myTeam, side)} />
        </View>
        <MatchPlayerStatsTable rows={pickSide(enemyTeam, side)} />
      </View>
    );
  },
};
