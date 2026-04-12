import * as React from 'react';

import { View } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { Path, Svg } from '@/lib/svg-shim';
import { cn } from '@/lib/utils';

const INNER_RATIO = 0.3;
const ICON_RATIO = 0.25;

interface ExpressionWheelSlot {
  /** Pre-resolved icon URL. Omit to render a `—` placeholder in the slot. */
  iconUrl?: string;
}

interface ExpressionWheelProps {
  /** Slots around the wheel, in display order starting from the top-slice clockwise. */
  slots: ExpressionWheelSlot[];
  /** Overall wheel size (width = height). Defaults to 240. */
  size?: number;
  /** Tap handler — receives the slot index. Omit to render read-only. */
  onSlotPress?: (index: number) => void;
  /** Swap every slot icon for a skeleton placeholder. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer wrapper. */
  className?: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutSlicePath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
): string {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

function useColorVar(name: string): string | undefined {
  const v = useCSSVariable(name);
  return typeof v === 'string' ? v : undefined;
}

/**
 * Spray / flex expression wheel used on the customize screen — a four-
 * (or more) slice donut, each slice holding an equipped expression icon
 * that opens the picker when tapped.
 *
 * Data-free: the consumer resolves each slot's icon URL in display order
 * (top-clockwise) and handles the route / picker launch in `onSlotPress`.
 * Empty slots render a `—` placeholder. The SVG uses the `svg-shim` so
 * it renders identically under Vite storybook and React Native.
 */
function ExpressionWheel({
  slots,
  size = 240,
  onSlotPress,
  isLoading = false,
  className,
}: ExpressionWheelProps) {
  const muted = useColorVar('--color-muted');
  const border = useColorVar('--color-border');
  const [pressedIndex, setPressedIndex] = React.useState<number | null>(null);

  const slotCount = slots.length || 4;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2;
  const innerR = outerR * INNER_RATIO;
  const iconSize = size * ICON_RATIO;
  const midR = (outerR + innerR) / 2;

  const sliceAngle = 360 / slotCount;
  const startOffset = -90 - sliceAngle / 2;

  return (
    <View className={cn('items-center', className)}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox={`-2 -2 ${size + 4} ${size + 4}`}>
          {Array.from({ length: slotCount }).map((_, i) => {
            const start = startOffset + i * sliceAngle;
            const end = start + sliceAngle;
            return (
              <Path
                key={`slice-${i}`}
                d={donutSlicePath(cx, cy, innerR, outerR, start, end)}
                fill={muted}
                fillOpacity={pressedIndex === i ? 0.5 : 1}
                stroke={border}
                strokeWidth={1.5}
                onPressIn={onSlotPress ? () => setPressedIndex(i) : undefined}
                onPressOut={onSlotPress ? () => setPressedIndex(null) : undefined}
                onPress={onSlotPress ? () => onSlotPress(i) : undefined}
              />
            );
          })}
        </Svg>

        {Array.from({ length: slotCount }).map((_, i) => {
          const midAngle = startOffset + i * sliceAngle + sliceAngle / 2;
          const pos = polarToCartesian(cx, cy, midR, midAngle);
          const icon = slots[i]?.iconUrl;

          return (
            <View
              key={`icon-${i}`}
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: pos.x - iconSize / 2,
                top: pos.y - iconSize / 2,
                width: iconSize,
                height: iconSize,
                opacity: pressedIndex === i ? 0.7 : 1,
              }}>
              {isLoading ? (
                <Skeleton style={{ width: '100%', height: '100%', borderRadius: 12 }} />
              ) : icon ? (
                <Image
                  source={icon}
                  style={{ width: '100%', height: '100%', borderRadius: 12 }}
                  contentFit="contain"
                />
              ) : (
                <View className="h-full w-full items-center justify-center">
                  <Text className="text-muted-foreground text-xs">—</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

export { ExpressionWheel };
export type { ExpressionWheelProps, ExpressionWheelSlot };
