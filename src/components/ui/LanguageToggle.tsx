// src/components/ui/LanguageToggle.tsx
/**
 * HUMANIS LANGUAGE TOGGLE COMPONENT
 *
 * Features:
 * - FR | EN toggle switch
 * - i18next integration for language switching
 * - localStorage persistence
 * - Pill-shaped design matching design system
 * - Responsive variants (navbar/mobile)
 * - Smooth transition animations
 */

import { Language } from "@mui/icons-material";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

import { RADIUS } from "@/constants/layout";
import {
  GLASS_WHITE_15,
  GLASS_WHITE_80,
  NEUTRAL_400,
  PRIMARY_500,
  TEAL_500,
  WHITE,
} from "@/theme/tokens";

interface LanguageToggleProps {
  /** Visual variant */
  variant?: "navbar" | "mobile" | "footer";
  /** Size variant */
  size?: "small" | "medium";
  /** Show language icon */
  showIcon?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = "navbar",
  size = "medium",
  showIcon = false,
}) => {
  const { i18n } = useTranslation();
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const currentLanguage = i18n.language || "fr";

  const handleLanguageChange = (
    _event: React.MouseEvent<HTMLElement>,
    newLanguage: string | null,
  ) => {
    if (newLanguage && newLanguage !== currentLanguage) {
      i18n.changeLanguage(newLanguage);
      // Persist to localStorage
      localStorage.setItem("humanis-language", newLanguage);
    }
  };

  // Styling variants
  const variantStyles = {
    navbar: {
      backgroundColor: GLASS_WHITE_15,
      backdropFilter: "blur(12px)",
      border: `1px solid ${GLASS_WHITE_15}`,
      "& .MuiToggleButton-root": {
        color: WHITE,
        border: "none",
        fontWeight: 500,
        fontSize: size === "small" ? "0.75rem" : "0.8125rem",
        padding: size === "small" ? "4px 12px" : "6px 16px",
        minWidth: size === "small" ? "auto" : "32px",
        "&.Mui-selected": {
          backgroundColor: WHITE,
          color: PRIMARY_500,
          "&:hover": {
            backgroundColor: WHITE,
          },
        },
        "&:hover": {
          backgroundColor: GLASS_WHITE_80,
        },
      },
    },
    mobile: {
      backgroundColor: GLASS_WHITE_15,
      backdropFilter: "blur(12px)",
      border: `1px solid ${GLASS_WHITE_15}`,
      "& .MuiToggleButton-root": {
        color: WHITE,
        border: "none",
        fontWeight: 500,
        fontSize: "0.875rem",
        padding: "8px 20px",
        "&.Mui-selected": {
          backgroundColor: WHITE,
          color: PRIMARY_500,
          "&:hover": {
            backgroundColor: WHITE,
          },
        },
        "&:hover": {
          backgroundColor: GLASS_WHITE_80,
        },
      },
    },
    footer: {
      backgroundColor: "rgba(255,255,255,0.05)",
      border: `1px solid rgba(255,255,255,0.12)`,
      "& .MuiToggleButton-root": {
        color: NEUTRAL_400,
        border: "none",
        fontWeight: 500,
        fontSize: "0.8125rem",
        padding: "6px 16px",
        "&.Mui-selected": {
          backgroundColor: TEAL_500,
          color: WHITE,
          "&:hover": {
            backgroundColor: TEAL_500,
          },
        },
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.08)",
          color: WHITE,
        },
      },
    },
  };

  const currentStyles = variantStyles[variant];

  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: showIcon ? 1 : 0,
      }}
    >
      {/* Language Icon */}
      {showIcon && (
        <Language
          sx={{
            fontSize: "1rem",
            color: variant === "footer" ? NEUTRAL_400 : WHITE,
          }}
        />
      )}

      {/* Language Toggle */}
      <ToggleButtonGroup
        value={currentLanguage}
        exclusive
        onChange={handleLanguageChange}
        size={size}
        aria-label="Language selection"
        sx={{
          borderRadius: RADIUS.pill / 8,
          overflow: "hidden",
          ...currentStyles,
        }}
      >
        <ToggleButton
          value="fr"
          aria-label="French language"
          sx={{
            borderRadius: `${RADIUS.pill / 8}px 0 0 ${RADIUS.pill / 8}px !important`,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          FR
        </ToggleButton>
        <ToggleButton
          value="en"
          aria-label="English language"
          sx={{
            borderRadius: `0 ${RADIUS.pill / 8}px ${RADIUS.pill / 8}px 0 !important`,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          EN
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default LanguageToggle;
