import * as React from 'react';

import { View } from 'react-native';

import { cn } from '@/lib/utils';

type SkeletonProps = React.ComponentProps<typeof View> & React.RefAttributes<View>;

/**
 * Web-only Skeleton implementation.
 * Uses Tailwind's `animate-pulse` class (a pure-CSS opacity cycle) instead of
 * pulling in react-native-reanimated, which doesn't play nicely with Vite +
 * react-native-web. The native sibling (`skeleton.tsx`) keeps the reanimated
 * version for iOS/Android.
 */
function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <View
      className={cn('bg-secondary dark:bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
