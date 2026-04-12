import type { Meta, StoryObj } from '@storybook/react';

import { ExpressionWheel } from '@/components/blocks/expression-wheel';

const sprayA =
  'https://media.valorant-api.com/sprays/0a6db78c-48b9-a32d-c47a-82be597584c1/fulltransparenticon.png';
const sprayB =
  'https://media.valorant-api.com/sprays/9b0cd410-4e2d-4edd-bef3-658d1b0eee1a/fulltransparenticon.png';
const sprayC =
  'https://media.valorant-api.com/sprays/af7225d8-46a0-0a0a-f10b-a29c14d07acf/fulltransparenticon.png';
const sprayD =
  'https://media.valorant-api.com/sprays/c233bbd6-429d-201f-a06b-16851686ff89/fulltransparenticon.png';

const meta: Meta<typeof ExpressionWheel> = {
  title: 'Blocks/ExpressionWheel',
  component: ExpressionWheel,
  argTypes: {
    size: { control: { type: 'number' } },
    isLoading: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof ExpressionWheel>;

export const FourSlots: Story = {
  args: {
    slots: [
      { iconUrl: sprayA },
      { iconUrl: sprayB },
      { iconUrl: sprayC },
      { iconUrl: sprayD },
    ],
  },
};

export const EmptySlots: Story = {
  args: {
    slots: [{}, {}, {}, {}],
  },
};

export const Mixed: Story = {
  args: {
    slots: [{ iconUrl: sprayA }, {}, { iconUrl: sprayC }, {}],
  },
};

export const Loading: Story = {
  args: {
    slots: [{}, {}, {}, {}],
    isLoading: true,
  },
};

export const Small: Story = {
  args: {
    size: 180,
    slots: [
      { iconUrl: sprayA },
      { iconUrl: sprayB },
      { iconUrl: sprayC },
      { iconUrl: sprayD },
    ],
  },
};
