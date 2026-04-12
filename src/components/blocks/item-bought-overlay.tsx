import * as React from 'react';

import { View } from 'react-native';

import { cn } from '@/lib/utils';

interface ItemBoughtOverlayProps {
  /**
   * "Done / owned" indicator centered inside the overlay — consumer
   * supplies it fully-formed (e.g. a phosphor `<Check size={56}
   * color="white" />`). Size and color are the consumer's call; the
   * overlay just centers whatever it receives.
   */
  icon?: React.ReactNode;
  /**
   * Extra classes merged onto the outer View. The default
   * `rgba(0,0,0,0.6)` dim is applied inline so it survives most
   * overrides, but pass `bg-…` here if you want a different tint.
   */
  className?: string;
}

/**
 * Absolute-positioned fill overlay used to flag a tile as
 * "already owned / already bought." Darkens the underlying image and
 * centers a large checkmark (or whatever indicator the consumer passes).
 *
 * Meant to be layered inside a tile/card — typically handed to
 * `OwnedItemCard` / `OfferCard` / `BundleCard` via their `imageOverlay`
 * slot, or dropped as a sibling of an absolute-positioned image.
 *
 * Data-free and icon-agnostic: the consumer resolves ownership state
 * upstream and provides the icon as a `ReactNode`.
 */
function ItemBoughtOverlay({ icon, className }: ItemBoughtOverlayProps) {
  return (
    <View
      className={cn('absolute inset-0 items-center justify-center', className)}
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      {icon}
    </View>
  );
}

export { ItemBoughtOverlay };
export type { ItemBoughtOverlayProps };
