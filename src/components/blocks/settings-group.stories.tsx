import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowSquareOut,
  Bug,
  CaretRight,
  DeviceMobile,
  GearSix,
  Globe,
  Info,
  Package,
  Sparkle,
} from 'phosphor-react';
import * as React from 'react';
import type { ComponentType } from 'react';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { SettingsGroup } from '@/components/blocks/settings-group';
import { SettingsRow } from '@/components/blocks/settings-row';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';

import type { IconProps } from 'phosphor-react';

type PhosphorIcon = ComponentType<IconProps>;

function useColorVar(name: string): string {
  const value = useCSSVariable(name);
  return typeof value === 'string' ? value : '';
}

function Leading({ Icon }: { Icon: PhosphorIcon }) {
  const color = useColorVar('--color-foreground');
  return <Icon size={20} weight="duotone" color={color} />;
}

function ChevronRight() {
  const color = useColorVar('--color-muted-foreground');
  return <CaretRight size={14} weight="bold" color={color} />;
}

function External() {
  const color = useColorVar('--color-muted-foreground');
  return <ArrowSquareOut size={14} weight="bold" color={color} />;
}

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
          icon={<Leading Icon={GearSix} />}
          label="UI Preferences"
          rightSlot={<ChevronRight />}
          onPress={() => {}}
        />
        <Separator />
        <SettingsRow
          icon={<Leading Icon={Globe} />}
          label="Change language"
          rightSlot={<External />}
          onPress={() => {}}
        />
        <Separator />
        <SettingsRow
          icon={<Leading Icon={Info} />}
          label="About"
          rightSlot={<ChevronRight />}
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
          icon={<Leading Icon={GearSix} />}
          label="UI Preferences"
          rightSlot={<ChevronRight />}
          onPress={() => {}}
        />
        <Separator />
        <SettingsRow
          icon={<Leading Icon={Info} />}
          label="About"
          rightSlot={<ChevronRight />}
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
          icon={<Leading Icon={DeviceMobile} />}
          label="App version"
          rightSlot={<Text className="text-muted-foreground text-sm">1.2.3 (42)</Text>}
        />
        <Separator />
        <SettingsRow
          icon={<Leading Icon={Package} />}
          label="Asset version"
          rightSlot={<Text className="text-muted-foreground text-sm">08.12.00</Text>}
        />
        <Separator />
        <SettingsRow
          icon={<Leading Icon={Bug} />}
          label="Dev tools"
          rightSlot={<ChevronRight />}
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
        <Sparkle size={20} weight="fill" color="#ffffff" />
        <View className="flex-1">
          <Text className="text-sm font-medium text-white">Support the developer</Text>
        </View>
      </Button>

      <SettingsGroup>
        <SettingsRow
          icon={<Leading Icon={GearSix} />}
          label="UI Preferences"
          rightSlot={<ChevronRight />}
          onPress={() => {}}
        />
        <Separator />
        <SettingsRow
          icon={<Leading Icon={Globe} />}
          label="Change language"
          rightSlot={<External />}
          onPress={() => {}}
        />
        <Separator />
        <SettingsRow
          icon={<Leading Icon={Info} />}
          label="About"
          rightSlot={<ChevronRight />}
          onPress={() => {}}
        />
      </SettingsGroup>

      <SettingsGroup>
        <SettingsRow
          icon={<Leading Icon={DeviceMobile} />}
          label="App version"
          rightSlot={<Text className="text-muted-foreground text-sm">1.2.3 (42)</Text>}
        />
        <Separator />
        <SettingsRow
          icon={<Leading Icon={Package} />}
          label="Asset version"
          rightSlot={<Text className="text-muted-foreground text-sm">08.12.00</Text>}
        />
        <Separator />
        <SettingsRow
          icon={<Leading Icon={Bug} />}
          label="Dev tools"
          rightSlot={<ChevronRight />}
          onPress={() => {}}
        />
      </SettingsGroup>
    </>
  ),
};
