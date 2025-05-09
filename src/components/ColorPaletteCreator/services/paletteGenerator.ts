import chroma from 'chroma-js';
import { GeneratorMethodType } from '../constants';
import { TAILWIND_LIGHTNESS, TAILWIND_SHADE_NAMES } from '../constants';

/**
 * Interface for Tailwind shade object
 */
export interface TailwindShade {
  name: string;
  hex: string;
}

/**
 * Generates a palette based on the selected method and base color
 * @param base - Base color in hex format
 * @param method - Generation method from GeneratorMethodType
 * @param count - Number of colors to generate
 * @returns Array of hex color strings
 */
export function generatePalette(base: string, method: GeneratorMethodType, count: number): string[] {
  let colors: string[] = [];
  
  switch (method) {
    case 'Monochromatic':
      colors = chroma.scale([chroma(base).brighten(2), base, chroma(base).darken(2)])
        .mode('lab')
        .colors(count);
      break;
    case 'Complementary':
      colors = [base, chroma(base).set('hsl.h', "+180").hex()];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    case 'Split Complementary':
      colors = [
        base,
        chroma(base).set('hsl.h', "+150").hex(),
        chroma(base).set('hsl.h', "+210").hex()
      ];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    case 'Analogous':
      colors = [
        chroma(base).set('hsl.h', "-30").hex(),
        base,
        chroma(base).set('hsl.h', "+30").hex()
      ];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    case 'Tetradic':
      colors = [
        base,
        chroma(base).set('hsl.h', "+90").hex(),
        chroma(base).set('hsl.h', "+180").hex(),
        chroma(base).set('hsl.h', "+270").hex()
      ];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    case 'Triadic':
      colors = [
        base,
        chroma(base).set('hsl.h', "+120").hex(),
        chroma(base).set('hsl.h', "+240").hex()
      ];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    case 'Square':
      colors = [
        base,
        chroma(base).set('hsl.h', "+90").hex(),
        chroma(base).set('hsl.h', "+180").hex(),
        chroma(base).set('hsl.h', "+270").hex()
      ];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    default:
      colors = chroma.scale([chroma(base).brighten(2), base, chroma(base).darken(2)])
        .mode('lab')
        .colors(count);
  }

  // Ensure base color is always first
  colors[0] = base;
  return colors;
}

/**
 * Generates Tailwind-style color shades
 * @param base - Base color in hex format
 * @returns Array of TailwindShade objects
 */
export function generateTailwindShades(base: string): TailwindShade[] {
  function hexToHsl(hex: string): [number, number, number] {
    const color = chroma(hex);
    const [h, s, l] = color.hsl();
    return [h, s, l];
  }

  const [h, s] = hexToHsl(base);
  
  return TAILWIND_SHADE_NAMES.map((name, idx) => ({
    name,
    hex: chroma.hsl(h, s, TAILWIND_LIGHTNESS[idx]).hex()
  }));
} 