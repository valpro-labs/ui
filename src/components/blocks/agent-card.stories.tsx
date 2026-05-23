import type { Meta, StoryObj } from '@storybook/react';
import { Lock } from 'phosphor-react';
import { View } from 'react-native';

import { AgentCard } from '@/components/blocks/agent-card';

// Stand-in for a real lock icon — the ui package ships no icons, so consumers
// supply their own via `lockOverlay`. Phosphor is already used throughout the
// storybook, so we lean on it here too.
const LockBadge = () => (
  <View className="absolute right-1 bottom-1 z-20 size-5 items-center justify-center rounded-full bg-black/60">
    <Lock size={12} weight="fill" color="#ffffff" />
  </View>
);

const InlineLock = () => <Lock size={14} weight="fill" color="rgba(255,255,255,0.72)" />;

const jett = 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png';
const reyna = 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png';
const raze = 'https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png';
const omen = 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png';
const killjoy = 'https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png';
const sage = 'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png';
const phoenix = 'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png';

const rowAgents = [
  { iconUrl: jett, name: 'Jett' },
  { iconUrl: reyna, name: 'Reyna' },
  { iconUrl: raze, name: 'Raze', locked: true, lockOverlay: <InlineLock /> },
  { iconUrl: omen, name: 'Omen' },
  { iconUrl: killjoy, name: 'Killjoy' },
  { iconUrl: sage, name: 'Sage' },
  { iconUrl: phoenix, name: 'Phoenix' },
];

function AgentRowGrid({
  columns,
  maxWidth,
  isLoading,
}: {
  columns: number;
  maxWidth: number;
  isLoading?: boolean;
}) {
  const rows = [];
  for (let i = 0; i < rowAgents.length; i += columns) {
    rows.push(rowAgents.slice(i, i + columns));
  }

  return (
    <View style={{ width: maxWidth, maxWidth: '100%', gap: 12 }}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row', gap: 12 }}>
          {row.map((agent) => (
            <View key={agent.name} style={{ flex: 1, minWidth: 0 }}>
              <AgentCard
                variant="row"
                iconUrl={agent.iconUrl}
                name={agent.name}
                locked={agent.locked}
                lockOverlay={agent.lockOverlay}
                isLoading={isLoading}
                onPress={() => undefined}
              />
            </View>
          ))}
          {Array.from({ length: columns - row.length }).map((_, index) => (
            <View key={`empty-${index}`} style={{ flex: 1, minWidth: 0 }} />
          ))}
        </View>
      ))}
    </View>
  );
}

const meta: Meta<typeof AgentCard> = {
  title: 'Blocks/AgentCard',
  component: AgentCard,
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['tile', 'row'],
    },
    progressRatio: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    locked: { control: 'boolean' },
  },
  decorators: [
    (Story, context) => {
      if (context.parameters.layout === 'fullscreen') return <Story />;

      return (
        <View style={{ width: context.args.variant === 'row' ? 320 : 120 }}>
          <Story />
        </View>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AgentCard>;
type RowGridStory = StoryObj<{
  columns: number;
  maxWidth: number;
  isLoading: boolean;
}>;

export const Default: Story = {
  args: { iconUrl: jett, name: 'Jett', progressRatio: 0.4 },
};

export const InProgress: Story = {
  args: { iconUrl: reyna, name: 'Reyna', progressRatio: 0.7 },
};

export const Locked: Story = {
  args: { iconUrl: raze, name: 'Raze', locked: true, lockOverlay: <LockBadge /> },
};

export const Complete: Story = {
  args: { iconUrl: omen, name: 'Omen', progressRatio: 1 },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Row: Story = {
  args: {
    variant: 'row',
    iconUrl: jett,
    name: 'Jett',
    progressRatio: 0.4,
  },
};

export const RowLocked: Story = {
  args: {
    variant: 'row',
    iconUrl: raze,
    name: 'Raze',
    locked: true,
    lockOverlay: <InlineLock />,
  },
};

export const RowLoading: Story = {
  args: {
    variant: 'row',
    isLoading: true,
  },
};

/**
 * Three-column agent grid — the layout agent passes typically render in.
 */
export const Grid: Story = {
  decorators: [],
  args: { isLoading: false },
  render: ({ isLoading }) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, width: 360 }}>
      {[
        { iconUrl: jett, progressRatio: 0.4 },
        { iconUrl: reyna, progressRatio: 0.7 },
        { iconUrl: raze, locked: true, lockOverlay: <LockBadge /> },
        { iconUrl: omen, progressRatio: 1 },
      ].map((props, i) => (
        <View key={i} style={{ width: (360 - 16) / 3 }}>
          <AgentCard {...props} isLoading={isLoading} />
        </View>
      ))}
    </View>
  ),
};

export const RowGrid: RowGridStory = {
  name: 'row grid',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    columns: {
      control: { type: 'inline-radio' },
      options: [1, 2, 3, 4],
    },
    maxWidth: { control: { type: 'number', min: 320, max: 1100, step: 20 } },
    isLoading: { control: 'boolean' },
  },
  args: { columns: 2, maxWidth: 640, isLoading: false },
  render: ({ columns, maxWidth, isLoading }) => (
    <View className="bg-background flex-1 items-center" style={{ width: '100%', padding: 24 }}>
      <AgentRowGrid columns={columns} maxWidth={maxWidth} isLoading={isLoading} />
    </View>
  ),
};

export const IPadRows: RowGridStory = {
  name: 'iPad rows',
  globals: { viewport: { value: 'iPadAir11M4', isRotated: false } },
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPadAir11M4' },
  },
  decorators: [],
  args: { columns: 2, maxWidth: 640, isLoading: false },
  render: ({ columns, maxWidth, isLoading }) => (
    <View className="bg-background flex-1 items-center" style={{ width: '100%', padding: 24 }}>
      <AgentRowGrid columns={columns} maxWidth={maxWidth} isLoading={isLoading} />
    </View>
  ),
};

export const IPadLandscapeRows: RowGridStory = {
  name: 'iPad landscape rows',
  globals: { viewport: { value: 'iPadAir11M4', isRotated: true } },
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPadAir11M4' },
  },
  decorators: [],
  args: { columns: 3, maxWidth: 900, isLoading: false },
  render: ({ columns, maxWidth, isLoading }) => (
    <View className="bg-background flex-1 items-center" style={{ width: '100%', padding: 24 }}>
      <AgentRowGrid columns={columns} maxWidth={maxWidth} isLoading={isLoading} />
    </View>
  ),
};
