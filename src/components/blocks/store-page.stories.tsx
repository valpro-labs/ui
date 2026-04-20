import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { AccessoryCard } from '@/components/blocks/accessory-card';
import { BundleCard } from '@/components/blocks/bundle-card';
import { OfferCard } from '@/components/blocks/offer-card';
import { SectionTitle } from '@/components/blocks/section-title';
import { Wallet } from '@/components/blocks/wallet';
import { Text } from '@/components/ui/text';

// ── Currencies ──────────────────────────────────────────────────────────────
const valorantPoints =
  'https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png';
const radianitePoints =
  'https://media.valorant-api.com/currencies/e59aa87c-4cbf-517a-5983-6e81511be9b7/displayicon.png';
const kingdomCredits =
  'https://media.valorant-api.com/currencies/85ca954a-41f2-ce94-9b45-8ca3dd39a00d/displayicon.png';

// ── Daily offer skins ───────────────────────────────────────────────────────
const vandalChroma =
  'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png';
const frenzyChroma =
  'https://media.valorant-api.com/weaponskinchromas/b8ddad9b-4622-3e0e-6821-56bf2e901bcf/fullrender.png';
const goOperatorChroma =
  'https://media.valorant-api.com/weaponskinchromas/5220f477-4fbb-cfb6-60ce-ddb7bd215a66/fullrender.png';
const doombringerChroma =
  'https://media.valorant-api.com/weaponskinchromas/6d785ae8-4332-9946-e491-368a5fab442d/fullrender.png';

const selectTierIcon =
  'https://media.valorant-api.com/contenttiers/12683d76-48d7-84a3-4e09-6985794f0445/displayicon.png';
const deluxeTierIcon =
  'https://media.valorant-api.com/contenttiers/0cebb8be-46d7-c12a-d306-e9907bfc5a25/displayicon.png';
const premiumTierIcon =
  'https://media.valorant-api.com/contenttiers/60bca009-4182-7998-dee7-b8a2558dc369/displayicon.png';
const exclusiveTierIcon =
  'https://media.valorant-api.com/contenttiers/e046854e-406c-37f4-6607-19a9ba8426fc/displayicon.png';

// ── Bundles ─────────────────────────────────────────────────────────────────
const rgxBundleArt =
  'https://media.valorant-api.com/bundles/35815cab-429d-79e4-43f5-e0af8fdac22b/displayicon.png';
const altitudeBundleArt =
  'https://media.valorant-api.com/bundles/a4937ee9-4148-8ff2-2c11-c28891880306/displayicon.png';

// ── Accessories ─────────────────────────────────────────────────────────────
const sprayIcon =
  'https://media.valorant-api.com/sprays/7e2ba2e8-4597-060a-b41e-81acedca414e/displayicon.png';
const buddyIcon =
  'https://media.valorant-api.com/buddylevels/6c3b1a9e-4067-7ed6-fc6c-fea61e0a057c/displayicon.png';
const playerCardIcon =
  'https://media.valorant-api.com/playercards/c59b3a9b-467b-54b7-3e4d-a0a3107cbefe/largeart.png';

function Countdown({ text }: { text: string }) {
  return <Text className="text-muted-foreground text-sm tabular-nums">{text}</Text>;
}

const meta: Meta = {
  title: 'Pages/Store',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    isLoading: { control: 'boolean' },
  },
  args: { isLoading: false },
};

export default meta;
type Story = StoryObj<{ isLoading: boolean }>;

/**
 * Store tab composition: `<Wallet>` on top, then Daily Offers
 * (`<OfferCard>` list with reset countdown), Featured (`<BundleCard>`
 * grid), and Accessories (`<AccessoryCard>` list with reset countdown).
 * Toggle `isLoading` in the controls panel to swap every card for its
 * skeleton.
 */
export const Default: Story = {
  render: ({ isLoading }) => (
    <ScrollView className="bg-background flex-1">
      <View className="p-4" style={{ gap: 16 }}>
        <Wallet
          balances={[
            { key: 'vp', iconUrl: valorantPoints, amount: 5175 },
            { key: 'rp', iconUrl: radianitePoints, amount: 420 },
            { key: 'kc', iconUrl: kingdomCredits, amount: 12850 },
          ]}
          isLoading={isLoading}
        />

        <View>
          <SectionTitle title="Daily Offers" rightElement={<Countdown text="18h 42m" />} />
          <View style={{ gap: 8 }}>
            <OfferCard
              name="Immortalized Vandal"
              iconUrl={vandalChroma}
              tierIconUrl={selectTierIcon}
              tierColor="5a9fe233"
              currencyIconUrl={valorantPoints}
              price={1775}
              weaponCategory="EEquippableCategory::Rifle"
              isLoading={isLoading}
            />
            <OfferCard
              name="Task Force 809 Frenzy"
              iconUrl={frenzyChroma}
              tierIconUrl={deluxeTierIcon}
              tierColor="00958733"
              currencyIconUrl={valorantPoints}
              price={1275}
              weaponCategory="EEquippableCategory::Sidearm"
              isLoading={isLoading}
            />
            <OfferCard
              name="Valorant Go! Vol. 2 Operator"
              iconUrl={goOperatorChroma}
              tierIconUrl={premiumTierIcon}
              tierColor="d1548d33"
              currencyIconUrl={valorantPoints}
              price={2175}
              discount={25}
              weaponCategory="EEquippableCategory::Sniper"
              isLoading={isLoading}
            />
            <OfferCard
              name="Doombringer Odin"
              iconUrl={doombringerChroma}
              tierIconUrl={exclusiveTierIcon}
              tierColor="f5955b33"
              currencyIconUrl={valorantPoints}
              price={2475}
              weaponCategory="EEquippableCategory::Heavy"
              isLoading={isLoading}
            />
          </View>
        </View>

        <View>
          <SectionTitle title="Featured" />
          <View style={{ gap: 8 }}>
            <BundleCard
              name="RGX 11z Pro"
              iconUrl={rgxBundleArt}
              currencyIconUrl={valorantPoints}
              price={8700}
              countdownText="2d 14h"
              isLoading={isLoading}
            />
            <BundleCard
              name="Altitude"
              iconUrl={altitudeBundleArt}
              currencyIconUrl={valorantPoints}
              price={7440}
              countdownText="5d 8h"
              isLoading={isLoading}
            />
          </View>
        </View>

        <View>
          <SectionTitle title="Accessories" rightElement={<Countdown text="6d 02h" />} />
          <View style={{ gap: 8 }}>
            <AccessoryCard
              name="Abilities Don't Kill Spray"
              iconUrl={sprayIcon}
              currencyIconUrl={kingdomCredits}
              price={325}
              isLoading={isLoading}
            />
            <AccessoryCard
              name="809 Buddy"
              iconUrl={buddyIcon}
              currencyIconUrl={kingdomCredits}
              price={475}
              isLoading={isLoading}
            />
            <AccessoryCard
              name="Valorant Go! Vol. 1 Card"
              iconUrl={playerCardIcon}
              currencyIconUrl={kingdomCredits}
              price={1375}
              isLoading={isLoading}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  ),
};
