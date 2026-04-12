import type { Meta, StoryObj } from '@storybook/react';
import { ArrowsClockwise } from 'phosphor-react';
import { ActivityIndicator, View } from 'react-native';

import { SectionTitle } from '@/components/blocks/section-title';
import { Text } from '@/components/ui/text';

const foreground = 'rgb(237,233,226)';
const mutedForeground = 'rgba(237,233,226,0.6)';

function RefreshIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <ArrowsClockwise
      size={18}
      weight="bold"
      color={disabled ? `${foreground}80` : foreground}
    />
  );
}

function Countdown({ label }: { label: string }) {
  return <Text className="text-muted-foreground text-sm tabular-nums">{label}</Text>;
}

const meta: Meta<typeof SectionTitle> = {
  title: 'Blocks/SectionTitle',
  component: SectionTitle,
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Party: Story = {
  args: {
    title: 'Party',
    rightElement: <RefreshIcon />,
  },
};

export const PartyFetching: Story = {
  args: {
    title: 'Party',
    rightElement: <ActivityIndicator size={16} color={foreground} />,
  },
};

export const Dailies: Story = {
  args: {
    title: 'Dailies',
    rightElement: <Countdown label="18:42:10" />,
  },
};

export const WeeklyMission: Story = {
  args: {
    title: 'Weekly Mission',
    rightElement: <Countdown label="4d 03:21:55" />,
  },
};

export const BattlePass: Story = {
  args: {
    title: 'Battle Pass',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Agents',
  },
};

export const InHomeContext: Story = {
  render: () => (
    <View className="gap-y-4">
      <View>
        <SectionTitle title="Party" rightElement={<RefreshIcon />} />
        <View className="bg-card h-20 rounded-2xl" />
      </View>
      <View>
        <SectionTitle title="Dailies" rightElement={<Countdown label="18:42:10" />} />
        <View className="bg-card h-24 rounded-2xl" />
      </View>
      <View>
        <SectionTitle
          title="Weekly Mission"
          rightElement={<Countdown label="4d 03:21:55" />}
        />
        <View className="bg-card h-24 rounded-2xl" />
      </View>
      <View>
        <SectionTitle title="Battle Pass" />
        <View className="bg-card h-20 rounded-2xl" />
      </View>
    </View>
  ),
};
