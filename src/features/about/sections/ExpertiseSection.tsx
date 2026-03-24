// src/features/about/sections/ExpertiseSection.tsx
import VerifiedIcon from "@mui/icons-material/Verified";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { useTranslation } from "react-i18next";

import { HumanisImage, SectionHeader, SectionWrapper } from "@/components/ui";
import { NEUTRAL_600, TEAL_500 } from "@/theme/tokens";
import { getImage, images } from "@/utils/imageLoader";

import { expertiseItems } from "../data/expertise";

/**
 * ExpertiseSection Props Interface
 */
export interface ExpertiseSectionProps {
  readonly className?: string;
}

/**
 * ExpertiseSection Component
 *
 * Company expertise section with:
 * - List of 5 expertise areas with checkmark icons
 * - Client consultation image
 * - Responsive two-column layout
 */
export const ExpertiseSection: React.FC<ExpertiseSectionProps> = React.memo(
  ({ className }) => {
    const { t } = useTranslation();

    return (
      <SectionWrapper
        background="alt"
        paddingY="large"
        className={className}
        component="section"
        aria-label="Our expertise"
      >
        <Box
          sx={{
            px: { xs: 0, md: 3 },
            gap: 6,
            display: "grid",
            gridTemplateColumns: { sm: "repeat(1,1fr)", md: "repeat(2,1fr)" },
          }}
          alignItems="stretch"
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionHeader
              title={t("pages.about.expertise.title")}
              overline={t("pages.about.expertise.since")}
            />

            <Stack spacing={3} sx={{ mt: 4 }} component="ul" role="list">
              {expertiseItems.map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  component="li"
                  sx={{ listStyle: "none" }}
                >
                  <VerifiedIcon
                    sx={{ color: TEAL_500, fontSize: 24 }}
                    aria-hidden="true"
                  />
                  <Typography
                    sx={{
                      color: NEUTRAL_600,
                      fontFamily: "Satoshi, system-ui, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            position={"relative"}
            sx={{
              width: "100%",
              height: "100%",
              aspectRatio: "4/3",
              zIndex: 100,
              position: "relative",
            }}
          >
            <HumanisImage
              src={getImage(images.clients.consultation, "consultation")}
              alt="Consultation client chez Humanis Assurances"
              ratio="4/3"
              radius={8}
            />
          </Grid>
        </Box>
      </SectionWrapper>
    );
  },
);

ExpertiseSection.displayName = "ExpertiseSection";
