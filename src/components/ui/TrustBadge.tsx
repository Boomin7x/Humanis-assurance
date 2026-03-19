// src/components/ui/TrustBadge.tsx
/**
 * TRUST BADGE COMPONENT
 *
 * Insurance Industry Trust Indicators
 *
 * Features:
 * - CIMA regulatory approval badge
 * - Professional certification indicators
 * - Years of experience badge
 * - Client count trust signals
 * - Partner approval indicators
 * - Responsive design for different contexts
 *
 * Design Intent:
 * - Build immediate trust and authority
 * - Comply with insurance industry regulations
 * - Provide social proof and credibility
 * - Professional appearance matching insurance standards
 */

import {
  Business,
  CheckCircle,
  EmojiEvents,
  Gavel,
  Groups,
  Shield,
  VerifiedUser,
} from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";
import React from "react";

import { RADIUS } from "@/constants/layout";
import { NAVY_800, PRIMARY_500, TEAL_500, WHITE } from "@/theme/tokens";

type TrustBadgeVariant =
  | "cima-approved" // CIMA regulatory approval
  | "experience-years" // Years of experience
  | "client-count" // Number of clients
  | "partner-approved" // Partner certification
  | "professional" // Professional certification
  | "award" // Industry award
  | "verified"; // General verification

interface TrustBadgeProps {
  /** Badge variant */
  variant: TrustBadgeVariant;
  /** Custom value (years, count, etc.) */
  value?: string | number;
  /** Custom label text */
  label?: string;
  /** Size preset */
  size?: "small" | "medium" | "large";
  /** Color theme */
  theme?: "light" | "dark";
  /** Show icon */
  showIcon?: boolean;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({
  variant,
  value,
  label,
  size = "medium",
  theme = "light",
  showIcon = true,
}) => {
  const config = {
    "cima-approved": {
      icon: Gavel,
      defaultLabel: "Agréé CIMA",
      color: NAVY_800,
      bgColor: theme === "dark" ? "rgba(255,255,255,0.1)" : `${NAVY_800}12`,
    },
    "experience-years": {
      icon: VerifiedUser,
      defaultLabel: `${value || "15"}+ ans d'expertise`,
      color: TEAL_500,
      bgColor: theme === "dark" ? "rgba(255,255,255,0.1)" : `${TEAL_500}12`,
    },
    "client-count": {
      icon: Groups,
      defaultLabel: `${value || "500"}+ clients`,
      color: PRIMARY_500,
      bgColor: theme === "dark" ? "rgba(255,255,255,0.1)" : `${PRIMARY_500}12`,
    },
    "partner-approved": {
      icon: Business,
      defaultLabel: `${value || "20"}+ partenaires`,
      color: NAVY_800,
      bgColor: theme === "dark" ? "rgba(255,255,255,0.1)" : `${NAVY_800}12`,
    },
    professional: {
      icon: Shield,
      defaultLabel: "Courtier professionnel",
      color: TEAL_500,
      bgColor: theme === "dark" ? "rgba(255,255,255,0.1)" : `${TEAL_500}12`,
    },
    award: {
      icon: EmojiEvents,
      defaultLabel: "Reconnu CEMAC",
      color: PRIMARY_500,
      bgColor: theme === "dark" ? "rgba(255,255,255,0.1)" : `${PRIMARY_500}12`,
    },
    verified: {
      icon: CheckCircle,
      defaultLabel: "Vérifié",
      color: TEAL_500,
      bgColor: theme === "dark" ? "rgba(255,255,255,0.1)" : `${TEAL_500}12`,
    },
  };

  const badgeConfig = config[variant];
  const Icon = badgeConfig.icon;
  const displayLabel = label || badgeConfig.defaultLabel;

  const sizeConfig = {
    small: {
      height: 24,
      fontSize: "0.6875rem",
      iconSize: "0.875rem",
      padding: "4px 8px",
    },
    medium: {
      height: 28,
      fontSize: "0.75rem",
      iconSize: "1rem",
      padding: "6px 12px",
    },
    large: {
      height: 32,
      fontSize: "0.875rem",
      iconSize: "1.125rem",
      padding: "8px 16px",
    },
  };

  const currentSize = sizeConfig[size];

  return (
    <Chip
      icon={
        showIcon ? (
          <Icon
            sx={{
              fontSize: `${currentSize.iconSize} !important`,
              color: badgeConfig.color,
            }}
          />
        ) : undefined
      }
      label={displayLabel}
      sx={{
        backgroundColor: badgeConfig.bgColor,
        color: theme === "dark" ? WHITE : badgeConfig.color,
        border: `1px solid ${badgeConfig.color}30`,
        fontWeight: 600,
        fontSize: currentSize.fontSize,
        height: currentSize.height,
        borderRadius: RADIUS.pill / 8,
        "& .MuiChip-label": {
          px: showIcon ? 1 : 1.5,
          py: 0,
          letterSpacing: "0.02em",
        },
        "& .MuiChip-icon": {
          ml: 0.5,
        },
        // Subtle animation for credibility
        transition: "all 200ms ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: `0 2px 8px ${badgeConfig.color}20`,
        },
      }}
    />
  );
};

/**
 * Grouped Trust Badges Component
 * For displaying multiple trust indicators together
 */
interface TrustBadgeGroupProps {
  /** Badges to display */
  badges: Array<{
    variant: TrustBadgeVariant;
    value?: string | number;
    label?: string;
  }>;
  /** Layout direction */
  direction?: "row" | "column";
  /** Size for all badges */
  size?: "small" | "medium" | "large";
  /** Theme for all badges */
  theme?: "light" | "dark";
  /** Maximum badges per row (when direction is row) */
  maxPerRow?: number;
}

export const TrustBadgeGroup: React.FC<TrustBadgeGroupProps> = ({
  badges,
  direction = "row",
  size = "medium",
  theme = "light",
  maxPerRow = 3,
}) => {
  return (
    <Stack
      direction={direction}
      spacing={1}
      flexWrap={direction === "row" ? "wrap" : "nowrap"}
      useFlexGap
      sx={{
        "& > *": {
          ...(direction === "row" &&
            maxPerRow && {
              flexBasis: `calc(${100 / maxPerRow}% - 8px)`,
              minWidth: "fit-content",
            }),
        },
      }}
    >
      {badges.map((badge, index) => (
        <TrustBadge
          key={index}
          variant={badge.variant}
          value={badge.value}
          label={badge.label}
          size={size}
          theme={theme}
        />
      ))}
    </Stack>
  );
};

/**
 * Contextual Trust Indicators
 * Pre-configured badge groups for common scenarios
 */
export const InsuranceTrustBadges = {
  // Homepage hero section
  hero: (
    <TrustBadgeGroup
      badges={[
        { variant: "cima-approved" },
        { variant: "experience-years", value: "15" },
        { variant: "client-count", value: "500" },
      ]}
      direction="row"
      size="small"
      theme="dark"
    />
  ),

  // Footer regulatory section
  footer: (
    <TrustBadgeGroup
      badges={[
        { variant: "cima-approved", label: "Agréé CIMA" },
        { variant: "professional", label: "Courtier certifié" },
      ]}
      direction="column"
      size="medium"
      theme="dark"
    />
  ),

  // Product cards
  product: (
    <TrustBadgeGroup
      badges={[
        { variant: "cima-approved" },
        { variant: "verified", label: "Devis 24h" },
      ]}
      direction="row"
      size="small"
      theme="light"
      maxPerRow={2}
    />
  ),

  // About page
  about: (
    <TrustBadgeGroup
      badges={[
        { variant: "experience-years", value: "15" },
        { variant: "client-count", value: "500" },
        { variant: "partner-approved", value: "20" },
        { variant: "award", label: "Reconnu CEMAC" },
      ]}
      direction="row"
      size="medium"
      theme="light"
      maxPerRow={2}
    />
  ),
};

export default TrustBadge;
