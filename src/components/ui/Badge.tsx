// src/components/ui/Badge.tsx
/**
 * HUMANIS BADGE COMPONENT
 *
 * Features:
 * - Multiple variants: blue (info), teal (feature), navy (category), green (success), neutral
 * - Consistent styling with design system
 * - Size variants: small, medium, large
 * - Optional icon support
 * - Clean, pill-shaped design
 */

import React from "react";
import { Chip, ChipProps } from "@mui/material";
import { Icon } from "@iconify/react";

import {
  PRIMARY_500,
  TEAL_500,
  NAVY_800,
  WHITE,
  NEUTRAL_100,
  NEUTRAL_600,
  SUCCESS,
} from "@/theme/tokens";
import { RADIUS } from "@/constants/layout";

interface BadgeProps extends Omit<
  ChipProps,
  "color" | "variant" | "children" | "icon" | "size"
> {
  /** Visual variant */
  variant?: "blue" | "teal" | "navy" | "neutral" | "green";
  /** Size variant */
  size?: "small" | "medium" | "large";
  /** Optional Iconify icon */
  icon?: string;
  /** Children content */
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "blue",
  size = "medium",
  icon,
  children,
  sx,
  ...props
}) => {
  // Variant styling
  const variantStyles = {
    blue: {
      backgroundColor: `${PRIMARY_500}12`, // 7% opacity
      color: PRIMARY_500,
      borderColor: `${PRIMARY_500}20`,
    },
    teal: {
      backgroundColor: `${TEAL_500}12`,
      color: TEAL_500,
      borderColor: `${TEAL_500}20`,
    },
    navy: {
      backgroundColor: NAVY_800,
      color: WHITE,
      borderColor: NAVY_800,
    },
    neutral: {
      backgroundColor: NEUTRAL_100,
      color: NEUTRAL_600,
      borderColor: "transparent",
    },
    green: {
      backgroundColor: `${SUCCESS}12`,
      color: SUCCESS,
      borderColor: `${SUCCESS}20`,
    },
  };

  // Size styling
  const sizeStyles = {
    small: {
      height: 22,
      fontSize: "0.6875rem", // 11px
      fontWeight: 500,
      "& .MuiChip-label": {
        px: 1,
        py: 0,
      },
      "& .MuiChip-icon": {
        fontSize: "0.75rem",
        marginLeft: 0.5,
        marginRight: -0.25,
      },
    },
    medium: {
      height: 28,
      fontSize: "0.75rem", // 12px
      fontWeight: 600,
      "& .MuiChip-label": {
        px: 1.5,
        py: 0,
      },
      "& .MuiChip-icon": {
        fontSize: "0.875rem",
        marginLeft: 0.5,
        marginRight: -0.25,
      },
    },
    large: {
      height: 36,
      fontSize: "0.875rem", // 14px
      fontWeight: 600,
      "& .MuiChip-label": {
        px: 2,
        py: 0,
      },
      "& .MuiChip-icon": {
        fontSize: "1rem",
        marginLeft: 0.5,
        marginRight: -0.25,
      },
    },
  };

  const currentVariantStyles = variantStyles[variant];
  const currentSizeStyles = sizeStyles[size];

  return (
    <Chip
      label={children}
      icon={
        icon ? (
          <Icon
            icon={icon}
            style={{
              color: currentVariantStyles.color,
            }}
          />
        ) : undefined
      }
      sx={{
        ...currentVariantStyles,
        ...currentSizeStyles,
        borderRadius: RADIUS.pill / 8, // Full pill shape
        border: `1px solid ${currentVariantStyles?.borderColor}`,
        fontFamily: "DM Sans, sans-serif",
        letterSpacing: "0.01em",
        textTransform: "none",
        "&:hover": {
          backgroundColor: currentVariantStyles.backgroundColor,
        },
        "&:focus": {
          backgroundColor: currentVariantStyles.backgroundColor,
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default Badge;
