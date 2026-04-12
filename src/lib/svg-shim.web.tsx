/**
 * Web implementation of the SVG shim.
 *
 * Thin functional wrappers around the DOM's native SVG elements so the
 * import sites (`daily-progress.tsx`, future SVG-using blocks) don't have
 * to fork a .web.tsx for rendering. The JSX prop surface is a strict subset
 * of what react-native-svg accepts, covering what we actually use today.
 *
 * Extend the prop types here as we start using more svg attributes.
 */
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactNode,
} from 'react';

type SvgCommon = {
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

function Svg({ children, ...rest }: SvgCommon) {
  return <svg {...rest}>{children}</svg>;
}

type PathProps = PropsWithChildren<Omit<ComponentPropsWithoutRef<'path'>, 'ref'>>;
function Path(props: PathProps) {
  return <path {...props} />;
}

type RectProps = PropsWithChildren<Omit<ComponentPropsWithoutRef<'rect'>, 'ref'>>;
function Rect(props: RectProps) {
  return <rect {...props} />;
}

type TextProps = PropsWithChildren<Omit<ComponentPropsWithoutRef<'text'>, 'ref'>>;
function SvgText(props: TextProps) {
  return <text {...props} />;
}

export { Svg, Path, Rect, SvgText };
