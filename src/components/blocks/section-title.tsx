import * as React from 'react';

import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  /** Uppercase section label shown on the left. */
  title: string;
  /** Trailing slot — e.g. a countdown, refresh button, or loading spinner. */
  rightElement?: React.ReactNode;
  /** Extra classes merged onto the outer row. */
  className?: string;
}

/**
 * Section header used above the cards on the home screen — a muted,
 * uppercase label on the left with an optional trailing slot on the right
 * (countdown, refresh icon, activity indicator, etc.).
 *
 * Purely presentational: the consumer formats the label and supplies the
 * trailing node. Does not render the card body that follows it.
 */
function SectionTitle({ title, rightElement, className }: SectionTitleProps) {
  return (
    <View
      className={cn('flex-row items-center justify-between px-1 pb-1.5', className)}>
      <Text className="text-muted-foreground text-base font-semibold uppercase">
        {title}
      </Text>
      {rightElement}
    </View>
  );
}

export { SectionTitle };
export type { SectionTitleProps };
