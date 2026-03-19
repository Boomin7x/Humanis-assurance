// src/features/home/sections/CTASection.tsx
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { SectionWrapper } from "@/components/ui";
import { animationPresets } from "@/theme/motion";
import { TOUCH_TARGETS } from "@/theme/responsive";
import { TEAL_500, WHITE } from "@/theme/tokens";

/**
 * CTASection Props
 */
export interface CTASectionProps {
  readonly onGetQuote?: () => void;
}

/**
 * CTASection Component
 *
 * Final conversion-optimized call-to-action:
 * - Clear value proposition (free quote)
 * - Trust reinforcement (CIMA experts, 24h response)
 * - High-contrast CTA button with phone icon
 * - Mobile-optimized touch targets
 */
export const CTASection: React.FC<CTASectionProps> = React.memo(({ onGetQuote }) => {
  const handleGetQuote = (): void => {
    if (onGetQuote) {
      onGetQuote();
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <SectionWrapper
      id="contact-cta"
      background="dark"
      paddingY="normal"
      aria-label="Get insurance quote"
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
              component="h2"
              sx={{
                color: WHITE,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                fontWeight: 700,
                lineHeight: 1.1,
                mb: { xs: 2, sm: 2 },
                textAlign: "center",
              }}
            >
              Obtenez votre devis d'assurance gratuit
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                lineHeight: 1.5,
                mb: { xs: 4, sm: 4 },
                maxWidth: { xs: "100%", sm: "480px", md: "560px" },
                mx: "auto",
                textAlign: "center",
                fontWeight: 400,
              }}
            >
              Nos experts CIMA vous accompagnent pour trouver la meilleure couverture
              adaptée à vos besoins. Réponse sous 24h garantie.
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<PhoneIcon />}
              onClick={handleGetQuote}
              sx={{
                backgroundColor: TEAL_500,
                color: WHITE,
                fontFamily: "DM Sans, sans-serif",
                fontSize: { xs: "1.125rem", sm: "1.25rem" },
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                minHeight: TOUCH_TARGETS.buttonLarge,
                py: { xs: 2.5, sm: 2.25 },
                px: { xs: 4, sm: 5 },
                minWidth: { xs: "320px", sm: "280px" },
                "&:hover": {
                  backgroundColor: "#148560",
                  transform: { xs: "none", md: "translateY(-1px)" },
                },
                "&:active": {
                  transform: "scale(0.97)",
                },
                boxShadow: "none",
                border: `2px solid ${WHITE}`,
              }}
              aria-label="Get free insurance quote"
            >
              Obtenir mon devis gratuit
            </Button>
          </motion.div>
        </Box>
      </Container>
    </SectionWrapper>
  );
});

CTASection.displayName = "CTASection";
