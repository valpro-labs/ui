import type { Meta, StoryObj } from '@storybook/react';

import { MissionList } from '@/components/blocks/mission-list';

const meta: Meta<typeof MissionList> = {
  title: 'Blocks/MissionList',
  component: MissionList,
};

export default meta;
type Story = StoryObj<typeof MissionList>;

export const ThreeMissions: Story = {
  args: {
    missions: [
      { id: '1', title: 'Get 45 headshots', xpReward: 21300, progress: 18, total: 45 },
      { id: '2', title: 'Play 5 Deathmatch games', xpReward: 8000, progress: 5, total: 5 },
      {
        id: '3',
        title: 'Deal 100,000 damage with Rifles',
        xpReward: 24000,
        progress: 42000,
        total: 100000,
      },
    ],
  },
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
