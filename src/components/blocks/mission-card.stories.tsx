import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { MissionCard } from '@/components/blocks/mission-card';
import { Separator } from '@/components/ui/separator';

const meta: Meta<typeof MissionCard> = {
  title: 'Blocks/MissionCard',
  component: MissionCard,
  argTypes: {
    progress: { control: { type: 'number', min: 0 } },
    total: { control: { type: 'number', min: 1 } },
    xpReward: { control: { type: 'number', min: 0, step: 100 } },
  },
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MissionCard>;

export const InProgress: Story = {
  args: {
    title: 'Get 45 headshots in any mode',
    xpReward: 21300,
    progress: 18,
    total: 45,
  },
};

export const Completed: Story = {
  args: {
    title: 'Play 5 Deathmatch games',
    xpReward: 8000,
    progress: 5,
    total: 5,
  },
};

export const LargeNumbers: Story = {
  args: {
    title: 'Deal 100,000 damage with Rifles',
    xpReward: 24000,
    progress: 42000,
    total: 100000,
  },
};

/**
 * Three mission rows stacked inside the same rounded card container the home
 * screen uses, with separators between them. The section title + countdown
 * header will ship as its own block later.
 */
export const Stacked: Story = {
  decorators: [(Story) => <View style={{ width: 360, padding: 16 }}>{Story()}</View>],
  render: () => (
    <View className="bg-card overflow-hidden rounded-2xl">
      <View className="px-4 py-3">
        <MissionCard title="Get 45 headshots" xpReward={21300} progress={18} total={45} />
      </View>
      <Separator />
      <View className="px-4 py-3">
        <MissionCard title="Play 5 Deathmatch games" xpReward={8000} progress={5} total={5} />
      </View>
      <Separator />
      <View className="px-4 py-3">
        <MissionCard
          title="Deal 100,000 damage with Rifles"
          xpReward={24000}
          progress={42000}
          total={100000}
        />
      </View>
    </View>
  ),
};
