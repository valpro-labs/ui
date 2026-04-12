import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { SettingsRow } from '@/components/blocks/settings-row';
import { Text } from '@/components/ui/text';
import { Path, Svg } from '@/lib/svg-shim';

// Tiny inline SVG icons so the stories don't depend on an icon library.
// Real consumers pass their own icon components.
function ChevronRight({ size = 14, color = '#9ca3af' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ExternalLink({ size = 14, color = '#9ca3af' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M14 3h7v7M10 14L21 3M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconDot({ color = '#ffffff' }: { color?: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path d="M12 6v12M6 12h12" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
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
    icon: <IconDot />,
    label: 'UI Preferences',
    rightSlot: <ChevronRight />,
    onPress: () => {},
  },
};

export const WithSub: Story = {
  args: {
    icon: <IconDot />,
    label: 'Change language',
    sub: 'Opens the system settings app',
    rightSlot: <ExternalLink />,
    onPress: () => {},
  },
};

export const ReadOnlyValue: Story = {
  name: 'Read-only (value on right)',
  args: {
    icon: <IconDot />,
    label: 'App version',
    rightSlot: <Text className="text-muted-foreground text-sm">1.2.3 (42)</Text>,
  },
};

export const NoRightSlot: Story = {
  args: {
    icon: <IconDot />,
    label: 'Manage subscription',
    onPress: () => {},
  },
};

export const Disabled: Story = {
  args: {
    icon: <IconDot />,
    label: 'Upgrade to Pro',
    rightSlot: <ChevronRight />,
    onPress: () => {},
    disabled: true,
  },
};
