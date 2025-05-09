/**
 * Color manipulation utilities
 * These functions handle color format conversions and calculations
 */

export function hexToRgb(hex: string): number[] | null {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace('#',''));
  return res ? [parseInt(res[1],16), parseInt(res[2],16), parseInt(res[3],16)] : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

/**
 * Calculate text color based on background brightness
 * Returns "#222" for light backgrounds and "#fff" for dark ones
 */
export function getContrastText(color: string): string {
  const rgb = hexToRgb(color) || [255,255,255];
  const brightness = (rgb[0]*299 + rgb[1]*587 + rgb[2]*114) / 1000;
  return brightness > 160 ? "#222" : "#fff";
}

/**
 * Validates and formats a hex color string
 * Returns the formatted color if valid, or null if invalid
 */
export function validateHexColor(val: string): string | null {
  if (!val.startsWith("#")) val = "#" + val.replace(/^#+/, "");
  val = val.slice(0, 7).replace(/[^#0-9a-fA-F]/g, "");
  return /^#([0-9A-Fa-f]{6})$/.test(val) ? val : null;
} 