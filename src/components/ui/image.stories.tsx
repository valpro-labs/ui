import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Image } from './image';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  argTypes: {
    contentFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

const SAMPLE_URL =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';

export const Cover: Story = {
  args: {
    source: SAMPLE_URL,
    contentFit: 'cover',
    style: { width: 320, height: 200 },
  },
};

export const Contain: Story = {
  args: {
    source: SAMPLE_URL,
    contentFit: 'contain',
    style: { width: 320, height: 200, backgroundColor: '#222' },
  },
};

export const WithClassName: Story = {
  render: (args) => (
    <View style={{ width: 320 }}>
      <Image
        {...args}
        className="rounded-lg"
        style={{ width: 320, height: 200 }}
      />
    </View>
  ),
  args: {
    source: SAMPLE_URL,
    contentFit: 'cover',
  },
};
