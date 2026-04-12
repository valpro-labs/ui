import {
  Image as RNImage,
  type ImageProps as RNImageProps,
  type ImageResizeMode,
  type ImageSourcePropType,
} from 'react-native';

import { cn } from '@/lib/utils';

/**
 * Subset of expo-image's ImageContentFit that we map to react-native-web's resizeMode.
 * expo-image's 'scale-down' and 'none' have no exact RNW equivalents — closest approximations used.
 */
type ContentFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

/**
 * expo-image accepts `source` as a string URL, a URI object, a number (require),
 * or an array. react-native-web's Image only accepts `{ uri }` objects or numbers,
 * so we normalize string sources to `{ uri: string }`.
 */
type SourceInput =
  | string
  | number
  | { uri: string; width?: number; height?: number }
  | ReadonlyArray<{ uri: string; width?: number; height?: number }>
  | null
  | undefined;

export type ImageProps = Omit<RNImageProps, 'source' | 'resizeMode'> & {
  source?: SourceInput;
  contentFit?: ContentFit;
  className?: string;
  /** Accepted for API parity with expo-image; ignored on web. */
  cachePolicy?: string;
  /** Accepted for API parity with expo-image; ignored on web. */
  transition?: number | object;
  /** Accepted for API parity with expo-image; ignored on web. */
  placeholder?: unknown;
  /** Accepted for API parity with expo-image; ignored on web. */
  placeholderContentFit?: ContentFit;
  /** Accepted for API parity with expo-image; ignored on web. */
  recyclingKey?: string;
  /** Accepted for API parity with expo-image; ignored on web. */
  priority?: string;
};

const CONTENT_FIT_TO_RESIZE_MODE: Record<ContentFit, ImageResizeMode> = {
  cover: 'cover',
  contain: 'contain',
  fill: 'stretch',
  none: 'center',
  'scale-down': 'contain',
};

function normalizeSource(source: SourceInput): ImageSourcePropType | undefined {
  if (source == null) return undefined;
  if (typeof source === 'string') return { uri: source };
  if (typeof source === 'number') return source;
  if (Array.isArray(source)) {
    // RNW can't handle multi-resolution arrays; pick the first entry.
    const first = source[0];
    return first ? (first as ImageSourcePropType) : undefined;
  }
  return source as ImageSourcePropType;
}

function Image({
  source,
  contentFit = 'cover',
  className,
  // Drop native-only props so they don't leak onto the DOM.
  cachePolicy: _cachePolicy,
  transition: _transition,
  placeholder: _placeholder,
  placeholderContentFit: _placeholderContentFit,
  recyclingKey: _recyclingKey,
  priority: _priority,
  style,
  ...props
}: ImageProps) {
  const normalized = normalizeSource(source);
  const resizeMode = CONTENT_FIT_TO_RESIZE_MODE[contentFit] ?? 'cover';

  return (
    <RNImage
      {...props}
      source={normalized as ImageSourcePropType}
      resizeMode={resizeMode}
      style={style}
      className={cn(className) as string}
    />
  );
}

export { Image };
