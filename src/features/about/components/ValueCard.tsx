// src/features/about/components/ValueCard.tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { animationPresets } from "@/theme/motion";
import { NAVY_800, NEUTRAL_50, NEUTRAL_600, PRIMARY_500 } from "@/theme/tokens";

/**
 * ValueCard Props Interface
 */
export interface ValueCardProps {
  readonly title: string;
  readonly description: string;
  readonly icon: React.ReactElement;
  readonly color: string;
  readonly animationDelay?: number;
}

/**
 * ValueCard Component
 *
 * Displays a company value with icon, title, and description.
 * Features centered layout with color-coded icons.
 */
export const ValueCard: React.FC<ValueCardProps> = React.memo(
  ({ title, description, icon, color, animationDelay = 0 }) => {
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
            p: { xs: 2.5, sm: 3 },
            height: "100%",
            borderRadius: "8px",
            transition: "all 300ms ease",
            "&:hover": {
              backgroundColor: NEUTRAL_50,
              transform: { xs: "none", md: "translateY(-2px)" },
            },
          }}
          aria-label={`Value: ${title}`}
        >
          <Box
            sx={{
              width: { xs: 60, sm: 72 },
              height: { xs: 60, sm: 72 },
              borderRadius: "50%",
              backgroundColor: `rgba(${color === PRIMARY_500 ? "13, 94, 175" : "26, 158, 117"}, 0.1)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: { xs: 2, sm: 3 },
              color: color,
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
              fontFamily: "ClashDisplay, system-ui, sans-serif",
              fontSize: { xs: "1rem", sm: "1.125rem" },
              fontWeight: 600,
              mb: { xs: 1.5, sm: 2 },
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: NEUTRAL_600,
              fontFamily: "Satoshi, system-ui, sans-serif",
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

ValueCard.displayName = "ValueCard";
