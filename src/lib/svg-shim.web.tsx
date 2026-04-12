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

type PressHandlers = {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

type PathProps = PropsWithChildren<
  Omit<ComponentPropsWithoutRef<'path'>, 'ref'> & PressHandlers
>;
function Path({ onPress, onPressIn, onPressOut, ...rest }: PathProps) {
  const interactive = onPress || onPressIn || onPressOut;
  return (
    <path
      {...rest}
      onClick={onPress ? () => onPress() : rest.onClick}
      onPointerDown={onPressIn ? () => onPressIn() : rest.onPointerDown}
      onPointerUp={onPressOut ? () => onPressOut() : rest.onPointerUp}
      onPointerLeave={onPressOut ? () => onPressOut() : rest.onPointerLeave}
      style={interactive ? { cursor: 'pointer', ...rest.style } : rest.style}
    />
  );
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
