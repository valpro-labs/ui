import type { ImageStyle, StyleProp } from 'react-native';

/**
 * Per-category default image width (% of card width) used to scale
 * weapon art inside the two-column loadout grid. Keyed by Valorant's
 * `EEquippableCategory::*` string.
 */
const WEAPON_CATEGORY_WIDTH_GRID: Record<string, number> = {
  'EEquippableCategory::Sidearm': 50,
  'EEquippableCategory::SMG': 80,
  'EEquippableCategory::Shotgun': 78,
  'EEquippableCategory::Rifle': 80,
  'EEquippableCategory::Melee': 60,
  'EEquippableCategory::Sniper': 82,
  'EEquippableCategory::Heavy': 85,
};

/**
 * Resolve the per-category image width for a weapon category, falling
 * back to 80 when the category isn't in the overrides map.
 */
function getWeaponCategoryWidth(category: string): number {
  return WEAPON_CATEGORY_WIDTH_GRID[category] ?? 80;
}

interface WeaponGridTransform {
  /** Uniform scale multiplier (1 = fit, 2 = 2x zoom). */
  scale: number;
  /** Horizontal offset in px. */
  offsetX: number;
  /** Vertical offset in px. */
  offsetY: number;
  /** Rotation in degrees. */
  rotate: number;
}

const DEFAULT_WEAPON_GRID: WeaponGridTransform = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  rotate: 0,
};

/**
 * Per-weapon visual tuning for the 3-column 1:1 weapon-skin picker —
 * rotates and zooms each gun's art so it fits its square tile nicely.
 * Keyed by Valorant weapon UUID.
 */
const WEAPON_GRID_OVERRIDES: Record<string, Partial<WeaponGridTransform>> = {
  // ── Sidearms ──

  // Classic
  '29a0cfab-485b-f5d5-779a-b59f85e204a8': { scale: 1.4, offsetX: -5, rotate: 30 },
  // Shorty
  '42da8ccc-40d5-affc-beec-15aa47b42eda': { scale: 2.2, offsetX: -5, rotate: 30 },
  // Frenzy
  '44d4e95c-4157-0037-81b2-17841bf2e8e3': { scale: 1.8, offsetX: -17, offsetY: 2, rotate: 30 },
  // Ghost
  '1baa85b4-4c70-1284-64bb-6481dfc3bb4e': { scale: 2.5, offsetX: -23, offsetY: -7, rotate: 30 },
  // Bandit
  '410b2e0b-4ceb-1321-1727-20858f7f3477': { scale: 2.0, offsetX: -15, offsetY: 0, rotate: 30 },
  // Sheriff
  'e336c6b8-418d-9340-d77f-7a9e4cfe0702': { scale: 1.8, offsetX: -12, offsetY: 0, rotate: 30 },

  // ── SMGs ──

  // Stinger
  'f7e1b454-4ad4-1063-ec0a-159e56b58941': { scale: 2.5, offsetX: -0, offsetY: 7, rotate: 30 },
  // Spectre
  '462080d1-4035-2937-7c09-27aa2a5c27a7': { scale: 3.2, offsetX: -12, offsetY: 1, rotate: 30 },

  // ── Shotguns ──

  // Bucky
  '910be174-449b-c412-ab22-d0873436b21b': { scale: 2.5, offsetX: 0, offsetY: 0, rotate: 35 },
  // Judge
  'ec845bf4-4f79-ddda-a3da-0db3774b2794': { scale: 2.5, offsetX: -2, offsetY: 0, rotate: 35 },

  // ── Rifles ──

  // Bulldog
  'ae3de142-4d85-2547-dd26-4e90bed35cf7': { scale: 2.5, offsetX: -4, offsetY: 0, rotate: 35 },
  // Guardian
  '4ade7faa-4cf1-8376-95ef-39884480959b': { scale: 3.0, offsetX: -8, offsetY: -2, rotate: 35 },
  // Phantom
  'ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a': { scale: 3.0, offsetX: -8, offsetY: -2, rotate: 35 },
  // Vandal
  '9c82e19d-4575-0200-1a81-3eacf00cf872': { scale: 3.0, offsetX: -6, offsetY: 4, rotate: 35 },

  // ── Melee ──

  // Melee
  '2f59173c-4bed-b6c3-2191-dea9b58be9c7': { scale: 1.0 },

  // ── Snipers ──

  // Marshal
  'c4883e50-4494-202c-3ec3-6b8a9284f00b': { scale: 3.0, offsetX: -4, offsetY: -4, rotate: 35 },
  // Outlaw
  '5f0aaf7a-4289-3998-d5ff-eb9a5cf7ef5c': { scale: 3.0, offsetX: -5, offsetY: -4, rotate: 35 },
  // Operator
  'a03b24d3-4319-996d-0f8c-94bbfba1dfc7': { scale: 3.0, offsetX: -4, offsetY: -2, rotate: 35 },

  // ── Heavy ──

  // Ares
  '55d8a0f4-4274-ca67-fe2c-06ab45efdf58': { scale: 3.0, offsetX: -5, offsetY: -3, rotate: 35 },
  // Odin
  '63e6c2b6-4a8e-869c-3d4c-e38355226584': { scale: 3.0, offsetX: -5, offsetY: -4, rotate: 35 },
};

/**
 * Resolve the per-weapon visual tuning (scale / offset / rotate) for a
 * weapon UUID, falling back to an identity transform for unknown guns.
 */
function getWeaponGridTransform(weaponUuid: string): WeaponGridTransform {
  return { ...DEFAULT_WEAPON_GRID, ...WEAPON_GRID_OVERRIDES[weaponUuid] };
}

/**
 * Convenience: compose the transform as an RN `ImageStyle` ready to
 * pass into `OwnedItemCard`'s `iconStyle` prop for weapon-skin tiles
 * in the 3-column customize picker.
 */
function getWeaponGridIconStyle(weaponUuid: string): StyleProp<ImageStyle> {
  const { scale, offsetX, offsetY, rotate } = getWeaponGridTransform(weaponUuid);
  return {
    transform: [
      { scale },
      { translateX: offsetX },
      { translateY: offsetY },
      { rotate: `${rotate}deg` },
    ],
  };
}

export { getWeaponCategoryWidth, getWeaponGridTransform, getWeaponGridIconStyle };
export type { WeaponGridTransform };
