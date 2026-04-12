import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 60 },
  render: (args) => (
    <View style={{ width: 320, padding: 16 }}>
      <Progress {...args} />
    </View>
  ),
};

export const Animated: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const id = setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 10));
      }, 600);
      return () => clearInterval(id);
    }, []);
    return (
      <View style={{ width: 320, padding: 16, gap: 8 }}>
        <Progress value={value} />
        <Text className="text-muted-foreground text-xs">{value}%</Text>
      </View>
    );
  },
};

export const CustomColor: Story = {
  args: { value: 45 },
  render: (args) => (
    <View style={{ width: 320, padding: 16, gap: 12 }}>
      <Progress {...args} className="bg-val-green-ui/20" indicatorClassName="bg-val-green-ui" />
      <Progress {...args} className="bg-val-red/20" indicatorClassName="bg-val-red" />
      <Progress {...args} className="bg-val-yellow/20" indicatorClassName="bg-val-yellow" />
    </View>
  ),
};
