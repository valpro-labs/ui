import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { RewardItem } from '@/components/blocks/reward-item';
import { Separator } from '@/components/ui/separator';
import { getCompactWeaponIconStyle } from '@/lib/weapon-grid-transform';

const gunBuddy =
  'https://media.valorant-api.com/buddylevels/6c3b1a9e-4067-7ed6-fc6c-fea61e0a057c/displayicon.png';
const spray =
  'https://media.valorant-api.com/sprays/fef66645-4e35-ff38-1b7c-799dd5fc7468/fulltransparenticon.png';
const playerCard =
  'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/displayicon.png';
const titleGlyph =
  'https://media.valorant-api.com/playertitles/d13e579c-435e-44d4-cec2-6eae5a3c5ed4/displayicon.png';
const kingdomCredits =
  'https://media.valorant-api.com/currencies/85ca954a-41f2-ce94-9b45-8ca3dd39a00d/displayicon.png';
const radianite =
  'https://media.valorant-api.com/currencies/e59aa87c-4cbf-517a-5983-6e81511be9b7/displayicon.png';
const flex =
  'https://media.valorant-api.com/flex/fc33f376-4a58-687c-6961-bd8a7e529346/displayicon.png';
const vandalUuid = '9c82e19d-4575-0200-1a81-3eacf00cf872';
const vandal =
  `https://media.valorant-api.com/weapons/${vandalUuid}/displayicon.png`;

const meta: Meta<typeof RewardItem> = {
  title: 'Blocks/RewardItem',
  component: RewardItem,
  argTypes: {
    amount: { control: { type: 'number', min: 1, max: 5000, step: 50 } },
    xp: { control: { type: 'number', min: 0, max: 20000, step: 500 } },
    progressionXp: { control: { type: 'number', min: 0, max: 20000, step: 500 } },
  },
  decorators: [
    (Story) => (
      <View className="bg-card overflow-hidden rounded-2xl">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RewardItem>;

export const Default: Story = {
  args: {
    iconUrl: gunBuddy,
    iconSize: '50%',
    name: 'Prime Gun Buddy',
    tierLabel: 'TIER 12',
  },
};

export const Completed: Story = {
  args: {
    iconUrl: playerCard,
    name: 'Sovereign Player Card',
    tierLabel: 'TIER 8',
    isCompleted: true,
  },
};

export const Next: Story = {
  args: {
    iconUrl: spray,
    name: 'Victory Spray',
    tierLabel: 'TIER 13',
    isNext: true,
    xp: 5000,
    progressionXp: 1750,
  },
};

export const Amount: Story = {
  args: {
    iconUrl: radianite,
    iconSize: '50%',
    name: 'Radianite Points',
    amount: 10,
    tierLabel: 'TIER 3',
    tinted: true,
  },
};

export const Tinted: Story = {
  args: {
    iconUrl: titleGlyph,
    iconSize: '50%',
    name: 'Spike Sheriff',
    tierLabel: 'TIER 20',
    tinted: true,
  },
};

export const HideTier: Story = {
  args: {
    iconUrl: gunBuddy,
    iconSize: '50%',
    name: 'Free Reward',
    tierLabel: ' ',
    hideTier: true,
  },
};

export const Currency: Story = {
  args: {
    iconUrl: kingdomCredits,
    iconSize: '50%',
    name: 'Kingdom Credits',
    amount: 2500,
    tierLabel: 'TIER 18',
    tinted: true,
  },
};

export const PlayerCard: Story = {
  args: {
    iconUrl: playerCard,
    name: 'Sovereign Player Card',
    tierLabel: 'TIER 8',
  },
};

export const Flex: Story = {
  args: {
    iconUrl: flex,
    name: 'A Good Stretch',
    tierLabel: 'TIER 21',
  },
};

export const Weapon: Story = {
  args: {
    iconUrl: vandal,
    iconStyle: getCompactWeaponIconStyle(vandalUuid),
    name: 'Vandal',
    tierLabel: 'TIER 15',
  },
};

/**
 * Full reward list mimicking the battle-pass chapter layout — completed,
 * next-in-progress, and upcoming rows stacked with separators between.
 */
export const AsList: Story = {
  decorators: [],
  render: () => (
    <View className="bg-card overflow-hidden rounded-2xl">
      <RewardItem iconUrl={playerCard} name="Sovereign Player Card" tierLabel="TIER 8" isCompleted />
      <Separator />
      <RewardItem iconUrl={spray} name="Radianite Points" amount={10} tierLabel="TIER 9" isCompleted />
      <Separator />
      <RewardItem
        iconUrl={gunBuddy}
        iconSize="50%"
        name="Prime Gun Buddy"
        tierLabel="TIER 10"
        isNext
        xp={5000}
        progressionXp={1750}
      />
      <Separator />
      <RewardItem
        iconUrl={vandal}
        iconStyle={getCompactWeaponIconStyle(vandalUuid)}
        name="Vandal"
        tierLabel="TIER 11"
      />
      <Separator />
      <RewardItem iconUrl={titleGlyph} iconSize="50%" name="Spike Sheriff" tierLabel="TIER 11" tinted />
      <Separator />
      <RewardItem iconUrl={spray} name="Victory Spray" tierLabel="TIER 12" />
    </View>
  ),
};

export const MixedTypes: Story = {
  decorators: [],
  render: () => (
    <View className="bg-card overflow-hidden rounded-2xl">
      <RewardItem iconUrl={playerCard} name="Sovereign Player Card" tierLabel="TIER 8" />
      <Separator />
      <RewardItem iconUrl={spray} name="Victory Spray" tierLabel="TIER 9" />
      <Separator />
      <RewardItem iconUrl={gunBuddy} iconSize="50%" name="Prime Gun Buddy" tierLabel="TIER 10" />
      <Separator />
      <RewardItem
        iconUrl={vandal}
        iconStyle={getCompactWeaponIconStyle(vandalUuid)}
        name="Vandal"
        tierLabel="TIER 11"
      />
      <Separator />
      <RewardItem iconUrl={titleGlyph} iconSize="50%" name="Spike Sheriff" tierLabel="TIER 12" tinted />
      <Separator />
      <RewardItem
        iconUrl={kingdomCredits}
        iconSize="50%"
        name="Kingdom Credits"
        amount={2500}
        tierLabel="TIER 13"
        tinted
      />
      <Separator />
      <RewardItem
        iconUrl={radianite}
        iconSize="50%"
        name="Radianite Points"
        amount={10}
        tierLabel="TIER 14"
        tinted
      />
      <Separator />
      <RewardItem iconUrl={flex} name="A Good Stretch" tierLabel="TIER 15" />
    </View>
  ),
};
