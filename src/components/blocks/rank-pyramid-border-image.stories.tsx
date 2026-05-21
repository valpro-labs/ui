import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { RankPyramidBorderImage } from '@/components/blocks/rank-pyramid-border-image';

const BORDER_LEVEL_0 =
  'https://media.valorant-api.com/seasonborders/06289abe-489d-690b-edf1-51b9c063f3da/displayicon.png';
const BORDER_LEVEL_1 =
  'https://media.valorant-api.com/seasonborders/d3b30fbf-445e-0bce-bf98-b2b58e5807c6/displayicon.png';
const BORDER_LEVEL_3 =
  'https://media.valorant-api.com/seasonborders/dc20c281-4086-c7aa-8420-9f851d0e44ed/displayicon.png';
const BORDER_LEVEL_5 =
  'https://media.valorant-api.com/seasonborders/ba974f74-4131-a4ba-378a-c9993b9edef0/displayicon.png';

const meta: Meta<typeof RankPyramidBorderImage> = {
  title: 'Blocks/RankPyramidBorderImage',
  component: RankPyramidBorderImage,
  decorators: [
    (Story) => (
      <View className="bg-card items-center justify-center rounded-2xl p-6">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RankPyramidBorderImage>;

export const Level0: Story = {
  args: {
    borderIcon: BORDER_LEVEL_0,
    size: 120,
  },
};

export const Level1: Story = {
  args: {
    borderIcon: BORDER_LEVEL_1,
    size: 120,
  },
};

export const Level3: Story = {
  args: {
    borderIcon: BORDER_LEVEL_3,
    size: 120,
  },
};

export const Level5: Story = {
  args: {
    borderIcon: BORDER_LEVEL_5,
    size: 120,
  },
};
