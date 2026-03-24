// src/features/services/components/RiskPillarCard.tsx
/**
 * RISK PILLAR CARD COMPONENT
 *
 * Displays a single risk management pillar with number, title, and description.
 * Used in a grid layout within the RiskManagementSection.
 */

import { Card, CardContent, Stack, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import type { RiskManagementPillar } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface RiskPillarCardProps {
  readonly pillar: RiskManagementPillar;
  readonly index: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * RiskPillarCard Component
 *
 * Card displaying a numbered risk management pillar with staggered animation.
 *
 * @component
 * @example
 * ```tsx
 * <RiskPillarCard pillar={pillar} index={0} />
 * ```
 */
export const RiskPillarCard: React.FC<RiskPillarCardProps> = React.memo(
  ({ pillar, index }) => {
    const prefersReducedMotion = useReducedMotion();
    const enableAnimations = !prefersReducedMotion;

    return (
      <motion.div
        initial={enableAnimations ? { opacity: 0, y: 20 } : undefined}
        whileInView={enableAnimations ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <Card
          sx={{
            height: "100%",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
            transition: "all 200ms ease",
            "&:hover": {
              borderColor: "secondary.main",
              transform: "translateY(-2px)",
            },
          }}
          data-testid={`risk-pillar-${pillar.id}`}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Stack spacing={2}>
              {/* Pillar Number */}
              <Typography
                variant="h3"
                component="div"
                sx={{
                  color: "secondary.main",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  fontWeight: 700,
                  lineHeight: 1,
                }}
                aria-label={`Pilier ${pillar.number}`}
              >
                {pillar.number.toString().padStart(2, "0")}
              </Typography>

              {/* Pillar Title */}
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.9375rem", sm: "1rem" },
                  lineHeight: 1.4,
                }}
              >
                {pillar.title}
              </Typography>

              {/* Pillar Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                  lineHeight: 1.6,
                }}
              >
                {pillar.description}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    );
  },
);

RiskPillarCard.displayName = "RiskPillarCard";

export default RiskPillarCard;
