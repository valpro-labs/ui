import type { Meta, StoryObj } from '@storybook/react';
import { Check } from 'phosphor-react';
import { View } from 'react-native';

import { BundleCard } from '@/components/blocks/bundle-card';
import { ItemBoughtOverlay } from '@/components/blocks/item-bought-overlay';
import { OfferCard } from '@/components/blocks/offer-card';
import { Image } from '@/components/ui/image';

const vandalChroma =
  'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png';
const rgxBundleArt =
  'https://media.valorant-api.com/bundles/35815cab-429d-79e4-43f5-e0af8fdac22b/displayicon.png';
const selectTierIcon =
  'https://media.valorant-api.com/contenttiers/12683d76-48d7-84a3-4e09-6985794f0445/displayicon.png';
const currencyIcon =
  'https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png';

function CheckmarkIcon() {
  return <Check size={56} weight="bold" color="white" />;
}

const meta: Meta<typeof ItemBoughtOverlay> = {
  title: 'Blocks/ItemBoughtOverlay',
  component: ItemBoughtOverlay,
};

export default meta;
type Story = StoryObj<typeof ItemBoughtOverlay>;

/**
 * Bare overlay layered over a plain image tile — shows the default
 * `rgba(0,0,0,0.6)` dim and a centered checkmark. Consumers typically
 * layer this inside a tile/card rather than using it standalone.
 */
export const Default: Story = {
  render: () => (
    <View style={{ padding: 16 }}>
      <View
        style={{
          position: 'relative',
          width: 200,
          height: 200,
          overflow: 'hidden',
          borderRadius: 12,
        }}>
        <Image source={vandalChroma} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        <ItemBoughtOverlay icon={<CheckmarkIcon />} />
      </View>
    </View>
  ),
};

/**
 * Dropped into `OfferCard`'s `imageOverlay` slot — the common
 * consumption path for flagging an offer the viewer has already bought.
 */
export const OnOfferCard: Story = {
  render: () => (
    <View style={{ padding: 16 }}>
      <OfferCard
        name="Immortalized Vandal"
        iconUrl={vandalChroma}
        tierIconUrl={selectTierIcon}
        tierColor="5a9fe233"
        currencyIconUrl={currencyIcon}
        price={1775}
        weaponCategory="EEquippableCategory::Rifle"
        imageOverlay={<ItemBoughtOverlay icon={<CheckmarkIcon />} />}
      />
    </View>
  ),
};

/**
 * Dropped into `BundleCard`'s `imageOverlay` slot.
 */
export const OnBundleCard: Story = {
  render: () => (
    <View style={{ padding: 16 }}>
      <BundleCard
        name="RGX 11z Pro"
        iconUrl={rgxBundleArt}
        currencyIconUrl={currencyIcon}
        price={8700}
        imageOverlay={<ItemBoughtOverlay icon={<CheckmarkIcon />} />}
      />
    </View>
  ),
};
