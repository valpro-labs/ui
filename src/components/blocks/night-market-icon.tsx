import { useCSSVariable } from 'uniwind';

import { Path, Svg } from '@/lib/svg-shim';

interface NightMarketIconProps {
  size?: number;
  color?: string;
}

// Square viewBox so the Svg canvas stays square at every `size`. The icon's
// natural silhouette is a 20x36 rectangle (with a diamond cutout), which we
// pad to a 36x36 square. Flex containers can then center the Svg on whole
// pixels, avoiding the sub-pixel drift that a 20x36 Svg canvas produced when
// consumers wrapped it in a square button (e.g. `size={20}` -> width 11.111).
const VB = 36;
const RECT_W = 20;
const RECT_H = 36;
const RECT_X = (VB - RECT_W) / 2;
const RECT_Y = (VB - RECT_H) / 2;
const CX = VB / 2;
const CY = VB / 2;
const HALF_DIAG = 6 * Math.SQRT2;

const PATH_D = [
  `M${RECT_X} ${RECT_Y} H${RECT_X + RECT_W} V${RECT_Y + RECT_H} H${RECT_X} Z`,
  `M${CX} ${(CY - HALF_DIAG).toFixed(3)} L${(CX + HALF_DIAG).toFixed(3)} ${CY} L${CX} ${(CY + HALF_DIAG).toFixed(3)} L${(CX - HALF_DIAG).toFixed(3)} ${CY} Z`,
].join(' ');

function NightMarketIcon({ size = VB, color }: NightMarketIconProps) {
  const foreground = useCSSVariable('--color-foreground');
  const fill = color ?? (typeof foreground === 'string' ? foreground : 'currentColor');
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`}>
      <Path d={PATH_D} fill={fill} fillRule="evenodd" />
    </Svg>
  );
}

export { NightMarketIcon };
export type { NightMarketIconProps };
