import type { Meta, StoryObj } from '@storybook/react';
import { Crown } from 'phosphor-react';
import { View } from 'react-native';

import { FriendInfo } from '@/components/blocks/friend-row';

const meta: Meta<typeof FriendInfo> = {
  title: 'Blocks/FriendInfo',
  component: FriendInfo,
  argTypes: {
    status: {
      control: { type: 'inline-radio' },
      options: ['online', 'away', 'busy', 'offline', 'none'],
    },
  },
  args: {
    name: 'Rick#NA1',
    gameLabel: 'Competitive 11-7 - Ascent',
    status: 'online',
  },
  decorators: [
    (Story) => (
      <View className="flex-row px-3.5 py-3">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FriendInfo>;

export const Online: Story = { args: { status: 'online' } };
export const Away: Story = { args: { gameLabel: 'Away', status: 'away' } };
export const Busy: Story = { args: { gameLabel: 'Busy', status: 'busy' } };
export const Offline: Story = { args: { gameLabel: 'Offline', status: 'offline' } };
export const WithOwnerBadge: Story = {
  args: {
    ownerBadge: <Crown size={13} weight="fill" color="#facc15" />,
  },
};
export const NoGameLabel: Story = { args: { gameLabel: undefined } };
