import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { PolaroidCard, type PolaroidCardProps } from '@/components/blocks/polaroid-card';

const rifleOffer: PolaroidCardProps['offer'] = {
  index: '01',
  tierColor: 'rgb(90, 159, 226)',
  iconUrl:
    'https://media.valorant-api.com/weaponskinchromas/64c51524-43da-875e-ff0d-db97f3e6194e/fullrender.png',
  name: 'Immortalized Vandal',
  price: 1775,
  weaponCategory: 'EEquippableCategory::Rifle',
};

const meta: Meta<typeof PolaroidCard> = {
  title: 'Blocks/PolaroidCard',
  component: PolaroidCard,
  parameters: { layout: 'centered' },
  args: { offer: rifleOffer },
};

export default meta;
type Story = StoryObj<typeof PolaroidCard>;

function CardFrame(args: PolaroidCardProps) {
  return (
    <View style={{ width: '100%', maxWidth: 420, height: 720 }}>
      <PolaroidCard {...args} />
    </View>
  );
}

/** Standalone polaroid card with the default rifle artwork. */
export const Default: Story = {
  render: (args) => <CardFrame {...args} />,
};

/** Sidearms use the card's reduced 40% image height. */
export const Sidearm: Story = {
  args: {
    offer: {
      index: '02',
      tierColor: 'rgb(0, 153, 135)',
      iconUrl:
        'https://media.valorant-api.com/weaponskinchromas/b8ddad9b-4622-3e0e-6821-56bf2e901bcf/fullrender.png',
      name: 'Task Force 809 Frenzy',
      price: 1275,
      weaponCategory: 'EEquippableCategory::Sidearm',
    },
  },
  render: (args) => <CardFrame {...args} />,
};
