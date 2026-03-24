// src/features/about/sections/ValuesSection.tsx
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionHeader, SectionWrapper } from "@/components/ui";
import { GRID_MOBILE } from "@/theme/responsive";

import { ValueCard } from "../components";
import { values } from "../data/values";

/**
 * ValuesSection Props Interface
 */
export interface ValuesSectionProps {
  readonly className?: string;
}

/**
 * ValuesSection Component
 *
 * Company values section with:
 * - 4 value cards (Active listening, Availability, Innovation, Commitment)
 * - Responsive grid layout
 * - Staggered animations on scroll
 */
export const ValuesSection: React.FC<ValuesSectionProps> = React.memo(
  ({ className }) => {
    const { t } = useTranslation();

    return (
      <SectionWrapper
        background="white"
        paddingY="large"
        className={className}
        component="section"
        aria-label="Our values"
      >
        <SectionHeader
          overline={t("pages.about.values.overline")}
          title="Les valeurs qui nous guident"
          align="center"
          animationDelay={0.1}
        />

        <Box
          sx={{
            mt: { xs: 3, sm: 4 },
            gap: { xs: 3, sm: 4, md: 4 },
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1,1fr)",
              md: "repeat(4,1fr)",
            },
          }}
        >
          {values.map((value, index) => (
            <Grid size={GRID_MOBILE.quarterOnDesktop} key={index}>
              <ValueCard
                title={value.title}
                description={value.description}
                icon={value.icon}
                color={value.color}
                animationDelay={index * 0.1}
              />
            </Grid>
          ))}
        </Box>
      </SectionWrapper>
    );
  },
);

ValuesSection.displayName = "ValuesSection";
