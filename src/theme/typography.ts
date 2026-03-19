// src/theme/typography.ts
/**
 * HUMANIS TYPOGRAPHY SYSTEM
 * Fluid type scale using clamp() - scales smoothly between 375px and 1280px viewports
 *
 * Font Strategy:
 * - ClashDisplay for headings (instead of Plus Jakarta Sans) - more distinctive, modern
 * - Satoshi for body text (instead of DM Sans) - excellent readability, professional
 *
 * Formula: clamp(min, preferred_vw, max)
 * No media query breakpoints needed for font sizes
 */

// ─── FONT FAMILIES ──────────────────────────────────────────────────────────

export const fontFamilies = {
  /** Display and headings - ClashDisplay provides strong character and authority */
  heading: "ClashDisplay, system-ui, -apple-system, sans-serif",

  /** Body text and UI - Satoshi offers superior readability and polish */
  body: "Satoshi, system-ui, -apple-system, sans-serif",

  /** Monospace - for code and numeric data */
  mono: 'ui-monospace, "SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
} as const;

// ─── FLUID TYPE SCALE ───────────────────────────────────────────────────────

export const typeScale = {
  /** Display - Hero H1 */
  display: {
    fontSize: "clamp(2.25rem, 5vw + 0.5rem, 3.75rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    fontWeight: 800,
    fontFamily: fontFamilies.heading,
  },

  /** Headline - Section H2 */
  h2: {
    fontSize: "clamp(1.75rem, 3.5vw + 0.25rem, 2.75rem)",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    fontWeight: 700,
    fontFamily: fontFamilies.heading,
  },

  /** Title - Sub-section H3 */
  h3: {
    fontSize: "clamp(1.375rem, 2.5vw + 0.25rem, 2rem)",
    lineHeight: 1.3,
    letterSpacing: "-0.015em",
    fontWeight: 700,
    fontFamily: fontFamilies.heading,
  },

  /** Card heading H4 */
  h4: {
    fontSize: "clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)",
    lineHeight: 1.35,
    letterSpacing: "-0.01em",
    fontWeight: 600,
    fontFamily: fontFamilies.heading,
  },

  /** Smaller heading H5 */
  h5: {
    fontSize: "1.125rem",
    lineHeight: 1.4,
    letterSpacing: "-0.005em",
    fontWeight: 600,
    fontFamily: fontFamilies.heading,
  },

  /** Smallest heading H6 */
  h6: {
    fontSize: "1rem",
    lineHeight: 1.45,
    letterSpacing: "0",
    fontWeight: 600,
    fontFamily: fontFamilies.heading,
  },

  /** Section overline - ALL CAPS label above headings */
  overline: {
    fontSize: "0.6875rem",
    lineHeight: 1.5,
    letterSpacing: "0.12em",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    fontFamily: fontFamilies.body,
  },

  /** Primary body text */
  body1: {
    fontSize: "1rem", // 16px
    lineHeight: 1.7,
    letterSpacing: "0",
    fontWeight: 400,
    fontFamily: fontFamilies.body,
  },

  /** Secondary body text */
  body2: {
    fontSize: "0.9375rem", // 15px
    lineHeight: 1.65,
    letterSpacing: "0",
    fontWeight: 400,
    fontFamily: fontFamilies.body,
  },

  /** UI labels and form elements */
  label: {
    fontSize: "0.875rem", // 14px
    lineHeight: 1.5,
    letterSpacing: "0.01em",
    fontWeight: 500,
    fontFamily: fontFamilies.body,
  },

  /** Small text and captions */
  caption: {
    fontSize: "0.8125rem", // 13px
    lineHeight: 1.5,
    letterSpacing: "0.02em",
    fontWeight: 500,
    fontFamily: fontFamilies.body,
  },

  /** Button text */
  button: {
    fontSize: "0.9375rem", // 15px
    lineHeight: 1.5,
    letterSpacing: "0.01em",
    fontWeight: 600,
    textTransform: "none" as const,
    fontFamily: fontFamilies.body,
  },

  /** Statistics numbers - large display numbers */
  statNumber: {
    fontSize: "clamp(2rem, 4vw, 3.25rem)",
    lineHeight: 1.0,
    letterSpacing: "-0.04em",
    fontWeight: 800,
    fontFamily: fontFamilies.heading,
    fontFeatureSettings: '"tnum" 1', // tabular numbers for counter animation
  },
} as const;

// ─── MUI TYPOGRAPHY OVERRIDES ──────────────────────────────────────────────

export const muiTypographyConfig = {
  fontFamily: fontFamilies.body,

  h1: {
    ...typeScale.display,
  },

  h2: {
    ...typeScale.h2,
  },

  h3: {
    ...typeScale.h3,
  },

  h4: {
    ...typeScale.h4,
  },

  h5: {
    ...typeScale.h5,
  },

  h6: {
    ...typeScale.h6,
  },

  body1: {
    ...typeScale.body1,
  },

  body2: {
    ...typeScale.body2,
    color: "#4A5568", // NEUTRAL_600
  },

  caption: {
    ...typeScale.caption,
  },

  overline: {
    ...typeScale.overline,
  },

  button: {
    ...typeScale.button,
  },
} as const;

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────

export type TypeScaleKey = keyof typeof typeScale;
export type FontFamily = keyof typeof fontFamilies;

// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────

/** Get typography style by scale key with fallback */
export function getTypeScale(scale: TypeScaleKey = "body1") {
  return typeScale[scale] ?? typeScale.body1;
}

/** Type guard for valid type scale keys */
export function isValidTypeScale(scale: string): scale is TypeScaleKey {
  return scale in typeScale;
}

/** Get font family with fallback */
export function getFontFamily(family: FontFamily = "body"): string {
  return fontFamilies[family] ?? fontFamilies.body;
}
