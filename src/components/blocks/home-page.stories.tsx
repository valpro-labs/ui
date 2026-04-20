import type { Meta, StoryObj } from '@storybook/react';
import { CaretRight } from 'phosphor-react';
import { Pressable, ScrollView, View } from 'react-native';

import { DailyProgress } from '@/components/blocks/daily-progress';
import { MissionList } from '@/components/blocks/mission-list';
import { PlayerCard } from '@/components/blocks/player-card';
import { SectionTitle } from '@/components/blocks/section-title';
import { Text } from '@/components/ui/text';

const wideArt =
  'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png';

function Chevron() {
  return <CaretRight size={16} weight="bold" color="rgba(237,233,226,0.6)" />;
}

function Countdown({ text }: { text: string }) {
  return <Text className="text-muted-foreground text-sm tabular-nums">{text}</Text>;
}

const meta: Meta = {
  title: 'Pages/Home',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    isLoading: { control: 'boolean' },
  },
  args: { isLoading: false },
};

export default meta;
type Story = StoryObj<{ isLoading: boolean }>;

/**
 * Home tab composition: `<PlayerCard>` header, dailies (`<DailyProgress>`)
 * with a reset countdown, weekly missions (`<MissionList>`) with a reset
 * countdown, and an "Agents" entry row. The app also renders a party card
 * and battle-pass cards here — both are app-layer components and are left
 * out of this UI-library composition. Toggle `isLoading` in the controls
 * panel to swap every block for its skeleton.
 */
export const Default: Story = {
  render: ({ isLoading }) => (
    <ScrollView className="bg-background flex-1">
      <View className="flex gap-y-4 p-4">
        <PlayerCard
          isLoading={isLoading}
          name="Rick"
          tag="NA1"
          title="Radiant"
          cardWideArt={wideArt}
        />

        <View>
          <SectionTitle
            title="Dailies"
            rightElement={isLoading ? undefined : <Countdown text="18h 42m" />}
          />
          <View className="bg-card overflow-hidden rounded-2xl py-2">
            <DailyProgress
              milestones={
                isLoading
                  ? []
                  : [{ progress: 4 }, { progress: 2 }, { progress: 0 }, { progress: 0 }]
              }
              isLoading={isLoading}
              skeletonCount={4}
            />
          </View>
        </View>

        <View>
          <SectionTitle
            title="Weekly Missions"
            rightElement={isLoading ? undefined : <Countdown text="3d 06h" />}
          />
          <MissionList
            missions={
              isLoading
                ? []
                : [
                    {
                      id: '1',
                      title: 'Get 45 headshots',
                      xpReward: 21300,
                      progress: 18,
                      total: 45,
                      xpLabel: 'XP',
                    },
                    {
                      id: '2',
                      title: 'Play 5 Deathmatch games',
                      xpReward: 8000,
                      progress: 5,
                      total: 5,
                      xpLabel: 'XP',
                    },
                    {
                      id: '3',
                      title: 'Deal 100,000 damage with Rifles',
                      xpReward: 24000,
                      progress: 42000,
                      total: 100000,
                      xpLabel: 'XP',
                    },
                  ]
            }
            isLoading={isLoading}
            skeletonCount={3}
          />
        </View>

        <View>
          <SectionTitle title="Battle Pass" />
          <View className="flex gap-y-2">
            <Pressable
              disabled={isLoading}
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
              <View className="bg-card flex-row items-center justify-between overflow-hidden rounded-2xl p-4">
                <Text className="text-foreground text-lg font-bold tracking-wider uppercase">
                  Agents
                </Text>
                <Chevron />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  ),
};
