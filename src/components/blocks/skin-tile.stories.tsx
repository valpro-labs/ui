import type { Meta, StoryObj } from '@storybook/react';
import { Check, Lock, Star } from 'phosphor-react';
import { View } from 'react-native';

import { SkinTile } from '@/components/blocks/skin-tile';

const swatchArt =
  'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/swatch.png';
const altSwatchArt =
  'https://media.valorant-api.com/weaponskinchromas/6d785ae8-4332-9946-e491-368a5fab442d/swatch.png';

function LockIcon() {
  return <Lock size={12} weight="fill" color="white" />;
}

function CheckIcon() {
  return <Check size={12} weight="bold" color="white" />;
}

function FavoriteBadge() {
  return <Star size={12} weight="fill" color="#f0cb74" />;
}

const meta: Meta<typeof SkinTile> = {
  title: 'Blocks/SkinTile',
  component: SkinTile,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SkinTile>;

export const LevelLocked: Story = {
  args: {
    stateIcon: <LockIcon />,
  },
};

export const LevelOwned: Story = {
  args: {},
};

export const LevelEquipped: Story = {
  args: {
    stateIcon: <CheckIcon />,
  },
};

export const LevelSelected: Story = {
  args: {
    isSelected: true,
    stateIcon: <CheckIcon />,
  },
};

export const ChromaLocked: Story = {
  args: {
    swatchUrl: swatchArt,
    stateIcon: <LockIcon />,
  },
};

export const ChromaEquipped: Story = {
  args: {
    swatchUrl: swatchArt,
    stateIcon: <CheckIcon />,
  },
};

export const ChromaSelected: Story = {
  args: {
    swatchUrl: altSwatchArt,
    isSelected: true,
    stateIcon: <CheckIcon />,
  },
};

export const ChromaFavorited: Story = {
  args: {
    swatchUrl: swatchArt,
    favoriteBadge: <FavoriteBadge />,
  },
};

export const ChromaEquippedAndFavorited: Story = {
  args: {
    swatchUrl: swatchArt,
    stateIcon: <CheckIcon />,
    favoriteBadge: <FavoriteBadge />,
  },
};

/**
 * Typical weapon detail layout — four levels followed by three chroma
 * variants, laid out `flex-row flex-wrap gap-2` like the source view.
 */
export const DetailRow: Story = {
  decorators: [],
  render: () => (
    <View style={{ padding: 16, width: 280 }}>
      <View className="flex-row flex-wrap" style={{ gap: 8 }}>
        <SkinTile stateIcon={<CheckIcon />} />
        <SkinTile stateIcon={<CheckIcon />} />
        <SkinTile isSelected stateIcon={<CheckIcon />} />
        <SkinTile stateIcon={<LockIcon />} />
      </View>
      <View className="flex-row flex-wrap" style={{ gap: 8, marginTop: 8 }}>
        <SkinTile swatchUrl={swatchArt} isSelected stateIcon={<CheckIcon />} />
        <SkinTile swatchUrl={altSwatchArt} favoriteBadge={<FavoriteBadge />} />
        <SkinTile swatchUrl={swatchArt} stateIcon={<LockIcon />} />
      </View>
    </View>
  ),
};
