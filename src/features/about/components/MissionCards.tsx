// src/features/about/components/MissionCards.tsx
/**
 * MISSION CARDS COMPONENT
 *
 * Mobile-first responsive mission card grid:
 * - Fixed card padding: minimum 20px (was 4px/0.5 - typo)
 * - Touch-friendly icons: 48px on mobile (meets 44px minimum)
 * - Proper hover states: disabled transform on mobile, enabled on md+
 * - Responsive grid: 1 column mobile, 2 columns desktop
 * - Mobile-optimized spacing: 24px gaps on mobile, 32px on desktop
 * - Proper touch feedback without hover effects on mobile
 */

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React from "react";

import { animationPresets } from "@/theme/motion";
import { NAVY_800, NEUTRAL_600, PRIMARY_500, WHITE, BRAND_50 } from "@/theme/tokens";
import { GRID_MOBILE } from "@/theme/responsive";

export interface MissionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface MissionCardsProps {
  missions: MissionItem[];
}

export const MissionCards: React.FC<MissionCardsProps> = ({ missions }) => {
  return (
    <Grid
      container
      spacing={{ xs: 3, sm: 4, md: 4 }}
      sx={{ mt: { xs: 3, sm: 4 } }}
    >
      {missions.map((mission, index) => (
        <Grid size={GRID_MOBILE.halfOnDesktop} key={index}>
          <motion.div
            variants={animationPresets.slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              sx={{
                height: "100%",
                backgroundColor: WHITE,
                border: `1px solid rgba(13, 94, 175, 0.1)`,
                borderRadius: "8px",
                // FIXED: Proper card padding (was 0.5 = 4px, now minimum 2.5 = 20px)
                p: { xs: 0, md: 0 }, // Remove outer padding, use CardContent instead
                transition: "all 300ms ease",
                "&:hover": {
                  borderColor: PRIMARY_500,
                  borderWidth: "2px",
                  // Disable hover transform on mobile, enable on desktop
                  transform: { xs: "none", md: "translateY(-2px)" },
                  backgroundColor: BRAND_50,
                },
                // Mobile tap feedback
                "&:active": {
                  "@media (max-width: 899px)": {
                    backgroundColor: BRAND_50,
                    transform: "scale(0.98)",
                  },
                },
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 3, sm: 4 }, // 24px mobile, 32px tablet/desktop
                  "&:last-child": {
                    pb: { xs: 3, sm: 4 }, // Remove MUI's default bottom padding increase
                  },
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 2, sm: 3 }}
                  alignItems={{ xs: "center", sm: "flex-start" }}
                  textAlign={{ xs: "center", sm: "left" }}
                >
                  {/* Icon Container - Touch-friendly sizing */}
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56 }, // 48px meets 44px minimum
                      height: { xs: 48, sm: 56 },
                      borderRadius: "50%",
                      backgroundColor: `rgba(13, 94, 175, 0.1)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: PRIMARY_500,
                      "& svg": {
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      },
                    }}
                  >
                    {mission.icon}
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: NAVY_800,
                        fontFamily: "ClashDisplay, system-ui, sans-serif",
                        fontSize: {
                          xs: "1rem", // 16px mobile
                          sm: "1.125rem", // 18px tablet+
                        },
                        fontWeight: 600,
                        lineHeight: 1.3,
                        mb: { xs: 1, sm: 1.5 },
                      }}
                    >
                      {mission.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      sx={{
                        color: NEUTRAL_600,
                        fontFamily: "Satoshi, system-ui, sans-serif",
                        fontSize: {
                          xs: "0.8125rem", // 13px mobile
                          sm: "0.875rem", // 14px tablet+
                        },
                        lineHeight: 1.6,
                      }}
                    >
                      {mission.description}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};
