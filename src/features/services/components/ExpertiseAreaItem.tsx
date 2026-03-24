// src/features/services/components/ExpertiseAreaItem.tsx
/**
 * EXPERTISE AREA LIST ITEM COMPONENT
 *
 * Displays a single expertise area with icon, title, and description.
 * Used within the CourtageSection to list areas of expertise.
 */

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";

import type { ExpertiseArea } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ExpertiseAreaItemProps {
  readonly area: ExpertiseArea;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ExpertiseAreaItem Component
 *
 * Renders a single expertise area with check icon, title, and description.
 *
 * @component
 * @example
 * ```tsx
 * <ExpertiseAreaItem area={expertiseArea} />
 * ```
 */
export const ExpertiseAreaItem: React.FC<ExpertiseAreaItemProps> = React.memo(
  ({ area }) => {
    return (
      <ListItem
        sx={{
          px: 0,
          py: 0.5,
          alignItems: "flex-start",
        }}
        data-testid={`expertise-area-${area.id}`}
      >
        <ListItemIcon
          sx={{
            minWidth: { xs: 36, sm: 40 },
            mt: 0.5,
          }}
        >
          <CheckCircleIcon
            sx={{
              color: "secondary.main",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
            aria-hidden="true"
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{
                fontSize: { xs: "0.9375rem", sm: "1rem" },
                mb: 0.5,
              }}
            >
              {area.title}
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                lineHeight: 1.6,
              }}
            >
              {area.description}
            </Typography>
          }
        />
      </ListItem>
    );
  },
);

ExpertiseAreaItem.displayName = "ExpertiseAreaItem";

export default ExpertiseAreaItem;
