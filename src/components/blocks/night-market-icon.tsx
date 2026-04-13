import { useCSSVariable } from 'uniwind';

import { Path, Svg } from '@/lib/svg-shim';

interface NightMarketIconProps {
  size?: number;
  color?: string;
}

const VB_W = 20;
const VB_H = 36;
const CX = VB_W / 2;
const CY = VB_H / 2;
const HALF_DIAG = 6 * Math.SQRT2;

const PATH_D = [
  `M0 0 H${VB_W} V${VB_H} H0 Z`,
  `M${CX} ${(CY - HALF_DIAG).toFixed(3)} L${(CX + HALF_DIAG).toFixed(3)} ${CY} L${CX} ${(CY + HALF_DIAG).toFixed(3)} L${(CX - HALF_DIAG).toFixed(3)} ${CY} Z`,
].join(' ');

function NightMarketIcon({ size = VB_H, color }: NightMarketIconProps) {
  const foreground = useCSSVariable('--color-foreground');
  const fill = color ?? (typeof foreground === 'string' ? foreground : 'currentColor');
  const width = (size * VB_W) / VB_H;
  return (
    <Svg width={width} height={size} viewBox={`0 0 ${VB_W} ${VB_H}`}>
      <Path d={PATH_D} fill={fill} fillRule="evenodd" />
    </Svg>
  );
}

export { NightMarketIcon };
export type { NightMarketIconProps };
