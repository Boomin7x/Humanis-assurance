// src/theme/responsive.ts
/**
 * HUMANIS MOBILE-FIRST RESPONSIVE DESIGN SYSTEM
 *
 * Mobile-first responsive utilities and breakpoint system
 * Follows insurance industry mobile UX standards:
 * - 44px minimum touch targets
 * - Mobile-optimized typography scales
 * - Insurance-specific mobile patterns
 * - Progressive enhancement from mobile to desktop
 */

import type { SxProps, Theme, Breakpoint } from "@mui/material";

// ─── MOBILE-FIRST BREAKPOINT SYSTEM ───────────────────────────────────────

/** Mobile-first breakpoints for insurance website */
export const BREAKPOINTS = {
  /** Mobile portrait: 320px-374px */
  xs: 0,
  /** Mobile landscape: 375px-599px */
  sm: 375,
  /** Tablet: 600px-899px */
  md: 600,
  /** Desktop: 900px-1199px */
  lg: 900,
  /** Large desktop: 1200px+ */
  xl: 1200,
} as const;

/** Mobile-first container max widths */
export const CONTAINER_WIDTHS = {
  xs: "100%",
  sm: "100%",
  md: "720px",
  lg: "960px",
  xl: "1200px",
} as const;

// ─── MOBILE-FIRST TYPOGRAPHY SCALES ───────────────────────────────────────

/** Mobile-first typography responsive values */
export const TYPOGRAPHY_MOBILE = {
  /** Hero titles - mobile first */
  h1: {
    fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem", lg: "3.5rem" },
    fontWeight: 700,
    lineHeight: { xs: 1.2, md: 1.1 },
    letterSpacing: { xs: "-0.02em", md: "-0.03em" },
  },
  /** Page section titles - mobile first */
  h2: {
    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem", lg: "2.75rem" },
    fontWeight: 600,
    lineHeight: { xs: 1.3, md: 1.2 },
    letterSpacing: "-0.02em",
  },
  /** Card/component titles - mobile first */
  h3: {
    fontSize: { xs: "1.25rem", sm: "1.375rem", md: "1.5rem" },
    fontWeight: 600,
    lineHeight: 1.3,
  },
  /** Subsection titles - mobile first */
  h4: {
    fontSize: { xs: "1.125rem", sm: "1.25rem" },
    fontWeight: 600,
    lineHeight: 1.4,
  },
  /** Component subtitles - mobile first */
  h5: {
    fontSize: { xs: "1rem", sm: "1.125rem" },
    fontWeight: 500,
    lineHeight: 1.4,
  },
  /** Small headings - mobile first */
  h6: {
    fontSize: { xs: "0.875rem", sm: "1rem" },
    fontWeight: 600,
    lineHeight: 1.4,
  },
  /** Body text - mobile optimized */
  body1: {
    fontSize: { xs: "0.875rem", sm: "1rem" },
    lineHeight: { xs: 1.6, sm: 1.65 },
    fontWeight: 400,
  },
  /** Small body text - mobile optimized */
  body2: {
    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
    lineHeight: { xs: 1.5, sm: 1.6 },
    fontWeight: 400,
  },
  /** Overline text - mobile first */
  overline: {
    fontSize: { xs: "0.75rem", sm: "0.8125rem" },
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
} as const;

// ─── MOBILE-FIRST SPACING SYSTEM ──────────────────────────────────────────

/** Mobile-first spacing values (px) */
export const SPACING_MOBILE = {
  /** Section vertical padding - mobile first */
  section: {
    xs: 40, // Mobile: 40px
    sm: 48, // Mobile landscape: 48px
    md: 64, // Tablet: 64px
    lg: 80, // Desktop: 80px
  },
  /** Section vertical padding - large sections */
  sectionLarge: {
    xs: 60, // Mobile: 60px
    sm: 72, // Mobile landscape: 72px
    md: 96, // Tablet: 96px
    lg: 120, // Desktop: 120px
  },
  /** Container horizontal gutters - mobile first */
  gutter: {
    xs: 16, // Mobile: 16px
    sm: 20, // Mobile landscape: 20px
    md: 24, // Tablet: 24px
    lg: 32, // Desktop: 32px
  },
  /** Grid gap between items - mobile first */
  gridGap: {
    xs: 16, // Mobile: 16px
    sm: 20, // Mobile landscape: 20px
    md: 24, // Tablet: 24px
    lg: 32, // Desktop: 32px
  },
} as const;

// ─── MOBILE TOUCH TARGETS ──────────────────────────────────────────────────

/** Minimum touch target sizes for mobile accessibility */
export const TOUCH_TARGETS = {
  /** Minimum button height - WCAG AAA compliance */
  buttonMinHeight: 44,
  /** Minimum tap area for icons/small buttons */
  tapArea: 44,
  /** Comfortable button height for primary actions */
  buttonComfortable: 48,
  /** Large button height for hero CTAs */
  buttonLarge: 56,
} as const;

// ─── MOBILE-FIRST COMPONENT STYLES ────────────────────────────────────────

/** Mobile-optimized button styles */
export const BUTTON_MOBILE: SxProps<Theme> = {
  minHeight: TOUCH_TARGETS.buttonMinHeight,
  fontSize: { xs: "0.875rem", sm: "1rem" },
  fontWeight: 600,
  px: { xs: 2, sm: 3 },
  py: { xs: 1.5, sm: 1.75 },
  borderRadius: { xs: "6px", sm: "8px" },
  "&.MuiButton-sizeLarge": {
    minHeight: TOUCH_TARGETS.buttonLarge,
    fontSize: { xs: "1rem", sm: "1.125rem" },
    px: { xs: 3, sm: 4 },
    py: { xs: 2, sm: 2.25 },
  },
};

/** Mobile-optimized card styles */
export const CARD_MOBILE: SxProps<Theme> = {
  borderRadius: { xs: "8px", md: "12px" },
  p: { xs: 2, sm: 3, md: 4 },
  "&:hover": {
    transform: { xs: "none", md: "translateY(-2px)" }, // Disable hover lift on mobile
  },
};

/** Mobile hero section styles */
export const HERO_MOBILE: SxProps<Theme> = {
  minHeight: {
    xs: "90vh", // Mobile: 90vh to account for mobile browser UI
    sm: "85vh", // Mobile landscape: slightly smaller
    md: "100vh", // Desktop: full viewport
  },
  py: { xs: 3, sm: 4, md: 6 },
  px: { xs: 2, sm: 3, md: 4 },
};

// ─── MOBILE-FIRST GRID UTILITIES ──────────────────────────────────────────

/** Mobile-first Grid size helpers - always mobile first */
export const GRID_MOBILE = {
  /** Full width on mobile, half on desktop */
  halfOnDesktop: { xs: 12, md: 6 },
  /** Full width on mobile, third on desktop */
  thirdOnDesktop: { xs: 12, md: 4 },
  /** Full width on mobile, quarter on desktop */
  quarterOnDesktop: { xs: 12, sm: 6, md: 3 },
  /** Full width on mobile, 2/3 on desktop */
  twoThirdsOnDesktop: { xs: 12, md: 8 },
  /** Full width on mobile, 1/3 on desktop */
  oneThirdOnDesktop: { xs: 12, md: 4 },
  /** 2 cols on mobile, 4 on tablet, 6 on desktop */
  responsive: { xs: 6, sm: 6, md: 4, lg: 2 },
} as const;

// ─── MOBILE-FIRST LAYOUT PATTERNS ─────────────────────────────────────────

/** Mobile-first section patterns for insurance pages */
export const LAYOUT_PATTERNS = {
  /** Hero section with mobile-first responsive design */
  heroSection: {
    position: "relative" as const,
    minHeight: HERO_MOBILE.minHeight,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    px: { xs: 2, sm: 3, md: 0 },
    py: { xs: 3, sm: 4, md: 6 },
  },

  /** Content section with mobile spacing */
  contentSection: {
    py: SPACING_MOBILE.section,
    px: { xs: 2, sm: 3, md: 0 },
  },

  /** Form section optimized for mobile */
  formSection: {
    "& .MuiTextField-root": {
      mb: { xs: 2, sm: 3 },
    },
    "& .MuiFormControl-root": {
      mb: { xs: 2, sm: 3 },
    },
    "& .MuiButton-root": BUTTON_MOBILE,
  },

  /** Card grid with mobile-first responsive gaps */
  cardGrid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
    },
    gap: SPACING_MOBILE.gridGap,
  },
} as const;

// ─── MOBILE-FIRST UTILITY FUNCTIONS ───────────────────────────────────────

/** Create mobile-first responsive value */
export function mobileFirst<T>(
  xs: T,
  sm?: T,
  md?: T,
  lg?: T,
  xl?: T,
): Partial<Record<Breakpoint, T>> & { xs: T } {
  const result: Partial<Record<Breakpoint, T>> & { xs: T } = { xs };
  if (sm !== undefined) result.sm = sm;
  if (md !== undefined) result.md = md;
  if (lg !== undefined) result.lg = lg;
  if (xl !== undefined) result.xl = xl;
  return result;
}

/** Create mobile-first spacing value */
export function mobileSpacing(
  xs: number,
  sm?: number,
  md?: number,
  lg?: number,
) {
  return mobileFirst(
    `${xs}px`,
    sm ? `${sm}px` : undefined,
    md ? `${md}px` : undefined,
    lg ? `${lg}px` : undefined,
  );
}

/** Create mobile-first font size value */
export function mobileFontSize(
  xs: string,
  sm?: string,
  md?: string,
  lg?: string,
) {
  return mobileFirst(xs, sm, md, lg);
}

// ─── INSURANCE MOBILE UX PATTERNS ──────────────────────────────────────────

/** Insurance-specific mobile UX patterns */
export const INSURANCE_MOBILE_UX = {
  /** Quick contact buttons for mobile insurance shopping */
  quickContact: {
    position: "fixed" as const,
    bottom: { xs: 16, sm: 24 },
    right: { xs: 16, sm: 24 },
    zIndex: 1000,
    "& .MuiButton-root": {
      minHeight: TOUCH_TARGETS.buttonComfortable,
      minWidth: TOUCH_TARGETS.buttonComfortable,
      borderRadius: "50%",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
  },

  /** Mobile-optimized quote request form */
  quoteForm: {
    "& .MuiTextField-root": {
      mb: 2,
      "& .MuiInputBase-root": {
        minHeight: TOUCH_TARGETS.buttonMinHeight,
      },
    },
    "& .MuiSelect-root": {
      minHeight: TOUCH_TARGETS.buttonMinHeight,
    },
    "& .MuiButton-root": {
      minHeight: TOUCH_TARGETS.buttonComfortable,
      width: "100%",
      mt: { xs: 2, sm: 3 },
    },
  },

  /** Mobile trust indicators */
  trustBadges: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: 1, sm: 2 },
    alignItems: "center",
    justifyContent: "center",
    "& .trust-badge": {
      minHeight: 32,
      fontSize: { xs: "0.75rem", sm: "0.8125rem" },
      px: { xs: 1.5, sm: 2 },
    },
  },

  /** Mobile navigation patterns */
  mobileNav: {
    "& .MuiButton-root, & .MuiIconButton-root": {
      minHeight: TOUCH_TARGETS.buttonMinHeight,
      minWidth: TOUCH_TARGETS.buttonMinHeight,
    },
    "& .nav-link": {
      minHeight: TOUCH_TARGETS.buttonMinHeight,
      display: "flex",
      alignItems: "center",
      px: 2,
    },
  },
} as const;

// ─── EXPORTS ────────────────────────────────────────────────────────────────

export type ResponsiveValue<T> = T | Record<Breakpoint, T>;

export {
  BREAKPOINTS as breakpoints,
  CONTAINER_WIDTHS as containerWidths,
  TYPOGRAPHY_MOBILE as typographyMobile,
  SPACING_MOBILE as spacingMobile,
  TOUCH_TARGETS as touchTargets,
  LAYOUT_PATTERNS as layoutPatterns,
  INSURANCE_MOBILE_UX as insuranceMobileUX,
};
