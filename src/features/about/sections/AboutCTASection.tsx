// src/features/about/sections/AboutCTASection.tsx
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionWrapper } from "@/components/ui";
import { animationPresets } from "@/theme/motion";
import { TOUCH_TARGETS } from "@/theme/responsive";
import { TEAL_500, WHITE } from "@/theme/tokens";

/**
 * AboutCTASection Props Interface
 */
export interface AboutCTASectionProps {
  readonly onContactClick?: () => void;
  readonly className?: string;
}

/**
 * AboutCTASection Component
 *
 * Final call-to-action section with:
 * - Centered CTA message
 * - Contact button with arrow icon
 * - Dark background with white text
 * - Animation on scroll
 */
export const AboutCTASection: React.FC<AboutCTASectionProps> = React.memo(
  ({ onContactClick, className }) => {
    const { t } = useTranslation();

    const handleContactClick = (): void => {
      if (onContactClick) {
        onContactClick();
      } else {
        window.location.href = "/contact";
      }
    };

    return (
      <SectionWrapper
        background="dark"
        paddingY="large"
        className={className}
        component="section"
        aria-label="Contact call to action"
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <motion.div
              variants={animationPresets.slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: WHITE,
                  fontFamily: "ClashDisplay, system-ui, sans-serif",
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                {t("pages.about.cta.title")}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontFamily: "Satoshi, system-ui, sans-serif",
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  lineHeight: 1.6,
                  mb: 4,
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                {t("pages.about.cta.subtitle")}
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={handleContactClick}
                sx={{
                  backgroundColor: TEAL_500,
                  color: WHITE,
                  fontFamily: "Satoshi, system-ui, sans-serif",
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: { xs: "6px", sm: "8px" },
                  minHeight: TOUCH_TARGETS.buttonComfortable,
                  py: { xs: 1.75, sm: 2 },
                  px: { xs: 3, sm: 4 },
                  minWidth: { xs: "280px", sm: "auto" },
                  "&:hover": {
                    backgroundColor: "#148560",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
                aria-label="Contact us for insurance consultation"
              >
                {t("pages.about.cta.button")}
              </Button>
            </motion.div>
          </Box>
        </Container>
      </SectionWrapper>
    );
  },
);

AboutCTASection.displayName = "AboutCTASection";
