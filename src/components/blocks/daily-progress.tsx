import { useMemo } from 'react';

import { View } from 'react-native';

import { useCSSVariable } from 'uniwind';

import { DailyProgressSkeleton } from '@/components/blocks/daily-progress-skeleton';
import { Path, Rect, Svg, SvgText } from '@/lib/svg-shim';

// ── Geometry types ────────────────────────────────────────────────────────

type Point = [number, number];

interface Corner {
  enter: Point;
  ctrl: Point;
  leave: Point;
}

interface Segment {
  type: 'line' | 'quad';
  from: Point;
  to: Point;
  ctrl?: Point;
  length: number;
}

// ── Geometry helpers ──────────────────────────────────────────────────────

function lineLength(a: Point, b: Point): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function quadBezierLength(p0: Point, p1: Point, p2: Point, steps = 32): number {
  let len = 0;
  let prev = p0;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    const curr: Point = [
      mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0],
      mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1],
    ];
    len += lineLength(prev, curr);
    prev = curr;
  }
  return len;
}

function quadBezierPoint(p0: Point, p1: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  return [
    mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0],
    mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1],
  ];
}

function diamondCorners(cx: number, cy: number, r: number, cr: number): Corner[] {
  const pts: Point[] = [
    [cx, cy - r],
    [cx + r, cy],
    [cx, cy + r],
    [cx - r, cy],
  ];
  const n = 4;
  const corners: Corner[] = [];

  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const curr = pts[i];
    const next = pts[(i + 1) % n];

    const dx1 = curr[0] - prev[0];
    const dy1 = curr[1] - prev[1];
    const dx2 = next[0] - curr[0];
    const dy2 = next[1] - curr[1];

    const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    const t = Math.min(cr, l1 / 2, l2 / 2);

    corners.push({
      enter: [curr[0] - (dx1 / l1) * t, curr[1] - (dy1 / l1) * t],
      ctrl: [curr[0], curr[1]],
      leave: [curr[0] + (dx2 / l2) * t, curr[1] + (dy2 / l2) * t],
    });
  }

  return corners;
}

function buildDiamondPath(corners: Corner[]): string {
  let d = `M${corners[0].enter[0].toFixed(2)} ${corners[0].enter[1].toFixed(2)}`;
  d += ` Q${corners[0].ctrl[0]} ${corners[0].ctrl[1]} ${corners[0].leave[0].toFixed(2)} ${corners[0].leave[1].toFixed(2)}`;

  for (let i = 1; i < 4; i++) {
    d += ` L${corners[i].enter[0].toFixed(2)} ${corners[i].enter[1].toFixed(2)}`;
    d += ` Q${corners[i].ctrl[0]} ${corners[i].ctrl[1]} ${corners[i].leave[0].toFixed(2)} ${corners[i].leave[1].toFixed(2)}`;
  }

  d += ' Z';
  return d;
}

function buildSegments(corners: Corner[]): Segment[] {
  const segs: Segment[] = [];

  segs.push({
    type: 'quad',
    from: corners[0].enter,
    to: corners[0].leave,
    ctrl: corners[0].ctrl,
    length: quadBezierLength(corners[0].enter, corners[0].ctrl, corners[0].leave),
  });

  for (let i = 1; i < 4; i++) {
    const from = corners[i - 1].leave;
    const to = corners[i].enter;
    segs.push({ type: 'line', from, to, length: lineLength(from, to) });

    segs.push({
      type: 'quad',
      from: corners[i].enter,
      to: corners[i].leave,
      ctrl: corners[i].ctrl,
      length: quadBezierLength(corners[i].enter, corners[i].ctrl, corners[i].leave),
    });
  }

  segs.push({
    type: 'line',
    from: corners[3].leave,
    to: corners[0].enter,
    length: lineLength(corners[3].leave, corners[0].enter),
  });

  return segs;
}

function getPointAtLength(segments: Segment[], totalLength: number, dist: number): Point {
  let d = ((dist % totalLength) + totalLength) % totalLength;

  for (const seg of segments) {
    if (d <= seg.length) {
      const t = seg.length > 0 ? d / seg.length : 0;
      if (seg.type === 'line') {
        return [
          seg.from[0] + (seg.to[0] - seg.from[0]) * t,
          seg.from[1] + (seg.to[1] - seg.from[1]) * t,
        ];
      }
      return quadBezierPoint(seg.from, seg.ctrl!, seg.to, t);
    }
    d -= seg.length;
  }

  return segments[0].from;
}

function computeTotalLength(segments: Segment[]): number {
  return segments.reduce((sum, s) => sum + s.length, 0);
}

function findStartOffset(segments: Segment[]): number {
  const seg = segments[0];
  if (seg.type !== 'quad') return 0;

  let bestY = Infinity;
  let bestDist = 0;
  const steps = 40;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const pt = quadBezierPoint(seg.from, seg.ctrl!, seg.to, t);
    if (pt[1] < bestY) {
      bestY = pt[1];
      bestDist = t * seg.length;
    }
  }

  return bestDist;
}

function buildFillPath(
  segments: Segment[],
  totalLength: number,
  pct: number,
  startOffset: number
): string {
  if (pct <= 0) return '';

  const target = (pct / 100) * totalLength;
  const steps = Math.max(2, Math.ceil(target / 1.5));
  let d = '';

  for (let i = 0; i <= steps; i++) {
    const dist = (startOffset + (i / steps) * target) % totalLength;
    const pt = getPointAtLength(segments, totalLength, dist);
    d += (i === 0 ? 'M' : ' L') + pt[0].toFixed(1) + ' ' + pt[1].toFixed(1);
  }

  return d;
}

/**
 * Tack a modern CSS alpha onto an already-resolved color value. Works with
 * hex, rgb(), hsl(), oklch() — anything modern browsers accept as a color.
 */
function withAlpha(color: string, alpha: number): string {
  return `color-mix(in oklch, ${color} ${Math.round(alpha * 100)}%, transparent)`;
}

// ── Precomputed geometry (identical across all 4 diamonds) ───────────────

const VB = 100;
const CENTER = 50;
const OUTER_R = 42;
const GAP = 6;
const INNER_R = OUTER_R - GAP;
const CORNER_R = 10;
const CARD_SIZE = INNER_R * Math.SQRT2;
const TRACK_WIDTH = 2.5;
const STEPS_PER_MILESTONE = 4;

const PRECOMPUTED = (() => {
  const corners = diamondCorners(CENTER, CENTER, OUTER_R, CORNER_R);
  const trackPath = buildDiamondPath(corners);
  const segments = buildSegments(corners);
  const totalLength = computeTotalLength(segments);
  const startOffset = findStartOffset(segments);
  return { trackPath, segments, totalLength, startOffset };
})();

// ── Components ────────────────────────────────────────────────────────────

interface DailyMilestone {
  /** Current progress within this milestone. 0 – STEPS_PER_MILESTONE (4). */
  progress: number;
}

interface DailyProgressProps {
  /** Milestones to render, in order. Usually 4 items for a daily ticket. Ignored while `isLoading`. */
  milestones: ReadonlyArray<DailyMilestone>;
  /** Show the skeleton placeholder instead of the real milestones. */
  isLoading?: boolean;
  /** Skeleton slot count while loading. Defaults to `milestones.length || 4`. */
  skeletonCount?: number;
}

const SIZE = 76;
const SPACING = 12;

/**
 * `useCSSVariable` returns `string | number | undefined` (numbers come from
 * px-typed variables on native). Every token we read here is a CSS color, so
 * coerce to string for react-native-svg's `ColorValue` props.
 */
function useColorVar(name: string): string {
  const value = useCSSVariable(name);
  return typeof value === 'string' ? value : '';
}

function DiamondRing({ index, progress }: { index: number; progress: number }) {
  const border = useColorVar('--color-border');
  const background = useColorVar('--color-background');
  const foreground = useColorVar('--color-foreground');
  const valGreenUi = useColorVar('--color-val-green-ui');

  const pct = Math.min(100, (progress / STEPS_PER_MILESTONE) * 100);
  const isFull = pct >= 100;
  const progressColor = isFull ? valGreenUi : withAlpha(valGreenUi, 0.5);

  const fillPath = useMemo(() => {
    const { segments, totalLength, startOffset } = PRECOMPUTED;
    return buildFillPath(segments, totalLength, pct, startOffset);
  }, [pct]);

  return (
    <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${VB} ${VB}`}>
      {/* Track */}
      <Path d={PRECOMPUTED.trackPath} fill="none" stroke={border} strokeWidth={TRACK_WIDTH} />

      {/* Progress fill */}
      {fillPath ? (
        <Path
          d={fillPath}
          fill="none"
          stroke={progressColor}
          strokeWidth={TRACK_WIDTH}
          strokeLinecap="round"
        />
      ) : null}

      {/* Inner card */}
      <Rect
        x={CENTER - CARD_SIZE / 2}
        y={CENTER - CARD_SIZE / 2}
        width={CARD_SIZE}
        height={CARD_SIZE}
        rx={5}
        transform={`rotate(45, ${CENTER}, ${CENTER})`}
        fill={isFull ? valGreenUi : background}
        stroke={isFull ? valGreenUi : border}
        strokeWidth={0.5}
      />

      {/* Milestone number */}
      <SvgText
        x={CENTER}
        y={CENTER + 6}
        textAnchor="middle"
        fontSize={20}
        fontWeight="700"
        fill={isFull ? background : foreground}>
        {index + 1}
      </SvgText>
    </Svg>
  );
}

function DailyProgress({ milestones, isLoading = false, skeletonCount }: DailyProgressProps) {
  if (isLoading) {
    return <DailyProgressSkeleton count={skeletonCount ?? (milestones.length || 4)} />;
  }
  return (
    <View className="flex-row items-center justify-center" style={{ gap: SPACING }}>
      {milestones.map((milestone, index) => (
        <DiamondRing key={index} index={index} progress={milestone.progress} />
      ))}
    </View>
  );
}

export { DailyProgress };
export type { DailyProgressProps, DailyMilestone };
