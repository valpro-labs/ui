import type { Meta, StoryObj } from '@storybook/react';
import { Crown } from 'phosphor-react';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { FriendPartyOthersRow } from '@/components/blocks/friend-party-others-row';
import { FriendRow } from '@/components/blocks/friend-row';
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

function OwnerCrown() {
  return <Crown size={13} weight="fill" color="#facc15" />;
}

function SectionLabel({ title }: { title: string }) {
  return (
    <Text className="text-muted-foreground px-1 pb-1.5 text-sm font-semibold uppercase">
      {title}
    </Text>
  );
}

const meta: Meta = {
  title: 'Pages/Friends',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    isLoading: { control: 'boolean' },
  },
  args: { isLoading: false },
};

export default meta;
type Story = StoryObj<{ isLoading: boolean }>;

/**
 * Friends tab composition: a top card showing the viewer's own presence,
 * then a "Valorant" section split into party card(s) + a solo-friends card,
 * then other-game sections. Mirrors how the friends screen stacks
 * `<FriendRow>` + `<FriendPartyOthersRow>` inside rounded cards with
 * `<Separator>` between rows. Toggle `isLoading` in the controls panel to
 * swap every row for its skeleton.
 */
export const Default: Story = {
  render: ({ isLoading }) => {
    if (isLoading) {
      return (
        <ScrollView className="bg-background flex-1">
          <View className="flex gap-y-4 p-4">
            <View className="bg-card overflow-hidden rounded-2xl">
              <FriendRow name="" status="none" isLoading />
            </View>
            <View>
              <SectionLabel title="Valorant" />
              <View className="flex gap-y-2">
                <View className="bg-card overflow-hidden rounded-2xl">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <Separator />}
                      <FriendRow name="" status="none" isLoading />
                    </React.Fragment>
                  ))}
                </View>
                <View className="bg-card overflow-hidden rounded-2xl">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <Separator />}
                      <FriendRow name="" status="none" isLoading />
                    </React.Fragment>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView className="bg-background flex-1">
        <View className="flex gap-y-4 p-4">
          {/* Me */}
          <View className="bg-card overflow-hidden rounded-2xl">
            <FriendRow
              name="Rick#NA1"
              gameLabel="Competitive 11-7 - Ascent"
              status="online"
              avatarUrl={card1}
            />
          </View>

          {/* Valorant */}
          <View>
            <SectionLabel title="Valorant" />
            <View className="flex gap-y-2">
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

              <View className="bg-card overflow-hidden rounded-2xl">
                <FriendRow
                  name="Mia#EU1"
                  gameLabel="In Agent Select"
                  status="online"
                  avatarUrl={card4}
                />
                <Separator />
                <FriendRow
                  name="Sho#JP1"
                  gameLabel="Away"
                  status="away"
                  avatarUrl={card5}
                />
              </View>
            </View>
          </View>

          {/* Other games */}
          <View>
            <SectionLabel title="Other" />
            <View className="bg-card overflow-hidden rounded-2xl">
              <FriendRow
                name="Ren#KR1"
                gameLabel="In Game"
                status="online"
                opacity={0.9}
              />
              <Separator />
              <FriendRow
                name="Val#NA1"
                gameLabel="Riot Client"
                status="online"
                opacity={0.8}
              />
            </View>
          </View>

          {/* Offline */}
          <View>
            <SectionLabel title="Offline" />
            <View className="bg-card overflow-hidden rounded-2xl">
              <FriendRow name="Kai#NA1" gameLabel="Offline" status="offline" opacity={0.5} />
              <Separator />
              <FriendRow name="Leo#BR1" gameLabel="Offline" status="offline" opacity={0.5} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  },
};
