/**
 * Constants for the Color Palette Creator
 */

export const TABS = ["Tailwind", "Palette"] as const;
export type TabType = typeof TABS[number];

export const DEFAULT_FREE = ["#fde7d7", "#facbae", "#f6a67b", "#f27745", "#ee5522"];

export const GENERATOR_METHODS = [
  'Monochromatic',
  'Complementary',
  'Split Complementary',
  'Analogous',
  'Tetradic',
  'Triadic',
  'Square',
] as const;
export type GeneratorMethodType = typeof GENERATOR_METHODS[number];

export const MIN_PALETTE = 3;
export const MAX_PALETTE = 10;

// Tailwind shade lightness values for consistent shade generation
export const TAILWIND_LIGHTNESS = [0.97, 0.93, 0.85, 0.72, 0.6, 0.5, 0.42, 0.32, 0.22, 0.13, 0.07];
export const TAILWIND_SHADE_NAMES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]; 