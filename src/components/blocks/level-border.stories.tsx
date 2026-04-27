import type { Meta, StoryObj } from '@storybook/react';

import { LevelBorder } from '@/components/blocks/level-border';

const LEVEL_BORDER_ICON =
  'https://media.valorant-api.com/levelborders/9c4afb15-40d7-3557-062a-4bb198cb9958/levelnumberappearance.png';

const meta: Meta<typeof LevelBorder> = {
  title: 'Blocks/LevelBorder',
  component: LevelBorder,
};

export default meta;
type Story = StoryObj<typeof LevelBorder>;

export const Default: Story = {
  args: {
    level: 42,
    borderIcon: LEVEL_BORDER_ICON,
  },
};

export const LargeLevel: Story = {
  args: {
    level: 501,
    borderIcon: LEVEL_BORDER_ICON,
  },
};

export const NoBorderIcon: Story = {
  args: {
    level: 1,
  },
};
