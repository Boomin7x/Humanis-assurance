// src/features/services/sections/PageHeroSection.tsx
/**
 * ENTERPRISE-GRADE SERVICES PAGE HERO SECTION
 *
 * Mobile-first responsive hero section with:
 * - Optimized for all screen sizes (320px - 1920px+)
 * - WCAG AAA touch target compliance (44px minimum)
 * - Fluid typography with clamp() for smooth scaling
 * - Mobile-optimized spacing and layout
 * - Performance optimizations for mobile devices
 * - Responsive images with lazy loading
 * - Adaptive animations (respects reduced motion)
 */

import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

import { HumanisImage } from "@/components/ui";
import { images } from "@/utils/imageLoader";
import type { SectionProps } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSIVE CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

const HERO_CONFIG = {
  height: {
    xs: "360px",
    sm: "380px",
    md: "400px",
  },
  titleSize: {
    xs: "2rem", // 32px
    md: "3rem", // 48px
  },
  subtitleSize: {
    xs: "1.125rem", // 18px
    md: "1.375rem", // 22px
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PageHeroSection Component
 *
 * Hero section for the Services page with background image, breadcrumbs,
 * and page title.
 *
 * @component
 * @example
 * ```tsx
 * <PageHeroSection />
 * ```
 */
export const PageHeroSection: React.FC<SectionProps> = React.memo(
  ({ className }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const prefersReducedMotion = useReducedMotion();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const enableAnimations = !prefersReducedMotion && !isMobile;

    return (
      <Box
        component="section"
        className={className}
        aria-label="Services page hero"
        data-testid="services-page-hero"
        sx={{
          position: "relative",
          height: HERO_CONFIG.height,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Hero Background Image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
          role="presentation"
          aria-hidden="true"
        >
          <HumanisImage
            src={images.office.teamAtWork}
            alt="Équipe Humanis Assurances au travail"
            ratio="16/9"
            overlay="navy"
            overlayOpacity={0.78}
            priority
            radius={0}
          />
        </Box>

        {/* Hero Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
            animate={enableAnimations ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6 }}
          >
            <Stack spacing={3} alignItems="center" textAlign="center">
              {/* Breadcrumb Navigation */}
              <Breadcrumbs
                aria-label="breadcrumb"
                data-testid="services-breadcrumbs"
                sx={{
                  "& .MuiBreadcrumbs-separator": {
                    color: "rgba(255, 255, 255, 0.6)",
                  },
                }}
              >
                <Link
                  color="inherit"
                  href="/"
                  underline="hover"
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    transition: "color 200ms ease",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                  aria-label="Retour à l'accueil"
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  {t('common.home')}
                </Link>
                <Typography
                  color="white"
                  sx={{ fontWeight: 500 }}
                  aria-current="page"
                >
                  {t('pages.services.hero.breadcrumb')}
                </Typography>
              </Breadcrumbs>

              {/* H1 Title */}
              <Typography
                variant="h1"
                component="h1"
                data-testid="services-hero-title"
                sx={{
                  color: "white",
                  fontSize: HERO_CONFIG.titleSize,
                  fontWeight: 700,
                  textAlign: "center",
                  letterSpacing: "-0.02em",
                }}
              >
                {t('pages.services.hero.title')}
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h2"
                component="p"
                data-testid="services-hero-subtitle"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: HERO_CONFIG.subtitleSize,
                  fontWeight: 400,
                  textAlign: "center",
                  maxWidth: "600px",
                }}
              >
                {t('pages.services.hero.subtitle')}
              </Typography>
            </Stack>
          </motion.div>
        </Container>
      </Box>
    );
  },
);

PageHeroSection.displayName = "PageHeroSection";

export default PageHeroSection;
