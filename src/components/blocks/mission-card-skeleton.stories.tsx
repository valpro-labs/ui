import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { MissionCardSkeleton } from '@/components/blocks/mission-card-skeleton';
import { Separator } from '@/components/ui/separator';

const meta: Meta<typeof MissionCardSkeleton> = {
  title: 'Blocks/MissionCardSkeleton',
  component: MissionCardSkeleton,
};

export default meta;
type Story = StoryObj<typeof MissionCardSkeleton>;

export const Default: Story = {};

/**
 * Three skeletons stacked inside the same rounded card container that
 * MissionList uses, matching the weekly-mission section's loading state.
 */
export const Stacked: Story = {
  render: () => (
    <View className="bg-card overflow-hidden rounded-2xl">
      <View className="px-4 py-3">
        <MissionCardSkeleton />
      </View>
      <Separator />
      <View className="px-4 py-3">
        <MissionCardSkeleton />
      </View>
      <Separator />
      <View className="px-4 py-3">
        <MissionCardSkeleton />
      </View>
    </View>
  ),
};
