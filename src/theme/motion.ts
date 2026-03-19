// src/theme/motion.ts
/**
 * HUMANIS MOTION SYSTEM
 * Framer Motion variants for consistent animations
 *
 * Motion Principles:
 * - Entrances are smooth and purposeful
 * - Nothing bounces or overshoots
 * - Nothing lingers unnecessarily
 * - Respects prefers-reduced-motion
 */

import type { Variants } from 'framer-motion'

// ─── ENTRANCE ANIMATIONS ────────────────────────────────────────────────────

/** Standard fade in from below - primary entrance animation */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.50,
      ease: [0.16, 1, 0.3, 1], // expo ease-out
    },
  },
}

/** Simple fade in - for overlays and subtle reveals */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.40,
      ease: 'easeOut',
    },
  },
}

/** Slide in from right - for secondary content */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.50,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Slide in from left - for alternating content */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.50,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Scale up entrance - for important elements */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// ─── STAGGER ANIMATIONS ─────────────────────────────────────────────────────

/** Container for staggered children - use with staggerItem */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.10,
    },
  },
}

/** Child item within a staggerContainer */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Fast stagger for small elements like badges or chips */
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

// ─── SPECIAL ANIMATIONS ─────────────────────────────────────────────────────

/** Statistics counter entrance - used with useInView + JS counting logic */
export const statReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.90,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.50,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** Draw line animation - for progress bars or dividers */
export const drawLine: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, ease: 'easeInOut' },
      opacity: { duration: 0.2 },
    },
  },
}

/** Card hover animation - subtle lift */
export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

// ─── PAGE TRANSITIONS ───────────────────────────────────────────────────────

/** Page-level route transition (use with AnimatePresence) */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.20,
      ease: 'easeIn',
    },
  },
}

/** Modal entrance/exit */
export const modalTransition: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
}

// ─── VIEWPORT CONFIGURATION ─────────────────────────────────────────────────

/** Default viewport trigger config - use with Framer's whileInView */
export const viewportConfig = {
  once: true,
  margin: '-80px 0px',
  amount: 0.3,
} as const

/** Viewport config for elements that should trigger early */
export const viewportEarly = {
  once: true,
  margin: '-120px 0px',
  amount: 0.2,
} as const

/** Viewport config for elements that should trigger later */
export const viewportLate = {
  once: true,
  margin: '-40px 0px',
  amount: 0.5,
} as const

// ─── ANIMATION PRESETS ──────────────────────────────────────────────────────

/** Common animation combinations ready to use */
export const animationPresets = {
  /** Hero section entrance */
  heroText: {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.50,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2,
      },
    },
  } as Variants,

  /** Section header entrance */
  sectionHeader: {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as Variants,

  /** Button press feedback */
  buttonPress: {
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  },

  /** Image reveal */
  imageReveal: {
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as Variants,

  /** Slide up animation - general purpose */
  slideUp: {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as Variants,
}

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────

export type MotionVariant = keyof typeof animationPresets
export type ViewportConfigType = 'default' | 'early' | 'late'

// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────

/** Get viewport configuration by type */
export function getViewportConfig(type: ViewportConfigType = 'default') {
  switch (type) {
    case 'early':
      return viewportEarly
    case 'late':
      return viewportLate
    default:
      return viewportConfig
  }
}

/** Create custom stagger with different timing */
export function createStagger(
  staggerDelay: number = 0.08,
  initialDelay: number = 0.10
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  }
}

/** Create custom fade in with delay */
export function createDelayedFadeIn(delay: number = 0): Variants {
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        delay,
      },
    },
  }
}