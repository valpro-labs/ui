import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { FriendAvatar } from '@/components/blocks/friend-row';

const card1 =
  'https://media.valorant-api.com/playercards/c59b3a9b-467b-54b7-3e4d-a0a3107cbefe/displayicon.png';

const meta: Meta<typeof FriendAvatar> = {
  title: 'Blocks/FriendAvatar',
  component: FriendAvatar,
  argTypes: {
    status: {
      control: { type: 'inline-radio' },
      options: ['online', 'away', 'busy', 'offline', 'none'],
    },
  },
  args: {
    avatarUrl: card1,
    status: 'online',
  },
  decorators: [
    (Story) => (
      <View className="items-start p-3">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FriendAvatar>;

export const Online: Story = { args: { status: 'online' } };
export const Away: Story = { args: { status: 'away' } };
export const Busy: Story = { args: { status: 'busy' } };
export const Offline: Story = { args: { status: 'offline' } };
export const None: Story = { args: { status: 'none' } };
