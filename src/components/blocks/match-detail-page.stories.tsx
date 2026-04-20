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
  MatchPlayerStatsTable,
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

interface StatBucket {
  kd: string;
  fk: string;
  fd: string;
  adr: string;
  kast: string;
}
interface BucketedRow {
  id: string;
  name: string;
  agentIconUrl: string;
  both: StatBucket;
  atk: StatBucket;
  def: StatBucket;
}

const myTeamStats: BucketedRow[] = [
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
  {
    id: 'ally-2',
    name: 'Tia#NA1',
    agentIconUrl: sageAgent,
    both: { kd: '8-11', fk: '0', fd: '2', adr: '92', kast: '72%' },
    atk: { kd: '4-6', fk: '0', fd: '1', adr: '88', kast: '70%' },
    def: { kd: '4-5', fk: '0', fd: '1', adr: '96', kast: '75%' },
  },
];

const enemyTeamStats: BucketedRow[] = [
  {
    id: 'enemy-0',
    name: 'Mia#EU1',
    agentIconUrl: reynaAgent,
    both: { kd: '18-16', fk: '3', fd: '2', adr: '162', kast: '70%' },
    atk: { kd: '10-9', fk: '2', fd: '1', adr: '170', kast: '72%' },
    def: { kd: '8-7', fk: '1', fd: '1', adr: '152', kast: '68%' },
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
    id: 'enemy-1',
    name: 'Leo#BR1',
    agentIconUrl: viperAgent,
    both: { kd: '12-17', fk: '1', fd: '3', adr: '128', kast: '60%' },
    atk: { kd: '6-9', fk: '1', fd: '2', adr: '122', kast: '58%' },
    def: { kd: '6-8', fk: '0', fd: '1', adr: '134', kast: '62%' },
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
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <View className="bg-muted/50 flex-row rounded-full p-0.5">
      {options.map((opt) => (
        <Pressable
          key={opt.value}
          onPress={() => onChange(opt.value)}
          className={cn('rounded-full px-3 py-1', value === opt.value && 'bg-background')}>
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
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'firstKills'>('all');
  const won = variant === 'victory';
  const mutedForeground = 'rgba(237,233,226,0.6)';

  return (
    <ScrollView className="bg-background flex-1">
      <View className="gap-y-4 p-4">
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

        <View className="gap-y-4">
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
            <MatchPlayerStatsTable rows={pickSide(myTeamStats, side)} />
          </View>
          <MatchPlayerStatsTable rows={pickSide(enemyTeamStats, side)} />
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

