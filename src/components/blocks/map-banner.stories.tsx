import type { Meta, StoryObj } from '@storybook/react';

import { MapBanner } from '@/components/blocks/map-banner';

const ascentSplash =
  'https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/splash.png';
const bindSplash =
  'https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/splash.png';
const havenSplash =
  'https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/splash.png';

const meta: Meta<typeof MapBanner> = {
  title: 'Blocks/MapBanner',
  component: MapBanner,
  argTypes: {
    result: { control: { type: 'inline-radio' }, options: ['win', 'loss', 'draw'] },
    myTeamScore: { control: { type: 'number', min: 0, max: 30, step: 1 } },
    enemyTeamScore: { control: { type: 'number', min: 0, max: 30, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof MapBanner>;

export const Victory: Story = {
  args: {
    splashUrl: ascentSplash,
    mapName: 'Ascent',
    outcomeLabel: 'VICTORY',
    result: 'win',
    myTeamScore: 13,
    enemyTeamScore: 9,
  },
};

export const Defeat: Story = {
  args: {
    splashUrl: bindSplash,
    mapName: 'Bind',
    outcomeLabel: 'DEFEAT',
    result: 'loss',
    myTeamScore: 7,
    enemyTeamScore: 13,
  },
};

export const Draw: Story = {
  args: {
    splashUrl: havenSplash,
    mapName: 'Haven',
    outcomeLabel: 'DRAW',
    result: 'draw',
    myTeamScore: 12,
    enemyTeamScore: 12,
  },
};

export const DeathmatchWin: Story = {
  args: {
    splashUrl: ascentSplash,
    mapName: 'Ascent',
    placementLabel: '1ST',
    result: 'win',
  },
};

export const DeathmatchPlacement: Story = {
  args: {
    splashUrl: havenSplash,
    mapName: 'Haven',
    placementLabel: '4TH',
    result: 'draw',
  },
};

export const NoSplash: Story = {
  args: {
    mapName: 'Unknown Map',
    outcomeLabel: 'VICTORY',
    result: 'win',
    myTeamScore: 13,
    enemyTeamScore: 11,
  },
};
