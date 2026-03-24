// src/features/about/components/AboutStats.tsx
/**
 * ABOUT PAGE STATISTICS CARDS
 *
 * Mobile-first responsive stats display:
 * - Fixed typography: minimum 12px on mobile (was 11px/0.6875rem - too small)
 * - Proper responsive grid: always 3 columns but with adjusted spacing
 * - Touch-friendly spacing with 8pt grid system
 * - Mobile: tight horizontal spacing (16px), comfortable vertical spacing (24px)
 * - Desktop: more generous spacing (24-32px)
 * - Proper text hierarchy with readable sizes at all breakpoints
 */

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

import { PRIMARY_500, NEUTRAL_600 } from "@/theme/tokens";

export interface StatItem {
  value: string;
  label: string;
}

interface AboutStatsProps {
  stats: StatItem[];
}

export const AboutStats: React.FC<AboutStatsProps> = ({ stats }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 3 }}
      sx={{ mt: { xs: 3, md: 4 } }}
    >
      {stats.map((stat, index) => (
        <Grid size={{ xs: 4 }} key={index}>
          <Box
            sx={{
              textAlign: "center",
              // Add minimum touch target height for accessibility
              minHeight: { xs: 60, sm: 72 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: { xs: 0.5, sm: 1 }, // Prevent overflow on very small screens
            }}
          >
            {/* Stat Value - Properly scaled */}
            <Typography
              variant="h4"
              sx={{
                color: PRIMARY_500,
                fontFamily: "ClashDisplay, system-ui, sans-serif",
                fontSize: {
                  xs: "1.5rem", // 24px mobile
                  sm: "1.75rem", // 28px tablet
                  md: "2rem", // 32px desktop
                },
                fontWeight: 700,
                lineHeight: 1,
                mb: { xs: 0.75, sm: 1, md: 1 },
              }}
            >
              {stat.value}
            </Typography>

            {/* Stat Label - Fixed minimum size for readability */}
            <Typography
              variant="caption"
              sx={{
                color: NEUTRAL_600,
                fontFamily: "Satoshi, system-ui, sans-serif",
                fontSize: {
                  xs: "0.75rem", // 12px mobile (FIXED: was 11px)
                  sm: "0.8125rem", // 13px tablet
                  md: "0.875rem", // 14px desktop
                },
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                lineHeight: 1.4, // Better line height for multi-line labels
                display: "block",
                // Prevent orphans and improve wrapping
                overflow: "visible",
                wordBreak: "break-word",
                hyphens: "auto",
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
