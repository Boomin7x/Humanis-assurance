// src/features/services/components/ProcessStepCard.tsx
/**
 * PROCESS STEP CARD COMPONENT
 *
 * Displays a single step in the client process timeline.
 * Features numbered circle, title, and description with staggered animation.
 */

import { Box, Stack, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import type { ProcessStep } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ProcessStepCardProps {
  readonly step: ProcessStep;
  readonly index: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ProcessStepCard Component
 *
 * Card displaying a numbered process step with animation.
 *
 * @component
 * @example
 * ```tsx
 * <ProcessStepCard step={step} index={0} />
 * ```
 */
export const ProcessStepCard: React.FC<ProcessStepCardProps> = React.memo(
  ({ step, index }) => {
    const prefersReducedMotion = useReducedMotion();
    const enableAnimations = !prefersReducedMotion;

    return (
      <motion.div
        initial={enableAnimations ? { opacity: 0, y: 20 } : undefined}
        whileInView={enableAnimations ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          textAlign="center"
          sx={{ height: "100%" }}
          data-testid={`process-step-${step.id}`}
        >
          {/* Step Number Circle */}
          <Box
            sx={{
              width: { xs: 56, sm: 60 },
              height: { xs: 56, sm: 60 },
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: { xs: "1.375rem", sm: "1.5rem" },
              fontWeight: 700,
              flexShrink: 0,
            }}
            role="img"
            aria-label={`Étape ${step.number}`}
          >
            {step.number}
          </Box>

          {/* Step Title */}
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.9375rem", sm: "1rem" },
              lineHeight: 1.4,
            }}
          >
            {step.title}
          </Typography>

          {/* Step Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.875rem", sm: "0.9375rem" },
              lineHeight: 1.6,
            }}
          >
            {step.description}
          </Typography>
        </Stack>
      </motion.div>
    );
  },
);

ProcessStepCard.displayName = "ProcessStepCard";

export default ProcessStepCard;
