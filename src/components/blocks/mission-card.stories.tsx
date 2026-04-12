import type { Meta, StoryObj } from '@storybook/react';

import { MissionCard } from '@/components/blocks/mission-card';

const meta: Meta<typeof MissionCard> = {
  title: 'Blocks/MissionCard',
  component: MissionCard,
  argTypes: {
    progress: { control: { type: 'number', min: 0 } },
    total: { control: { type: 'number', min: 1 } },
    xpReward: { control: { type: 'number', min: 0, step: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof MissionCard>;

export const NotStarted: Story = {
  args: {
    title: 'Win 10 Competitive matches',
    xpReward: 15000,
    progress: 0,
    total: 10,
  },
};

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
