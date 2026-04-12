import type { Meta, StoryObj } from '@storybook/react';
import { CaretRight, Crown } from 'phosphor-react';
import { View } from 'react-native';

import { FriendPartyOthersRow } from '@/components/blocks/friend-party-others-row';
import { FriendRow } from '@/components/blocks/friend-row';
import { Separator } from '@/components/ui/separator';

const card1 =
  'https://media.valorant-api.com/playercards/c59b3a9b-467b-54b7-3e4d-a0a3107cbefe/displayicon.png';
const card2 =
  'https://media.valorant-api.com/playercards/4909f381-4c51-e0f6-073c-1599eacd1a14/displayicon.png';
const card3 =
  'https://media.valorant-api.com/playercards/aa82cf03-4a18-4f91-25bc-0387de05c8b5/displayicon.png';
const card4 =
  'https://media.valorant-api.com/playercards/18c1b816-46a2-d16d-8527-ea97eb3cd5b7/displayicon.png';
const card5 =
  'https://media.valorant-api.com/playercards/3c779470-4e2d-7d73-b682-1380e5d3cdae/displayicon.png';

function OwnerCrown() {
  return <Crown size={13} weight="fill" color="#facc15" />;
}

function Chevron() {
  return <CaretRight size={14} weight="bold" color="rgba(237,233,226,0.6)" />;
}

const meta: Meta<typeof FriendRow> = {
  title: 'Blocks/FriendRow',
  component: FriendRow,
  argTypes: {
    status: {
      control: { type: 'inline-radio' },
      options: ['online', 'away', 'busy', 'offline', 'none'],
    },
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
type Story = StoryObj<typeof FriendRow>;

export const InGameValorant: Story = {
  args: {
    name: 'Rick#NA1',
    gameLabel: 'Competitive 11-7 - Ascent',
    status: 'online',
    avatarUrl: card1,
  },
};

export const InAgentSelect: Story = {
  args: {
    name: 'Alex#APAC',
    gameLabel: 'In Agent Select',
    status: 'online',
    avatarUrl: card2,
  },
};

export const PartyOwner: Story = {
  args: {
    name: 'Tia#NA1',
    gameLabel: 'Online',
    status: 'online',
    avatarUrl: card3,
    ownerBadge: <OwnerCrown />,
  },
};

export const Away: Story = {
  args: {
    name: 'Mia#EU1',
    gameLabel: 'Away',
    status: 'away',
    avatarUrl: card4,
  },
};

export const Busy: Story = {
  args: {
    name: 'Sho#JP1',
    gameLabel: 'Busy',
    status: 'busy',
    avatarUrl: card5,
  },
};

export const RiotClient: Story = {
  args: {
    name: 'Val#NA1',
    gameLabel: 'Riot Client',
    status: 'online',
    opacity: 0.8,
  },
};

export const InGameLoL: Story = {
  args: {
    name: 'Ren#KR1',
    gameLabel: 'In Game',
    status: 'online',
    opacity: 0.9,
  },
};

export const Offline: Story = {
  args: {
    name: 'Kai#NA1',
    gameLabel: 'Offline',
    status: 'offline',
    opacity: 0.5,
  },
};

export const WithChevron: Story = {
  args: {
    name: 'Rick#NA1',
    gameLabel: 'Competitive 11-7 - Ascent',
    status: 'online',
    avatarUrl: card1,
    chevron: <Chevron />,
  },
};

export const Loading: Story = {
  args: {
    name: '',
    status: 'none',
    isLoading: true,
  },
};

/**
 * Stacked skeletons the way the friends list renders while roster +
 * presence data is still resolving.
 */
export const LoadingList: Story = {
  decorators: [],
  render: () => (
    <View className="bg-card overflow-hidden rounded-2xl">
      <FriendRow name="" status="none" isLoading />
      <Separator />
      <FriendRow name="" status="none" isLoading />
      <Separator />
      <FriendRow name="" status="none" isLoading />
    </View>
  ),
};

/**
 * Grouped party — party owner at the top, another friend below, then a
 * `FriendPartyOthersRow` summarising non-friend party members, matching
 * how the friends list renders a shared `partyId`.
 */
export const PartyGroup: Story = {
  decorators: [],
  render: () => (
    <View className="bg-card overflow-hidden rounded-2xl">
      <FriendRow
        name="Tia#NA1"
        gameLabel="Competitive 11-7 - Ascent"
        status="online"
        avatarUrl={card3}
        ownerBadge={<OwnerCrown />}
      />
      <Separator />
      <FriendRow
        name="Alex#APAC"
        gameLabel="Competitive 11-7 - Ascent"
        status="online"
        avatarUrl={card2}
      />
      <Separator />
      <FriendPartyOthersRow count={2} label="Other Players" />
    </View>
  ),
};

/**
 * Full list sample — Valorant, LoL, Riot Client, offline — stacked in a
 * single card the way the friends tab composes sections in the app.
 */
export const List: Story = {
  decorators: [],
  render: () => (
    <View className="bg-card overflow-hidden rounded-2xl">
      <FriendRow
        name="Rick#NA1"
        gameLabel="Competitive 11-7 - Ascent"
        status="online"
        avatarUrl={card1}
      />
      <Separator />
      <FriendRow
        name="Alex#APAC"
        gameLabel="In Agent Select"
        status="online"
        avatarUrl={card2}
      />
      <Separator />
      <FriendRow name="Ren#KR1" gameLabel="In Game" status="online" opacity={0.9} />
      <Separator />
      <FriendRow name="Val#NA1" gameLabel="Riot Client" status="online" opacity={0.8} />
      <Separator />
      <FriendRow name="Kai#NA1" gameLabel="Offline" status="offline" opacity={0.5} />
    </View>
  ),
};
