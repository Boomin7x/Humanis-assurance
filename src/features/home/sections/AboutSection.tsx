// src/features/home/sections/AboutSection.tsx
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { HumanisImage, SectionHeader, SectionWrapper } from "@/components/ui";
import { TOUCH_TARGETS } from "@/theme/responsive";
import {
  BRAND_100,
  BRAND_300,
  BRAND_500,
  BRAND_700,
  GLASS_NAVY_04,
  NEUTRAL_700,
  PRIMARY_500,
  PRIMARY_700,
  TEAL_500,
} from "@/theme/tokens";
import { getImage, images } from "@/utils/imageLoader";

/**
 * Credibility indicator data structure
 */
interface CredibilityIndicator {
  readonly textKey: string;
  readonly highlighted: boolean;
}

/**
 * Credibility indicators data
 */
const CREDIBILITY_INDICATORS: readonly CredibilityIndicator[] = [
  {
    textKey: "about.credibility.certified",
    highlighted: true,
  },
  {
    textKey: "about.credibility.clients",
    highlighted: false,
  },
  {
    textKey: "about.credibility.partners",
    highlighted: false,
  },
] as const;

/**
 * AboutSection Props
 */
export interface AboutSectionProps {
  readonly onLearnMore?: () => void;
}

/**
 * AboutSection Component
 *
 * Establishes credibility and authority:
 * - CIMA accreditation highlighting
 * - Client and partner metrics
 * - Office imagery for trust-building
 */
export const AboutSection: React.FC<AboutSectionProps> = React.memo(
  ({ onLearnMore }) => {
    const { t } = useTranslation();
    const handleLearnMore = (): void => {
      if (onLearnMore) {
        onLearnMore();
      } else {
        window.location.href = "/a-propos";
      }
    };

    return (
      <SectionWrapper
        background="white"
        paddingY="normal"
        maxWidth={false}
        aria-label="About Humanis Assurances"
      >
        <Container
          maxWidth={false}
          sx={{ position: "relative", maxWidth: 1440 }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 1 }}>
              <SectionHeader
                overline={t("sections.about.overline")}
                title={t("sections.about.title")}
                subtitle={t("about.subtitle")}
                align="left"
              />

              <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ mt: { xs: 3, md: 4 } }}>
                {CREDIBILITY_INDICATORS.map((indicator, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent={{ xs: "center", md: "flex-start" }}
                    sx={
                      indicator.highlighted
                        ? {
                            backgroundColor: BRAND_100,
                            borderRadius: "8px",
                            p: { xs: 1.5, md: 2 },
                            border: `1px solid ${BRAND_300}`,
                          }
                        : undefined
                    }
                  >
                    <CheckCircleIcon
                      sx={{
                        color: indicator.highlighted ? BRAND_500 : TEAL_500,
                        fontSize: { xs: 20, md: 24 },
                      }}
                      aria-hidden="true"
                    />
                    <Typography
                      sx={{
                        color: indicator.highlighted ? BRAND_700 : NEUTRAL_700,
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        fontWeight: indicator.highlighted ? 600 : 500,
                      }}
                    >
{t(indicator.textKey)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Box
                sx={{
                  textAlign: "center",
                  "@media (min-width: 900px)": {
                    textAlign: "left",
                  },
                  mt: { xs: 3, md: 4 },
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleLearnMore}
                  sx={{
                    borderColor: PRIMARY_500,
                    color: PRIMARY_500,
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "6px",
                    minHeight: TOUCH_TARGETS.buttonMinHeight,
                    py: { xs: 1.25, md: 1.5 },
                    px: { xs: 3, md: 4 },
                    "&:hover": {
                      borderColor: PRIMARY_700,
                      backgroundColor: GLASS_NAVY_04,
                    },
                  }}
                  aria-label="Learn more about Humanis Assurances"
                >
{t("sections.about.cta")}
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 2 }}>
              <HumanisImage
                src={getImage(images.office.exterior, "office")}
alt={t("about.officeImageAlt")}
                ratio="4/3"
                radius={8}
              />
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>
    );
  },
);

AboutSection.displayName = "AboutSection";
