import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { FriendPartyOthersRow } from '@/components/blocks/friend-party-others-row';

const meta: Meta<typeof FriendPartyOthersRow> = {
  title: 'Blocks/FriendPartyOthersRow',
  component: FriendPartyOthersRow,
  decorators: [
    (Story) => (
      <View className="bg-card overflow-hidden rounded-2xl py-3">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FriendPartyOthersRow>;

export const Two: Story = {
  args: {
    count: 2,
    label: 'Other Players',
  },
};

export const One: Story = {
  args: {
    count: 1,
    label: 'Other Players',
  },
};

export const Four: Story = {
  args: {
    count: 4,
    label: 'Other Players',
  },
};
