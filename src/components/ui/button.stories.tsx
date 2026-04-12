import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  render: (args) => (
    <Button {...args}>
      <Text>{(args as any).label ?? 'Button'}</Text>
    </Button>
  ),
};

export default meta;
type Story = StoryObj<typeof Button & { label?: string }>;

export const Default: Story = {
  args: {
    variant: 'default',
    label: 'Default',
  } as any,
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Destructive',
  } as any,
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline',
  } as any,
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary',
  } as any,
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost',
  } as any,
};

export const Link: Story = {
  args: {
    variant: 'link',
    label: 'Link',
  } as any,
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small',
  } as any,
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large',
  } as any,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
  } as any,
};
