import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { AgentCard } from '@/components/blocks/agent-card';
import { Text } from '@/components/ui/text';

// Stand-in for a real lock icon — the ui package ships no icons, so consumers
// supply their own via `lockOverlay`. We use a text glyph here so the Story
// actually shows something.
const LockBadge = () => (
  <View className="absolute right-1 bottom-1 z-20 size-5 items-center justify-center rounded-full bg-black/60">
    <Text className="text-[10px] text-white">🔒</Text>
  </View>
);

const jett = 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png';
const reyna = 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png';
const raze = 'https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png';
const omen = 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png';

const meta: Meta<typeof AgentCard> = {
  title: 'Blocks/AgentCard',
  component: AgentCard,
  argTypes: {
    progressRatio: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    locked: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <View style={{ width: 120 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AgentCard>;

export const Default: Story = {
  args: { iconUrl: jett, progressRatio: 0.4 },
};

export const InProgress: Story = {
  args: { iconUrl: reyna, progressRatio: 0.7 },
};

export const Locked: Story = {
  args: { iconUrl: raze, locked: true, lockOverlay: <LockBadge /> },
};

export const Complete: Story = {
  args: { iconUrl: omen, progressRatio: 1 },
};

/**
 * Three-column agent grid — the layout agent passes typically render in.
 */
export const Grid: Story = {
  decorators: [],
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, width: 360 }}>
      {[
        { iconUrl: jett, progressRatio: 0.4 },
        { iconUrl: reyna, progressRatio: 0.7 },
        { iconUrl: raze, locked: true, lockOverlay: <LockBadge /> },
        { iconUrl: omen, progressRatio: 1 },
      ].map((props, i) => (
        <View key={i} style={{ width: (360 - 16) / 3 }}>
          <AgentCard {...props} />
        </View>
      ))}
    </View>
  ),
};
