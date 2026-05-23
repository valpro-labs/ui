import { View } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type WalletSize = 'regular' | 'large';

interface WalletBalance {
  /** Stable key (typically the currency UUID). */
  key: string;
  /** Currency icon — tinted with `--color-foreground`. */
  iconUrl?: string;
  /** Current balance. Omit to render a dash placeholder. */
  amount?: number;
  /** Optional override for icon tint + amount text color.
   *  Accepts any value expo-image's `tintColor` understands
   *  (hex, rgb/rgba, named color). Falls back to `--color-foreground`. */
  color?: string;
}

interface WalletProps {
  /** Currencies to render, in the display order chosen by the caller. */
  balances: WalletBalance[];
  /** Visual density. Use `large` for wider tablet layouts. */
  size?: WalletSize;
  /** Swap each amount for a skeleton placeholder. */
  isLoading?: boolean;
  /** Extra classes merged onto the outer wrapper. */
  className?: string;
}

/**
 * Store wallet strip — a horizontal row of currency balances shown above
 * the store feed (Valorant Points, Radianite Points, Kingdom Credits, …).
 *
 * Data-free: the consumer resolves the currency list + icons (from
 * whichever asset store they use) and passes `balances` in display order.
 *
 * Each balance accepts an optional `color` which the consumer can use for
 * threshold-based highlights — e.g. tint Kingdom Credits purple once the
 * amount crosses some "you can afford X" threshold. When omitted, both the
 * icon tint and amount text fall back to `--color-foreground`.
 */
function Wallet({
  balances,
  size = 'regular',
  isLoading = false,
  className,
}: WalletProps) {
  const foregroundRaw = useCSSVariable('--color-foreground');
  const foreground = typeof foregroundRaw === 'string' ? foregroundRaw : undefined;
  const isLarge = size === 'large';
  const iconSize = isLarge ? 24 : 18;

  return (
    <View
      className={cn(
        'bg-card w-full overflow-hidden rounded-2xl',
        isLarge ? 'px-5 py-4' : 'px-4 py-3',
        className
      )}
      style={{ width: '100%' }}>
      <View className={cn('flex-row items-center', isLarge ? 'gap-x-6' : 'gap-x-4')}>
        {balances.map((b) => (
          <View
            key={b.key}
            className={cn('flex-1 flex-row items-center', isLarge ? 'gap-x-2' : 'gap-x-1.5')}>
            {b.iconUrl ? (
              <Image
                source={b.iconUrl}
                style={{
                  width: iconSize,
                  height: iconSize,
                  tintColor: b.color ?? foreground,
                }}
                contentFit="contain"
              />
            ) : null}
            {isLoading ? (
              <Skeleton className={cn('rounded-sm', isLarge ? 'h-6 w-16' : 'h-5 w-12')} />
            ) : (
              <Text
                className={cn(
                  'text-foreground font-bold',
                  isLarge ? 'text-base leading-6' : 'text-sm leading-5'
                )}
                style={b.color ? { color: b.color } : undefined}
              >
                {b.amount?.toLocaleString() ?? '—'}
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

export { Wallet };
export type { WalletProps, WalletBalance, WalletSize };
