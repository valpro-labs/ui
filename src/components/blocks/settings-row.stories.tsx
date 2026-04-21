import type { Meta, StoryObj } from '@storybook/react';
import { ArrowSquareOut, CaretRight, GearSix } from 'phosphor-react';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { SettingsRow } from '@/components/blocks/settings-row';
import { Text } from '@/components/ui/text';

function useColorVar(name: string): string {
  const value = useCSSVariable(name);
  return typeof value === 'string' ? value : '';
}

function LeadingGear() {
  const color = useColorVar('--color-foreground');
  return <GearSix size={20} weight="duotone" color={color} />;
}

function TrailingChevron() {
  const color = useColorVar('--color-muted-foreground');
  return <CaretRight size={14} weight="bold" color={color} />;
}

function TrailingExternal() {
  const color = useColorVar('--color-muted-foreground');
  return <ArrowSquareOut size={14} weight="bold" color={color} />;
}

const meta: Meta<typeof SettingsRow> = {
  title: 'Blocks/SettingsRow',
  component: SettingsRow,
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: 16 }}>
        <View className="bg-card overflow-hidden rounded-2xl">
          <Story />
        </View>
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SettingsRow>;

export const Default: Story = {
  args: {
    icon: <LeadingGear />,
    label: 'UI Preferences',
    rightSlot: <TrailingChevron />,
    onPress: () => {},
  },
};

export const WithSub: Story = {
  args: {
    icon: <LeadingGear />,
    label: 'Change language',
    sub: 'Opens the system settings app',
    rightSlot: <TrailingExternal />,
    onPress: () => {},
  },
};

export const ReadOnlyValue: Story = {
  name: 'Read-only (value on right)',
  args: {
    icon: <LeadingGear />,
    label: 'App version',
    rightSlot: <Text className="text-muted-foreground text-sm">1.2.3 (42)</Text>,
  },
};

export const NoRightSlot: Story = {
  args: {
    icon: <LeadingGear />,
    label: 'Manage subscription',
    onPress: () => {},
  },
};

export const Disabled: Story = {
  args: {
    icon: <LeadingGear />,
    label: 'Upgrade to Pro',
    rightSlot: <TrailingChevron />,
    onPress: () => {},
    disabled: true,
  },
};

export const FontWeightParity: Story = {
  name: 'Font-weight parity (pressable vs read-only)',
  render: () => (
    <>
      <SettingsRow
        icon={<LeadingGear />}
        label="Pressable row"
        sub="Wrapped in ghost Button"
        rightSlot={<TrailingChevron />}
        onPress={() => {}}
      />
      <SettingsRow
        icon={<LeadingGear />}
        label="Read-only row"
        sub="Plain View, no Button"
        rightSlot={<Text className="text-muted-foreground text-sm">1.2.3</Text>}
      />
    </>
  ),
};
