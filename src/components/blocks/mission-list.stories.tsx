import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { MissionList } from '@/components/blocks/mission-list';
import { Button } from '@/components/ui/button';
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

export const Loading: Story = {
  args: {
    missions: [],
    isLoading: true,
    skeletonCount: 3,
  },
};

/**
 * Interactive playground — tap the button to flip between loading and loaded
 * so you can see the two states share the same frame and don't shift.
 */
export const Toggleable: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Button onPress={() => setIsLoading((prev) => !prev)} variant="secondary" size="sm">
            <Text>{isLoading ? 'Load data' : 'Show skeleton'}</Text>
          </Button>
          <Text className="text-muted-foreground text-xs">
            State: {isLoading ? 'loading' : 'loaded'}
          </Text>
        </View>
        <MissionList missions={sampleMissions} isLoading={isLoading} skeletonCount={3} />
      </View>
    );
  },
};
