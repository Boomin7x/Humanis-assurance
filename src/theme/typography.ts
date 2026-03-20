// src/theme/typography.ts
/**
 * HUMANIS INSURANCE TYPOGRAPHY SYSTEM
 * Professional hierarchy for insurance industry trust and authority
 * Fluid type scale using clamp() - scales smoothly between 375px and 1280px viewports
 *
 * Insurance Font Strategy:
 * - Inter for headings - trusted, authoritative, widely used in finance/insurance
 * - Inter for body text - excellent readability, professional consistency
 * - DM Serif Display for hero headlines only - adds gravitas for insurance authority
 *
 * Insurance Industry Requirements:
 * - Conservative, trustworthy appearance
 * - Clear hierarchy for policy information
 * - Accessible contrast and sizing
 * - Professional, not trendy or playful
 */

// ─── FONT FAMILIES ──────────────────────────────────────────────────────────

export const fontFamilies = {
  /** Display and headings - Inter provides trust and authority for insurance */
  heading: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',

  /** Body text and UI - Inter ensures consistency and professionalism */
  body: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',

  /** Hero headlines only - DM Serif Display for insurance gravitas */
  hero: '"DM Serif Display", Georgia, serif',

  /** Monospace - for policy numbers, codes, and numeric data */
  mono: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
} as const;

// ─── FLUID TYPE SCALE ───────────────────────────────────────────────────────

export const typeScale = {
  /** Display - Hero H1 with insurance authority */
  display: {
    fontSize: "clamp(2.25rem, 5vw + 0.5rem, 3.75rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.025em", // Less aggressive for professional feel
    fontWeight: 700, // Strong but not excessive
    fontFamily: fontFamilies.hero, // DM Serif for insurance gravitas
  },

  /** Headline - Section H2 with insurance professionalism */
  h2: {
    fontSize: "clamp(1.75rem, 3.5vw + 0.25rem, 2.75rem)",
    lineHeight: 1.25, // Better readability for insurance content
    letterSpacing: "-0.015em", // Professional spacing
    fontWeight: 600, // Authoritative but readable
    fontFamily: fontFamilies.heading,
  },

  /** Title - Sub-section H3 for policy sections */
  h3: {
    fontSize: "clamp(1.375rem, 2.5vw + 0.25rem, 2rem)",
    lineHeight: 1.35, // Insurance content readability
    letterSpacing: "-0.01em",
    fontWeight: 600, // Professional hierarchy
    fontFamily: fontFamilies.heading,
  },

  /** Card heading H4 for coverage cards */
  h4: {
    fontSize: "clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)",
    lineHeight: 1.4, // Insurance card readability
    letterSpacing: "-0.005em",
    fontWeight: 600,
    fontFamily: fontFamilies.heading,
  },

  /** Smaller heading H5 for form sections */
  h5: {
    fontSize: "1.125rem",
    lineHeight: 1.45,
    letterSpacing: "0",
    fontWeight: 600,
    fontFamily: fontFamilies.heading,
  },

  /** Smallest heading H6 for labels */
  h6: {
    fontSize: "1rem",
    lineHeight: 1.5,
    letterSpacing: "0.01em", // Slight spacing for clarity
    fontWeight: 500, // Less heavy for smaller headings
    fontFamily: fontFamilies.heading,
  },

  /** Section overline - Professional labels for insurance sections */
  overline: {
    fontSize: "0.75rem", // Slightly larger for better readability
    lineHeight: 1.5,
    letterSpacing: "0.08em", // Professional but not excessive
    fontWeight: 600,
    textTransform: "uppercase" as const,
    fontFamily: fontFamilies.body,
  },

  /** Primary body text for policy content */
  body1: {
    fontSize: "1rem", // 16px - insurance standard
    lineHeight: 1.7, // Excellent readability for insurance content
    letterSpacing: "0",
    fontWeight: 400,
    fontFamily: fontFamilies.body,
  },

  /** Secondary body text for descriptions */
  body2: {
    fontSize: "0.875rem", // 14px - professional secondary text
    lineHeight: 1.6,
    letterSpacing: "0.01em", // Slight spacing for clarity
    fontWeight: 400,
    fontFamily: fontFamilies.body,
  },

  /** UI labels and form elements - insurance clarity */
  label: {
    fontSize: "0.875rem", // 14px - clear form labels
    lineHeight: 1.5,
    letterSpacing: "0.02em", // Better clarity for form labels
    fontWeight: 500,
    fontFamily: fontFamilies.body,
  },

  /** Small text and captions for disclaimers */
  caption: {
    fontSize: "0.75rem", // 12px - professional captions
    lineHeight: 1.6,
    letterSpacing: "0.02em",
    fontWeight: 400, // Lighter weight for captions
    fontFamily: fontFamilies.body,
  },

  /** Button text - professional insurance CTAs */
  button: {
    fontSize: "0.875rem", // 14px - clean button text
    lineHeight: 1.5,
    letterSpacing: "0.02em", // Professional spacing
    fontWeight: 500, // Strong but not heavy
    textTransform: "none" as const,
    fontFamily: fontFamilies.body,
  },

  /** Statistics numbers - insurance metrics display */
  statNumber: {
    fontSize: "clamp(2rem, 4vw, 3.25rem)",
    lineHeight: 1.0,
    letterSpacing: "-0.02em", // Professional number spacing
    fontWeight: 700, // Strong but trustworthy
    fontFamily: fontFamilies.heading,
    fontFeatureSettings: '"tnum" 1', // tabular numbers for insurance data
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
