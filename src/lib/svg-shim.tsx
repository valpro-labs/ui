/**
 * Cross-platform SVG primitives.
 *
 * Native (this file): re-exports from `react-native-svg`.
 * Web (`./svg-shim.web.tsx`): raw HTML <svg>/<path>/<rect>/<text>.
 *
 * Consumers import `Svg`, `Path`, `Rect`, `SvgText` from `@/lib/svg-shim`
 * and get whichever renderer the current bundler picks up.
 */
import Svg, {
  Defs,
  Path,
  RadialGradient,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

export { Defs, Path, RadialGradient, Rect, Stop, Svg, SvgText };
