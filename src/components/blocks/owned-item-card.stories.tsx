import type { Meta, StoryObj } from '@storybook/react';
import { Check, Star } from 'phosphor-react';
import { View } from 'react-native';

import { OwnedItemCard } from '@/components/blocks/owned-item-card';

const playerCardWideArt =
  'https://media.valorant-api.com/playercards/c59b3a9b-467b-54b7-3e4d-a0a3107cbefe/displayicon.png';
const altCardArt =
  'https://media.valorant-api.com/playercards/4909f381-4c51-e0f6-073c-1599eacd1a14/displayicon.png';
const sprayArt =
  'https://media.valorant-api.com/sprays/0a6db78c-48b9-a32d-c47a-82be597584c1/fulltransparenticon.png';
const buddyArt =
  'https://media.valorant-api.com/buddies/levels/1b43fc4b-41a3-0b30-b8e0-65b67e2f2b14/displayicon.png';
const weaponSkinArt =
  'https://media.valorant-api.com/weaponskinlevels/9a03c64b-4e92-e5cf-2f4f-8db3f6f2e80f/displayicon.png';

function EquippedBadge() {
  return <Check size={20} weight="fill" color="#009970" />;
}

function FavoriteBadge() {
  return <Star size={18} weight="fill" color="#f0cb74" />;
}

const meta: Meta<typeof OwnedItemCard> = {
  title: 'Blocks/OwnedItemCard',
  component: OwnedItemCard,
  decorators: [
    (Story) => (
      <View style={{ width: 120 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OwnedItemCard>;

export const PlayerCard: Story = {
  args: {
    iconUrl: playerCardWideArt,
    fill: true,
  },
};

export const Equipped: Story = {
  args: {
    iconUrl: playerCardWideArt,
    fill: true,
    equippedBadge: <EquippedBadge />,
  },
};

export const Favorite: Story = {
  args: {
    iconUrl: altCardArt,
    fill: true,
    favoriteBadge: <FavoriteBadge />,
  },
};

export const EquippedAndFavorite: Story = {
  args: {
    iconUrl: playerCardWideArt,
    fill: true,
    equippedBadge: <EquippedBadge />,
    favoriteBadge: <FavoriteBadge />,
  },
};

export const Selected: Story = {
  args: {
    iconUrl: altCardArt,
    fill: true,
    isSelected: true,
  },
};

export const Spray: Story = {
  args: {
    iconUrl: sprayArt,
    fill: true,
  },
};

export const Buddy: Story = {
  args: {
    iconUrl: buddyArt,
    fill: false,
    remainingCount: 3,
  },
};

export const Depleted: Story = {
  args: {
    iconUrl: buddyArt,
    fill: false,
    isDepleted: true,
    remainingCount: 0,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

/**
 * Weapon skin tile — demonstrates `iconStyle` for per-item
 * scale / translate / rotate transforms. The app's customize picker
 * uses this to position each gun's art nicely inside a square tile.
 */
export const WeaponSkinTransform: Story = {
  args: {
    iconUrl: weaponSkinArt,
    fill: false,
    iconStyle: {
      transform: [{ scale: 2.5 }, { rotate: '20deg' }],
    },
  },
};

/**
 * Picker grid sample — six tiles arranged 3-per-row, matching the
 * `numColumns: 3` layout the customize screen uses for every owned-item
 * picker.
 */
export const Grid: Story = {
  decorators: [],
  argTypes: {
    isLoading: { control: { type: 'boolean' } },
  },
  args: { isLoading: false },
  render: ({ isLoading }) => (
    <View className="flex-row flex-wrap" style={{ width: 360, gap: 8 }}>
      <View style={{ width: 114 }}>
        <OwnedItemCard
          iconUrl={playerCardWideArt}
          fill
          equippedBadge={<EquippedBadge />}
          isLoading={isLoading}
        />
      </View>
      <View style={{ width: 114 }}>
        <OwnedItemCard
          iconUrl={altCardArt}
          fill
          favoriteBadge={<FavoriteBadge />}
          isLoading={isLoading}
        />
      </View>
      <View style={{ width: 114 }}>
        <OwnedItemCard iconUrl={sprayArt} fill isSelected isLoading={isLoading} />
      </View>
      <View style={{ width: 114 }}>
        <OwnedItemCard iconUrl={buddyArt} remainingCount={2} isLoading={isLoading} />
      </View>
      <View style={{ width: 114 }}>
        <OwnedItemCard
          iconUrl={buddyArt}
          isDepleted
          remainingCount={0}
          isLoading={isLoading}
        />
      </View>
      <View style={{ width: 114 }}>
        <OwnedItemCard iconUrl={sprayArt} fill isLoading={isLoading} />
      </View>
    </View>
  ),
};
