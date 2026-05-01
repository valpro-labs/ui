import * as React from 'react';

import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { Defs, RadialGradient, Rect, Stop, Svg } from '@/lib/svg-shim';

type MatchDetailPosterMetric = {
  label: string;
  value: string | number;
};

type MatchDetailPosterProps = {
  /** Top-left brand wordmark. */
  brandLabel?: string;
  /** Match result callout, e.g. `"VICTORY"`. */
  outcomeLabel: string;
  /** Accent palette switches glow, borders, and primary numbers. */
  result?: 'win' | 'loss';
  /** Left score in the hero row. */
  myTeamScore: number;
  /** Right score in the hero row. */
  enemyTeamScore: number;
  /** Map / mode / duration line under the score. */
  mapName: string;
  modeLabel: string;
  durationLabel: string;
  /** Optional map splash art rendered behind the poster content. */
  mapBackgroundUrl?: string;
  /** Full-body agent art rendered on the right side. */
  agentPortraitUrl: string;
  /** Small circular agent icon in the footer. */
  agentIconUrl: string;
  /** Agent display name in the footer. */
  agentName: string;
  /** Player tag shown in the footer. */
  playerTag: string;
  /** Highlight KDA block. */
  kills: number;
  deaths: number;
  assists: number;
  /** Upper metric row, typically ACS / ADR / HS% / Rating. */
  primaryMetrics: MatchDetailPosterMetric[];
  /** Lower metric row, typically First Blood / Plants / Defuses / KAST. */
  secondaryMetrics: MatchDetailPosterMetric[];
  /** Override the default 1080px canvas width. */
  width?: number;
  /** Override the default 1920px canvas height. */
  height?: number;
};

const BACKGROUND = 'rgb(9, 16, 18)';
const TEXT_PRIMARY = 'rgb(237, 233, 226)';
const VALPRO_RED = 'rgb(255, 70, 85)';
const WIN_ACCENT = 'rgb(34, 255, 197)';
const LOSS_ACCENT = 'rgb(255, 120, 102)';
const WIN_BORDER = 'rgb(13, 51, 39)';
const LOSS_BORDER = 'rgb(75, 33, 30)';

function withAlpha(color: string, alpha: number): string {
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }

  return color;
}

function MetricRow({
  metrics,
  accentColor,
  borderColor,
}: {
  metrics: MatchDetailPosterMetric[];
  accentColor: string;
  borderColor: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: borderColor,
        paddingTop: 16,
        marginBottom: 16,
      }}>
      {metrics.map((metric, index) => (
        <View
          key={`${metric.label}-${index}`}
          style={{
            flex: 1,
            alignItems: index === 0 ? 'flex-start' : 'center',
          }}>
          <Text
            style={{
              marginBottom: 4,
              color: accentColor,
              fontSize: 14,
              lineHeight: 18,
              fontWeight: '800',
              letterSpacing: 2.8,
            }}>
            {metric.label}
          </Text>
          <Text
            style={{
              color: TEXT_PRIMARY,
              fontSize: 44,
              lineHeight: 46,
              fontWeight: '900',
              letterSpacing: -1.6,
            }}>
            {metric.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

/**
 * Match-detail share poster inspired by the in-app result recap:
 * oversized final score, floating agent portrait, a large KDA hero block,
 * and two dense metric rows suitable for social export.
 */
function MatchDetailPoster({
  brandLabel = 'VALPRO',
  outcomeLabel,
  result = 'win',
  myTeamScore,
  enemyTeamScore,
  mapName,
  modeLabel,
  durationLabel,
  mapBackgroundUrl,
  agentPortraitUrl,
  agentIconUrl,
  agentName,
  playerTag,
  kills,
  deaths,
  assists,
  primaryMetrics,
  secondaryMetrics,
  width = 1080,
  height = 1920,
}: MatchDetailPosterProps) {
  const accentColor = result === 'win' ? WIN_ACCENT : LOSS_ACCENT;
  const borderColor = result === 'win' ? WIN_BORDER : LOSS_BORDER;
  const glowSize = width * 1.06;

  return (
    <View
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: BACKGROUND,
      }}>
      {mapBackgroundUrl ? (
        <Image
          source={mapBackgroundUrl}
          accessibilityLabel={`${mapName} background`}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0.2,
          }}
          contentFit="cover"
        />
      ) : null}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(5, 10, 12, 0.72)',
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: height * 0.22,
          left: width * 0.08,
          width: glowSize,
          height: glowSize,
          opacity: 0.9,
        }}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="matchDetailPosterGlow" cx="0.5" cy="0.5" r="0.5">
              <Stop offset="0" stopColor={accentColor} stopOpacity="0.17" />
              <Stop offset="0.42" stopColor={accentColor} stopOpacity="0.08" />
              <Stop offset="1" stopColor={accentColor} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#matchDetailPosterGlow)" />
        </Svg>
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: 60,
          paddingRight: 60,
          paddingBottom: 80,
          paddingLeft: 60,
          position: 'relative',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 32,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View
              style={{
                width: 14,
                height: 14,
                backgroundColor: VALPRO_RED,
                transform: [{ rotate: '45deg' }],
              }}
            />
            <Text
              style={{
                color: TEXT_PRIMARY,
                fontSize: 18,
                lineHeight: 20,
                fontWeight: '900',
                letterSpacing: 5.4,
                opacity: 0.7,
              }}>
              {brandLabel}
            </Text>
          </View>
          <Text
            style={{
              color: accentColor,
              fontSize: 24,
              lineHeight: 28,
              fontWeight: '900',
              letterSpacing: 9.6,
            }}>
            {'\u25c6'} {outcomeLabel}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginBottom: 16,
          }}>
          <Text
            style={{
              color: accentColor,
              fontSize: 280,
              lineHeight: 232,
              fontWeight: '900',
              letterSpacing: -22,
            }}>
            {myTeamScore}
          </Text>
          <Text
            style={{
              marginHorizontal: 8,
              color: TEXT_PRIMARY,
              opacity: 0.25,
              fontSize: 140,
              lineHeight: 126,
              fontWeight: '300',
            }}>
            -
          </Text>
          <Text
            style={{
              color: TEXT_PRIMARY,
              opacity: 0.35,
              fontSize: 280,
              lineHeight: 232,
              fontWeight: '900',
              letterSpacing: -22,
            }}>
            {enemyTeamScore}
          </Text>
        </View>

        <Text
          style={{
            marginBottom: 40,
            color: TEXT_PRIMARY,
            opacity: 0.5,
            fontSize: 24,
            lineHeight: 28,
            fontWeight: '800',
            letterSpacing: 7.2,
          }}>
          {mapName.toUpperCase()} {'\u00b7'} {modeLabel.toUpperCase()} {'\u00b7'} {durationLabel}
        </Text>

        <View
          style={{
            position: 'absolute',
            top: 160,
            right: -80,
            width: 680,
            zIndex: 1,
          }}>
          <Image
            source={agentPortraitUrl}
            accessibilityLabel={agentName}
            style={{
              width: '100%',
              aspectRatio: 0.68,
              opacity: 0.9,
            }}
            contentFit="contain"
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            zIndex: 4,
          }}>
          <View
            style={{
              alignSelf: 'flex-start',
              marginBottom: 36,
              paddingHorizontal: 28,
              paddingVertical: 20,
              borderRadius: 14,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderWidth: 1,
              borderColor: withAlpha(accentColor, 0.14),
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
              {[
                { value: kills, label: 'K' },
                { value: deaths, label: 'D' },
                { value: assists, label: 'A' },
              ].map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 ? (
                    <Text
                      style={{
                        marginHorizontal: 4,
                        color: TEXT_PRIMARY,
                        opacity: 0.3,
                        fontSize: 100,
                        lineHeight: 100,
                        fontWeight: '300',
                      }}>
                      /
                    </Text>
                  ) : null}
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        color: TEXT_PRIMARY,
                        fontSize: 120,
                        lineHeight: 120,
                        fontWeight: '900',
                        letterSpacing: -7.2,
                      }}>
                      {item.value}
                    </Text>
                    <Text
                      style={{
                        color: TEXT_PRIMARY,
                        opacity: 0.5,
                        fontSize: 22,
                        lineHeight: 24,
                        fontWeight: '800',
                        letterSpacing: 3.3,
                      }}>
                      {item.label}
                    </Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </View>

          <MetricRow metrics={primaryMetrics} accentColor={accentColor} borderColor={borderColor} />
          <MetricRow metrics={secondaryMetrics} accentColor={accentColor} borderColor={borderColor} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 16,
              borderTopWidth: 2,
              borderTopColor: accentColor,
            }}>
            <Text
              style={{
                color: TEXT_PRIMARY,
                fontSize: 28,
                lineHeight: 32,
                fontWeight: '900',
                letterSpacing: -0.28,
              }}>
              {playerTag}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Image
                source={agentIconUrl}
                accessibilityLabel={agentName}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  backgroundColor: withAlpha(accentColor, 0.2),
                }}
                contentFit="cover"
              />
              <View>
                <Text
                  style={{
                    color: TEXT_PRIMARY,
                    fontSize: 28,
                    lineHeight: 30,
                    fontWeight: '900',
                    letterSpacing: -0.56,
                  }}>
                  {agentName}
                </Text>
                <Text
                  style={{
                    color: TEXT_PRIMARY,
                    opacity: 0.5,
                    fontSize: 16,
                    lineHeight: 18,
                    fontWeight: '700',
                    letterSpacing: 2.4,
                  }}>
                  {mapName.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export { MatchDetailPoster };
export type { MatchDetailPosterProps, MatchDetailPosterMetric };
