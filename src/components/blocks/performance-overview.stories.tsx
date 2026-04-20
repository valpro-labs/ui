import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { PerformanceOverview } from '@/components/blocks/performance-overview';
import { SectionTitle } from '@/components/blocks/section-title';

const meta: Meta<typeof PerformanceOverview> = {
  title: 'Blocks/PerformanceOverview',
  component: PerformanceOverview,
};

export default meta;
type Story = StoryObj<typeof PerformanceOverview>;

export const AllyAhead: Story = {
  args: {
    rows: [
      { label: 'Kills', allyValue: 78, enemyValue: 54 },
      { label: 'Deaths', allyValue: 54, enemyValue: 78 },
      { label: 'Assists', allyValue: 34, enemyValue: 22 },
    ],
  },
};

export const EnemyAhead: Story = {
  args: {
    rows: [
      { label: 'Kills', allyValue: 41, enemyValue: 65 },
      { label: 'Deaths', allyValue: 65, enemyValue: 41 },
      { label: 'Assists', allyValue: 18, enemyValue: 30 },
    ],
  },
};

export const Even: Story = {
  args: {
    rows: [
      { label: 'Kills', allyValue: 50, enemyValue: 50 },
      { label: 'Deaths', allyValue: 50, enemyValue: 50 },
      { label: 'Assists', allyValue: 20, enemyValue: 20 },
    ],
  },
};

export const AllZero: Story = {
  args: {
    rows: [
      { label: 'Kills', allyValue: 0, enemyValue: 0 },
      { label: 'Deaths', allyValue: 0, enemyValue: 0 },
      { label: 'Assists', allyValue: 0, enemyValue: 0 },
    ],
  },
};

/**
 * Full composition used on the match-detail screen — `<SectionTitle>`
 * header on top of the performance card.
 */
export const WithSectionHeader: Story = {
  render: () => (
    <View>
      <SectionTitle title="Team Performance" />
      <PerformanceOverview
        rows={[
          { label: 'Kills', allyValue: 78, enemyValue: 54 },
          { label: 'Deaths', allyValue: 54, enemyValue: 78 },
          { label: 'Assists', allyValue: 34, enemyValue: 22 },
        ]}
      />
    </View>
  ),
};
