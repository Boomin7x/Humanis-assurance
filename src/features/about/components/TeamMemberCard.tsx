// src/features/about/components/TeamMemberCard.tsx
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { Badge, HumanisImage } from "@/components/ui";
import { animationPresets } from "@/theme/motion";
import {
  BRAND_50,
  NAVY_800,
  NEUTRAL_600,
  PRIMARY_500,
  WHITE,
} from "@/theme/tokens";
import { getImage } from "@/utils/imageLoader";

/**
 * TeamMemberCard Props Interface
 */
export interface TeamMemberCardProps {
  readonly name: string;
  readonly position: string;
  readonly credentials: string;
  readonly description: string;
  readonly image: string;
  readonly specialties: readonly string[];
  readonly yearsExperience: string;
  readonly animationDelay?: number;
}

/**
 * TeamMemberCard Component
 *
 * Displays a team member with photo, name, position, description,
 * and specialty badges. Features hover effects and responsive layout.
 */
export const TeamMemberCard: React.FC<TeamMemberCardProps> = React.memo(
  ({
    name,
    position,
    description,
    image,
    yearsExperience,
    animationDelay = 0,
  }) => {
    return (
      <motion.div
        variants={animationPresets.slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: animationDelay }}
      >
        <Card
          component="article"
          sx={{
            height: "100%",
            backgroundColor: WHITE,
            border: `1px solid rgba(13, 94, 175, 0.1)`,
            borderRadius: "8px",
            overflow: "hidden",
            transition: "all 300ms ease",
            position: "relative",
            "&:hover": {
              transform: { xs: "none", md: "translateY(-4px)" },
              borderColor: PRIMARY_500,
              borderWidth: "2px",
              backgroundColor: BRAND_50,
            },
          }}
          aria-label={`Team member: ${name}, ${position}`}
        >
          <Box
            width={"100%"}
            sx={{
              aspectRatio: "1/1",
            }}
            position={"relative"}
          >
            <HumanisImage
              src={getImage(image, "team")}
              alt={`${name}, ${position} chez Humanis Assurances`}
              ratio="1/1"
              radius={0}
            />
          </Box>

          <CardContent
            sx={{
              // Reduced padding for mobile to prevent text overflow
              p: { xs: 1.5, sm: 2.5, md: 3 },
              // Ensure the content doesn't add extra bottom padding
              "&:last-child": { pb: { xs: 1.5, sm: 2.5, md: 3 } },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }} // Stack name/badge vertically on small mobile
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              sx={{ mb: 0.5 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: NAVY_800,
                  fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Scale down font
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {name}
              </Typography>

              {/* Hide description on mobile? Or keep it very short */}
              <Box sx={{ mt: { xs: 0.5, sm: 0 } }}>
                <Badge variant="green" size="small">
                  {yearsExperience}
                </Badge>
              </Box>
            </Stack>

            {/* Reduce bottom margins for mobile */}
            <Typography
              sx={{
                color: PRIMARY_500,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              {position}
            </Typography>

            {/* OPTIONAL: Truncate description on mobile to keep card heights consistent */}
            <Typography
              sx={{
                color: NEUTRAL_600,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                lineHeight: 1.5,
                mb: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: { xs: 2, sm: "none" }, // Only 2 lines on mobile
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    );
  },
);

TeamMemberCard.displayName = "TeamMemberCard";
