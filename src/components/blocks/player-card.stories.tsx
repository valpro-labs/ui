import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { PlayerCard } from '@/components/blocks/player-card';
import { PlayerCardSkeleton } from '@/components/blocks/player-card-skeleton';
import { Text } from '@/components/ui/text';

const LEVEL_BORDER_ICON =
  'https://media.valorant-api.com/levelborders/9c4afb15-40d7-3557-062a-4bb198cb9958/levelnumberappearance.png';

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
    level: 42,
    levelBorderIcon: LEVEL_BORDER_ICON,
    cardWideArt:
      'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png',
  },
};

export const NoTitle: Story = {
  args: {
    name: 'ShahZaM',
    tag: 'NA1',
    level: 38,
    levelBorderIcon: LEVEL_BORDER_ICON,
    cardWideArt:
      'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png',
  },
};

export const LongName: Story = {
  args: {
    name: 'AVeryLongSummonerNameThatShouldTruncate',
    tag: 'LONG',
    title: 'Immortal',
    level: 128,
    levelBorderIcon: LEVEL_BORDER_ICON,
    cardWideArt:
      'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png',
  },
};

export const LongTitle: Story = {
  args: {
    name: 'TenZ',
    tag: 'SEN',
    title: 'A Really Long Player Title That Should Truncate',
    level: 501,
    levelBorderIcon: LEVEL_BORDER_ICON,
    cardWideArt:
      'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png',
  },
};

export const NoArt: Story = {
  args: {
    name: 'Player',
    tag: 'NA1',
    title: 'Unranked',
    level: 1,
    levelBorderIcon: LEVEL_BORDER_ICON,
  },
};

/**
 * Side-by-side comparison of the loaded vs loading state. Both cards
 * should occupy the same frame so the layout doesn't shift once the
 * player data resolves.
 */
export const LoadedVsLoading: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
      <View style={{ flex: 1, gap: 8 }}>
        <Text className="text-muted-foreground text-xs uppercase">Loaded</Text>
        <PlayerCard
          name="TenZ"
          tag="SEN"
          title="Radiant"
          level={42}
          levelBorderIcon={LEVEL_BORDER_ICON}
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
