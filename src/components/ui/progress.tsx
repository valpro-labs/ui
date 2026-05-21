import * as React from 'react';

import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

import * as ProgressPrimitive from '@rn-primitives/progress';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import { cn } from '@/lib/utils';

type ProgressProps = ProgressPrimitive.RootProps &
  React.RefAttributes<ProgressPrimitive.RootRef> & {
    indicatorClassName?: string;
    indicatorStyle?: StyleProp<ViewStyle>;
  };

function Progress({ className, value, indicatorClassName, indicatorStyle, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      className={cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}>
      <Indicator value={value} className={indicatorClassName} style={indicatorStyle} />
    </ProgressPrimitive.Root>
  );
}

type IndicatorProps = {
  value: number | undefined | null;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

function WebIndicator({ value, className, style }: IndicatorProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View
      className={cn('bg-primary h-full w-full flex-1 transition-all', className)}
      style={[{ transform: `translateX(-${100 - (value ?? 0)}%)` } as object, style]}>
      <ProgressPrimitive.Indicator className={cn('h-full w-full', className)} />
    </View>
  );
}

function NativeIndicator({ value, className, style }: IndicatorProps) {
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(progress.value, [0, 100], [0, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true }
      ),
    };
  }, [value]);

  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View style={[indicator, style]} className={cn('bg-foreground h-full', className)} />
    </ProgressPrimitive.Indicator>
  );
}

function NullIndicator(_props: IndicatorProps) {
  return null;
}

const Indicator = Platform.select({
  web: WebIndicator,
  native: NativeIndicator,
  default: NullIndicator,
});

export { Progress };
export type { ProgressProps };
