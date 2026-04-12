import * as React from 'react';

import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';

type ProgressProps = ViewProps & {
  /** 0–100 */
  value?: number | null;
  indicatorClassName?: string;
};

/**
 * Web-only Progress implementation.
 * Pure View + CSS width transition, no reanimated and no @rn-primitives.
 * The native sibling (`progress.tsx`) keeps the animated + accessible
 * @rn-primitives implementation for iOS/Android.
 */
function Progress({ className, value, indicatorClassName, ...props }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value ?? 0));
  return (
    <View
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}>
      <View
        className={cn('bg-primary h-full', indicatorClassName)}
        style={{
          width: `${clamped}%`,
          // `transition` goes through to the underlying DOM element via
          // react-native-web; on native this prop is ignored.
          transition: 'width 0.3s ease-out',
        } as object}
      />
    </View>
  );
}

export { Progress };
export type { ProgressProps };
