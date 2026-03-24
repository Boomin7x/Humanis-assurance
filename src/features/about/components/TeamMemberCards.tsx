// src/features/about/components/TeamMemberCards.tsx
/**
 * TEAM MEMBER CARDS COMPONENT
 *
 * Mobile-first responsive team member grid:
 * - Proper grid progression: 1 col xs → 2 cols sm → 3 cols md → 4 cols lg
 * - FIXED: was using quarterOnDesktop which only goes to 3 cols at md
 * - Touch-friendly cards with proper hover states disabled on mobile
 * - Image aspect ratio 1:1 for consistency
 * - Proper spacing: 24px mobile, 32px desktop
 * - Badge overflow handling with flexWrap for mobile
 * - Mobile tap feedback without hover lift effect
 */

import { Card, CardContent, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React from "react";

import { Badge, HumanisImage } from "@/components/ui";
import { animationPresets } from "@/theme/motion";
import {
  BRAND_50,
  NAVY_800,
  NEUTRAL_500,
  NEUTRAL_600,
  PRIMARY_500,
  WHITE,
} from "@/theme/tokens";
import { getImage } from "@/utils/imageLoader";
import type { TeamMember } from "../data/teamMembers";

interface TeamMemberCardsProps {
  members: TeamMember[];
}

export const TeamMemberCards: React.FC<TeamMemberCardsProps> = ({
  members,
}) => {
  return (
    <Grid
      container
      spacing={{ xs: 3, sm: 4, md: 4 }}
      sx={{ mt: { xs: 3, sm: 4 } }}
    >
      {members.map((member, index) => (
        <Grid
          // FIXED: Proper responsive grid - 1 col xs, 2 cols sm, 3 cols md, 4 cols lg
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          key={index}
        >
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
                overflow: "hidden",
                transition: "all 300ms ease",
                "&:hover": {
                  // Disable hover transform on mobile
                  transform: { xs: "none", md: "translateY(-4px)" },
                  borderColor: PRIMARY_500,
                  borderWidth: "2px",
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
              {/* Member Photo - 1:1 aspect ratio for consistency */}
              <HumanisImage
                src={getImage(member.image, "team")}
                alt={`${member.name}, ${member.position} chez Humanis Assurances`}
                ratio="1/1"
                radius={0}
              />

              <CardContent
                sx={{
                  p: { xs: 2.5, sm: 3 }, // 20px mobile, 24px desktop
                  "&:last-child": {
                    pb: { xs: 2.5, sm: 3 },
                  },
                }}
              >
                {/* Name & Years of Experience */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ mb: 0.5 }}
                >
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
                      lineHeight: 1.2,
                    }}
                  >
                    {member.name}
                  </Typography>
                  {member.yearsExperience && (
                    <Badge variant="green" size="small">
                      {member.yearsExperience}
                    </Badge>
                  )}
                </Stack>

                {/* Position */}
                <Typography
                  sx={{
                    color: PRIMARY_500,
                    fontFamily: "Satoshi, system-ui, sans-serif",
                    fontSize: {
                      xs: "0.8125rem", // 13px mobile
                      sm: "0.875rem", // 14px desktop
                    },
                    fontWeight: 600,
                    mb: member.credentials ? 0.75 : { xs: 1.5, sm: 2 },
                  }}
                >
                  {member.position}
                </Typography>

                {/* Professional Credentials */}
                {member.credentials && (
                  <Typography
                    sx={{
                      color: NEUTRAL_500,
                      fontFamily: "Satoshi, system-ui, sans-serif",
                      fontSize: {
                        xs: "0.75rem", // 12px mobile
                        sm: "0.8125rem", // 13px desktop
                      },
                      fontWeight: 500,
                      mb: { xs: 1.5, sm: 2 },
                      fontStyle: "italic",
                    }}
                  >
                    {member.credentials}
                  </Typography>
                )}

                {/* Enhanced Description */}
                <Typography
                  sx={{
                    color: NEUTRAL_600,
                    fontFamily: "Satoshi, system-ui, sans-serif",
                    fontSize: {
                      xs: "0.8125rem", // 13px mobile
                      sm: "0.875rem", // 14px desktop
                    },
                    lineHeight: 1.6,
                    mb: { xs: 2, sm: 2.5 },
                  }}
                >
                  {member.description}
                </Typography>

                {/* Specialties - Proper mobile wrapping */}
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  gap={1}
                  sx={{
                    // Ensure proper wrapping on mobile
                    "& > *": {
                      flexShrink: 0,
                    },
                  }}
                >
                  {member.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="blue" size="small">
                      {specialty}
                    </Badge>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};
