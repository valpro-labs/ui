import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { MissionList } from '@/components/blocks/mission-list';
import { Text } from '@/components/ui/text';

const sampleMissions = [
  { id: '1', title: 'Get 45 headshots', xpReward: 21300, progress: 18, total: 45 },
  { id: '2', title: 'Play 5 Deathmatch games', xpReward: 8000, progress: 5, total: 5 },
  {
    id: '3',
    title: 'Deal 100,000 damage with Rifles',
    xpReward: 24000,
    progress: 42000,
    total: 100000,
  },
];

const meta: Meta<typeof MissionList> = {
  title: 'Blocks/MissionList',
  component: MissionList,
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Toggle in the Controls panel to flip between loaded and loading.',
    },
    skeletonCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MissionList>;

export const ThreeMissions: Story = {
  args: { missions: sampleMissions },
};

export const SingleMission: Story = {
  args: {
    missions: [
      { id: '1', title: 'Win 3 Competitive matches', xpReward: 15000, progress: 1, total: 3 },
    ],
  },
};

export const AllComplete: Story = {
  args: {
    missions: [
      { id: '1', title: 'Get 45 headshots', xpReward: 21300, progress: 45, total: 45 },
      { id: '2', title: 'Play 5 Deathmatch games', xpReward: 8000, progress: 5, total: 5 },
      { id: '3', title: 'Win 3 Competitive matches', xpReward: 15000, progress: 3, total: 3 },
    ],
  },
};

/**
 * Side-by-side comparison of the loaded vs loading state. Useful when
 * tweaking the skeleton to make sure it matches the real card frame —
 * both lists should line up row-for-row.
 *
 * Opens in a desktop viewport so both columns have room to breathe. The
 * other stories stay on the iPhone default.
 */
export const LoadedVsLoading: Story = {
  globals: {
    viewport: { value: 'desktop', isRotated: false },
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
      <View style={{ flex: 1, gap: 8 }}>
        <Text className="text-muted-foreground text-xs uppercase">Loaded</Text>
        <MissionList missions={sampleMissions} />
      </View>
      <View style={{ flex: 1, gap: 8 }}>
        <Text className="text-muted-foreground text-xs uppercase">Loading</Text>
        <MissionList missions={[]} isLoading skeletonCount={3} />
      </View>
    </View>
  ),
};
