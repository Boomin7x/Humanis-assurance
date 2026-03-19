// src/theme/animation.ts
/**
 * HUMANIS ANIMATION CONSTANTS
 * Custom easing curves and durations for design system
 */

// ─── CUSTOM EASING CURVES ───────────────────────────────────────────────────

export const easingCurves = {
  /** Expo ease-out - smooth reveals, cards */
  smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** Sharp - snappy navbar, drawers */
  sharp: "cubic-bezier(0.25, 0, 0, 1)",
  /** MUI standard easing */
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
} as const;

// ─── CUSTOM DURATIONS ───────────────────────────────────────────────────────

export const animationDurations = {
  /** Instant micro-interactions */
  instant: 100,
  /** Fast state changes */
  fast: 150,
  /** Base hover transitions (color, border) */
  base: 200,
  /** Elements entering viewport */
  enter: 280,
  /** Elements leaving (always faster) */
  leave: 200,
  /** Page route transitions */
  page: 350,
  /** Heavy reveals */
  slow: 500,
} as const;

// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────

/** Get animation duration with fallback */
export function getDuration(key: keyof typeof animationDurations): number {
  return animationDurations[key] || animationDurations.base;
}

/** Get easing curve with fallback */
export function getEasing(key: keyof typeof easingCurves): string {
  return easingCurves[key] || easingCurves.easeOut;
}

/** Create transition string */
export function createTransition(
  properties: string | string[],
  duration: keyof typeof animationDurations = "base",
  easing: keyof typeof easingCurves = "easeOut",
): string {
  const props = Array.isArray(properties) ? properties.join(", ") : properties;
  return `${props} ${getDuration(duration)}ms ${getEasing(easing)}`;
}
