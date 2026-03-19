// src/features/home/sections/ServicesSection.tsx
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";

import { SectionHeader, SectionWrapper, ServiceCard } from "@/components/ui";
import { GRID_MOBILE } from "@/theme/responsive";
import { PRIMARY_500, PRIMARY_700, WHITE } from "@/theme/tokens";
import { getImage, images } from "@/utils/imageLoader";

/**
 * Service data structure for the homepage
 */
interface ServiceData {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly accentColor: "blue" | "teal";
  readonly photo: string;
  readonly photoAlt: string;
}

/**
 * Homepage services data
 */
const SERVICES_DATA: readonly ServiceData[] = [
  {
    icon: "mdi:shield-check",
    title: "Courtage d'assurances",
    description:
      "Accompagnement personnalisé pour trouver les meilleures couvertures adaptées à vos besoins spécifiques. Audit, conseil et gestion de vos contrats.",
    href: "/services#courtage",
    accentColor: "blue",
    photo: getImage(images.office.teamAtWork, "team"),
    photoAlt: "Équipe Humanis Assurances - Experts en courtage",
  },
  {
    icon: "mdi:chart-line",
    title: "Risk Management",
    description:
      "Analyse et gestion proactive des risques pour protéger vos actifs et optimiser vos coûts d'assurance. Identification et maîtrise des risques.",
    href: "/services#risk-management",
    accentColor: "teal",
    photo: getImage(images.services.businessMeeting, "business"),
    photoAlt: "Consultation risk management - Analyse des risques",
  },
  {
    icon: "mdi:earth",
    title: "Programmes Internationaux",
    description:
      "Solutions d'assurance globales pour les entreprises opérant à l'international et leurs expatriés. Couverture mondiale adaptée.",
    href: "/services#international",
    accentColor: "blue",
    photo: getImage(images.services.international, "international"),
    photoAlt: "Programmes internationaux - Couverture mondiale",
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
            overline="Nos services"
            title="Solutions d'assurance complètes"
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
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  accentColor={service.accentColor}
                  photo={service.photo}
                  photoAlt={service.photoAlt}
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
              Découvrir tous nos services
            </Button>
          </Box>
        </Container>
      </SectionWrapper>
    );
  },
);

ServicesSection.displayName = "ServicesSection";
