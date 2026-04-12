import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { RewardItem } from '@/components/blocks/reward-item';
import { Separator } from '@/components/ui/separator';

const gunBuddy =
  'https://media.valorant-api.com/buddies/levels/a9c1a086-4367-8b9a-6ebc-3e8bd861e3a2/displayicon.png';
const spray =
  'https://media.valorant-api.com/sprays/fef66645-4e35-ff38-1b7c-799dd5fc7468/fulltransparenticon.png';
const playerCard =
  'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/displayicon.png';
const titleGlyph =
  'https://media.valorant-api.com/playertitles/d13e579c-435e-44d4-cec2-6eae5a3c5ed4/displayicon.png';

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
    iconUrl: spray,
    name: 'Radianite Points',
    amount: 10,
    tierLabel: 'TIER 3',
  },
};

export const Tinted: Story = {
  args: {
    iconUrl: titleGlyph,
    name: 'Spike Sheriff',
    tierLabel: 'TIER 20',
    tinted: true,
  },
};

export const HideTier: Story = {
  args: {
    iconUrl: gunBuddy,
    name: 'Free Reward',
    tierLabel: ' ',
    hideTier: true,
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
        name="Prime Gun Buddy"
        tierLabel="TIER 10"
        isNext
        xp={5000}
        progressionXp={1750}
      />
      <Separator />
      <RewardItem iconUrl={titleGlyph} name="Spike Sheriff" tierLabel="TIER 11" tinted />
      <Separator />
      <RewardItem iconUrl={spray} name="Victory Spray" tierLabel="TIER 12" />
    </View>
  ),
};
