import * as React from 'react';

import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface SettingsGroupProps {
  /** Optional uppercase header label rendered above the card. */
  label?: string;
  /** Row content — typically `SettingsRow`s separated by `Separator`. */
  children: React.ReactNode;
  /** Extra classes merged onto the rounded card wrapper. */
  className?: string;
}

/**
 * Rounded card container for a cluster of settings rows, with an optional
 * uppercase label above. Matches the grouping used on the app's settings
 * screen — consumer composes `SettingsRow`s inside, interleaving
 * `Separator` between rows as needed.
 */
function SettingsGroup({ label, children, className }: SettingsGroupProps) {
  return (
    <View>
      {label ? (
        <Text className="text-muted-foreground px-1 pb-1.5 text-sm font-semibold uppercase">
          {label}
        </Text>
      ) : null}
      <View className={cn('bg-card overflow-hidden rounded-2xl', className)}>{children}</View>
    </View>
  );
}

export { SettingsGroup };
export type { SettingsGroupProps };
