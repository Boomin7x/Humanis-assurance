// src/theme/elevation.ts
/**
 * HUMANIS INSURANCE ELEVATION SYSTEM
 * Insurance industry compliance - NO SHADOWS
 * Professional depth achieved through borders and background contrast
 * Trust-building visual hierarchy for insurance platforms
 *
 * Design Philosophy:
 * - Shadows undermine insurance authority and professionalism
 * - Depth created via border weight, color contrast, and whitespace
 * - Clean, authoritative appearance builds user trust
 */

// ─── INSURANCE ELEVATION PATTERNS ──────────────────────────────────────────

export const elevation = {
  none: "none",

  /** Resting cards - subtle border definition */
  xs: "none", // No shadow - replaced with border in component

  /** Hovered/focused cards - enhanced border */
  sm: "none", // No shadow - replaced with border enhancement

  /** Navigation, drawers - clean separation */
  md: "none", // No shadow - replaced with background contrast

  /** Modals, overlays - authority through contrast */
  lg: "none", // No shadow - replaced with strong border

  /** Critical alerts - professional emphasis */
  xl: "none", // No shadow - replaced with border + background
} as const;

// ─── INSURANCE FOCUS INDICATORS ────────────────────────────────────────────

export const focusIndicator = {
  /** Primary focus outline - professional accessibility */
  primary: "0 0 0 3px rgba(29, 111, 164, 0.15)",

  /** Success focus outline - trust indicator */
  success: "0 0 0 3px rgba(22, 163, 74, 0.15)",

  /** Error focus outline - clear error communication */
  error: "0 0 0 3px rgba(220, 38, 38, 0.15)",
} as const;

// ─── INSURANCE BORDER PATTERNS ─────────────────────────────────────────────

export const insuranceBorder = {
  /** Default card border - professional definition */
  default: "1px solid #D1D5DB", // NEUTRAL_300

  /** Hover state - enhanced visibility */
  hover: "1px solid #5BA3CC", // BRAND_300

  /** Active/selected - authority indicator */
  active: "2px solid #1D6FA4", // BRAND_500

  /** Focus state - accessibility compliant */
  focus: "1.5px solid #1D6FA4", // BRAND_500

  /** Error state - clear communication */
  error: "1px solid #DC2626", // ERROR

  /** Success state - trust building */
  success: "1px solid #16A34A", // SUCCESS

  /** Modal/overlay - strong separation */
  modal: "2px solid #E8F3FA", // BRAND_100
} as const;

// ─── INSURANCE BACKGROUND PATTERNS ─────────────────────────────────────────

export const insuranceBackground = {
  /** Default card background */
  default: "#FFFFFF",

  /** Hover state - subtle enhancement */
  hover: "#F4F9FD", // BRAND_50

  /** Selected state - clear indication */
  selected: "#E8F3FA", // BRAND_100

  /** Active section - professional emphasis */
  active: "#F9FAFB", // NEUTRAL_50

  /** Modal backdrop - authority through contrast */
  modal: "rgba(17, 24, 39, 0.75)", // Professional backdrop
} as const;

// ─── MUI SHADOWS ARRAY - INSURANCE COMPLIANT ───────────────────────────────

/**
 * Override all 25 MUI shadow slots to remove shadows entirely
 * Insurance platforms require clean, professional appearance without shadows
 * Depth achieved through border and background patterns instead
 */
export const muiShadows = [
  "none", // shadows[0] - default
  "none", // shadows[1] - card resting
  "none", // shadows[2] - card hover
  "none", // shadows[3] - navigation
  "none", // shadows[4] - modal
  "none", // shadows[5] - tooltip
  "none", // shadows[6+] - all disabled
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
] as const;

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────

export type ElevationLevel = keyof typeof elevation;
export type FocusIndicatorVariant = keyof typeof focusIndicator;
export type InsuranceBorderVariant = keyof typeof insuranceBorder;
export type InsuranceBackgroundVariant = keyof typeof insuranceBackground;

// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────

/** Get focus indicator by variant with fallback */
export function getFocusIndicator(variant: FocusIndicatorVariant = "primary"): string {
  return focusIndicator[variant] ?? focusIndicator.primary;
}

/** Get insurance border by variant with fallback */
export function getInsuranceBorder(variant: InsuranceBorderVariant = "default"): string {
  return insuranceBorder[variant] ?? insuranceBorder.default;
}

/** Get insurance background by variant with fallback */
export function getInsuranceBackground(variant: InsuranceBackgroundVariant = "default"): string {
  return insuranceBackground[variant] ?? insuranceBackground.default;
}

/** Type guard for valid elevation levels */
export function isValidElevationLevel(level: string): level is ElevationLevel {
  return level in elevation;
}
