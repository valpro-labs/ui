import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { View } from 'react-native';

import { SettingsGroup } from '@/components/blocks/settings-group';
import { SettingsRow } from '@/components/blocks/settings-row';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { Path, Svg } from '@/lib/svg-shim';

// Inline icons (library is icon-agnostic; real consumers pass their own).
function Icon({ d, color = '#e5e7eb', size = 18 }: { d: string; color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const CHEVRON_D = 'M9 6l6 6-6 6';
const EXT_D = 'M14 3h7v7M10 14L21 3M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5';
const GEAR_D =
  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z';
const LANG_D = 'M5 8h14M9 4v4m-4 4c3 4 7 7 10 7m-3-9c-1 4-4 7-7 9';
const INFO_D = 'M12 16v-4M12 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z';
const PHONE_D = 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01';
const PKG_D =
  'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12l8.73-5.04M12 22V12';
const BUG_D =
  'M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1M12 20v-9M6.53 9C4.6 8.8 3 10.3 3 12.2c0 1.9 1.6 3.6 3.5 3.8M17.47 9C19.4 8.8 21 10.3 21 12.2c0 1.9-1.6 3.6-3.5 3.8M4 22l3-3M20 22l-3-3M8 13h8M19 16.01V16';
const SPARKLE_D = 'M12 3l2.09 4.26L19 9l-4.91 1.74L12 15l-2.09-4.26L5 9l4.91-1.74z';

const meta: Meta<typeof SettingsGroup> = {
  title: 'Blocks/SettingsGroup',
  component: SettingsGroup,
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: 16, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SettingsGroup>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <SettingsRow
          icon={<Icon d={GEAR_D} />}
          label="UI Preferences"
          rightSlot={<Icon d={CHEVRON_D} size={14} color="#9ca3af" />}
          onPress={() => {}}
        />
        <Separator />
        <SettingsRow
          icon={<Icon d={LANG_D} />}
          label="Change language"
          rightSlot={<Icon d={EXT_D} size={14} color="#9ca3af" />}
          onPress={() => {}}
        />
        <Separator />
        <SettingsRow
          icon={<Icon d={INFO_D} />}
          label="About"
          rightSlot={<Icon d={CHEVRON_D} size={14} color="#9ca3af" />}
          onPress={() => {}}
        />
      </>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    label: 'General',
    children: (
      <>
        <SettingsRow
          icon={<Icon d={GEAR_D} />}
          label="UI Preferences"
          rightSlot={<Icon d={CHEVRON_D} size={14} color="#9ca3af" />}
          onPress={() => {}}
        />
        <Separator />
        <SettingsRow
          icon={<Icon d={INFO_D} />}
          label="About"
          rightSlot={<Icon d={CHEVRON_D} size={14} color="#9ca3af" />}
          onPress={() => {}}
        />
      </>
    ),
  },
};

export const VersionInfo: Story = {
  name: 'Version info (read-only rows)',
  args: {
    children: (
      <>
        <SettingsRow
          icon={<Icon d={PHONE_D} />}
          label="App version"
          rightSlot={<Text className="text-muted-foreground text-sm">1.2.3 (42)</Text>}
        />
        <Separator />
        <SettingsRow
          icon={<Icon d={PKG_D} />}
          label="Asset version"
          rightSlot={<Text className="text-muted-foreground text-sm">08.12.00</Text>}
        />
        <Separator />
        <SettingsRow
          icon={<Icon d={BUG_D} />}
          label="Dev tools"
          rightSlot={<Icon d={CHEVRON_D} size={14} color="#9ca3af" />}
          onPress={() => {}}
        />
      </>
    ),
  },
};

/**
 * Full settings-screen composition mirroring the app layout: support CTA,
 * General group, and Developer group with version rows.
 */
export const FullPage: Story = {
  render: () => (
    <>
      <Button
        variant="ghost"
        className="bg-val-red active:bg-val-red/90 h-auto min-h-12 flex-row items-center gap-x-3 rounded-xl px-3.5 py-3"
        onPress={() => {}}>
        <Icon d={SPARKLE_D} color="#ffffff" />
        <View className="flex-1">
          <Text className="text-sm font-medium text-white">Support the developer</Text>
        </View>
      </Button>

      <SettingsGroup>
        <SettingsRow
          icon={<Icon d={GEAR_D} />}
          label="UI Preferences"
          rightSlot={<Icon d={CHEVRON_D} size={14} color="#9ca3af" />}
          onPress={() => {}}
        />
        <Separator />
        <SettingsRow
          icon={<Icon d={LANG_D} />}
          label="Change language"
          rightSlot={<Icon d={EXT_D} size={14} color="#9ca3af" />}
          onPress={() => {}}
        />
        <Separator />
        <SettingsRow
          icon={<Icon d={INFO_D} />}
          label="About"
          rightSlot={<Icon d={CHEVRON_D} size={14} color="#9ca3af" />}
          onPress={() => {}}
        />
      </SettingsGroup>

      <SettingsGroup>
        <SettingsRow
          icon={<Icon d={PHONE_D} />}
          label="App version"
          rightSlot={<Text className="text-muted-foreground text-sm">1.2.3 (42)</Text>}
        />
        <Separator />
        <SettingsRow
          icon={<Icon d={PKG_D} />}
          label="Asset version"
          rightSlot={<Text className="text-muted-foreground text-sm">08.12.00</Text>}
        />
        <Separator />
        <SettingsRow
          icon={<Icon d={BUG_D} />}
          label="Dev tools"
          rightSlot={<Icon d={CHEVRON_D} size={14} color="#9ca3af" />}
          onPress={() => {}}
        />
      </SettingsGroup>
    </>
  ),
};
