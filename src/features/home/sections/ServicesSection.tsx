// src/features/home/sections/ServicesSection.tsx
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionHeader, SectionWrapper, ServiceCard } from "@/components/ui";
import { GRID_MOBILE } from "@/theme/responsive";
import { PRIMARY_500, PRIMARY_700, WHITE } from "@/theme/tokens";
import { getImage, images } from "@/utils/imageLoader";

/**
 * Service data structure for the homepage
 */
interface ServiceData {
  readonly icon: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly href: string;
  readonly accentColor: "blue" | "teal";
  readonly photo: string;
  readonly photoAltKey: string;
}

/**
 * Homepage services data
 */
const SERVICES_DATA: readonly ServiceData[] = [
  {
    icon: "mdi:shield-check",
    titleKey: "services.brokerage.title",
    descriptionKey: "services.brokerage.description",
    href: "/services#courtage",
    accentColor: "blue",
    photo: getImage(images.office.teamAtWork, "team"),
    photoAltKey: "services.brokerage.photoAlt",
  },
  {
    icon: "mdi:chart-line",
    titleKey: "services.riskManagement.title",
    descriptionKey: "services.riskManagement.description",
    href: "/services#risk-management",
    accentColor: "teal",
    photo: getImage(images.services.businessMeeting, "business"),
    photoAltKey: "services.riskManagement.photoAlt",
  },
  {
    icon: "mdi:earth",
    titleKey: "services.international.title",
    descriptionKey: "services.international.description",
    href: "/services#international",
    accentColor: "blue",
    photo: getImage(images.services.international, "international"),
    photoAltKey: "services.international.photoAlt",
  },
] as const;

/**
 * ServicesSection Props
 */
export interface ServicesSectionProps {
  readonly onViewAllServices?: () => void;
}

/**
 * ServicesSection Component
 *
 * Overview of core insurance services:
 * - Courtage d'assurances
 * - Risk Management
 * - Programmes Internationaux
 */
export const ServicesSection: React.FC<ServicesSectionProps> = React.memo(
  ({ onViewAllServices }) => {
    const { t } = useTranslation();
    const handleViewAll = (): void => {
      if (onViewAllServices) {
        onViewAllServices();
      } else {
        window.location.href = "/services";
      }
    };

    return (
      <SectionWrapper
        id="services"
        background="alt"
        paddingY="normal"
        maxWidth={false}
        aria-label="Our insurance services"
      >
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <SectionHeader
            overline={t("sections.services.overline")}
            title={t("sections.services.title")}
            align="center"
            animationDelay={0.1}
          />

          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 4 }}
            sx={{ mt: { xs: 3, sm: 4 } }}
          >
            {SERVICES_DATA.map((service, index) => (
              <Grid key={index} size={GRID_MOBILE.thirdOnDesktop}>
                <ServiceCard
                  icon={service.icon}
                  title={t(service.titleKey)}
                  description={t(service.descriptionKey)}
                  href={service.href}
                  accentColor={service.accentColor}
                  photo={service.photo}
                  photoAlt={t(service.photoAltKey)}
                  animated
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleViewAll}
              sx={{
                backgroundColor: PRIMARY_500,
                color: WHITE,
                fontFamily: "DM Sans, sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "4px",
                py: 1.5,
                px: 4,
                "&:hover": {
                  backgroundColor: PRIMARY_700,
                },
              }}
              aria-label="View all insurance services"
            >
{t("sections.services.cta")}
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
    );
  },
);

ServicesSection.displayName = "ServicesSection";
