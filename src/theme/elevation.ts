// src/theme/elevation.ts
/**
 * HUMANIS ELEVATION SYSTEM
 * All shadows are tinted with brand blue - never grey or black
 * This is the signature of the design system
 *
 * Format: 'x y blur spread rgba(color, opacity)'
 * Base color: PRIMARY_500 (#0D5EAF)
 */

// ─── ELEVATION SCALE ────────────────────────────────────────────────────────

export const elevation = {
  none: "none",

  /** Resting cards - barely visible blue tint */
  xs: "0 1px 3px 0 rgba(13, 94, 175, 0.06)",

  /** Hovered cards - subtle layered shadow */
  sm: "0 2px 6px 0 rgba(13, 94, 175, 0.08), 0 1px 2px 0 rgba(13, 94, 175, 0.04)",

  /** Drawers, popovers - more pronounced depth */
  md: "0 4px 12px 0 rgba(13, 94, 175, 0.10), 0 2px 4px 0 rgba(13, 94, 175, 0.06)",

  /** Modals - significant elevation */
  lg: "0 8px 24px 0 rgba(13, 94, 175, 0.12), 0 4px 8px 0 rgba(13, 94, 175, 0.06)",

  /** Floating elements - maximum elevation */
  xl: "0 16px 40px 0 rgba(13, 94, 175, 0.14)",
} as const;

// ─── BUTTON GLOW EFFECTS ───────────────────────────────────────────────────

export const buttonGlow = {
  /** CTA button glow - used on primary button hover */
  blue: "0 0 0 4px rgba(13, 94, 175, 0.18)",

  /** Secondary button glow - used on teal button hover */
  teal: "0 0 0 4px rgba(26, 158, 117, 0.18)",
} as const;

// ─── INSET SHADOWS ──────────────────────────────────────────────────────────

export const insetShadow = {
  /** Pressed states */
  default: "inset 0 1px 3px 0 rgba(13, 94, 175, 0.10)",
} as const;

// ─── MUI SHADOWS ARRAY ──────────────────────────────────────────────────────

/**
 * Override all 25 MUI shadow slots with our blue-tinted system
 * Maps elevation scale to MUI's shadow array
 */
export const muiShadows = [
  elevation.none, // shadows[0]
  elevation.xs, // shadows[1]
  elevation.sm, // shadows[2]
  elevation.md, // shadows[3]
  elevation.lg, // shadows[4]
  elevation.xl, // shadows[5]
  elevation.xl, // shadows[6] - cap at xl to prevent overuse
  elevation.xl, // shadows[7]
  elevation.xl, // shadows[8]
  elevation.xl, // shadows[9]
  elevation.xl, // shadows[10]
  elevation.xl, // shadows[11]
  elevation.xl, // shadows[12]
  elevation.xl, // shadows[13]
  elevation.xl, // shadows[14]
  elevation.xl, // shadows[15]
  elevation.xl, // shadows[16]
  elevation.xl, // shadows[17]
  elevation.xl, // shadows[18]
  elevation.xl, // shadows[19]
  elevation.xl, // shadows[20]
  elevation.xl, // shadows[21]
  elevation.xl, // shadows[22]
  elevation.xl, // shadows[23]
  elevation.xl, // shadows[24]
] as const;

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────

export type ElevationLevel = keyof typeof elevation;
export type ButtonGlowVariant = keyof typeof buttonGlow;

// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────

/** Get elevation shadow by level with fallback */
export function getElevation(level: ElevationLevel = "none"): string {
  return elevation[level] ?? elevation.none;
}

/** Get button glow by variant with fallback */
export function getButtonGlow(variant: ButtonGlowVariant = "blue"): string {
  return buttonGlow[variant] ?? buttonGlow.blue;
}

/** Type guard for valid elevation levels */
export function isValidElevationLevel(level: string): level is ElevationLevel {
  return level in elevation;
}
