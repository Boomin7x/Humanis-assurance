// src/theme/theme.ts
/**
 * HUMANIS MUI THEME CONFIGURATION
 * Complete theme setup combining all token files
 * Enterprise-grade design system implementation
 */

import type { Components, Shadows, ThemeOptions } from "@mui/material/styles";
import { alpha, createTheme } from "@mui/material/styles";

// Import our design system
import {
  focusIndicator,
  insuranceBackground,
  insuranceBorder,
  muiShadows,
} from "./elevation";
import { BREAKPOINTS, TOUCH_TARGETS } from "./responsive";
import {
  ERROR,
  GLASS_NAVY_04,
  INFO,
  NAVY_800,
  NEUTRAL_300,
  NEUTRAL_400,
  NEUTRAL_50,
  NEUTRAL_500,
  NEUTRAL_700,
  NEUTRAL_900,
  PRIMARY_50,
  PRIMARY_500,
  PRIMARY_700,
  SUCCESS,
  TEAL_50,
  TEAL_500,
  TEAL_700,
  WARNING,
  WHITE,
} from "./tokens";
import { muiTypographyConfig } from "./typography";

// ─── PALETTE CONFIGURATION ──────────────────────────────────────────────────

const paletteConfig = {
  primary: {
    main: PRIMARY_500,
    dark: PRIMARY_700,
    light: PRIMARY_50,
    contrastText: WHITE,
  },
  secondary: {
    main: TEAL_500,
    dark: TEAL_700,
    light: TEAL_50,
    contrastText: WHITE,
  },
  error: {
    main: ERROR,
  },
  warning: {
    main: WARNING,
  },
  success: {
    main: SUCCESS,
  },
  info: {
    main: INFO,
  },
  background: {
    default: NEUTRAL_50,
    paper: WHITE,
  },
  text: {
    primary: NEUTRAL_900, // Strong readable text for insurance content
    secondary: NEUTRAL_700, // Professional secondary text
    disabled: NEUTRAL_400, // Clear disabled state
  },
  divider: NEUTRAL_300, // Professional divider visibility
  action: {
    hover: alpha(PRIMARY_500, 0.04),
    selected: alpha(PRIMARY_500, 0.08),
    disabled: alpha(NEUTRAL_500, 0.12),
    disabledBackground: alpha(NEUTRAL_500, 0.06),
  },
} as const;

// ─── COMPONENT OVERRIDES ────────────────────────────────────────────────────

const componentOverrides: Components = {
  // ─── BUTTON COMPONENT ─────────────────────────────────────────────────────
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.9375rem",
        borderRadius: 6,
        transition:
          "background-color 200ms, box-shadow 200ms, border-color 200ms, transform 200ms",
        "&:active": {
          transform: "scale(0.98)",
          boxShadow: "none",
        },
      },
      sizeMedium: {
        padding: "10px 24px",
        minHeight: TOUCH_TARGETS.buttonMinHeight,
      },
      sizeSmall: {
        padding: "8px 18px",
        minHeight: 40,
      },
      sizeLarge: {
        padding: "13px 30px",
        minHeight: TOUCH_TARGETS.buttonComfortable,
      },
      contained: {
        boxShadow: "none",
        border: "1px solid transparent",
        "&:hover": {
          boxShadow: "none",
          transform: "translateY(-1px)",
        },
        "&:focus": {
          boxShadow: focusIndicator.primary,
        },
      },
      containedPrimary: {
        backgroundColor: PRIMARY_500,
        "&:hover": {
          backgroundColor: PRIMARY_700,
          boxShadow: "none",
        },
        "&:focus": {
          boxShadow: focusIndicator.primary,
        },
      },
      containedSecondary: {
        backgroundColor: TEAL_500,
        "&:hover": {
          backgroundColor: TEAL_700,
          boxShadow: "none",
        },
        "&:focus": {
          boxShadow: focusIndicator.success,
        },
      },
      outlined: {
        border: insuranceBorder.default,
        "&:hover": {
          border: insuranceBorder.hover,
          backgroundColor: PRIMARY_50,
        },
        "&:focus": {
          boxShadow: focusIndicator.primary,
        },
      },
      text: {
        "&:hover": {
          backgroundColor: GLASS_NAVY_04,
        },
      },
    },
  },

  // ─── CARD COMPONENT - INSURANCE PROFESSIONAL ─────────────────────────────
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 6, // Insurance standard
        border: insuranceBorder.default,
        backgroundColor: insuranceBackground.default,
        boxShadow: "none", // No shadows in insurance
        transition:
          "border-color 200ms, background-color 200ms, transform 100ms",
        "&:hover": {
          border: insuranceBorder.hover,
          backgroundColor: insuranceBackground.hover,
          boxShadow: "none", // Insurance compliance
          // Subtle transform for interactivity
          "@media (min-width: 900px)": {
            transform: "translateY(-1px)",
          },
        },
        // Selected state for coverage cards
        "&[data-selected='true']": {
          border: insuranceBorder.active,
          backgroundColor: insuranceBackground.selected,
        },
      },
    },
  },

  // ─── PAPER COMPONENT - INSURANCE CLEAN ───────────────────────────────────
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: "none", // Insurance compliance
        borderRadius: 6,
        border: insuranceBorder.default,
        backgroundColor: insuranceBackground.default,
      },
      // All elevation levels use borders instead of shadows
      elevation1: {
        boxShadow: "none",
        border: insuranceBorder.default,
      },
      elevation2: {
        boxShadow: "none",
        border: insuranceBorder.hover,
      },
      elevation3: {
        boxShadow: "none",
        border: insuranceBorder.active,
        backgroundColor: insuranceBackground.active,
      },
      elevation4: {
        boxShadow: "none",
        border: insuranceBorder.modal,
        backgroundColor: insuranceBackground.default,
      },
    },
  },

  // ─── APP BAR COMPONENT - INSURANCE AUTHORITY ──────────────────────────────
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "none", // Insurance compliance
        backdropFilter: "none", // Clean, professional
        borderBottom: `1px solid ${NEUTRAL_300}`,
        backgroundColor: insuranceBackground.default,
        color: NEUTRAL_900, // Professional text color
      },
    },
  },

  // ─── DRAWER COMPONENT - INSURANCE PROFESSIONAL ───────────────────────────
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: "0", // Insurance standard - no radius on screen edges
        boxShadow: "none", // Insurance compliance
        borderRight: `1px solid ${NEUTRAL_300}`,
        backgroundColor: insuranceBackground.default,
      },
    },
  },

  // ─── MODAL COMPONENT - INSURANCE AUTHORITY ────────────────────────────────
  MuiModal: {
    styleOverrides: {
      root: {
        "& .MuiPaper-root": {
          borderRadius: 8, // Max 8px for insurance compliance
          boxShadow: "none", // Insurance standard
          border: insuranceBorder.modal,
        },
      },
    },
  },

  // ─── TEXT FIELD COMPONENTS ────────────────────────────────────────────────
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
          minHeight: TOUCH_TARGETS.buttonMinHeight,
          "& fieldset": {
            borderColor: NEUTRAL_300, // Professional form borders
          },
          "&:hover fieldset": {
            borderColor: NEUTRAL_500, // Clear hover indication
          },
          "&.Mui-focused fieldset": {
            borderColor: PRIMARY_500,
            borderWidth: "1.5px",
          },
          "&.Mui-focused": {
            boxShadow: focusIndicator.primary,
            outline: "none", // Use boxShadow for consistency
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: PRIMARY_500,
        },
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 6, // Insurance standard
        minHeight: TOUCH_TARGETS.buttonMinHeight,
        "&.Mui-focused": {
          boxShadow: focusIndicator.primary, // Professional focus indicator
        },
        "& input": {
          padding: "16.5px 14px",
        },
      },
    },
  },

  // ─── CHIP COMPONENT ───────────────────────────────────────────────────────
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 100,
        fontWeight: 500,
        fontSize: "0.8125rem",
        boxShadow: "none",
      },
    },
  },

  // ─── DIVIDER COMPONENT ────────────────────────────────────────────────────
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: NEUTRAL_300, // Professional dividers
      },
    },
  },

  // ─── TOOLTIP COMPONENT - INSURANCE CLEAN ─────────────────────────────────
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: 4, // Minimal radius for tooltips
        boxShadow: "none", // Insurance compliance
        border: `1px solid ${NEUTRAL_300}`,
        backgroundColor: NAVY_800,
        fontSize: "0.8125rem",
      },
      arrow: {
        color: NAVY_800,
      },
    },
  },

  // ─── TABS COMPONENTS ──────────────────────────────────────────────────────
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: PRIMARY_500,
        height: 2,
      },
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 500,
        "&.Mui-selected": {
          fontWeight: 600,
          color: PRIMARY_500,
        },
      },
    },
  },

  // ─── ACCORDION COMPONENT ──────────────────────────────────────────────────
  MuiAccordion: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        border: `1px solid ${NEUTRAL_300}`, // Professional accordion borders
        borderRadius: 8,
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: "16px 0",
        },
      },
    },
  },

  // ─── ALERT COMPONENT ──────────────────────────────────────────────────────
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        boxShadow: "none",
        borderLeft: "3px solid",
      },
      standardSuccess: {
        borderLeftColor: SUCCESS,
      },
      standardError: {
        borderLeftColor: ERROR,
      },
      standardWarning: {
        borderLeftColor: WARNING,
      },
      standardInfo: {
        borderLeftColor: INFO,
      },
    },
  },

  // ─── LINEAR PROGRESS COMPONENT ────────────────────────────────────────────
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: 100,
        height: 4,
      },
    },
  },

  // ─── BREADCRUMBS COMPONENT ────────────────────────────────────────────────
  MuiBreadcrumbs: {
    styleOverrides: {
      root: {
        fontSize: "0.875rem",
        color: NEUTRAL_500,
        "& .MuiBreadcrumbs-separator": {
          color: NEUTRAL_400,
        },
        "& a, & button": {
          minHeight: 32,
          display: "flex",
          alignItems: "center",
        },
      },
    },
  },

  // ─── BACKDROP COMPONENT - INSURANCE PROFESSIONAL ─────────────────────────
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: insuranceBackground.modal,
        backdropFilter: "none", // Clean, professional
      },
    },
  },
};

// ─── THEME CONFIGURATION ────────────────────────────────────────────────────

const themeOptions: ThemeOptions = {
  palette: paletteConfig,

  typography: muiTypographyConfig,

  shape: {
    borderRadius: 6, // Insurance standard - never exceed 8px
  },

  shadows: [...muiShadows] as unknown as Shadows,

  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)", // MUI default
      easeOut: "cubic-bezier(0, 0, 0.2, 1)", // MUI default
      sharp: "cubic-bezier(0.25, 0, 0, 1)", // snappy - navbar, drawers
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },

  breakpoints: {
    values: {
      xs: BREAKPOINTS.xs,
      sm: BREAKPOINTS.sm,
      md: BREAKPOINTS.md,
      lg: BREAKPOINTS.lg,
      xl: BREAKPOINTS.xl,
    },
  },

  components: componentOverrides,
};

// ─── CREATE AND EXPORT THEME ───────────────────────────────────────────────

export const theme = createTheme(themeOptions);

// Type augmentation for custom properties
declare module "@mui/material/styles" {
  interface TypographyVariants {
    statNumber: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    statNumber?: React.CSSProperties;
  }

  interface Palette {
    tertiary: {
      main: string;
      dark: string;
      light: string;
      contrastText: string;
    };
  }

  interface PaletteOptions {
    tertiary?: {
      main?: string;
      dark?: string;
      light?: string;
      contrastText?: string;
    };
  }
}

export default theme;
