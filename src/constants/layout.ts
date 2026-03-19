// src/constants/layout.ts
/**
 * HUMANIS LAYOUT & SPACING SYSTEM
 * Grid constants, spacing scale, z-index scale
 * All layout constants for consistent spacing throughout the app
 */

// ─── GRID SYSTEM ────────────────────────────────────────────────────────────

/** Maximum content container width */
export const MAX_WIDTH = 1280  // px

/** Horizontal gutters by breakpoint */
export const GUTTER_DESKTOP = 80   // px — left/right padding on desktop
export const GUTTER_TABLET = 40    // px — left/right padding on tablet
export const GUTTER_MOBILE = 20    // px — left/right padding on mobile

/** Content width calculations */
export const CONTENT_WIDTH = {
  DESKTOP: MAX_WIDTH - (GUTTER_DESKTOP * 2),  // 1120px
  TABLET: MAX_WIDTH - (GUTTER_TABLET * 2),   // 1200px (no max on tablet)
  MOBILE: MAX_WIDTH - (GUTTER_MOBILE * 2),   // 1240px (no max on mobile)
} as const

// ─── SPACING SCALE ──────────────────────────────────────────────────────────

/** 8px base grid spacing scale */
export const SPACE = {
  1: 4,     // 0.25rem — tight: icon gaps, badge padding
  2: 8,     // 0.5rem  — tight spacing
  3: 12,    // 0.75rem — small gaps
  4: 16,    // 1rem    — default component padding
  5: 20,    // 1.25rem — medium gaps
  6: 24,    // 1.5rem  — comfortable spacing
  8: 32,    // 2rem    — section element gaps
  10: 40,   // 2.5rem  — large gaps
  12: 48,   // 3rem    — extra large gaps
  16: 64,   // 4rem    — mobile section padding
  20: 80,   // 5rem    — desktop gutters
  24: 96,   // 6rem    — desktop section padding
} as const

/** Helper function to get spacing value */
export function space(scale: keyof typeof SPACE): number {
  return SPACE[scale]
}

// ─── SECTION VERTICAL RHYTHM ────────────────────────────────────────────────

/** Section padding by breakpoint - use with MUI sx prop */
export const SECTION_PY = {
  xs: '64px',   // mobile
  md: '80px',   // tablet
  lg: '96px',   // desktop
} as const

/** Hero section padding by breakpoint */
export const SECTION_PY_HERO = {
  xs: '100px',  // mobile
  md: '120px',  // tablet+
} as const

/** Consistent section padding for components */
export const SECTION_PADDING = {
  mobile: SPACE[16],      // 64px
  tablet: SPACE[20],      // 80px
  desktop: SPACE[24],     // 96px
} as const

// ─── NAVIGATION ─────────────────────────────────────────────────────────────

export const NAV_HEIGHT = 72          // px — desktop navbar height
export const NAV_HEIGHT_MOBILE = 60   // px — mobile navbar height
export const NAV_SCROLL_THRESHOLD = 80 // px scroll before solid bg kicks in

/** Navbar spacing and layout */
export const NAV_CONFIG = {
  height: {
    desktop: NAV_HEIGHT,
    mobile: NAV_HEIGHT_MOBILE,
  },
  scrollThreshold: NAV_SCROLL_THRESHOLD,
  zIndex: 1000, // matches Z.navbar below
} as const

// ─── BORDER RADIUS ──────────────────────────────────────────────────────────

/** Insurance UI Design System Border Radius - NO RADIUS ABOVE 8px ON STRUCTURAL COMPONENTS */
export const RADIUS = {
  xs: 2,      // tight elements, inner corners
  sm: 4,      // small components
  md: 6,      // buttons, default components
  lg: 8,      // cards, inputs, accordions - MAXIMUM for structural elements
  pill: 9999, // status badges ONLY - never on buttons or structural elements
} as const

/** @deprecated Use RADIUS.lg (8px) maximum for structural components */
export const RADIUS_LEGACY = {
  xl: 16,     // DEPRECATED - violates insurance design rules
  xxl: 100,   // DEPRECATED - use RADIUS.pill only for status badges
} as const

/** Helper function to get border radius value */
export function radius(scale: keyof typeof RADIUS): number {
  return RADIUS[scale]
}

// ─── Z-INDEX SCALE ──────────────────────────────────────────────────────────

export const Z = {
  base: 0,        // default layer
  raised: 10,     // slightly elevated elements
  sticky: 100,    // sticky elements (filter bars)
  navbar: 1000,   // main navigation
  drawer: 1200,   // side navigation drawers
  modal: 1300,    // modal overlays
  fab: 1400,      // floating action buttons (WhatsApp)
  tooltip: 1500,  // tooltips (highest UI layer)
} as const

/** Helper function to get z-index value */
export function zIndex(layer: keyof typeof Z): number {
  return Z[layer]
}

// ─── BREAKPOINTS ────────────────────────────────────────────────────────────

/** Breakpoint values (matches MUI defaults) */
export const BP = {
  xs: 0,      // 0px+     — mobile
  sm: 600,    // 600px+   — large mobile / small tablet
  md: 900,    // 900px+   — tablet
  lg: 1200,   // 1200px+  — desktop
  xl: 1536,   // 1536px+  — large desktop
} as const

/** Breakpoint helpers for media queries */
export const BREAKPOINT = {
  up: {
    sm: `@media (min-width: ${BP.sm}px)`,
    md: `@media (min-width: ${BP.md}px)`,
    lg: `@media (min-width: ${BP.lg}px)`,
    xl: `@media (min-width: ${BP.xl}px)`,
  },
  down: {
    xs: `@media (max-width: ${BP.sm - 1}px)`,
    sm: `@media (max-width: ${BP.md - 1}px)`,
    md: `@media (max-width: ${BP.lg - 1}px)`,
    lg: `@media (max-width: ${BP.xl - 1}px)`,
  },
  only: {
    xs: `@media (max-width: ${BP.sm - 1}px)`,
    sm: `@media (min-width: ${BP.sm}px) and (max-width: ${BP.md - 1}px)`,
    md: `@media (min-width: ${BP.md}px) and (max-width: ${BP.lg - 1}px)`,
    lg: `@media (min-width: ${BP.lg}px) and (max-width: ${BP.xl - 1}px)`,
    xl: `@media (min-width: ${BP.xl}px)`,
  },
} as const

// ─── GRID CONFIGURATIONS ───────────────────────────────────────────────────

/** Standard grid configurations for different layouts */
export const GRID_CONFIG = {
  /** Standard card grids: 3 col desktop → 2 tablet → 1 mobile */
  cards: {
    xs: 1,    // 1 column on mobile
    sm: 1,    // 1 column on large mobile
    md: 2,    // 2 columns on tablet
    lg: 3,    // 3 columns on desktop
    xl: 3,    // 3 columns on large desktop
  },

  /** Team/testimonials grid: 4 col desktop → 3 tablet → 2 mobile */
  team: {
    xs: 1,    // 1 column on small mobile
    sm: 2,    // 2 columns on large mobile
    md: 3,    // 3 columns on tablet
    lg: 4,    // 4 columns on desktop
    xl: 4,    // 4 columns on large desktop
  },

  /** Two column layout: side-by-side on desktop, stacked on mobile */
  split: {
    xs: 1,    // stacked on mobile
    sm: 1,    // stacked on large mobile
    md: 2,    // side-by-side on tablet+
    lg: 2,    // side-by-side on desktop
    xl: 2,    // side-by-side on large desktop
  },
} as const

// ─── ANIMATION TIMINGS ──────────────────────────────────────────────────────

/** Standard animation durations (in ms) */
export const DURATION = {
  instant: 100,   // immediate feedback
  fast: 150,      // quick transitions
  base: 200,      // default hover/focus
  enter: 280,     // elements entering viewport
  leave: 200,     // elements leaving (faster than enter)
  page: 350,      // page transitions
  slow: 500,      // heavy animations
} as const

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────

export type SpaceKey = keyof typeof SPACE
export type RadiusKey = keyof typeof RADIUS
export type ZIndexKey = keyof typeof Z
export type BreakpointKey = keyof typeof BP
export type GridConfigKey = keyof typeof GRID_CONFIG
export type DurationKey = keyof typeof DURATION

// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────

/** Get responsive padding based on section type */
export function getSectionPadding(type: 'normal' | 'hero' = 'normal') {
  return type === 'hero' ? SECTION_PY_HERO : SECTION_PY
}

/** Get gutter size for current breakpoint */
export function getGutter(breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop'): number {
  switch (breakpoint) {
    case 'mobile':
      return GUTTER_MOBILE
    case 'tablet':
      return GUTTER_TABLET
    default:
      return GUTTER_DESKTOP
  }
}

/** Calculate content width with gutter */
export function getContentWidth(breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop'): number {
  const gutter = getGutter(breakpoint)
  return breakpoint === 'desktop' ? MAX_WIDTH - (gutter * 2) : MAX_WIDTH
}

/** Type guard for valid space keys */
export function isValidSpaceKey(key: string | number): key is SpaceKey {
  return key in SPACE
}

/** Type guard for valid radius keys */
export function isValidRadiusKey(key: string): key is RadiusKey {
  return key in RADIUS
}