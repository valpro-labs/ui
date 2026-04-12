import * as React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type MatchResult = 'win' | 'loss' | 'draw' | 'placement';

interface MatchCardProps {
  /** Map background art URL (Riot `listViewIcon`). Renders as a darkened cover. */
  mapIconUrl?: string;
  /** Agent display icon URL — fills the left edge as a square. */
  agentIconUrl?: string;
  /** Game-mode display icon. Remote URL or local `require()` module. */
  gameModeIconUrl?: string | number;
  /** Local fallback shown if `gameModeIconUrl` fails to load (offline-safe). */
  gameModeFallbackIconUrl?: string | number;
  /** Competitive tier icon URL — rendered below the game-mode icon. */
  tierIconUrl?: string;
  /** MMR delta. Sign + colour follow `result`. Omit to hide the row. */
  mmrChange?: number;
  /** Result label centered in the card (e.g. `"VICTORY"`, `"DEFEAT"`, `"2ND"`). */
  resultLabel: string;
  /** Drives label and team-score colours. Defaults to `"draw"`. */
  result?: MatchResult;
  /** Player team's round score (or kills, in deathmatch). */
  myTeamScore: number;
  /** Enemy team's round score. */
  enemyTeamScore: number;
  /** Pre-formatted KDA string, e.g. `"21/14/8"`. */
  kda: string;
  /** Combat score. Renders the row when defined. */
  score?: number;
  /** Decorative icon shown next to KDA. */
  kdaIcon?: React.ReactNode;
  /** Decorative icon shown next to score. */
  scoreIcon?: React.ReactNode;
  /** Tap handler. When omitted the card renders without `Pressable`. */
  onPress?: () => void;
  /** Extra classes merged onto the outer card wrapper. */
  className?: string;
}

/**
 * Single match-history row — map splash background, agent + game-mode + tier
 * stack on the left, result label and score in the centre, KDA + combat score
 * on the right.
 *
 * Data-free: the consumer pre-derives `result`, `resultLabel`, scores, KDA,
 * MMR change, and resolves all asset URLs. Pair with a match-summary hook on
 * the caller side. Pass `kdaIcon` / `scoreIcon` slots to layer in icons
 * without forking the layout.
 */
function MatchCard({
  mapIconUrl,
  agentIconUrl,
  gameModeIconUrl,
  gameModeFallbackIconUrl,
  tierIconUrl,
  mmrChange,
  resultLabel,
  result = 'draw',
  myTeamScore,
  enemyTeamScore,
  kda,
  score,
  kdaIcon,
  scoreIcon,
  onPress,
  className,
}: MatchCardProps) {
  const isPlacement = result === 'placement';
  const won = result === 'win';
  const lost = result === 'loss';

  const labelColor = isPlacement
    ? 'text-val-yellow'
    : won
      ? 'text-val-green'
      : lost
        ? 'text-val-red'
        : 'text-val-white';

  const card = (
    <View className={cn('bg-card relative overflow-hidden rounded-xl', className)}>
      {/* Map background */}
      {mapIconUrl ? (
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={mapIconUrl}
            style={{ width: '100%', height: '100%', transform: [{ scale: 1.01 }] }}
            contentFit="cover"
          />
          <View style={StyleSheet.absoluteFill} className="bg-black/50" />
        </View>
      ) : null}

      <View className="relative h-18 flex-row items-center">
        {/* Left: agent + game mode + tier */}
        <View className="z-10 flex-1 flex-row items-center gap-x-1">
          <View style={{ width: 72, height: 72 }} className="overflow-hidden">
            {agentIconUrl ? (
              <Image
                source={agentIconUrl}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            ) : null}
          </View>

          <View className="items-center">
            <GameModeIcon source={gameModeIconUrl} fallback={gameModeFallbackIconUrl} />

            {tierIconUrl ? (
              <View className="mt-0.5 items-center justify-center">
                <View className="h-10 w-10">
                  <Image
                    source={tierIconUrl}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                  />
                </View>
                {mmrChange !== undefined ? (
                  <Text
                    className={cn(
                      'text-val-white text-xs font-bold',
                      won && 'text-val-green',
                      lost && 'text-val-red'
                    )}>
                    {mmrChange > 0 ? '+' : ''}
                    {mmrChange}
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>

        {/* Centre: result + score (absolute, layered above the row) */}
        <View
          style={StyleSheet.absoluteFill}
          className="items-center justify-center"
          pointerEvents="none">
          <Text className={cn('text-center text-xl font-black uppercase', labelColor)}>
            {resultLabel}
          </Text>
          <View className="flex-row items-center gap-x-1">
            <Text
              className={cn(
                'text-val-white text-lg font-bold',
                !isPlacement && won && 'text-val-green'
              )}>
              {myTeamScore}
            </Text>
            <View className="bg-val-white h-0.5 w-3" />
            <Text
              className={cn(
                'text-val-white text-lg font-bold',
                !isPlacement && lost && 'text-val-red'
              )}>
              {enemyTeamScore}
            </Text>
          </View>
        </View>

        {/* Spacer reserves the centred column's width in the flex row. */}
        <View className="flex-1" />

        {/* Right: KDA + score */}
        <View className="z-10 flex-1 items-start gap-y-0.5 pl-4">
          <View className="flex-row items-center gap-x-2">
            <View className="w-6 items-center">{kdaIcon}</View>
            <Text className="text-val-white text-lg font-medium">{kda}</Text>
          </View>
          {score !== undefined ? (
            <View className="flex-row items-center gap-x-2">
              <View className="w-6 items-center">{scoreIcon}</View>
              <Text className="text-val-white text-sm font-medium">{score.toLocaleString()}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (!onPress) return card;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
      {card}
    </Pressable>
  );
}

interface GameModeIconProps {
  source: string | number | undefined;
  fallback: string | number | undefined;
}

function GameModeIcon({ source, fallback }: GameModeIconProps) {
  const [errored, setErrored] = React.useState(false);
  const resolved = errored ? fallback : (source ?? fallback);

  if (!resolved) return null;

  return (
    <View className="h-10 w-10">
      <Image
        source={resolved}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
        onError={() => {
          if (!errored && fallback) setErrored(true);
        }}
      />
    </View>
  );
}

export { MatchCard };
export type { MatchCardProps, MatchResult };
