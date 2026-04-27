import type { Meta, StoryObj } from '@storybook/react';
import {
  Calendar,
  ChartBar,
  Clock,
  GameController,
} from 'phosphor-react';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { KillMatrix, type KillMatrixCell } from '@/components/blocks/kill-matrix';
import { MapBanner } from '@/components/blocks/map-banner';
import { MatchInfoRow } from '@/components/blocks/match-info-row';
import {
  MatchMultiKillTable,
  type MatchMultiKillRow,
} from '@/components/blocks/match-multi-kill-table';
import {
  MatchPlayerStatsTable,
  type MatchPlayerStatsColumn,
  type MatchPlayerStatsRow,
} from '@/components/blocks/match-player-stats-table';
import { PerformanceOverview } from '@/components/blocks/performance-overview';
import { PlayerRow } from '@/components/blocks/player-row';
import { SectionTitle } from '@/components/blocks/section-title';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

// ── Asset URLs ──────────────────────────────────────────────────────────────

const ascentSplash =
  'https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/splash.png';
const bindSplash =
  'https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/splash.png';

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

const ascendant1Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/smallicon.png';
const diamond3Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/20/smallicon.png';
const diamond2Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/19/smallicon.png';
const platinum3Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/17/smallicon.png';
const platinum2Tier =
  'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/16/smallicon.png';

// ── Scoreboard data ─────────────────────────────────────────────────────────

type Role = 'me' | 'ally' | 'enemy';

interface PlayerSeed {
  id: string;
  name: string;
  agentIconUrl: string;
  tierIconUrl: string;
  role: Role;
  kda: string;
  avgScore: number;
}

const myTeamPlayers: PlayerSeed[] = [
  {
    id: 'me',
    name: 'Rick#NA1',
    agentIconUrl: jettAgent,
    tierIconUrl: ascendant1Tier,
    role: 'me',
    kda: '21/14/8',
    avgScore: 280,
  },
  {
    id: 'ally-1',
    name: 'Alex#APAC',
    agentIconUrl: phoenixAgent,
    tierIconUrl: diamond3Tier,
    role: 'ally',
    kda: '15/12/6',
    avgScore: 220,
  },
  {
    id: 'ally-2',
    name: 'Tia#NA1',
    agentIconUrl: sageAgent,
    tierIconUrl: platinum3Tier,
    role: 'ally',
    kda: '8/11/14',
    avgScore: 175,
  },
  {
    id: 'ally-3',
    name: 'Sho#JP1',
    agentIconUrl: omenAgent,
    tierIconUrl: diamond2Tier,
    role: 'ally',
    kda: '14/13/9',
    avgScore: 235,
  },
  {
    id: 'ally-4',
    name: 'Mika#EU1',
    agentIconUrl: killjoyAgent,
    tierIconUrl: platinum2Tier,
    role: 'ally',
    kda: '10/10/5',
    avgScore: 198,
  },
];

const enemyTeamPlayers: PlayerSeed[] = [
  {
    id: 'enemy-0',
    name: 'Mia#EU1',
    agentIconUrl: reynaAgent,
    tierIconUrl: diamond3Tier,
    role: 'enemy',
    kda: '18/16/3',
    avgScore: 245,
  },
  {
    id: 'enemy-1',
    name: 'Leo#BR1',
    agentIconUrl: viperAgent,
    tierIconUrl: diamond2Tier,
    role: 'enemy',
    kda: '12/17/5',
    avgScore: 190,
  },
  {
    id: 'enemy-2',
    name: 'Sun#KR1',
    agentIconUrl: breachAgent,
    tierIconUrl: platinum3Tier,
    role: 'enemy',
    kda: '13/14/7',
    avgScore: 212,
  },
  {
    id: 'enemy-3',
    name: 'Val#NA1',
    agentIconUrl: cypherAgent,
    tierIconUrl: platinum2Tier,
    role: 'enemy',
    kda: '11/15/4',
    avgScore: 172,
  },
  {
    id: 'enemy-4',
    name: 'Ren#TW1',
    agentIconUrl: sovaAgent,
    tierIconUrl: platinum2Tier,
    role: 'enemy',
    kda: '9/14/11',
    avgScore: 168,
  },
];

const scoreboard = [...myTeamPlayers, ...enemyTeamPlayers];

// ── Stats data (attack / defense buckets) ───────────────────────────────────

type Side = 'both' | 'atk' | 'def';
type Mode = 'kda' | 'combat';

interface StatBucket {
  kills: string;
  deaths: string;
  assists: string;
  plusMinus: string;
  kdRatio: string;
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
  both: StatBucket;
  atk: StatBucket;
  def: StatBucket;
}

const myTeamStats: BucketedRow[] = [
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

const enemyTeamStats: BucketedRow[] = [
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

function pickSide(rows: BucketedRow[], side: Side): MatchPlayerStatsRow[] {
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    agentIconUrl: r.agentIconUrl,
    isCurrentPlayer: r.isCurrentPlayer,
    values: r[side] as unknown as Record<string, string>,
  }));
}

// ── Multi-kill data ─────────────────────────────────────────────────────────

const myTeamMultiKills: MatchMultiKillRow[] = [
  {
    id: 'me',
    name: 'Rick#NA1',
    agentIconUrl: jettAgent,
    isCurrentPlayer: true,
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

const enemyTeamMultiKills: MatchMultiKillRow[] = [
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

// ── Kill matrix data ────────────────────────────────────────────────────────

const matrixAllies = myTeamPlayers.map((p) => ({ id: p.id, agentIconUrl: p.agentIconUrl }));
const matrixEnemies = enemyTeamPlayers.map((p) => ({ id: p.id, agentIconUrl: p.agentIconUrl }));

const allMatrix: KillMatrixCell[][] = [
  [
    { allyKills: 3, enemyKills: 2 },
    { allyKills: 2, enemyKills: 1 },
    { allyKills: 4, enemyKills: 0 },
    { allyKills: 1, enemyKills: 1 },
    { allyKills: 2, enemyKills: 3 },
  ],
  [
    { allyKills: 1, enemyKills: 2 },
    { allyKills: 3, enemyKills: 3 },
    { allyKills: 0, enemyKills: 2 },
    { allyKills: 2, enemyKills: 0 },
    { allyKills: 1, enemyKills: 1 },
  ],
  [
    { allyKills: 0, enemyKills: 1 },
    { allyKills: 1, enemyKills: 1 },
    { allyKills: 2, enemyKills: 2 },
    { allyKills: 3, enemyKills: 1 },
    { allyKills: 0, enemyKills: 0 },
  ],
  [
    { allyKills: 2, enemyKills: 0 },
    { allyKills: 0, enemyKills: 3 },
    { allyKills: 1, enemyKills: 1 },
    { allyKills: 2, enemyKills: 2 },
    { allyKills: 1, enemyKills: 2 },
  ],
  [
    { allyKills: 1, enemyKills: 1 },
    { allyKills: 2, enemyKills: 0 },
    { allyKills: 0, enemyKills: 2 },
    { allyKills: 1, enemyKills: 1 },
    { allyKills: 2, enemyKills: 1 },
  ],
];

const firstKillsMatrix: KillMatrixCell[][] = [
  [
    { allyKills: 1, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 1, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 1 },
  ],
  [
    { allyKills: 0, enemyKills: 1 },
    { allyKills: 1, enemyKills: 0 },
    { allyKills: 0, enemyKills: 1 },
    { allyKills: 1, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
  ],
  [
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 1 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
  ],
  [
    { allyKills: 1, enemyKills: 0 },
    { allyKills: 0, enemyKills: 1 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 1 },
    { allyKills: 0, enemyKills: 0 },
  ],
  [
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 1, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
  ],
];

// ── UI helpers ──────────────────────────────────────────────────────────────

function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  fullWidth,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  fullWidth?: boolean;
}) {
  return (
    <View
      className={cn('bg-muted/50 flex-row rounded-full p-0.5', fullWidth && 'w-full')}>
      {options.map((opt) => (
        <Pressable
          key={opt.value}
          onPress={() => onChange(opt.value)}
          className={cn(
            'rounded-full px-3 py-1',
            fullWidth && 'flex-1 items-center',
            value === opt.value && 'bg-background'
          )}>
          <Text
            className={cn(
              'text-xs font-semibold',
              value === opt.value ? 'text-foreground' : 'text-muted-foreground'
            )}>
            {opt.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const meta: Meta = {
  title: 'Pages/MatchDetail',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Full match-detail screen, top to bottom: `<MapBanner>` hero, a
 * `<MatchInfoRow>` metadata strip, the ten-row player scoreboard (viewer +
 * allies then enemies) inside a single rounded card, a team performance
 * overview, the per-player stats tables (attack / defense filter), and the
 * kill matrix (all kills / first kills / operator filter).
 *
 * Uses fake fixture data — this story is the composition reference, not a
 * data-driven screen.
 */
export const Victory: Story = {
  render: () => <MatchDetailPage variant="victory" />,
};

export const Defeat: Story = {
  render: () => <MatchDetailPage variant="defeat" />,
};

function MatchDetailPage({ variant }: { variant: 'victory' | 'defeat' }) {
  const [side, setSide] = useState<Side>('both');
  const [mode, setMode] = useState<Mode>('kda');
  const [multiKillTeam, setMultiKillTeam] = useState<'ally' | 'enemy'>('ally');
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'firstKills'>('all');
  const won = variant === 'victory';
  const mutedForeground = 'rgba(237,233,226,0.6)';
  const statsColumns = COLUMNS_BY_MODE[mode];

  return (
    <ScrollView className="bg-background flex-1">
      <View className="p-4" style={{ gap: 16 }}>
        <MapBanner
          splashUrl={won ? ascentSplash : bindSplash}
          mapName={won ? 'Ascent' : 'Bind'}
          myTeamScore={won ? 13 : 7}
          enemyTeamScore={won ? 9 : 13}
          outcomeLabel={won ? 'VICTORY' : 'DEFEAT'}
          result={won ? 'win' : 'loss'}
        />

        <MatchInfoRow
          mode="Competitive"
          date="Apr 21, 2026"
          duration="38m 14s"
          modeIcon={<GameController size={16} weight="bold" color={mutedForeground} />}
          dateIcon={<Calendar size={16} weight="bold" color={mutedForeground} />}
          durationIcon={<Clock size={16} weight="bold" color={mutedForeground} />}
        />

        <View className="bg-card overflow-hidden rounded-2xl">
          {scoreboard.map((row, index) => (
            <View key={row.id}>
              {index > 0 && <Separator className="bg-black/50! dark:bg-black/30!" />}
              <PlayerRow
                agentIconUrl={row.agentIconUrl}
                name={row.name}
                role={row.role}
                kda={row.kda}
                avgScore={row.avgScore}
                tierIconUrl={row.tierIconUrl}
                scoreIcon={<ChartBar size={12} weight="fill" color="rgba(0,0,0,0.5)" />}
              />
            </View>
          ))}
        </View>

        <View>
          <SectionTitle title="Team Performance" />
          <PerformanceOverview
            rows={[
              { label: 'Kills', allyValue: 68, enemyValue: won ? 54 : 71 },
              { label: 'Deaths', allyValue: won ? 54 : 71, enemyValue: 68 },
              { label: 'Assists', allyValue: 42, enemyValue: 30 },
            ]}
          />
        </View>

        <View style={{ gap: 16 }}>
          <View>
            <SectionTitle
              title="Player Stats"
              rightElement={
                <SegmentedControl
                  value={side}
                  onChange={setSide}
                  options={[
                    { value: 'both', label: 'Both' },
                    { value: 'atk', label: 'Attack' },
                    { value: 'def', label: 'Defense' },
                  ]}
                />
              }
            />
            <View className="mb-2">
              <SegmentedControl
                value={mode}
                onChange={setMode}
                fullWidth
                options={[
                  { value: 'kda', label: 'KDA' },
                  { value: 'combat', label: 'Combat' },
                ]}
              />
            </View>
            <MatchPlayerStatsTable
              rows={pickSide(myTeamStats, side)}
              columns={statsColumns}
              playerLabel="PLAYER"
            />
          </View>
          <MatchPlayerStatsTable
            rows={pickSide(enemyTeamStats, side)}
            columns={statsColumns}
            playerLabel="PLAYER"
          />
        </View>

        <View>
          <SectionTitle
            title="Multi Kills"
            rightElement={
              <SegmentedControl
                value={multiKillTeam}
                onChange={setMultiKillTeam}
                options={[
                  { value: 'ally', label: 'Ally' },
                  { value: 'enemy', label: 'Enemy' },
                ]}
              />
            }
          />
          <MatchMultiKillTable
            rows={multiKillTeam === 'ally' ? myTeamMultiKills : enemyTeamMultiKills}
          />
        </View>

        <View>
          <SectionTitle
            title="Kill Matrix"
            rightElement={
              <SegmentedControl
                value={matrixFilter}
                onChange={setMatrixFilter}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'firstKills', label: 'First Kills' },
                ]}
              />
            }
          />
          <KillMatrix
            allyPlayers={matrixAllies}
            enemyPlayers={matrixEnemies}
            cells={matrixFilter === 'all' ? allMatrix : firstKillsMatrix}
          />
        </View>
      </View>
    </ScrollView>
  );
}

