// src/components/ui/PartnerLogos.tsx
/**
 * PARTNER LOGOS COMPONENT
 *
 * Insurance Partner Showcase
 *
 * Features:
 * - Grayscale to color hover effects
 * - Responsive logo grid
 * - Insurance company logos integration
 * - Professional partner presentation
 * - Accessibility compliance
 * - Loading states and error handling
 *
 * Design Intent:
 * - Showcase trusted insurance partners
 * - Build credibility through association
 * - Professional presentation following insurance standards
 * - Subtle interactions that don't distract from content
 */

import React from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

import HumanisImage from "@/components/ui/HumanisImage";
import { images } from "@/utils/imageLoader";
import { NEUTRAL_600, NEUTRAL_400, NEUTRAL_200, WHITE } from "@/theme/tokens";
import { staggerContainer, staggerItem } from "@/theme/motion";
import { RADIUS } from "@/constants/layout";

interface PartnerLogo {
  /** Partner company name */
  name: string;
  /** Logo image source */
  src: string;
  /** Partner website URL (optional) */
  website?: string;
  /** Partner description for accessibility */
  description?: string;
}

interface PartnerLogosProps {
  /** Partner logos data */
  partners?: PartnerLogo[];
  /** Layout variant */
  variant?: "grid" | "horizontal" | "stack";
  /** Show partner names */
  showNames?: boolean;
  /** Maximum logos per row (grid variant) */
  maxPerRow?: number;
  /** Enable animations */
  animated?: boolean;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

// Default partner data from the insurance plan
const defaultPartners: PartnerLogo[] = [
  {
    name: "Sanlam",
    src: images.partners.sanlam,
    description: "Sanlam - Partenaire assurance vie et épargne",
    website: "https://sanlam.co.za",
  },
  {
    name: "Activa",
    src: images.partners.activa,
    description: "Activa Assurances - Solutions professionnelles",
    website: "https://activa-assurances.com",
  },
  {
    name: "Allianz",
    src: images.partners.allianz,
    description: "Allianz - Leader mondial de l'assurance",
    website: "https://allianz.com",
  },
  {
    name: "AXA",
    src: images.partners.axa,
    description: "AXA - Protection et accompagnement",
    website: "https://axa.com",
  },
  {
    name: "NSIA",
    src: images.partners.nsia,
    description: "NSIA Assurances - Expertise africaine",
    website: "https://nsia.com",
  },
  {
    name: "Chanas",
    src: images.partners.chanas,
    description: "Chanas Assurances - Partenaire local",
    website: "https://chanas-assurances.com",
  },
];

const PartnerLogos: React.FC<PartnerLogosProps> = ({
  partners = defaultPartners,
  variant = "grid",
  showNames = true,
  maxPerRow = 3,
  animated = true,
  title,
  subtitle,
}) => {
  const MotionBox = animated ? motion.div : Box;

  const renderLogo = (partner: PartnerLogo) => {
    console.log({ partner });
    const logoElement = (
      <MotionBox
        key={partner.name}
        {...(animated && {
          variants: staggerItem,
          whileHover: {
            scale: 1.02,
            transition: { duration: 0.2 },
          },
        })}
      >
        <Box
          component={partner.website ? "a" : "div"}
          href={partner.website}
          target={partner.website ? "_blank" : undefined}
          rel={partner.website ? "noopener noreferrer" : undefined}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 3,
            backgroundColor: WHITE,
            border: `1px solid ${NEUTRAL_200}`,
            borderRadius: RADIUS.md / 8,
            textDecoration: "none",
            cursor: partner.website ? "pointer" : "default",
            transition: "all 300ms ease",

            "&:hover": {
              borderColor: NEUTRAL_400,
              backgroundColor: "rgba(255,255,255,0.8)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              ...(partner.website && {
                transform: "translateY(-2px)",
              }),
            },
          }}
          aria-label={`Partenaire ${partner.name}: ${partner.description || ""}`}
        >
          {/* Logo with Grayscale Effect */}
          <Box
            sx={{
              width: "100%",
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <HumanisImage
              src={partner.src}
              alt={`Logo ${partner.name}`}
              ratio="1/1"
              grayscale={true}
              radius={0}
              animated={false}
              fallbackCategory="business"
              sx={{
                maxWidth: "120px",
                maxHeight: "60px",
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Partner Name */}
          {showNames && (
            <Typography
              variant="caption"
              sx={{
                color: NEUTRAL_600,
                fontSize: "0.75rem",
                fontWeight: 600,
                textAlign: "center",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                opacity: 0.8,
                transition: "opacity 200ms ease",
                ".MuiBox-root:hover &": {
                  opacity: 1,
                  color: NEUTRAL_600,
                },
              }}
            >
              {partner.name}
            </Typography>
          )}
        </Box>
      </MotionBox>
    );

    return logoElement;
  };

  const renderContent = () => {
    if (variant === "horizontal") {
      return (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": {
              height: 6,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: NEUTRAL_200,
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: NEUTRAL_400,
              borderRadius: "3px",
              "&:hover": {
                backgroundColor: NEUTRAL_600,
              },
            },
          }}
        >
          {partners.map((partner) => renderLogo(partner))}
        </Stack>
      );
    }

    if (variant === "stack") {
      return (
        <Stack spacing={2}>
          {partners.map((partner) => renderLogo(partner))}
        </Stack>
      );
    }

    // Grid variant (default)
    return (
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {partners.map((partner) => (
          <Grid
            key={partner.name}
            size={{
              xs: 12,
              sm: maxPerRow >= 2 ? 6 : 12,
              md: 12 / Math.min(maxPerRow, 4),
            }}
          >
            {renderLogo(partner)}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <MotionBox
      {...(animated && {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
      })}
    >
      {/* Section Header */}
      {(title || subtitle) && (
        <Box sx={{ mb: { xs: 4, md: 5 }, textAlign: "center" }}>
          {title && (
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.5rem", md: "1.75rem" },
                fontWeight: 600,
                color: NEUTRAL_600,
                mb: 1,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                color: NEUTRAL_400,
                fontSize: "1rem",
                lineHeight: 1.6,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Partner Logos */}
      {renderContent()}

      {/* Trust Note */}
      <Box
        sx={{
          mt: 4,
          textAlign: "center",
          p: 2,
          borderTop: `1px solid ${NEUTRAL_200}`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: NEUTRAL_400,
            fontSize: "0.8125rem",
            fontStyle: "italic",
          }}
        >
          Partenaires agréés par Humanis Assurances pour vous offrir les
          meilleures solutions d'assurance
        </Typography>
      </Box>
    </MotionBox>
  );
};

export default PartnerLogos;
