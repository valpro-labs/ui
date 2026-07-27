type NightMarketOffer = {
  /** Position badge shown in the card footer, e.g. `"01"`. Auto-generated from array order when omitted. */
  index?: string;
  /** Tier text shown above the item name, e.g. `"PREMIUM"`. */
  tierLabel: string;
  /** Accent color used for the card and discount badge. */
  tierColor: string;
  /** Item display name. */
  name: string;
  /** Weapon render URL. */
  iconUrl: string;
  /** Original price shown with strikethrough. */
  originalPrice: number;
  /** Discounted price shown as the primary value. */
  discountedPrice: number;
  /** Discount percent badge, e.g. `34` for `-34%`. */
  discountPercent: number;
  /** Riot `EEquippableCategory::*` string used to scale the render. */
  weaponCategory?: string;
};

export type { NightMarketOffer };
