// src/features/home/sections/StatsSection.tsx
import { Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionWrapper, StatCard } from "@/components/ui";
import { statsData } from "@/features/home/data/stats";
import { GRID_MOBILE } from "@/theme/responsive";

/**
 * StatsSection Component
 *
 * Displays key business statistics with animated counters
 * - Social proof through client numbers
 * - Experience and credibility indicators
 * - Partner network strength
 */
export const StatsSection: React.FC = React.memo(() => {
  const { t } = useTranslation();

  return (
    <SectionWrapper
      id="stats"
      background="blue"
      paddingY="small"
      maxWidth={false}
      aria-label="Company statistics"
    >
      <Grid
        container
        sx={{ maxWidth: 1440, mx: "auto" }}
        spacing={{ xs: 2, sm: 3, md: 4 }}
      >
        {statsData.map((stat, index) => (
          <Grid key={index} size={GRID_MOBILE.quarterOnDesktop}>
            <StatCard
              number={stat.number}
              suffix={stat.suffix}
              label={t(stat.labelKey)}
              icon={stat.icon}
            />
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
});

StatsSection.displayName = "StatsSection";
