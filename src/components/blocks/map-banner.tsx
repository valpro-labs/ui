import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type MapBannerResult = 'win' | 'loss' | 'draw';

interface MapBannerProps {
  /** Map splash art URL — fills the banner, darkened with a black overlay. */
  splashUrl?: string;
  /** Map display name shown along the bottom edge. */
  mapName?: string;
  /**
   * Score-pair mode: both `myTeamScore` and `enemyTeamScore` set renders the
   * left/centre/right "13 — VICTORY — 9" layout. Omit both and pass
   * `placementLabel` for the deathmatch / placement single-label layout.
   */
  myTeamScore?: number;
  enemyTeamScore?: number;
  /** Centered label in score-pair mode (e.g. "VICTORY" / "DEFEAT" / "DRAW"). */
  outcomeLabel?: string;
  /** Deathmatch / placement label (e.g. "1ST", "3RD / 14"). Presence switches the banner to single-column layout. */
  placementLabel?: string;
  /**
   * Colour treatment. `"win"` paints my score green + enemy red in score-pair
   * mode, or paints the placement label gold in placement mode. `"loss"`
   * flips the score colours. `"draw"` leaves everything white.
   */
  result?: MapBannerResult;
  /** Extra classes merged onto the outer wrapper. */
  className?: string;
}

/**
 * Match-detail hero banner — map splash background with a darkened overlay,
 * score pair (team modes) or a single placement label (deathmatch /
 * placement) centered on top, and the map name along the bottom edge.
 *
 * Data-free: the consumer resolves the splash URL and the display strings.
 * Passing `placementLabel` switches the layout; otherwise `myTeamScore` +
 * `enemyTeamScore` + `outcomeLabel` drive the three-column score layout.
 */
function MapBanner({
  splashUrl,
  mapName,
  myTeamScore,
  enemyTeamScore,
  outcomeLabel,
  placementLabel,
  result = 'draw',
  className,
}: MapBannerProps) {
  const isPlacement = placementLabel !== undefined;
  const won = result === 'win';
  const lost = result === 'loss';

  return (
    <View
      className={cn(
        'bg-card relative aspect-video w-full overflow-hidden rounded-2xl',
        className
      )}>
      {splashUrl ? (
        <Image
          source={splashUrl}
          style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
          contentFit="cover"
        />
      ) : null}
      <View className="absolute inset-0 bg-black/40" />

      <View className="absolute inset-0 flex-row items-center">
        {isPlacement ? (
          <View className="flex-1 items-center justify-center">
            <Text
              className={cn(
                'text-val-white text-4xl font-black tracking-tighter uppercase',
                won && 'text-val-yellow'
              )}>
              {placementLabel}
            </Text>
          </View>
        ) : (
          <>
            <View className="flex-1 items-end">
              <Text
                className={cn(
                  'text-val-white text-4xl font-black tabular-nums',
                  won && 'text-val-green',
                  lost && 'text-val-red'
                )}>
                {myTeamScore}
              </Text>
            </View>

            <View className="items-center px-4">
              <Text className="text-val-white text-4xl font-black tracking-tighter uppercase">
                {outcomeLabel}
              </Text>
            </View>

            <View className="flex-1 items-start">
              <Text
                className={cn(
                  'text-val-white text-4xl font-black tabular-nums',
                  won && 'text-val-red',
                  lost && 'text-val-green'
                )}>
                {enemyTeamScore}
              </Text>
            </View>
          </>
        )}
      </View>

      {mapName ? (
        <View className="absolute bottom-0 w-full items-center p-2">
          <Text className="text-sm leading-tight tracking-widest text-white/60 uppercase">
            {mapName}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export { MapBanner };
export type { MapBannerProps, MapBannerResult };
