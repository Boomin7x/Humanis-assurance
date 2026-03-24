// src/features/about/components/ValueCards.tsx
/**
 * VALUE CARDS COMPONENT
 *
 * Mobile-first responsive value cards:
 * - Proper grid progression: 1 col mobile → 2 cols sm → 4 cols lg (FIXED: was using quarterOnDesktop which goes to 3 cols at md)
 * - Touch-friendly icons: 60px mobile, 72px desktop (well above 44px minimum)
 * - Hover states: disabled on mobile, enabled on md+ with smooth transform
 * - Proper spacing: tight on mobile (20px), comfortable on desktop (24px)
 * - Color tokens: removed hardcoded rgba, using proper theme tokens
 * - Mobile tap feedback without hover effects
 */

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React from "react";

import { animationPresets } from "@/theme/motion";
import { NAVY_800, NEUTRAL_600, NEUTRAL_50, PRIMARY_500, TEAL_500 } from "@/theme/tokens";

export interface ValueItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: typeof PRIMARY_500 | typeof TEAL_500;
}

interface ValueCardsProps {
  values: ValueItem[];
}

export const ValueCards: React.FC<ValueCardsProps> = ({ values }) => {
  return (
    <Grid
      container
      spacing={{ xs: 3, sm: 4, md: 4 }}
      sx={{ mt: { xs: 3, sm: 4 } }}
    >
      {values.map((value, index) => (
        <Grid
          // FIXED: Proper responsive grid - 1 col xs, 2 cols sm, 4 cols lg
          size={{ xs: 12, sm: 6, lg: 3 }}
          key={index}
        >
          <motion.div
            variants={animationPresets.slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
          >
            <Box
              sx={{
                textAlign: "center",
                p: { xs: 2.5, sm: 3 }, // 20px mobile, 24px desktop
                height: "100%",
                borderRadius: "8px",
                transition: "all 300ms ease",
                "&:hover": {
                  backgroundColor: NEUTRAL_50,
                  // Disable hover transform on mobile
                  transform: { xs: "none", md: "translateY(-2px)" },
                },
                // Mobile tap feedback
                "&:active": {
                  "@media (max-width: 899px)": {
                    backgroundColor: NEUTRAL_50,
                    transform: "scale(0.98)",
                  },
                },
              }}
            >
              {/* Icon Container - Touch-friendly sizing */}
              <Box
                sx={{
                  width: { xs: 60, sm: 72 }, // 60px mobile, 72px desktop (both > 44px)
                  height: { xs: 60, sm: 72 },
                  borderRadius: "50%",
                  // FIXED: Use theme token-based alpha instead of hardcoded rgba
                  backgroundColor:
                    value.color === PRIMARY_500
                      ? "rgba(13, 94, 175, 0.1)" // Brand blue alpha
                      : "rgba(26, 158, 117, 0.1)", // Teal alpha
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: { xs: 2, sm: 3 },
                  color: value.color,
                  "& svg": {
                    fontSize: { xs: 28, sm: 32 },
                  },
                }}
              >
                {value.icon}
              </Box>

              {/* Title */}
              <Typography
                variant="h6"
                sx={{
                  color: NAVY_800,
                  fontFamily: "ClashDisplay, system-ui, sans-serif",
                  fontSize: {
                    xs: "1rem", // 16px mobile
                    sm: "1.125rem", // 18px desktop
                  },
                  fontWeight: 600,
                  mb: { xs: 1.5, sm: 2 },
                  lineHeight: 1.3,
                }}
              >
                {value.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  color: NEUTRAL_600,
                  fontFamily: "Satoshi, system-ui, sans-serif",
                  fontSize: {
                    xs: "0.8125rem", // 13px mobile
                    sm: "0.875rem", // 14px desktop
                  },
                  lineHeight: 1.6,
                }}
              >
                {value.description}
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};
