import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <View>
      <Text>Above the separator</Text>
      <View style={{ height: 12 }} />
      <Separator />
      <View style={{ height: 12 }} />
      <Text>Below the separator</Text>
    </View>
  ),
};

export const Vertical: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
      <Text>Left</Text>
      <View style={{ width: 12 }} />
      <Separator orientation="vertical" />
      <View style={{ width: 12 }} />
      <Text>Right</Text>
    </View>
  ),
};

export const BetweenListItems: Story = {
  render: () => (
    <View className="bg-card overflow-hidden rounded-2xl">
      {['Headshots', 'First bloods', 'Spike plants'].map((label, index) => (
        <View key={label}>
          {index > 0 && <Separator />}
          <View className="px-4 py-3">
            <Text>{label}</Text>
          </View>
        </View>
      ))}
    </View>
  ),
};
