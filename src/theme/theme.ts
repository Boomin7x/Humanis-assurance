// src/theme/theme.ts
/**
 * HUMANIS MUI THEME CONFIGURATION
 * Complete theme setup combining all token files
 * Enterprise-grade design system implementation
 */

import type { Components, ThemeOptions, Shadows } from "@mui/material/styles";
import { alpha, createTheme } from "@mui/material/styles";

// Import our design system
import { buttonGlow, elevation, muiShadows } from "./elevation";
import {
  ERROR,
  GLASS_NAVY_04,
  INFO,
  NAVY_800,
  NEUTRAL_200,
  NEUTRAL_400,
  NEUTRAL_50,
  NEUTRAL_500,
  NEUTRAL_600,
  PRIMARY_200,
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
import { TOUCH_TARGETS, BREAKPOINTS } from "./responsive";

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
    primary: NAVY_800,
    secondary: NEUTRAL_600,
    disabled: NEUTRAL_500,
  },
  divider: NEUTRAL_200,
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
        "&:hover": {
          boxShadow: buttonGlow.blue,
        },
      },
      containedPrimary: {
        backgroundColor: PRIMARY_500,
        "&:hover": {
          backgroundColor: PRIMARY_700,
          boxShadow: buttonGlow.blue,
        },
      },
      containedSecondary: {
        backgroundColor: TEAL_500,
        "&:hover": {
          backgroundColor: TEAL_700,
          boxShadow: buttonGlow.teal,
        },
      },
      outlined: {
        borderColor: NEUTRAL_200,
        "&:hover": {
          borderColor: PRIMARY_500,
          backgroundColor: PRIMARY_50,
        },
      },
      text: {
        "&:hover": {
          backgroundColor: GLASS_NAVY_04,
        },
      },
    },
  },

  // ─── CARD COMPONENT ───────────────────────────────────────────────────────
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        border: `1px solid ${NEUTRAL_200}`,
        boxShadow: elevation.xs,
        transition: "box-shadow 200ms, border-color 200ms, transform 200ms",
        "&:hover": {
          boxShadow: elevation.sm,
          borderColor: PRIMARY_200,
          // Hover transform for desktop only
          "@media (min-width: 900px)": {
            transform: "translateY(-2px)",
          },
        },
      },
    },
  },

  // ─── PAPER COMPONENT ──────────────────────────────────────────────────────
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        borderRadius: 8,
      },
      elevation1: {
        boxShadow: elevation.xs,
      },
      elevation2: {
        boxShadow: elevation.sm,
      },
      elevation3: {
        boxShadow: elevation.md,
      },
      elevation4: {
        boxShadow: elevation.lg,
      },
    },
  },

  // ─── APP BAR COMPONENT ────────────────────────────────────────────────────
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        backdropFilter: "blur(12px)",
      },
    },
  },

  // ─── DRAWER COMPONENT ─────────────────────────────────────────────────────
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: "12px 0 0 12px",
        boxShadow: elevation.lg,
      },
    },
  },

  // ─── MODAL COMPONENT ──────────────────────────────────────────────────────
  MuiModal: {
    styleOverrides: {
      root: {
        "& .MuiPaper-root": {
          borderRadius: 12,
          boxShadow: elevation.lg,
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
            borderColor: NEUTRAL_200,
          },
          "&:hover fieldset": {
            borderColor: NEUTRAL_400,
          },
          "&.Mui-focused fieldset": {
            borderColor: PRIMARY_500,
            borderWidth: "1.5px",
          },
          "&.Mui-focused": {
            outline: `3px solid ${alpha(PRIMARY_500, 0.15)}`,
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
        borderRadius: 8,
        minHeight: TOUCH_TARGETS.buttonMinHeight,
        "&.Mui-focused": {
          boxShadow: "none", // Remove MUI's default blue glow
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
        borderColor: NEUTRAL_200,
      },
    },
  },

  // ─── TOOLTIP COMPONENT ────────────────────────────────────────────────────
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: 6,
        boxShadow: elevation.md,
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
        border: `1px solid ${NEUTRAL_200}`,
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

  // ─── BACKDROP COMPONENT ───────────────────────────────────────────────────
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: "rgba(17, 27, 46, 0.8)",
        backdropFilter: "blur(4px)",
      },
    },
  },
};

// ─── THEME CONFIGURATION ────────────────────────────────────────────────────

const themeOptions: ThemeOptions = {
  palette: paletteConfig,

  typography: muiTypographyConfig,

  shape: {
    borderRadius: 6, // Default border radius
  },

  shadows: muiShadows as Shadows,

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
