import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, Clock, GameController } from 'phosphor-react';
import { View } from 'react-native';

import { MatchInfoRow } from '@/components/blocks/match-info-row';

const mutedColor = 'rgba(237,233,226,0.6)';

function ModeIcon() {
  return <GameController size={18} weight="bold" color={mutedColor} />;
}
function DateIcon() {
  return <Calendar size={16} weight="bold" color={mutedColor} />;
}
function DurationIcon() {
  return <Clock size={16} weight="bold" color={mutedColor} />;
}

const meta: Meta<typeof MatchInfoRow> = {
  title: 'Blocks/MatchInfoRow',
  component: MatchInfoRow,
};

export default meta;
type Story = StoryObj<typeof MatchInfoRow>;

export const Competitive: Story = {
  args: {
    mode: 'Competitive',
    date: 'Apr 12, 2026',
    duration: '38:12',
    modeIcon: <ModeIcon />,
    dateLabel: 'Date',
    durationLabel: 'Duration',
  },
};

export const Deathmatch: Story = {
  args: {
    mode: 'Deathmatch',
    date: 'Yesterday',
    duration: '06:45',
    modeIcon: <ModeIcon />,
    dateLabel: 'Date',
    durationLabel: 'Duration',
  },
};

export const NoIcons: Story = {
  args: {
    mode: 'Unrated',
    date: 'Apr 10, 2026',
    duration: '32:04',
  },
};

export const LongMode: Story = {
  args: {
    mode: 'Premier Overtime Elimination Best of Three Showcase Qualifier',
    date: 'May 2, 2026',
    duration: '52:41',
    modeIcon: <ModeIcon />,
    dateLabel: 'Date',
    durationLabel: 'Duration',
  },
  render: (args) => (
    <View style={{ width: 320 }}>
      <MatchInfoRow {...args} />
    </View>
  ),
};
