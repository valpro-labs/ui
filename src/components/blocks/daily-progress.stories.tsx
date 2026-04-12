import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { DailyProgress } from '@/components/blocks/daily-progress';
import { Text } from '@/components/ui/text';

const meta: Meta<typeof DailyProgress> = {
  title: 'Blocks/DailyProgress',
  component: DailyProgress,
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Toggle to swap the diamond rings for skeleton placeholders.',
    },
    skeletonCount: {
      control: { type: 'number', min: 1, max: 8, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DailyProgress>;

export const Fresh: Story = {
  args: {
    milestones: [{ progress: 0 }, { progress: 0 }, { progress: 0 }, { progress: 0 }],
  },
};

export const MidDay: Story = {
  args: {
    milestones: [{ progress: 4 }, { progress: 2 }, { progress: 0 }, { progress: 0 }],
  },
};

export const AllDone: Story = {
  args: {
    milestones: [{ progress: 4 }, { progress: 4 }, { progress: 4 }, { progress: 4 }],
  },
};

/**
 * Side-by-side loaded vs skeleton. Both should occupy the same 76px-tall
 * row with four slots and 12px gaps — useful for spotting layout drift.
 */
export const LoadedVsLoading: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  parameters: { viewport: { defaultViewport: 'desktop' } },
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
      <View style={{ flex: 1, gap: 8 }}>
        <Text className="text-muted-foreground text-xs uppercase">Loaded</Text>
        <DailyProgress
          milestones={[{ progress: 4 }, { progress: 2 }, { progress: 0 }, { progress: 0 }]}
        />
      </View>
      <View style={{ flex: 1, gap: 8 }}>
        <Text className="text-muted-foreground text-xs uppercase">Loading</Text>
        <DailyProgress milestones={[]} isLoading skeletonCount={4} />
      </View>
    </View>
  ),
};
