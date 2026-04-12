import * as React from 'react';

import { Pressable, View } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

interface RoleCardProps {
  /** Role display icon URL. Tinted with the foreground / active color. */
  iconUrl?: string;
  /** Size of the rendered role icon, in pixels. */
  iconSize?: number;
  /** Highlights the card with the active/selected tint. */
  selected?: boolean;
  /** Fallback content rendered when `iconUrl` is omitted (e.g. an "all roles" glyph). */
  children?: React.ReactNode;
  /** Tap handler. When omitted the card renders without `Pressable`. */
  onPress?: () => void;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

function useColorVar(name: string): string | undefined {
  const v = useCSSVariable(name);
  return typeof v === 'string' ? v : undefined;
}

/**
 * Role filter tile — square card centered on a tintable role glyph, used to
 * filter an agent-pass grid by role. Pair with an "all roles" variant by
 * omitting `iconUrl` and passing a glyph via `children`.
 */
function RoleCard({
  iconUrl,
  iconSize = 40,
  selected = false,
  children,
  onPress,
  className,
}: RoleCardProps) {
  const foreground = useColorVar('--color-foreground');
  const valGreenUi = useColorVar('--color-val-green-ui');
  const tint = selected ? valGreenUi : foreground;

  const card = (
    <View
      className={cn(
        'bg-card aspect-square items-center justify-center rounded-xl',
        selected && 'bg-val-green/30',
        className
      )}>
      {iconUrl ? (
        <Image
          source={iconUrl}
          style={{ width: iconSize, height: iconSize, tintColor: tint }}
          contentFit="contain"
        />
      ) : (
        children
      )}
    </View>
  );

  if (!onPress) return card;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
      {card}
    </Pressable>
  );
}

export { RoleCard };
export type { RoleCardProps };
