import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import {
  MatchPlayerStatsTable,
  type MatchPlayerStatsColumn,
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
type Mode = 'kda' | 'combat';

interface BucketValues {
  // KDA mode
  kills: string;
  deaths: string;
  assists: string;
  plusMinus: string;
  kdRatio: string;
  // Combat mode
  fk: string;
  fd: string;
  acs: string;
  hs: string;
  kast: string;
}

interface BucketedRow {
  id: string;
  name: string;
  agentIconUrl: string;
  isCurrentPlayer?: boolean;
  both: BucketValues;
  atk: BucketValues;
  def: BucketValues;
}

const myTeam: BucketedRow[] = [
  {
    id: 'me',
    name: 'Rick#NA1',
    agentIconUrl: jettAgent,
    isCurrentPlayer: true,
    both: { kills: '21', deaths: '14', assists: '8', plusMinus: '+7', kdRatio: '1.50', fk: '4', fd: '2', acs: '280', hs: '32%', kast: '78%' },
    atk: { kills: '12', deaths: '8', assists: '5', plusMinus: '+4', kdRatio: '1.50', fk: '3', fd: '1', acs: '298', hs: '34%', kast: '82%' },
    def: { kills: '9', deaths: '6', assists: '3', plusMinus: '+3', kdRatio: '1.50', fk: '1', fd: '1', acs: '262', hs: '30%', kast: '73%' },
  },
  {
    id: 'ally-1',
    name: 'Alex#APAC',
    agentIconUrl: phoenixAgent,
    both: { kills: '15', deaths: '12', assists: '6', plusMinus: '+3', kdRatio: '1.25', fk: '2', fd: '3', acs: '220', hs: '24%', kast: '68%' },
    atk: { kills: '8', deaths: '7', assists: '3', plusMinus: '+1', kdRatio: '1.14', fk: '1', fd: '2', acs: '232', hs: '26%', kast: '70%' },
    def: { kills: '7', deaths: '5', assists: '3', plusMinus: '+2', kdRatio: '1.40', fk: '1', fd: '1', acs: '208', hs: '22%', kast: '65%' },
  },
  {
    id: 'ally-3',
    name: 'Sho#JP1',
    agentIconUrl: omenAgent,
    both: { kills: '14', deaths: '13', assists: '9', plusMinus: '+1', kdRatio: '1.08', fk: '1', fd: '2', acs: '235', hs: '20%', kast: '66%' },
    atk: { kills: '7', deaths: '6', assists: '5', plusMinus: '+1', kdRatio: '1.17', fk: '1', fd: '1', acs: '242', hs: '21%', kast: '68%' },
    def: { kills: '7', deaths: '7', assists: '4', plusMinus: '0', kdRatio: '1.00', fk: '0', fd: '1', acs: '228', hs: '19%', kast: '64%' },
  },
  {
    id: 'ally-4',
    name: 'Mika#EU1',
    agentIconUrl: killjoyAgent,
    both: { kills: '10', deaths: '10', assists: '5', plusMinus: '0', kdRatio: '1.00', fk: '1', fd: '1', acs: '198', hs: '18%', kast: '70%' },
    atk: { kills: '4', deaths: '5', assists: '2', plusMinus: '-1', kdRatio: '0.80', fk: '0', fd: '1', acs: '174', hs: '15%', kast: '65%' },
    def: { kills: '6', deaths: '5', assists: '3', plusMinus: '+1', kdRatio: '1.20', fk: '1', fd: '0', acs: '218', hs: '20%', kast: '75%' },
  },
  {
    id: 'ally-2',
    name: 'Tia#NA1',
    agentIconUrl: sageAgent,
    both: { kills: '8', deaths: '11', assists: '14', plusMinus: '-3', kdRatio: '0.73', fk: '0', fd: '2', acs: '175', hs: '16%', kast: '72%' },
    atk: { kills: '4', deaths: '6', assists: '7', plusMinus: '-2', kdRatio: '0.67', fk: '0', fd: '1', acs: '162', hs: '14%', kast: '70%' },
    def: { kills: '4', deaths: '5', assists: '7', plusMinus: '-1', kdRatio: '0.80', fk: '0', fd: '1', acs: '188', hs: '18%', kast: '75%' },
  },
];

const enemyTeam: BucketedRow[] = [
  {
    id: 'enemy-0',
    name: 'Mia#EU1',
    agentIconUrl: reynaAgent,
    both: { kills: '18', deaths: '16', assists: '3', plusMinus: '+2', kdRatio: '1.13', fk: '3', fd: '2', acs: '245', hs: '28%', kast: '70%' },
    atk: { kills: '10', deaths: '9', assists: '2', plusMinus: '+1', kdRatio: '1.11', fk: '2', fd: '1', acs: '258', hs: '30%', kast: '72%' },
    def: { kills: '8', deaths: '7', assists: '1', plusMinus: '+1', kdRatio: '1.14', fk: '1', fd: '1', acs: '232', hs: '26%', kast: '68%' },
  },
  {
    id: 'enemy-2',
    name: 'Sun#KR1',
    agentIconUrl: breachAgent,
    both: { kills: '13', deaths: '14', assists: '7', plusMinus: '-1', kdRatio: '0.93', fk: '2', fd: '2', acs: '212', hs: '22%', kast: '68%' },
    atk: { kills: '6', deaths: '7', assists: '4', plusMinus: '-1', kdRatio: '0.86', fk: '1', fd: '1', acs: '198', hs: '20%', kast: '65%' },
    def: { kills: '7', deaths: '7', assists: '3', plusMinus: '0', kdRatio: '1.00', fk: '1', fd: '1', acs: '226', hs: '24%', kast: '70%' },
  },
  {
    id: 'enemy-1',
    name: 'Leo#BR1',
    agentIconUrl: viperAgent,
    both: { kills: '12', deaths: '17', assists: '5', plusMinus: '-5', kdRatio: '0.71', fk: '1', fd: '3', acs: '190', hs: '15%', kast: '60%' },
    atk: { kills: '6', deaths: '9', assists: '3', plusMinus: '-3', kdRatio: '0.67', fk: '1', fd: '2', acs: '178', hs: '13%', kast: '58%' },
    def: { kills: '6', deaths: '8', assists: '2', plusMinus: '-2', kdRatio: '0.75', fk: '0', fd: '1', acs: '202', hs: '17%', kast: '62%' },
  },
  {
    id: 'enemy-3',
    name: 'Val#NA1',
    agentIconUrl: cypherAgent,
    both: { kills: '11', deaths: '15', assists: '4', plusMinus: '-4', kdRatio: '0.73', fk: '0', fd: '2', acs: '172', hs: '14%', kast: '58%' },
    atk: { kills: '5', deaths: '8', assists: '2', plusMinus: '-3', kdRatio: '0.63', fk: '0', fd: '1', acs: '158', hs: '12%', kast: '55%' },
    def: { kills: '6', deaths: '7', assists: '2', plusMinus: '-1', kdRatio: '0.86', fk: '0', fd: '1', acs: '186', hs: '16%', kast: '62%' },
  },
  {
    id: 'enemy-4',
    name: 'Ren#TW1',
    agentIconUrl: sovaAgent,
    both: { kills: '9', deaths: '14', assists: '11', plusMinus: '-5', kdRatio: '0.64', fk: '1', fd: '3', acs: '168', hs: '13%', kast: '55%' },
    atk: { kills: '4', deaths: '7', assists: '5', plusMinus: '-3', kdRatio: '0.57', fk: '1', fd: '2', acs: '152', hs: '11%', kast: '52%' },
    def: { kills: '5', deaths: '7', assists: '6', plusMinus: '-2', kdRatio: '0.71', fk: '0', fd: '1', acs: '184', hs: '15%', kast: '58%' },
  },
];

const COLUMNS_BY_MODE: Record<Mode, MatchPlayerStatsColumn[]> = {
  kda: [
    { key: 'kills', label: 'K' },
    { key: 'deaths', label: 'D' },
    { key: 'assists', label: 'A' },
    { key: 'plusMinus', label: '+/-' },
    { key: 'kdRatio', label: 'K/D' },
  ],
  combat: [
    { key: 'fk', label: 'FK' },
    { key: 'fd', label: 'FD' },
    { key: 'acs', label: 'ACS', width: 44 },
    { key: 'hs', label: 'HS%', width: 44 },
    { key: 'kast', label: 'KAST', width: 48 },
  ],
};

function toRow(player: BucketedRow, side: Side): MatchPlayerStatsRow {
  return {
    id: player.id,
    name: player.name,
    agentIconUrl: player.agentIconUrl,
    isCurrentPlayer: player.isCurrentPlayer,
    values: player[side] as unknown as Record<string, string>,
  };
}

const meta: Meta<typeof MatchPlayerStatsTable> = {
  title: 'Blocks/MatchPlayerStatsTable',
  component: MatchPlayerStatsTable,
};

export default meta;
type Story = StoryObj<typeof MatchPlayerStatsTable>;

export const KDA: Story = {
  args: {
    rows: myTeam.map((p) => toRow(p, 'both')),
    columns: COLUMNS_BY_MODE.kda,
    playerLabel: 'PLAYER',
  },
};

export const Combat: Story = {
  args: {
    rows: myTeam.map((p) => toRow(p, 'both')),
    columns: COLUMNS_BY_MODE.combat,
    playerLabel: 'PLAYER',
  },
};

export const EnemyTeam: Story = {
  args: {
    rows: enemyTeam.map((p) => toRow(p, 'both')),
    columns: COLUMNS_BY_MODE.kda,
    playerLabel: 'PLAYER',
  },
};

export const LocalisedLabels: Story = {
  args: {
    rows: myTeam.map((p) => toRow(p, 'both')),
    columns: [
      { key: 'kills', label: '擊殺' },
      { key: 'deaths', label: '死亡' },
      { key: 'assists', label: '助攻' },
      { key: 'plusMinus', label: '+/-' },
      { key: 'kdRatio', label: 'K/D' },
    ],
    playerLabel: '玩家',
  },
};

/**
 * Deathmatch variant — every player in a single table with no attack /
 * defense split and `—` placeholders where round-based stats don't apply.
 */
export const Deathmatch: Story = {
  args: {
    columns: [
      { key: 'kills', label: 'K' },
      { key: 'deaths', label: 'D' },
      { key: 'assists', label: 'A' },
      { key: 'kdRatio', label: 'K/D' },
    ],
    playerLabel: 'PLAYER',
    rows: [
      {
        id: 'p-1',
        name: 'Rick#NA1',
        agentIconUrl: jettAgent,
        isCurrentPlayer: true,
        values: { kills: '38', deaths: '22', assists: '—', kdRatio: '1.73' },
      },
      {
        id: 'p-2',
        name: 'Alex#APAC',
        agentIconUrl: phoenixAgent,
        values: { kills: '34', deaths: '28', assists: '—', kdRatio: '1.21' },
      },
      {
        id: 'p-3',
        name: 'Tia#NA1',
        agentIconUrl: sageAgent,
        values: { kills: '29', deaths: '30', assists: '—', kdRatio: '0.97' },
      },
    ],
  },
};

const SIDE_TABS: { value: Side; label: string }[] = [
  { value: 'both', label: 'Both' },
  { value: 'atk', label: 'Attack' },
  { value: 'def', label: 'Defense' },
];

const MODE_TABS: { value: Mode; label: string }[] = [
  { value: 'kda', label: 'KDA' },
  { value: 'combat', label: 'Combat' },
];

/**
 * Full composition used on the match-detail screen — section header with an
 * attack / defense filter, a KDA / combat mode tab, then two stacked tables
 * (my team, enemy team). Consumer owns the filter state and column set.
 */
export const Scoreboard: Story = {
  render: () => {
    const [side, setSide] = useState<Side>('both');
    const [mode, setMode] = useState<Mode>('kda');
    const columns = COLUMNS_BY_MODE[mode];

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
          <View className="mb-2 flex-row rounded-full bg-muted/50 p-0.5">
            {MODE_TABS.map((tab) => (
              <Pressable
                key={tab.value}
                onPress={() => setMode(tab.value)}
                className={cn(
                  'flex-1 items-center rounded-full px-3 py-1',
                  mode === tab.value && 'bg-background'
                )}>
                <Text
                  className={cn(
                    'text-sm font-semibold',
                    mode === tab.value ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <MatchPlayerStatsTable
            rows={myTeam.map((p) => toRow(p, side))}
            columns={columns}
            playerLabel="PLAYER"
          />
        </View>
        <MatchPlayerStatsTable
          rows={enemyTeam.map((p) => toRow(p, side))}
          columns={columns}
          playerLabel="PLAYER"
        />
      </View>
    );
  },
};
