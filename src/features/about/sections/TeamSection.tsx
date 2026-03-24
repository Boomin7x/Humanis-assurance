// src/features/about/sections/TeamSection.tsx
import Grid from "@mui/material/Grid";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionHeader, SectionWrapper } from "@/components/ui";
import { GRID_MOBILE } from "@/theme/responsive";

import { TeamMemberCard } from "../components";
import { teamMembers } from "../data/teamMembers";
import { Box } from "@mui/material";

/**
 * TeamSection Props Interface
 */
export interface TeamSectionProps {
  readonly className?: string;
}

/**
 * TeamSection Component
 *
 * Team members section with:
 * - 4 team member cards with photos, roles, and specialties
 * - Responsive grid layout
 * - Staggered animations on scroll
 */
export const TeamSection: React.FC<TeamSectionProps> = React.memo(
  ({ className }) => {
    const { t } = useTranslation();

    return (
      <SectionWrapper
        background="white"
        paddingY="large"
        className={className}
        component="section"
        aria-label="Our team"
      >
        <SectionHeader
          overline={t("pages.about.team.overline")}
          title={t("pages.about.team.title")}
          align="center"
          animationDelay={0.1}
        />

        <Box
          sx={{
            mt: { xs: 3, sm: 4 },
            gap: { xs: 3, sm: 4 },
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1,1fr)", md: "repeat(2,1fr)" },
          }}
        >
          {teamMembers.map((member, index) => (
            <Grid size={GRID_MOBILE.quarterOnDesktop} key={index}>
              <TeamMemberCard
                name={member.name}
                position={member.position}
                credentials={member.credentials}
                description={member.description}
                image={member.image}
                specialties={member.specialties}
                yearsExperience={member.yearsExperience}
                animationDelay={index * 0.1}
              />
            </Grid>
          ))}
        </Box>
      </SectionWrapper>
    );
  },
);

TeamSection.displayName = "TeamSection";
