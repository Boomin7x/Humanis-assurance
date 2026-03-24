// src/features/about/components/MissionCard.tsx
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { animationPresets } from "@/theme/motion";
import {
  BRAND_50,
  NAVY_800,
  NEUTRAL_600,
  PRIMARY_500,
  WHITE,
} from "@/theme/tokens";

/**
 * MissionCard Props Interface
 */
export interface MissionCardProps {
  readonly title: string;
  readonly description: string;
  readonly icon: React.ReactElement;
  readonly animationDelay?: number;
}

/**
 * MissionCard Component
 *
 * Displays a company mission with icon, title, and description.
 * Features hover effects and responsive layout.
 */
export const MissionCard: React.FC<MissionCardProps> = React.memo(
  ({ title, description, icon, animationDelay = 0 }) => {
    return (
      <motion.div
        variants={animationPresets.slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: animationDelay }}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Card
          component="article"
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: WHITE,
            border: `1px solid rgba(13, 94, 175, 0.1)`,
            borderRadius: "8px",
            p: 0,
            transition: "all 300ms ease",
            "&:hover": {
              borderColor: PRIMARY_500,
              borderWidth: "2px",
              transform: { xs: "none", md: "translateY(-2px)" },
              backgroundColor: BRAND_50,
            },
            "&:active": {
              "@media (max-width: 899px)": {
                backgroundColor: BRAND_50,
                transform: "scale(0.98)",
              },
            },
          }}
          aria-label={`Mission: ${title}`}
        >
          <CardContent
            sx={{
              p: { xs: 3, sm: 4 },
              "&:last-child": {
                pb: { xs: 3, sm: 4 },
              },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 3 }}
              alignItems={{ xs: "center", sm: "flex-start" }}
              textAlign={{ xs: "center", sm: "left" }}
            >
              <Box
                sx={{
                  width: { xs: 48, sm: 56 },
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
                aria-hidden="true"
              >
                {icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: NAVY_800,
                    fontFamily: "ClashDisplay, system-ui, sans-serif",
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    fontWeight: 600,
                    lineHeight: 1.3,
                    mb: { xs: 1, sm: 1.5 },
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
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    );
  },
);

MissionCard.displayName = "MissionCard";
