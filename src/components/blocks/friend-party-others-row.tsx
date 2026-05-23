import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface FriendPartyOthersRowProps {
  /** How many non-friend party members are hidden. Shown as `+N` on the left. */
  count: number;
  /** Right-hand label (e.g. `"and 2 others in party"`). Consumer formats + localizes. */
  label: string;
  /** Visual density. Use `large` for wider tablet layouts. */
  size?: 'regular' | 'large';
  /** Extra classes merged onto the outer row wrapper. */
  className?: string;
}

/**
 * Summary row appended after a grouped party in the friends list — shows
 * `+N` in the avatar column and a caller-formatted label explaining how
 * many non-friend members are in the same party.
 *
 * Data-free: consumer supplies the `count` and the fully-formatted label
 * (pluralization + localization happen upstream).
 */
function FriendPartyOthersRow({
  count,
  label,
  size = 'regular',
  className,
}: FriendPartyOthersRowProps) {
  const isLarge = size === 'large';

  return (
    <View
      className={cn(
        'flex-row items-center',
        isLarge ? 'gap-x-4 px-5 py-2.5' : 'gap-x-3 px-3.5 py-1.5',
        className
      )}>
      <View className="items-center justify-center" style={{ width: isLarge ? 56 : 44 }}>
        <Text
          className={cn('text-muted-foreground font-bold', isLarge ? 'text-base' : 'text-sm')}>
          +{count}
        </Text>
      </View>
      <Text className={cn('text-muted-foreground font-bold', isLarge ? 'text-base' : 'text-sm')}>
        {label}
      </Text>
    </View>
  );
}

export { FriendPartyOthersRow };
export type { FriendPartyOthersRowProps };
