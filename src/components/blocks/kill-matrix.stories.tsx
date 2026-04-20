import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { KillMatrix, type KillMatrixCell } from '@/components/blocks/kill-matrix';
import { SectionTitle } from '@/components/blocks/section-title';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

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
const omenAgent =
  'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png';
const breachAgent =
  'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png';
const killjoyAgent =
  'https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png';
const cypherAgent =
  'https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png';
const sovaAgent =
  'https://media.valorant-api.com/agents/ded3520f-4264-bfed-162d-b080e2abccf9/displayicon.png';

const allyPlayers = [
  { id: 'me', agentIconUrl: jettAgent },
  { id: 'ally-1', agentIconUrl: phoenixAgent },
  { id: 'ally-2', agentIconUrl: sageAgent },
  { id: 'ally-3', agentIconUrl: omenAgent },
  { id: 'ally-4', agentIconUrl: killjoyAgent },
];

const enemyPlayers = [
  { id: 'enemy-0', agentIconUrl: reynaAgent },
  { id: 'enemy-1', agentIconUrl: viperAgent },
  { id: 'enemy-2', agentIconUrl: breachAgent },
  { id: 'enemy-3', agentIconUrl: cypherAgent },
  { id: 'enemy-4', agentIconUrl: sovaAgent },
];

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

const operatorMatrix: KillMatrixCell[][] = [
  [
    { allyKills: 2, enemyKills: 0 },
    { allyKills: 1, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
  ],
  [
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
  ],
  [
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
  ],
  [
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 2 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
  ],
  [
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
    { allyKills: 0, enemyKills: 0 },
  ],
];

const meta: Meta<typeof KillMatrix> = {
  title: 'Blocks/KillMatrix',
  component: KillMatrix,
};

export default meta;
type Story = StoryObj<typeof KillMatrix>;

export const Default: Story = {
  args: {
    allyPlayers,
    enemyPlayers,
    cells: allMatrix,
  },
};

export const MissingAgentIcons: Story = {
  args: {
    allyPlayers: allyPlayers.map((p) => ({ ...p, agentIconUrl: undefined })),
    enemyPlayers: enemyPlayers.map((p) => ({ ...p, agentIconUrl: undefined })),
    cells: allMatrix,
  },
};

type FilterValue = 'all' | 'firstKills' | 'operator';

const FILTERS: { value: FilterValue; label: string; cells: KillMatrixCell[][] }[] = [
  { value: 'all', label: 'All', cells: allMatrix },
  { value: 'firstKills', label: 'First Kills', cells: firstKillsMatrix },
  { value: 'operator', label: 'Operator', cells: operatorMatrix },
];

/**
 * Full composition used on the match-detail screen — a section header with
 * an inline filter, and the matrix card below. Consumer owns the filter
 * state + label strings; the block just renders whichever cell grid is
 * passed in.
 */
export const WithSectionHeader: Story = {
  render: () => {
    const [filter, setFilter] = useState<FilterValue>('all');
    const activeCells = FILTERS.find((f) => f.value === filter)?.cells ?? allMatrix;

    return (
      <View>
        <SectionTitle
          title="Kill Matrix"
          rightElement={
            <View className="bg-muted/50 flex-row rounded-full p-0.5">
              {FILTERS.map((f) => (
                <Pressable
                  key={f.value}
                  onPress={() => setFilter(f.value)}
                  className={cn(
                    'rounded-full px-3 py-1',
                    filter === f.value && 'bg-background'
                  )}>
                  <Text
                    className={cn(
                      'text-xs font-semibold',
                      filter === f.value ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                    {f.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          }
        />
        <KillMatrix
          allyPlayers={allyPlayers}
          enemyPlayers={enemyPlayers}
          cells={activeCells}
        />
      </View>
    );
  },
};
