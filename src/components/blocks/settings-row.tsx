import * as React from 'react';

import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface SettingsRowProps {
  /** Leading icon slot. Consumer provides the icon node — the library is icon-agnostic. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: string;
  /** Secondary text rendered beneath the label. */
  sub?: string;
  /**
   * Trailing slot — typically a chevron, external-link icon, badge, or a value
   * `<Text>` (e.g. app version). Consumer provides the node.
   */
  rightSlot?: React.ReactNode;
  /**
   * Tap handler. When omitted the row renders as a plain, non-interactive
   * `View` with the same layout (used for read-only rows like "App version").
   */
  onPress?: () => void;
  /** Forwarded to the underlying Button when `onPress` is set. */
  disabled?: boolean;
  /** Extra classes merged onto the row wrapper. */
  className?: string;
}

const ROW_CLASSES = 'h-auto min-h-12 flex-row items-center gap-x-3 rounded-none px-3.5 py-3';

/**
 * Single row inside a `SettingsGroup` — leading icon, label (with optional
 * sub-label), and a trailing slot. Purely presentational: the consumer
 * supplies the icon node, strings, and tap handler.
 *
 * With `onPress`, renders a ghost `Button` so the full row gets press
 * feedback. Without, renders a plain `View` for read-only rows (e.g. a
 * version display where `rightSlot` is just a value `<Text>`).
 */
function SettingsRow({
  icon,
  label,
  sub,
  rightSlot,
  onPress,
  disabled,
  className,
}: SettingsRowProps) {
  const content = (
    <>
      {icon}
      <View className="flex-1">
        <Text className="text-foreground text-sm">{label}</Text>
        {sub ? <Text className="text-muted-foreground mt-px text-xs">{sub}</Text> : null}
      </View>
      {rightSlot}
    </>
  );

  if (!onPress) {
    return <View className={cn(ROW_CLASSES, className)}>{content}</View>;
  }

  return (
    <Button
      variant="ghost"
      onPress={onPress}
      disabled={disabled}
      className={cn(ROW_CLASSES, className)}>
      {content}
    </Button>
  );
}

export { SettingsRow };
export type { SettingsRowProps };
