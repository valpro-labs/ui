import type { Meta, StoryObj } from '@storybook/react';
import { DotsNine } from 'phosphor-react';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { RoleCard } from '@/components/blocks/role-card';

const duelist = 'https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png';
const controller = 'https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png';
const initiator = 'https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png';
const sentinel = 'https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png';

const meta: Meta<typeof RoleCard> = {
  title: 'Blocks/RoleCard',
  component: RoleCard,
  argTypes: {
    selected: { control: 'boolean' },
    iconSize: { control: { type: 'number', min: 16, max: 80, step: 4 } },
  },
  decorators: [
    (Story) => (
      <View style={{ width: 80 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RoleCard>;

export const Default: Story = {
  args: { iconUrl: duelist },
};

export const Selected: Story = {
  args: { iconUrl: controller, selected: true },
};

function AllIcon({ selected }: { selected: boolean }) {
  const selectedColor = useCSSVariable('--color-val-green-ui');
  const foreground = useCSSVariable('--color-foreground');
  const color = selected ? selectedColor : foreground;
  return <DotsNine size={32} weight="bold" color={typeof color === 'string' ? color : ''} />;
}

export const AllRoles: Story = {
  args: {
    selected: true,
    children: <AllIcon selected />,
  },
};

/**
 * Role filter row — the "all" tile plus four real roles, matching the
 * 5-column layout used on the agents tab.
 */
export const FilterRow: Story = {
  decorators: [],
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8, width: 400 }}>
      <View style={{ width: (400 - 32) / 5 }}>
        <RoleCard>
          <AllIcon selected={false} />
        </RoleCard>
      </View>
      {[duelist, controller, initiator, sentinel].map((iconUrl, i) => (
        <View key={i} style={{ width: (400 - 32) / 5 }}>
          <RoleCard iconUrl={iconUrl} selected={i === 0} iconSize={32} />
        </View>
      ))}
    </View>
  ),
};
