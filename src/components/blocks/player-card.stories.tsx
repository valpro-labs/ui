import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { PlayerCard } from '@/components/blocks/player-card';
import { PlayerCardSkeleton } from '@/components/blocks/player-card-skeleton';
import { Text } from '@/components/ui/text';

const meta: Meta<typeof PlayerCard> = {
  title: 'Blocks/PlayerCard',
  component: PlayerCard,
};

export default meta;
type Story = StoryObj<typeof PlayerCard>;

export const Default: Story = {
  args: {
    name: 'TenZ',
    tag: 'SEN',
    title: 'Radiant',
    cardWideArt:
      'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png',
  },
};

export const NoTitle: Story = {
  args: {
    name: 'ShahZaM',
    tag: 'NA1',
    cardWideArt:
      'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png',
  },
};

export const LongName: Story = {
  args: {
    name: 'AVeryLongSummonerNameThatShouldTruncate',
    tag: 'LONG',
    title: 'Immortal',
    cardWideArt:
      'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png',
  },
};

export const NoArt: Story = {
  args: {
    name: 'Player',
    tag: 'NA1',
    title: 'Unranked',
  },
};

/**
 * Side-by-side comparison of the loaded vs loading state. Both cards
 * should occupy the same frame so the layout doesn't shift once the
 * player data resolves.
 */
export const LoadedVsLoading: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  parameters: { viewport: { defaultViewport: 'desktop' } },
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
      <View style={{ flex: 1, gap: 8 }}>
        <Text className="text-muted-foreground text-xs uppercase">Loaded</Text>
        <PlayerCard
          name="TenZ"
          tag="SEN"
          title="Radiant"
          cardWideArt="https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png"
        />
      </View>
      <View style={{ flex: 1, gap: 8 }}>
        <Text className="text-muted-foreground text-xs uppercase">Loading</Text>
        <PlayerCardSkeleton />
      </View>
    </View>
  ),
};
