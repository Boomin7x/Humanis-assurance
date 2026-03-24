// src/features/about/sections/MissionsSection.tsx
import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionHeader, SectionWrapper } from "@/components/ui";

import { MissionCard } from "../components";
import { missions } from "../data/missions";

/**
 * MissionsSection Props Interface
 */
export interface MissionsSectionProps {
  readonly className?: string;
}

/**
 * MissionsSection Component
 *
 * Company missions section with:
 * - 4 mission cards (Protection, Growth, Expertise, Risk Management)
 * - Responsive grid layout
 * - Staggered animations on scroll
 */
export const MissionsSection: React.FC<MissionsSectionProps> = React.memo(
  ({ className }) => {
    const { t } = useTranslation();

    return (
      <SectionWrapper
        background="alt"
        paddingY="large"
        className={className}
        component="section"
        aria-label="Our missions"
      >
        <SectionHeader
          overline={t("pages.about.missions.overline")}
          title="Notre mission au service de l'économie camerounaise"
          align="center"
          animationDelay={0.1}
        />

        <Box
          sx={{
            mt: { xs: 3, sm: 4 },
            display: "grid",
            gap: { xs: 3, sm: 4, md: 4 },
            gridTemplateColumns: { xs: "repeat(1,1fr)", md: "repeat(2,1fr)" },
          }}
        >
          {missions.map((mission, index) => (
            <Box
              sx={{
                height: "100%",
                width: "100%",
              }}
              key={index}
            >
              <MissionCard
                title={mission.title}
                description={mission.description}
                icon={mission.icon}
                animationDelay={index * 0.1}
              />
            </Box>
          ))}
        </Box>
      </SectionWrapper>
    );
  },
);

MissionsSection.displayName = "MissionsSection";
