// src/features/services/components/InternationalFeatureItem.tsx
/**
 * INTERNATIONAL FEATURE ITEM COMPONENT
 *
 * Displays a single international program feature with icon, title, and description.
 * Used within the InternationalProgramsSection.
 */

import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PublicIcon from "@mui/icons-material/Public";
import { Box, Typography } from "@mui/material";
import React from "react";

import type { InternationalFeature } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface InternationalFeatureItemProps {
  readonly feature: InternationalFeature;
}

// ─────────────────────────────────────────────────────────────────────────────
// ICON MAPPING
// ─────────────────────────────────────────────────────────────────────────────

const ICON_MAP = {
  global: PublicIcon,
  check: CheckCircleIcon,
  business: BusinessIcon,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * InternationalFeatureItem Component
 *
 * Renders a single international feature with appropriate icon.
 *
 * @component
 * @example
 * ```tsx
 * <InternationalFeatureItem feature={feature} />
 * ```
 */
export const InternationalFeatureItem: React.FC<
  InternationalFeatureItemProps
> = React.memo(({ feature }) => {
  const IconComponent = ICON_MAP[feature.iconType];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
      }}
      data-testid={`international-feature-${feature.id}`}
    >
      <IconComponent
        sx={{
          color: "secondary.main",
          mt: 0.5,
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
        aria-hidden="true"
      />
      <Box>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "0.9375rem", sm: "1rem" },
            mb: 0.5,
          }}
        >
          {feature.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.875rem", sm: "0.9375rem" },
            lineHeight: 1.6,
          }}
        >
          {feature.description}
        </Typography>
      </Box>
    </Box>
  );
});

InternationalFeatureItem.displayName = "InternationalFeatureItem";

export default InternationalFeatureItem;
