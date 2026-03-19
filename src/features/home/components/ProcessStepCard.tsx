// src/features/home/components/ProcessStepCard.tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { animationPresets } from "@/theme/motion";
import { NAVY_800, NEUTRAL_600, PRIMARY_500, TEAL_500, WHITE } from "@/theme/tokens";

/**
 * ProcessStepCard Props
 */
export interface ProcessStepCardProps {
  readonly stepNumber: string;
  readonly title: string;
  readonly description: string;
  readonly icon: React.ReactElement;
  readonly animationDelay?: number;
}

/**
 * ProcessStepCard Component
 *
 * Displays a single step in the client onboarding process
 * with numbered badge, icon, title, and description
 */
export const ProcessStepCard: React.FC<ProcessStepCardProps> = React.memo(
  ({ stepNumber, title, description, icon, animationDelay = 0 }) => {
    return (
      <motion.div
        variants={animationPresets.slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: animationDelay }}
      >
        <Box
          component="article"
          sx={{
            textAlign: "center",
            p: { xs: 2, sm: 3 },
            height: "100%",
          }}
          aria-label={`Step ${stepNumber}: ${title}`}
        >
          <Box
            sx={{
              width: { xs: 56, sm: 64 },
              height: { xs: 56, sm: 64 },
              borderRadius: "50%",
              backgroundColor: PRIMARY_500,
              color: WHITE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: "1.125rem", sm: "1.25rem" },
              fontWeight: 700,
            }}
            aria-label={`Step number ${stepNumber}`}
          >
            {stepNumber}
          </Box>

          <Box
            sx={{
              color: TEAL_500,
              mb: { xs: 1.5, sm: 2 },
              "& svg": {
                fontSize: { xs: 28, sm: 32 },
              },
            }}
            aria-hidden="true"
          >
            {icon}
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: NAVY_800,
              fontSize: { xs: "1rem", sm: "1.125rem" },
              fontWeight: 600,
              mb: { xs: 0.75, sm: 1 },
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: NEUTRAL_600,
              fontFamily: "DM Sans, sans-serif",
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        </Box>
      </motion.div>
    );
  }
);

ProcessStepCard.displayName = "ProcessStepCard";
