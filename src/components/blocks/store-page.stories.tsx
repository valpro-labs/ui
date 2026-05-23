import type { Meta, StoryObj } from '@storybook/react';
import { Check, Package } from 'phosphor-react';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { AccessoryCard } from '@/components/blocks/accessory-card';
import { BundleCard } from '@/components/blocks/bundle-card';
import { ItemBoughtOverlay } from '@/components/blocks/item-bought-overlay';
import { OfferCard } from '@/components/blocks/offer-card';
import { SectionTitle } from '@/components/blocks/section-title';
import { Wallet } from '@/components/blocks/wallet';
import { Text } from '@/components/ui/text';
import { resolveWeaponCategoryWidth } from '@/lib/weapon-grid-transform';

// ── Currencies ──────────────────────────────────────────────────────────────
const valorantPoints =
  'https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png';
const radianitePoints =
  'https://media.valorant-api.com/currencies/e59aa87c-4cbf-517a-5983-6e81511be9b7/displayicon.png';
const kingdomCredits =
  'https://media.valorant-api.com/currencies/85ca954a-41f2-ce94-9b45-8ca3dd39a00d/displayicon.png';

// ── Daily offer skins ───────────────────────────────────────────────────────
const weaponIcon = (uuid: string) =>
  `https://media.valorant-api.com/weapons/${uuid}/displayicon.png`;

const selectTierIcon =
  'https://media.valorant-api.com/contenttiers/12683d76-48d7-84a3-4e09-6985794f0445/displayicon.png';
const deluxeTierIcon =
  'https://media.valorant-api.com/contenttiers/0cebb8be-46d7-c12a-d306-e9907bfc5a25/displayicon.png';
const premiumTierIcon =
  'https://media.valorant-api.com/contenttiers/60bca009-4182-7998-dee7-b8a2558dc369/displayicon.png';
const exclusiveTierIcon =
  'https://media.valorant-api.com/contenttiers/e046854e-406c-37f4-6607-19a9ba8426fc/displayicon.png';

type DailyOffer = {
  name: string;
  iconUrl: string;
  tierIconUrl: string;
  tierColor: string;
  price: number;
  weaponCategory: string;
  discount?: number;
  owned?: boolean;
};

const SIDEARM = 'EEquippableCategory::Sidearm';
const SMG = 'EEquippableCategory::SMG';
const SHOTGUN = 'EEquippableCategory::Shotgun';
const RIFLE = 'EEquippableCategory::Rifle';
const MELEE = 'EEquippableCategory::Melee';
const SNIPER = 'EEquippableCategory::Sniper';
const HEAVY = 'EEquippableCategory::Heavy';

const dailyOffers = [
  {
    name: 'Classic',
    iconUrl: weaponIcon('29a0cfab-485b-f5d5-779a-b59f85e204a8'),
    tierIconUrl: deluxeTierIcon,
    tierColor: '00958733',
    price: 875,
    weaponCategory: SIDEARM,
  },
  {
    name: 'Shorty',
    iconUrl: weaponIcon('42da8ccc-40d5-affc-beec-15aa47b42eda'),
    tierIconUrl: deluxeTierIcon,
    tierColor: '00958733',
    price: 875,
    weaponCategory: SIDEARM,
  },
  {
    name: 'Frenzy',
    iconUrl: weaponIcon('44d4e95c-4157-0037-81b2-17841bf2e8e3'),
    tierIconUrl: deluxeTierIcon,
    tierColor: '00958733',
    price: 1275,
    weaponCategory: SIDEARM,
  },
  {
    name: 'Ghost',
    iconUrl: weaponIcon('1baa85b4-4c70-1284-64bb-6481dfc3bb4e'),
    tierIconUrl: premiumTierIcon,
    tierColor: 'd1548d33',
    price: 1775,
    weaponCategory: SIDEARM,
  },
  {
    name: 'Sheriff',
    iconUrl: weaponIcon('e336c6b8-418d-9340-d77f-7a9e4cfe0702'),
    tierIconUrl: selectTierIcon,
    tierColor: '5a9fe233',
    price: 1775,
    weaponCategory: SIDEARM,
    owned: true,
  },
  {
    name: 'Stinger',
    iconUrl: weaponIcon('f7e1b454-4ad4-1063-ec0a-159e56b58941'),
    tierIconUrl: deluxeTierIcon,
    tierColor: '00958733',
    price: 1275,
    weaponCategory: SMG,
  },
  {
    name: 'Spectre',
    iconUrl: weaponIcon('462080d1-4035-2937-7c09-27aa2a5c27a7'),
    tierIconUrl: premiumTierIcon,
    tierColor: 'd1548d33',
    price: 1775,
    weaponCategory: SMG,
  },
  {
    name: 'Bucky',
    iconUrl: weaponIcon('910be174-449b-c412-ab22-d0873436b21b'),
    tierIconUrl: deluxeTierIcon,
    tierColor: '00958733',
    price: 1275,
    weaponCategory: SHOTGUN,
  },
  {
    name: 'Judge',
    iconUrl: weaponIcon('ec845bf4-4f79-ddda-a3da-0db3774b2794'),
    tierIconUrl: premiumTierIcon,
    tierColor: 'd1548d33',
    price: 1775,
    weaponCategory: SHOTGUN,
  },
  {
    name: 'Bulldog',
    iconUrl: weaponIcon('ae3de142-4d85-2547-dd26-4e90bed35cf7'),
    tierIconUrl: deluxeTierIcon,
    tierColor: '00958733',
    price: 1275,
    weaponCategory: RIFLE,
  },
  {
    name: 'Guardian',
    iconUrl: weaponIcon('4ade7faa-4cf1-8376-95ef-39884480959b'),
    tierIconUrl: premiumTierIcon,
    tierColor: 'd1548d33',
    price: 1775,
    weaponCategory: RIFLE,
  },
  {
    name: 'Phantom',
    iconUrl: weaponIcon('ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a'),
    tierIconUrl: premiumTierIcon,
    tierColor: 'd1548d33',
    price: 1775,
    weaponCategory: RIFLE,
  },
  {
    name: 'Vandal',
    iconUrl: weaponIcon('9c82e19d-4575-0200-1a81-3eacf00cf872'),
    tierIconUrl: selectTierIcon,
    tierColor: '5a9fe233',
    price: 1775,
    weaponCategory: RIFLE,
  },
  {
    name: 'Melee',
    iconUrl: weaponIcon('2f59173c-4bed-b6c3-2191-dea9b58be9c7'),
    tierIconUrl: exclusiveTierIcon,
    tierColor: 'f5955b33',
    price: 4350,
    weaponCategory: MELEE,
  },
  {
    name: 'Marshal',
    iconUrl: weaponIcon('c4883e50-4494-202c-3ec3-6b8a9284f00b'),
    tierIconUrl: deluxeTierIcon,
    tierColor: '00958733',
    price: 1275,
    weaponCategory: SNIPER,
  },
  {
    name: 'Outlaw',
    iconUrl: weaponIcon('5f0aaf7a-4289-3998-d5ff-eb9a5cf7ef5c'),
    tierIconUrl: premiumTierIcon,
    tierColor: 'd1548d33',
    price: 2175,
    weaponCategory: SNIPER,
  },
  {
    name: 'Operator',
    iconUrl: weaponIcon('a03b24d3-4319-996d-0f8c-94bbfba1dfc7'),
    tierIconUrl: premiumTierIcon,
    tierColor: 'd1548d33',
    price: 2175,
    discount: 25,
    weaponCategory: SNIPER,
  },
  {
    name: 'Ares',
    iconUrl: weaponIcon('55d8a0f4-4274-ca67-fe2c-06ab45efdf58'),
    tierIconUrl: deluxeTierIcon,
    tierColor: '00958733',
    price: 1275,
    weaponCategory: HEAVY,
  },
  {
    name: 'Odin',
    iconUrl: weaponIcon('63e6c2b6-4a8e-869c-3d4c-e38355226584'),
    tierIconUrl: exclusiveTierIcon,
    tierColor: 'f5955b33',
    price: 2475,
    weaponCategory: HEAVY,
  },
] satisfies ReadonlyArray<DailyOffer>;

// ── Bundles ─────────────────────────────────────────────────────────────────
const rgxBundleArt =
  'https://media.valorant-api.com/bundles/35815cab-429d-79e4-43f5-e0af8fdac22b/displayicon.png';

// ── Accessories ─────────────────────────────────────────────────────────────
const sprayIcon =
  'https://media.valorant-api.com/sprays/7e2ba2e8-4597-060a-b41e-81acedca414e/displayicon.png';
const buddyIcon =
  'https://media.valorant-api.com/buddylevels/6c3b1a9e-4067-7ed6-fc6c-fea61e0a057c/displayicon.png';
const playerCardIcon =
  'https://media.valorant-api.com/playercards/c59b3a9b-467b-54b7-3e4d-a0a3107cbefe/displayicon.png';

function Countdown({ text }: { text: string }) {
  return <Text className="text-muted-foreground text-sm tabular-nums">{text}</Text>;
}

function BoughtOverlay() {
  return <ItemBoughtOverlay icon={<Check size={48} weight="bold" color="white" />} />;
}

function MissingBundleFallback() {
  return <Package size={40} weight="duotone" color="rgba(237,233,226,0.6)" />;
}

type StoreVariant = 'auto' | 'list' | 'grid';
type CardVariant = Exclude<StoreVariant, 'auto'>;
type StoreCardSize = 'compact' | 'regular';
type StoreArgs = { isLoading: boolean; variant: StoreVariant };

const GRID_GAP = 8;
const TABLET_VIEWPORTS = new Set(['iPadMini', 'iPadAir11M4', 'iPadPro13M5']);

function getViewportValue(viewport: unknown): string | undefined {
  if (typeof viewport === 'string') return viewport;
  if (viewport && typeof viewport === 'object' && 'value' in viewport) {
    const value = (viewport as { value?: unknown }).value;
    return typeof value === 'string' ? value : undefined;
  }
  return undefined;
}

function resolveStoreVariants(variant: StoreVariant, viewport: unknown) {
  const viewportValue = getViewportValue(viewport);
  const isTabletViewport = viewportValue ? TABLET_VIEWPORTS.has(viewportValue) : false;
  const layoutVariant: CardVariant =
    variant === 'auto' ? (isTabletViewport ? 'grid' : 'list') : variant;
  const cardSize: StoreCardSize | undefined =
    layoutVariant === 'grid' && isTabletViewport ? 'regular' : undefined;

  return { isTabletViewport, layoutVariant, cardVariant: layoutVariant, cardSize };
}

function GridWrapper({ grid, children }: { grid: boolean; children: React.ReactNode }) {
  if (!grid) return <View style={{ gap: GRID_GAP }}>{children}</View>;

  const items = React.Children.toArray(children);
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <View style={{ gap: GRID_GAP }}>
      {rows.map((row, index) => (
        <View key={index} className="flex-row" style={{ gap: GRID_GAP }}>
          {row}
          {row.length === 1 ? <View className="flex-1" /> : null}
        </View>
      ))}
    </View>
  );
}

function GridItem({ grid, children }: { grid: boolean; children: React.ReactNode }) {
  if (!grid) return <>{children}</>;
  return <View className="flex-1">{children}</View>;
}

const meta: Meta<StoreArgs> = {
  title: 'Pages/Store',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    isLoading: { control: 'boolean' },
    variant: {
      control: { type: 'radio' },
      options: ['auto', 'list', 'grid'],
    },
  },
  args: { isLoading: false, variant: 'auto' },
};

export default meta;
type Story = StoryObj<StoreArgs>;

/**
 * Store tab composition: `<Wallet>` on top, then Daily Offers
 * (`<OfferCard>` list with reset countdown), Featured (`<BundleCard>`
 * grid), and Accessories (`<AccessoryCard>` list with reset countdown).
 *
 * Shows a realistic mix of states in one frame: one item of each card
 * kind is flagged as already-owned via `ItemBoughtOverlay`, and the
 * second featured bundle has unresolved art so the `missingFallback`
 * slot is exercised. Toggle `isLoading` in the controls panel to swap
 * every card for its skeleton.
 */
export const Default: Story = {
  render: ({ isLoading, variant }, context) => {
    const { layoutVariant, cardVariant, cardSize } = resolveStoreVariants(
      variant,
      context.globals.viewport
    );
    const isGrid = layoutVariant === 'grid';

    return (
      <ScrollView
        className="bg-background flex-1"
        style={{ width: '100%' }}
        contentContainerStyle={{ width: '100%' }}>
        <View className="p-4" style={{ gap: 16, width: '100%' }}>
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
            <GridWrapper grid={isGrid}>
              {dailyOffers.map((offer) => (
                <GridItem key={offer.name} grid={isGrid}>
                  <OfferCard
                    name={offer.name}
                    iconUrl={offer.iconUrl}
                    tierIconUrl={offer.tierIconUrl}
                    tierColor={offer.tierColor}
                    currencyIconUrl={valorantPoints}
                    price={offer.price}
                    discount={offer.discount}
                    variant={cardVariant}
                    size={cardSize}
                    imageWidthPercent={resolveWeaponCategoryWidth(
                      offer.weaponCategory,
                      cardVariant
                    )}
                    imageOverlay={
                      !isLoading && offer.owned ? <BoughtOverlay /> : undefined
                    }
                    isLoading={isLoading}
                  />
                </GridItem>
              ))}
            </GridWrapper>
          </View>

          <View>
            <SectionTitle title="Featured" />
            <GridWrapper grid={isGrid}>
              <GridItem grid={isGrid}>
                <BundleCard
                  name="RGX 11z Pro"
                  iconUrl={rgxBundleArt}
                  currencyIconUrl={valorantPoints}
                  price={8700}
                  countdownText="2d 14h"
                  variant={cardVariant}
                  size={cardSize}
                  imageOverlay={isLoading ? undefined : <BoughtOverlay />}
                  isLoading={isLoading}
                />
              </GridItem>
              <GridItem grid={isGrid}>
                <BundleCard
                  name="Unknown Bundle"
                  currencyIconUrl={valorantPoints}
                  price={7440}
                  countdownText="5d 8h"
                  variant={cardVariant}
                  size={cardSize}
                  missingFallback={<MissingBundleFallback />}
                  isLoading={isLoading}
                />
              </GridItem>
            </GridWrapper>
          </View>

          <View>
            <SectionTitle title="Accessories" rightElement={<Countdown text="6d 02h" />} />
            <GridWrapper grid={isGrid}>
              <GridItem grid={isGrid}>
                <AccessoryCard
                  name="Abilities Don't Kill Spray"
                  iconUrl={sprayIcon}
                  currencyIconUrl={kingdomCredits}
                  price={325}
                  variant={cardVariant}
                  size={cardSize}
                  imageOverlay={isLoading ? undefined : <BoughtOverlay />}
                  isLoading={isLoading}
                />
              </GridItem>
              <GridItem grid={isGrid}>
                <AccessoryCard
                  name="809 Buddy"
                  iconUrl={buddyIcon}
                  currencyIconUrl={kingdomCredits}
                  price={475}
                  variant={cardVariant}
                  size={cardSize}
                  isLoading={isLoading}
                />
              </GridItem>
              <GridItem grid={isGrid}>
                <AccessoryCard
                  name="Valorant Go! Vol. 1 Card"
                  iconUrl={playerCardIcon}
                  currencyIconUrl={kingdomCredits}
                  price={1375}
                  variant={cardVariant}
                  size={cardSize}
                  isLoading={isLoading}
                />
              </GridItem>
            </GridWrapper>
          </View>
        </View>
      </ScrollView>
    );
  },
};

/**
 * Grid-mode preview. Same content as `Default` with the `variant` arg flipped
 * so all three sections render as a 2-up grid.
 */
export const Grid: Story = {
  args: { variant: 'grid' },
  render: Default.render!,
};
