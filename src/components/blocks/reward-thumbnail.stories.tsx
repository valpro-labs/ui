import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { OwnedItemCard } from '@/components/blocks/owned-item-card';
import { getWeaponGridIconStyle } from '@/lib/weapon-grid-transform';

// Base weapon UUIDs — used for getWeaponGridIconStyle (transform lookup)
const VANDAL_UUID = '9c82e19d-4575-0200-1a81-3eacf00cf872';
const PHANTOM_UUID = 'ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a';
const OPERATOR_UUID = 'a03b24d3-4319-996d-0f8c-94bbfba1dfc7';

const weaponIcon = (uuid: string) =>
  `https://media.valorant-api.com/weapons/${uuid}/displayicon.png`;

const ICONS = {
  gunBuddy:
    'https://media.valorant-api.com/buddylevels/6c3b1a9e-4067-7ed6-fc6c-fea61e0a057c/displayicon.png',
  spray:
    'https://media.valorant-api.com/sprays/fef66645-4e35-ff38-1b7c-799dd5fc7468/fulltransparenticon.png',
  playerCard:
    'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/displayicon.png',
  // Kingdom Credits
  kingdomCredits:
    'https://media.valorant-api.com/currencies/85ca954a-41f2-ce94-9b45-8ca3dd39a00d/displayicon.png',
  // Radianite Points
  radianite:
    'https://media.valorant-api.com/currencies/e59aa87c-4cbf-517a-5983-6e81511be9b7/displayicon.png',
  flex: 'https://media.valorant-api.com/flex/fc33f376-4a58-687c-6961-bd8a7e529346/displayicon.png',
  vandal: weaponIcon(VANDAL_UUID),
  phantom: weaponIcon(PHANTOM_UUID),
  operator: weaponIcon(OPERATOR_UUID),
};

const meta: Meta<typeof OwnedItemCard> = {
  title: 'Blocks/RewardThumbnail',
  component: OwnedItemCard,
  argTypes: {
    xp: { control: { type: 'number', min: 0, max: 20000, step: 500 } },
    progressionXp: { control: { type: 'number', min: 0, max: 20000, step: 500 } },
  },
  decorators: [
    (Story) => (
      <View style={{ width: 130 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OwnedItemCard>;

// ── Per-type variants ────────────────────────────────────────────────────────

export const Spray: Story = {
  args: { iconUrl: ICONS.spray },
};

export const PlayerCard: Story = {
  args: { iconUrl: ICONS.playerCard },
};

/** Gun buddy — 50% small inset */
export const GunBuddy: Story = {
  args: { iconUrl: ICONS.gunBuddy, iconSize: '50%' },
};

/** Kingdom Credits — 50% small inset, tinted */
export const KingdomCredits: Story = {
  args: { iconUrl: ICONS.kingdomCredits, iconSize: '50%', tinted: true },
};

/** Radianite Points — 50% small inset, tinted */
export const Radianite: Story = {
  args: { iconUrl: ICONS.radianite, iconSize: '50%', tinted: true },
};

export const Flex: Story = {
  args: { iconUrl: ICONS.flex },
};

export const WeaponVandal: Story = {
  name: 'Weapon — Vandal',
  args: {
    iconUrl: ICONS.vandal,
    iconStyle: getWeaponGridIconStyle(VANDAL_UUID),
  },
};

export const WeaponPhantom: Story = {
  name: 'Weapon — Phantom',
  args: {
    iconUrl: ICONS.phantom,
    iconStyle: getWeaponGridIconStyle(PHANTOM_UUID),
  },
};

export const WeaponOperator: Story = {
  name: 'Weapon — Operator',
  args: {
    iconUrl: ICONS.operator,
    iconStyle: getWeaponGridIconStyle(OPERATOR_UUID),
  },
};

// ── Progress states ──────────────────────────────────────────────────────────

export const Completed: Story = {
  args: { iconUrl: ICONS.spray, isCompleted: true },
};

export const InProgress: Story = {
  args: {
    iconUrl: ICONS.gunBuddy,
    iconSize: '50%',
    xp: 5000,
    progressionXp: 1750,
  },
};

export const Pending: Story = {
  args: { iconUrl: ICONS.playerCard, progressionXp: 0, xp: 5000 },
};

export const Missing: Story = {
  args: { iconUrl: undefined },
};

// ── Full grid ────────────────────────────────────────────────────────────────

/** 3-column grid — every reward type with mixed progress states. */
export const Grid: Story = {
  decorators: [],
  render: () => (
    <View className="flex-row flex-wrap" style={{ width: 390 }}>
      {(
        [
          { iconUrl: ICONS.playerCard, isCompleted: true },
          { iconUrl: ICONS.gunBuddy, iconSize: '50%' as const, xp: 5000, progressionXp: 1750 },
          { iconUrl: ICONS.spray, progressionXp: 0, xp: 5000 },
          { iconUrl: ICONS.kingdomCredits, iconSize: '50%' as const, tinted: true, progressionXp: 0, xp: 5000 },
          { iconUrl: ICONS.radianite, iconSize: '50%' as const, tinted: true, progressionXp: 0, xp: 5000 },
          { iconUrl: ICONS.flex, progressionXp: 0, xp: 5000 },
          { iconUrl: ICONS.vandal, iconStyle: getWeaponGridIconStyle(VANDAL_UUID), progressionXp: 0, xp: 5000 },
          { iconUrl: ICONS.phantom, iconStyle: getWeaponGridIconStyle(PHANTOM_UUID), progressionXp: 0, xp: 5000 },
          { iconUrl: ICONS.operator, iconStyle: getWeaponGridIconStyle(OPERATOR_UUID), progressionXp: 0, xp: 5000 },
        ] satisfies React.ComponentProps<typeof OwnedItemCard>[]
      ).map((item, i) => (
        <View key={i} style={{ width: '33.33%', padding: 4 }}>
          <OwnedItemCard {...item} />
        </View>
      ))}
    </View>
  ),
};
