// src/features/home/sections/HeroSection.tsx
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  alpha,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import { HumanisImage } from "@/components/ui";
import { NAV_HEIGHT, NAV_HEIGHT_MOBILE } from "@/constants/layout";
import {
  BRAND_100,
  NAVY_800,
  NEUTRAL_700,
  PRIMARY_500,
  PRIMARY_700,
  WHITE,
} from "@/theme/tokens";
import { getImage, images } from "@/utils/imageLoader";

/**
 * HeroSection Props Interface
 */
export interface HeroSectionProps {
  readonly onGetAudit?: () => void;
  readonly onViewProducts?: () => void;
}

/**
 * HeroSection Component
 *
 * Trust-first insurance broker hero with:
 * - Professional team imagery and CIMA trust badges
 * - Clear value proposition for institutional clients
 * - Strategic CTAs for conversion optimization
 * - Refined precision design (no shadows, sharp borders)
 */
export const HeroSection: React.FC<HeroSectionProps> = React.memo(
  ({ onGetAudit, onViewProducts }) => {
    const handleGetAudit = (): void => {
      if (onGetAudit) {
        onGetAudit();
      }
    };

    const handleViewProducts = (): void => {
      if (onViewProducts) {
        onViewProducts();
      } else {
        window.location.href = "/produits";
      }
    };

    return (
      <>
        <Box
          sx={{
            height: { xs: NAV_HEIGHT_MOBILE, md: NAV_HEIGHT },
            bgcolor: NAVY_800,
            width: "100%",
          }}
        />
        <Box
          component="section"
          aria-label="Hero section"
          sx={{
            position: "relative",
            bgcolor: WHITE,
            pb: 0,
            overflow: "hidden",
          }}
        >
          <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
            <Grid
              container
              spacing={0}
              sx={{ border: `1px solid ${NAVY_800}` }}
            >
              <Grid
                size={{ xs: 12, md: 7 }}
                sx={{
                  p: { xs: 4, md: 8 },
                  borderRight: { md: `1px solid ${NAVY_800}` },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Stack spacing={4}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      border: `1px solid ${NAVY_800}`,
                      px: 2,
                      py: 0.5,
                      width: "fit-content",
                    }}
                    role="status"
                    aria-label="CIMA accreditation badge"
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: NAVY_800,
                        textTransform: "uppercase",
                      }}
                    >
                      Agrée CIMA — Réf. 2009/042
                    </Typography>
                  </Box>

                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.25rem", md: "4.5rem" },
                      fontWeight: 900,
                      color: NAVY_800,
                      lineHeight: 1,
                      textTransform: "uppercase",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Sécurité <br />
                    <span style={{ color: PRIMARY_500 }}>
                      Patrimoniale
                    </span>{" "}
                    <br />& Conseils.
                  </Typography>

                  <Typography
                    sx={{
                      color: NEUTRAL_700,
                      fontSize: "1.125rem",
                      maxWidth: "520px",
                      lineHeight: 1.6,
                    }}
                  >
                    Courtage d'assurances, Risk Management et Programmes
                    Internationaux. Une approche rigoureuse pour les
                    institutions et les particuliers au Cameroun.
                  </Typography>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={0}
                    sx={{ mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleGetAudit}
                      sx={{
                        borderRadius: 0,
                        px: 6,
                        py: 2.5,
                        bgcolor: NAVY_800,
                        boxShadow: "none",
                        fontWeight: 700,
                        "&:hover": { bgcolor: PRIMARY_700, boxShadow: "none" },
                      }}
                      aria-label="Request insurance audit"
                    >
                      Obtenir un Audit
                    </Button>
                    <Button
                      variant="outlined"
                      endIcon={<ArrowForwardIcon />}
                      onClick={handleViewProducts}
                      sx={{
                        borderRadius: 0,
                        px: 6,
                        py: 2.5,
                        borderColor: NAVY_800,
                        color: NAVY_800,
                        borderLeft: { sm: "none" },
                        fontWeight: 700,
                        "&:hover": {
                          bgcolor: BRAND_100,
                          borderColor: NAVY_800,
                        },
                      }}
                      aria-label="View insurance products"
                    >
                      Nos Produits
                    </Button>
                  </Stack>
                </Stack>
              </Grid>

              <Grid
                size={{ xs: 12, md: 5 }}
                sx={{ position: "relative", bgcolor: NAVY_800 }}
              >
                <HumanisImage
                  src={getImage(images.hero.teamGroup, "hero")}
                  alt="Expertise"
                  ratio="1/1"
                  radius={0}
                  sx={{
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "120px",
                      background: `linear-gradient(to bottom, ${alpha(NAVY_800, 0.4)}, transparent)`,
                      zIndex: 1,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  },
);

HeroSection.displayName = "HeroSection";
