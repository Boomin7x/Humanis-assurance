// src/features/about/components/AboutHero.tsx
/**
 * ABOUT PAGE HERO SECTION
 *
 * Mobile-first responsive hero with:
 * - Fluid typography using clamp() for seamless scaling
 * - Mobile-optimized background image overlay (0.85 opacity on mobile, 0.8 on desktop)
 * - Trust badges with proper mobile stacking (vertical on xs, horizontal on sm+)
 * - Proper touch-friendly spacing using 8pt grid
 * - Responsive container padding for edge-to-edge mobile experience
 */

import { Box, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { HumanisImage, TrustBadge, SectionWrapper } from "@/components/ui";
import { animationPresets } from "@/theme/motion";
import { TEAL_500, WHITE } from "@/theme/tokens";
import { INSURANCE_MOBILE_UX } from "@/theme/responsive";
import { getImage, images } from "@/utils/imageLoader";

interface AboutHeroProps {
  breadcrumb: string;
  title: string;
  subtitle: string;
}

export const AboutHero: React.FC<AboutHeroProps> = ({
  breadcrumb,
  title,
  subtitle,
}) => {
  return (
    <SectionWrapper background="dark" paddingY="large">
      {/* Background Image - Mobile-optimized overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          zIndex: 0,
        }}
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
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 0 },
        }}
      >
        <motion.div
          variants={animationPresets.slideUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              textAlign: "center",
              maxWidth: { xs: "100%", sm: "700px", md: "800px" },
              mx: "auto",
            }}
          >
            {/* Breadcrumb - Mobile-optimized sizing */}
            <Typography
              variant="overline"
              sx={{
                color: TEAL_500,
                fontFamily: "DM Sans, sans-serif",
                fontSize: { xs: "0.8125rem", sm: "0.875rem" }, // 13px mobile, 14px desktop
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                mb: { xs: 1.5, sm: 2 },
                display: "block",
              }}
            >
              {breadcrumb}
            </Typography>

            {/* Title - Fluid typography with proper mobile scaling */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: WHITE,
                fontSize: {
                  xs: "clamp(1.75rem, 8vw, 2.5rem)", // 28-40px mobile
                  sm: "clamp(2.25rem, 6vw, 3rem)", // 36-48px mobile landscape
                  md: "clamp(3rem, 4vw, 3.75rem)", // 48-60px desktop
                },
                fontWeight: 700,
                lineHeight: { xs: 1.2, md: 1.1 },
                letterSpacing: "-0.03em",
                mb: { xs: 2, sm: 3 },
              }}
            >
              {title}
            </Typography>

            {/* Subtitle - Mobile-optimized readability */}
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255, 255, 255, 0.85)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: {
                  xs: "1rem", // 16px minimum for mobile readability
                  sm: "1.125rem", // 18px tablet
                  md: "1.25rem", // 20px desktop
                },
                fontWeight: 400,
                lineHeight: { xs: 1.5, md: 1.6 },
                mb: { xs: 3, sm: 4 },
                maxWidth: { xs: "100%", sm: "500px", md: "600px" },
                mx: "auto",
              }}
            >
              {subtitle}
            </Typography>

            {/* Trust Badges - Vertical on mobile, horizontal on tablet+ */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 3 }}
              justifyContent="center"
              alignItems="center"
              sx={{
                mt: { xs: 3, sm: 4 },
                ...INSURANCE_MOBILE_UX.trustBadges,
              }}
            >
              <TrustBadge variant="cima-approved" theme="dark" size="medium" />
              <TrustBadge
                variant="client-count"
                value="500"
                theme="dark"
                size="medium"
              />
              <TrustBadge
                variant="experience-years"
                value="15"
                theme="dark"
                size="medium"
              />
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
};
