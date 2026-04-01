// src/features/about/sections/PageHeroSection.tsx
/**
 * ENTERPRISE-GRADE RESPONSIVE PAGE HERO SECTION
 *
 * Mobile-first responsive hero section with:
 * - Optimized for all screen sizes (320px - 1920px+)
 * - WCAG AAA touch target compliance (44px minimum)
 * - Fluid typography with clamp() for smooth scaling
 * - Mobile-optimized spacing and layout
 * - Performance optimizations for mobile devices
 * - Responsive images with lazy loading
 * - Adaptive animations (respects reduced motion)
 * - Mobile browser UI considerations (vh units)
 */

import VerifiedIcon from "@mui/icons-material/Verified";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionWrapper, TrustBadge } from "@/components/ui";
import { animationPresets } from "@/theme/motion";
import { INSURANCE_MOBILE_UX, SPACING_MOBILE } from "@/theme/responsive";
import { TEAL_500, WHITE } from "@/theme/tokens";

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PageHeroSection Props Interface
 */
export interface PageHeroSectionProps {
  readonly className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSIVE CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mobile-first responsive configuration for hero section
 */
const HERO_RESPONSIVE_CONFIG = {
  /** Section minimum height - optimized for mobile browsers */
  minHeight: {
    xs: "auto", // Mobile: auto height to prevent issues with mobile browser UI
    sm: "auto",
    md: "auto", // Desktop: auto allows content to dictate height
  },

  /** Section vertical padding - mobile first */
  sectionPadding: {
    xs: `${SPACING_MOBILE.sectionLarge.xs}px`,
    sm: `${SPACING_MOBILE.sectionLarge.sm}px`,
    md: `${SPACING_MOBILE.sectionLarge.md}px`,
    lg: `${SPACING_MOBILE.sectionLarge.lg}px`,
  },

  /** Container horizontal padding - mobile first */
  containerPadding: {
    xs: SPACING_MOBILE.gutter.xs,
    sm: SPACING_MOBILE.gutter.sm,
    md: SPACING_MOBILE.gutter.md,
    lg: 0, // Desktop: use MUI Container default
  },

  /** Content max width - mobile first */
  contentMaxWidth: {
    xs: "100%",
    sm: "90%",
    md: "800px",
  },

  /** Title font size - fluid responsive with clamp */
  titleFontSize: {
    xs: "clamp(1.75rem, 7vw + 0.5rem, 2.5rem)", // Mobile: 28px-40px
    sm: "clamp(2.25rem, 5vw + 1rem, 3rem)", // Tablet: 36px-48px
    md: "clamp(3rem, 3vw + 1.5rem, 3.75rem)", // Desktop: 48px-60px
    lg: "clamp(3.5rem, 2.5vw + 2rem, 4rem)", // Large: 56px-64px
  },

  /** Title line height - tighter on mobile for readability */
  titleLineHeight: {
    xs: 1.2, // Mobile: tighter
    sm: 1.15,
    md: 1.1, // Desktop: very tight for impact
  },

  /** Title margin bottom - mobile first */
  titleMarginBottom: {
    xs: 2, // 16px on mobile
    sm: 2.5, // 20px on tablet
    md: 3, // 24px on desktop
  },

  /** Subtitle font size - fluid responsive */
  subtitleFontSize: {
    xs: "clamp(0.9375rem, 3vw + 0.25rem, 1.0625rem)", // Mobile: 15px-17px
    sm: "clamp(1rem, 2.5vw + 0.5rem, 1.1875rem)", // Tablet: 16px-19px
    md: "clamp(1.125rem, 1.5vw + 0.75rem, 1.25rem)", // Desktop: 18px-20px
  },

  /** Subtitle line height - mobile optimized */
  subtitleLineHeight: {
    xs: 1.6, // Mobile: good readability
    sm: 1.65,
    md: 1.7, // Desktop: more spacious
  },

  /** Subtitle margin bottom - mobile first */
  subtitleMarginBottom: {
    xs: 3, // 24px on mobile
    sm: 4, // 32px on tablet
    md: 5, // 40px on desktop
  },

  /** Subtitle max width - mobile first */
  subtitleMaxWidth: {
    xs: "100%",
    sm: "90%",
    md: "600px",
  },

  /** CIMA badge padding - mobile first */
  badgePadding: {
    xs: "8px 16px",
    sm: "10px 20px",
    md: "12px 24px",
  },

  /** CIMA badge margin bottom - mobile first */
  badgeMarginBottom: {
    xs: 2, // 16px on mobile
    sm: 2.5, // 20px on tablet
    md: 3, // 24px on desktop
  },

  /** CIMA badge font size - mobile first */
  badgeFontSize: {
    xs: "0.75rem", // 12px on mobile
    sm: "0.8125rem", // 13px on tablet
    md: "0.875rem", // 14px on desktop
  },

  /** CIMA badge icon size - mobile first */
  badgeIconSize: {
    xs: 18,
    sm: 20,
    md: 22,
  },

  /** Trust badges spacing - mobile first */
  trustBadgesSpacing: {
    xs: 1.5, // 12px on mobile
    sm: 2, // 16px on tablet
    md: 2.5, // 20px on desktop
  },

  /** Trust badges top margin - mobile first */
  trustBadgesMarginTop: {
    xs: 3, // 24px on mobile
    sm: 4, // 32px on tablet
    md: 4.5, // 36px on desktop
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PageHeroSection Component
 *
 * Enterprise-grade responsive hero section optimized for all screen sizes
 * with mobile-first design approach.
 *
 * @component
 * @example
 * ```tsx
 * <PageHeroSection />
 * ```
 */
export const PageHeroSection: React.FC<PageHeroSectionProps> = React.memo(
  ({ className }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const prefersReducedMotion = useReducedMotion();

    // Responsive breakpoint detection
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    // Determine if animations should be enabled
    const enableAnimations = !prefersReducedMotion && !isMobile;

    return (
      <SectionWrapper
        background="dark"
        paddingY="large"
        className={className}
        component="section"
        aria-label="About page hero"
        data-testid="page-hero-section"
        // sx={{
        //   minHeight: HERO_RESPONSIVE_CONFIG.minHeight,
        //   display: "flex",
        //   alignItems: "center",
        //   position: "relative",
        //   overflow: "hidden",
        // }}
      >
        {/* Background Image Layer - Optional */}
        {/* <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.3,
            zIndex: 0,
          }}
          role="presentation"
          aria-hidden="true"
        >
          <HumanisImage
            src={getImage(images.office.exterior, "office")}
            alt="Immeuble Akwa où se trouve Humanis Assurances"
            overlay="navy"
            overlayOpacity={0.8}
            radius={0}
            priority
            animated={false}
          />
        </Box> */}

        {/* Content Layer */}
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            px: HERO_RESPONSIVE_CONFIG.containerPadding,
            width: "100%",
          }}
          data-testid="page-hero-content"
        >
          <motion.div
            variants={enableAnimations ? animationPresets.slideUp : undefined}
            initial={enableAnimations ? "hidden" : undefined}
            animate={enableAnimations ? "visible" : undefined}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Box
              sx={{
                textAlign: "center",
                maxWidth: HERO_RESPONSIVE_CONFIG.contentMaxWidth,
                mx: "auto",
                width: "100%",
              }}
            >
              {/* CIMA Approval Badge */}
              <Box
                component="div"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 1.25, md: 1.5 },
                  backgroundColor: "rgba(22, 163, 74, 0.15)",
                  border: {
                    xs: "1.5px solid rgba(22, 163, 74, 0.35)",
                    md: "2px solid rgba(22, 163, 74, 0.4)",
                  },
                  borderRadius: { xs: "4px", sm: "5px", md: "6px" },
                  px: HERO_RESPONSIVE_CONFIG.badgePadding,
                  mb: HERO_RESPONSIVE_CONFIG.badgeMarginBottom,
                  // Mobile touch optimization
                  WebkitTapHighlightColor: "transparent",
                  // Subtle animation
                  transition: "all 200ms ease",
                  "&:hover": {
                    backgroundColor: "rgba(22, 163, 74, 0.2)",
                    transform: isDesktop ? "scale(1.02)" : "none",
                  },
                }}
                role="banner"
                aria-label="CIMA approval certification badge"
                data-testid="page-hero-cima-badge"
              >
                <VerifiedIcon
                  sx={{
                    color: TEAL_500,
                    fontSize: HERO_RESPONSIVE_CONFIG.badgeIconSize,
                  }}
                  aria-hidden="true"
                />
                <Typography
                  component="span"
                  sx={{
                    color: WHITE,
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: HERO_RESPONSIVE_CONFIG.badgeFontSize,
                    fontWeight: { xs: 600, md: 700 },
                    letterSpacing: { xs: "0.06em", md: "0.08em" },
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
                >
                  {t('pages.about.hero.badge')}
                </Typography>
              </Box>

              {/* Main Title */}
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  color: WHITE,
                  fontSize: HERO_RESPONSIVE_CONFIG.titleFontSize,
                  fontWeight: { xs: 700, md: 700 },
                  lineHeight: HERO_RESPONSIVE_CONFIG.titleLineHeight,
                  letterSpacing: { xs: "-0.02em", md: "-0.03em" },
                  mb: HERO_RESPONSIVE_CONFIG.titleMarginBottom,
                  // Mobile text rendering optimization
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  // Prevent text overflow on small screens
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "auto",
                }}
                data-testid="page-hero-title"
              >
                {t('pages.about.hero.title')}
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h2"
                component="p"
                sx={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: HERO_RESPONSIVE_CONFIG.subtitleFontSize,
                  fontWeight: { xs: 400, md: 400 },
                  lineHeight: HERO_RESPONSIVE_CONFIG.subtitleLineHeight,
                  mb: HERO_RESPONSIVE_CONFIG.subtitleMarginBottom,
                  maxWidth: HERO_RESPONSIVE_CONFIG.subtitleMaxWidth,
                  mx: "auto",
                  // Mobile text rendering optimization
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  // Better readability on mobile
                  textRendering: "optimizeLegibility",
                }}
                data-testid="page-hero-subtitle"
              >
                {t('pages.about.hero.subtitle')}
              </Typography>

              {/* Trust Badges */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={HERO_RESPONSIVE_CONFIG.trustBadgesSpacing}
                justifyContent="center"
                alignItems="center"
                sx={{
                  mt: HERO_RESPONSIVE_CONFIG.trustBadgesMarginTop,
                  // Mobile-specific optimizations
                  width: "100%",
                  // Use flexbox gap for better spacing control
                  flexWrap: { sm: "wrap", md: "nowrap" },
                  // Ensure badges don't overflow on small screens
                  px: { xs: 0, sm: 1 },
                  ...INSURANCE_MOBILE_UX.trustBadges,
                }}
                role="region"
                aria-label="Trust and certification badges"
                data-testid="page-hero-trust-badges"
              >
                <TrustBadge
                  variant="cima-approved"
                  theme="dark"
                  size={isMobile ? "small" : "medium"}
                />
                <TrustBadge
                  variant="client-count"
                  value="500"
                  theme="dark"
                  size={isMobile ? "small" : "medium"}
                />
                <TrustBadge
                  variant="experience-years"
                  value="15"
                  theme="dark"
                  size={isMobile ? "small" : "medium"}
                />
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </SectionWrapper>
    );
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT METADATA
// ─────────────────────────────────────────────────────────────────────────────

PageHeroSection.displayName = "PageHeroSection";

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export default PageHeroSection;
