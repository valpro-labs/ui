import { View } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

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
function Wallet({ balances, isLoading = false, className }: WalletProps) {
  const foregroundRaw = useCSSVariable('--color-foreground');
  const foreground = typeof foregroundRaw === 'string' ? foregroundRaw : undefined;

  return (
    <View className={cn('bg-card overflow-hidden rounded-2xl px-4 py-3', className)}>
      <View className="flex-row items-center gap-x-4">
        {balances.map((b) => (
          <View key={b.key} className="flex-1 flex-row items-center gap-x-1.5">
            {b.iconUrl ? (
              <Image
                source={b.iconUrl}
                style={{ width: 18, height: 18, tintColor: b.color ?? foreground }}
                contentFit="contain"
              />
            ) : null}
            {isLoading ? (
              <Skeleton className="h-5 w-12 rounded-sm" />
            ) : (
              <Text
                className="text-foreground text-sm leading-5 font-bold"
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
export type { WalletProps, WalletBalance };
