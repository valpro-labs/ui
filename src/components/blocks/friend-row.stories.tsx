import type { Meta, StoryObj } from '@storybook/react';
import { CaretRight, Crown } from 'phosphor-react';
import { ScrollView, View } from 'react-native';

import { FriendPartyOthersRow } from '@/components/blocks/friend-party-others-row';
import { FriendRow, type FriendRowSize } from '@/components/blocks/friend-row';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';

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

function OwnerCrown({ size = 'regular' }: { size?: FriendRowSize }) {
  return <Crown size={size === 'large' ? 15 : 13} weight="fill" color="#facc15" />;
}

function Chevron({ size = 'regular' }: { size?: FriendRowSize }) {
  return (
    <CaretRight
      size={size === 'large' ? 16 : 14}
      weight="bold"
      color="rgba(237,233,226,0.6)"
    />
  );
}

function SectionLabel({
  title,
  size = 'regular',
}: {
  title: string;
  size?: FriendRowSize;
}) {
  return (
    <Text
      className={
        size === 'large'
          ? 'text-muted-foreground px-1.5 pb-2 text-base font-semibold uppercase'
          : 'text-muted-foreground px-1 pb-1.5 text-sm font-semibold uppercase'
      }>
      {title}
    </Text>
  );
}

const meta: Meta<typeof FriendRow> = {
  title: 'Blocks/FriendRow',
  component: FriendRow,
  argTypes: {
    status: {
      control: { type: 'inline-radio' },
      options: ['online', 'away', 'busy', 'offline', 'none'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['regular', 'large'],
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

export const WithoutAvatar: Story = {
  args: {
    name: 'Ren#KR1',
    gameLabel: 'In Game',
    status: 'online',
    opacity: 0.9,
  },
};

export const OnlineMissingAvatar: Story = {
  args: {
    name: 'Nia#NA1',
    gameLabel: 'Online',
    status: 'online',
    showAvatarPlaceholder: true,
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
 * Toggle `isLoading` in the controls panel to swap every row for its
 * skeleton.
 */
export const List: Story = {
  argTypes: {
    isLoading: { control: { type: 'boolean' } },
  },
  args: { isLoading: false },
  decorators: [],
  render: ({ isLoading }) => (
    <View className="bg-card overflow-hidden rounded-2xl">
      <FriendRow
        name="Rick#NA1"
        gameLabel="Competitive 11-7 - Ascent"
        status="online"
        avatarUrl={card1}
        isLoading={isLoading}
      />
      <Separator />
      <FriendRow
        name="Alex#APAC"
        gameLabel="In Agent Select"
        status="online"
        avatarUrl={card2}
        isLoading={isLoading}
      />
      <Separator />
      <FriendRow
        name="Ren#KR1"
        gameLabel="In Game"
        status="online"
        opacity={0.9}
        isLoading={isLoading}
      />
      <Separator />
      <FriendRow
        name="Val#NA1"
        gameLabel="Riot Client"
        status="online"
        opacity={0.8}
        isLoading={isLoading}
      />
      <Separator />
      <FriendRow
        name="Kai#NA1"
        gameLabel="Offline"
        status="offline"
        opacity={0.5}
        isLoading={isLoading}
      />
    </View>
  ),
};

/**
 * iPad layout sample — keeps the friends list as a single vertical stack,
 * but uses larger row density and a centered tablet content width.
 */
export const IPadLayout: Story = {
  name: 'iPad layout',
  globals: { viewport: { value: 'iPadAir11M4', isRotated: false } },
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPadAir11M4' },
  },
  argTypes: {
    isLoading: { control: { type: 'boolean' } },
  },
  args: { isLoading: false },
  decorators: [],
  render: ({ isLoading }) => (
    <ScrollView className="bg-background flex-1">
      <View
        style={{
          width: '100%',
          maxWidth: 600,
          alignSelf: 'center',
          padding: 24,
          gap: 16,
        }}>
        <View className="bg-card overflow-hidden rounded-2xl">
          <FriendRow
            name="Rick#NA1"
            gameLabel="Competitive 11-7 - Ascent"
            status="online"
            avatarUrl={card1}
            size="large"
            chevron={<Chevron size="large" />}
            isLoading={isLoading}
          />
        </View>

        <View>
          <SectionLabel title="Valorant" size="large" />
          <View className="bg-card overflow-hidden rounded-2xl">
            <FriendRow
              name="Tia#NA1"
              gameLabel="Competitive 11-7 - Ascent"
              status="online"
              avatarUrl={card3}
              ownerBadge={<OwnerCrown size="large" />}
              size="large"
              isLoading={isLoading}
            />
            <Separator />
            <FriendRow
              name="Alex#APAC"
              gameLabel="Competitive 11-7 - Ascent"
              status="online"
              avatarUrl={card2}
              size="large"
              isLoading={isLoading}
            />
            <Separator />
            <FriendPartyOthersRow count={2} label="Other Players" size="large" />
          </View>
        </View>

        <View>
          <SectionLabel title="Queue" size="large" />
          <View className="bg-card overflow-hidden rounded-2xl">
            <FriendRow
              name="Mia#EU1"
              gameLabel="In Agent Select"
              status="online"
              avatarUrl={card4}
              size="large"
              isLoading={isLoading}
            />
            <Separator />
            <FriendRow
              name="Sho#JP1"
              gameLabel="Away"
              status="away"
              avatarUrl={card5}
              size="large"
              isLoading={isLoading}
            />
          </View>
        </View>

        <View>
          <SectionLabel title="Other" size="large" />
          <View className="bg-card overflow-hidden rounded-2xl">
            <FriendRow
              name="Ren#KR1"
              gameLabel="In Game"
              status="online"
              opacity={0.9}
              size="large"
              isLoading={isLoading}
            />
            <Separator />
            <FriendRow
              name="Val#NA1"
              gameLabel="Riot Client"
              status="online"
              opacity={0.8}
              size="large"
              isLoading={isLoading}
            />
          </View>
        </View>

        <View>
          <SectionLabel title="Offline" size="large" />
          <View className="bg-card overflow-hidden rounded-2xl">
            <FriendRow
              name="Kai#NA1"
              gameLabel="Offline"
              status="offline"
              opacity={0.5}
              size="large"
              isLoading={isLoading}
            />
            <Separator />
            <FriendRow
              name="Leo#BR1"
              gameLabel="Offline"
              status="offline"
              opacity={0.5}
              size="large"
              isLoading={isLoading}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  ),
};
