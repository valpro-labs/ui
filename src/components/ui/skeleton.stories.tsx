import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Skeleton } from '@/components/ui/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton style={{ width: 200, height: 20 }} />,
};

export const Row: Story = {
  render: () => (
    <View style={{ width: 320, gap: 8 }}>
      <Skeleton style={{ height: 20, width: '60%' }} />
      <Skeleton style={{ height: 16, width: '100%' }} />
      <Skeleton style={{ height: 16, width: '80%' }} />
    </View>
  ),
};

export const Card: Story = {
  render: () => (
    <View className="bg-card overflow-hidden rounded-2xl" style={{ width: 320 }}>
      <Skeleton className="rounded-none" style={{ width: '100%', aspectRatio: 452 / 128 }} />
      <View className="px-4 py-3" style={{ gap: 6 }}>
        <Skeleton style={{ height: 20, width: 120 }} />
        <Skeleton style={{ height: 14, width: 60 }} />
      </View>
    </View>
  ),
};
