// src/components/layout/Footer.tsx
/**
 * HUMANIS FOOTER COMPONENT
 *
 * Features:
 * - Dark navy background (#1C2B45)
 * - 4-column grid: Logo+tagline | Services | Produits | Contact
 * - Social media icons (LinkedIn, Facebook, WhatsApp)
 * - Bottom copyright bar with legal links
 * - No shadows, subtle top border only
 * - Responsive: stacks on mobile
 */

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LinkedIn,
  Facebook,
  WhatsApp,
  LocationOn,
  Phone,
  Email,
  Schedule,
  Gavel,
  Shield,
  VerifiedUser,
} from "@mui/icons-material";

import {
  NAVY_800,
  WHITE,
  NEUTRAL_400,
  TEAL_500,
  WHATSAPP,
} from "@/theme/tokens";
import { TYPOGRAPHY_MOBILE, TOUCH_TARGETS } from "@/theme/responsive";

interface FooterLinkProps {
  children: React.ReactNode;
  href?: string;
  to?: string;
  external?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({
  children,
  href,
  to,
  external = false,
}) => (
  <Link
    {...(to ? { component: RouterLink, to } : { href })}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    sx={{
      color: NEUTRAL_400,
      textDecoration: "none",
      fontSize: { xs: "0.8125rem", sm: "0.875rem" }, // Mobile-first typography
      lineHeight: { xs: 1.6, sm: 1.7 },
      fontWeight: 500,
      minHeight: TOUCH_TARGETS.buttonMinHeight, // Ensure touch targets
      display: "inline-flex",
      alignItems: "center",
      px: { xs: 1, sm: 0 }, // Add horizontal padding on mobile
      py: { xs: 1, sm: 0.5 }, // Add vertical padding for better touch targets
      borderRadius: { xs: "6px", sm: "4px" }, // Rounded for mobile
      transition: "all 200ms ease",
      "&:hover": {
        color: TEAL_500,
        backgroundColor: { xs: "rgba(255,255,255,0.05)", md: "transparent" },
        textDecoration: "none",
        // Only transform on desktop
        transform: { xs: "none", lg: "translateY(-1px)" },
      },
      "&:active": {
        // Immediate feedback on touch
        backgroundColor: "rgba(255,255,255,0.1)",
        transform: "scale(0.98)",
      },
      "&:focus-visible": {
        outline: `2px solid ${TEAL_500}`,
        outlineOffset: 2,
        borderRadius: "4px",
      },
    }}
  >
    {children}
  </Link>
);

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: NAVY_800,
        borderTop: `1px solid rgba(255,255,255,0.08)`,
        color: WHITE,
        mt: "auto",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 6, sm: 8, md: 10 }, // Mobile-first section spacing
          px: { xs: 2, sm: 3, md: 4 }, // Progressive enhancement
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, sm: 5, md: 6 }} // Progressive grid spacing
          sx={{
            // Better mobile column stacking
            "& .MuiGrid-item": {
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {/* Column 1: Logo & Tagline - Full width on mobile */}
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Stack spacing={{ xs: 3, sm: 4 }}>
              {/* Logo */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'ClashDisplay', 'Inter', sans-serif",
                    fontSize: { xs: "1.25rem", sm: "1.5rem" }, // Mobile-first sizing
                    fontWeight: 600,
                    color: WHITE,
                    mb: { xs: 1, sm: 1.5 },
                    lineHeight: { xs: 1.3, sm: 1.2 },
                  }}
                >
                  Humanis Assurances
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "'Satoshi', 'Inter', sans-serif",
                    color: NEUTRAL_400,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    lineHeight: { xs: 1.6, sm: 1.7 },
                    maxWidth: { xs: "100%", md: "280px" },
                  }}
                >
                  {t(
                    "footer.tagline",
                    "Nous accompagnons les Entreprises et les Particuliers",
                  )}
                </Typography>
              </Box>

              {/* Regulatory Compliance Badges */}
              <Stack spacing={2}>
                <Typography
                  variant="overline"
                  sx={{
                    color: TEAL_500,
                    ...TYPOGRAPHY_MOBILE.overline, // Mobile-first responsive typography
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Agréments & Certifications
                </Typography>

                <Stack spacing={1.5}>
                  {/* CIMA Approval */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1.5,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "6px",
                      border: `1px solid rgba(255,255,255,0.1)`,
                    }}
                  >
                    <Gavel sx={{ color: TEAL_500, fontSize: "1.25rem" }} />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: WHITE,
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          lineHeight: 1.2,
                        }}
                      >
                        Agréé CIMA
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: NEUTRAL_400,
                          fontSize: "0.75rem",
                          lineHeight: 1.2,
                        }}
                      >
                        Courtier d'assurances certifié
                      </Typography>
                    </Box>
                  </Box>

                  {/* Professional Certification */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1.5,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "6px",
                      border: `1px solid rgba(255,255,255,0.1)`,
                    }}
                  >
                    <VerifiedUser
                      sx={{ color: TEAL_500, fontSize: "1.25rem" }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: WHITE,
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          lineHeight: 1.2,
                        }}
                      >
                        Depuis 2009
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: NEUTRAL_400,
                          fontSize: "0.75rem",
                          lineHeight: 1.2,
                        }}
                      >
                        15+ ans d'expertise
                      </Typography>
                    </Box>
                  </Box>
                </Stack>

                {/* Social Links */}
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: NEUTRAL_400,
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      mb: 1,
                      display: "block",
                    }}
                  >
                    Suivez-nous
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={{ xs: 2, sm: 1.5 }} // Larger gaps on mobile for touch
                    justifyContent="flex-start"
                    sx={{
                      // Ensure proper touch targets on mobile
                      "& .MuiIconButton-root": {
                        minHeight: TOUCH_TARGETS.buttonMinHeight,
                        minWidth: TOUCH_TARGETS.buttonMinHeight,
                      },
                    }}
                  >
                    <IconButton
                      href="https://linkedin.com/company/humanis-assurances"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: NEUTRAL_400,
                        backgroundColor: "rgba(255,255,255,0.08)",
                        borderRadius: { xs: "4px", sm: "6px" },
                        minHeight: TOUCH_TARGETS.buttonMinHeight, // Ensure proper touch targets
                        minWidth: TOUCH_TARGETS.buttonMinHeight,
                        "&:hover": {
                          color: "#0077B5",
                          backgroundColor: "rgba(255,255,255,0.15)",
                          // Disable hover lift on mobile devices
                          transform: { xs: "none", md: "translateY(-1px)" },
                        },
                        "&:focus-visible": {
                          outline: `2px solid ${TEAL_500}`,
                          outlineOffset: 2,
                        },
                        transition: "all 200ms ease",
                      }}
                      aria-label="Suivez-nous sur LinkedIn"
                    >
                      <LinkedIn
                        sx={{ fontSize: { xs: "1.25rem", sm: "1.125rem" } }}
                      />
                    </IconButton>

                    <IconButton
                      href="https://facebook.com/humanis.assurances"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: NEUTRAL_400,
                        backgroundColor: "rgba(255,255,255,0.08)",
                        borderRadius: { xs: "4px", sm: "6px" },
                        minHeight: TOUCH_TARGETS.buttonMinHeight,
                        minWidth: TOUCH_TARGETS.buttonMinHeight,
                        "&:hover": {
                          color: "#1877F2",
                          backgroundColor: "rgba(255,255,255,0.15)",
                          transform: { xs: "none", md: "translateY(-1px)" },
                        },
                        "&:focus-visible": {
                          outline: `2px solid ${TEAL_500}`,
                          outlineOffset: 2,
                        },
                        transition: "all 200ms ease",
                      }}
                      aria-label="Suivez-nous sur Facebook"
                    >
                      <Facebook
                        sx={{ fontSize: { xs: "1.25rem", sm: "1.125rem" } }}
                      />
                    </IconButton>

                    <IconButton
                      href="https://wa.me/237686132013"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: NEUTRAL_400,
                        backgroundColor: "rgba(255,255,255,0.08)",
                        borderRadius: { xs: "4px", sm: "6px" },
                        minHeight: TOUCH_TARGETS.buttonMinHeight,
                        minWidth: TOUCH_TARGETS.buttonMinHeight,
                        "&:hover": {
                          color: WHATSAPP,
                          backgroundColor: "rgba(255,255,255,0.15)",
                          transform: { xs: "none", md: "translateY(-1px)" },
                        },
                        "&:focus-visible": {
                          outline: `2px solid ${TEAL_500}`,
                          outlineOffset: 2,
                        },
                        transition: "all 200ms ease",
                      }}
                      aria-label="Contactez-nous sur WhatsApp"
                    >
                      <WhatsApp
                        sx={{ fontSize: { xs: "1.25rem", sm: "1.125rem" } }}
                      />
                    </IconButton>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          {/* Column 2: Services - Responsive stacking */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'ClashDisplay', 'Inter', sans-serif",
                fontSize: { xs: "1.125rem", sm: "1.25rem" }, // Mobile-optimized
                fontWeight: 600,
                color: WHITE,
                mb: { xs: 2.5, sm: 3 },
                lineHeight: 1.3,
              }}
            >
              {t("footer.services", "Services")}
            </Typography>
            <Stack spacing={{ xs: 1.5, sm: 2 }}>
              <FooterLink to="/services#courtage">
                {t("footer.services.brokerage", "Courtage")}
              </FooterLink>
              <FooterLink to="/services#risk-management">
                {t("footer.services.risk", "Risk Management")}
              </FooterLink>
              <FooterLink to="/services#international">
                {t(
                  "footer.services.international",
                  "Programmes Internationaux",
                )}
              </FooterLink>
            </Stack>
          </Grid>

          {/* Column 3: Products - Responsive stacking */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'ClashDisplay', 'Inter', sans-serif",
                fontSize: { xs: "1.125rem", sm: "1.25rem" }, // Mobile-optimized
                fontWeight: 600,
                color: WHITE,
                mb: { xs: 2.5, sm: 3 },
                lineHeight: 1.3,
              }}
            >
              {t("footer.products", "Produits")}
            </Typography>
            <Stack spacing={{ xs: 1.5, sm: 2 }}>
              <FooterLink to="/produits#iardt">
                {t("footer.products.iardt", "IARDT")}
              </FooterLink>
              <FooterLink to="/produits#vie">
                {t("footer.products.life", "Assurance Vie")}
              </FooterLink>
            </Stack>
          </Grid>

          {/* Column 4: Contact - Full width on mobile, larger on desktop */}
          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'ClashDisplay', 'Inter', sans-serif",
                fontSize: { xs: "1.125rem", sm: "1.25rem" }, // Mobile-optimized
                fontWeight: 600,
                color: WHITE,
                mb: { xs: 2.5, sm: 3 },
                lineHeight: 1.3,
              }}
            >
              {t("footer.contact", "Contact")}
            </Typography>
            <Stack spacing={{ xs: 2, sm: 2.5 }}>
              {/* Address */}
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <LocationOn
                  sx={{
                    color: TEAL_500,
                    fontSize: "1.25rem",
                    mt: 0.25,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: NEUTRAL_400,
                    ...TYPOGRAPHY_MOBILE.body2,
                    lineHeight: { xs: 1.5, sm: 1.6 },
                  }}
                >
                  688, Rue Joffre
                  <br />
                  Akwa-Douala, Cameroun
                </Typography>
              </Stack>

              {/* Phones */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Phone
                  sx={{
                    color: TEAL_500,
                    fontSize: "1.25rem",
                  }}
                />
                <Stack direction="row" spacing={1.5} flexWrap="wrap">
                  <FooterLink href="tel:+237686132013" external>
                    686 13 20 13
                  </FooterLink>
                  <Typography sx={{ color: NEUTRAL_400 }}>•</Typography>
                  <FooterLink href="tel:+237686132913" external>
                    686 13 29 13
                  </FooterLink>
                </Stack>
              </Stack>

              {/* Email */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Email
                  sx={{
                    color: TEAL_500,
                    fontSize: "1.25rem",
                  }}
                />
                <FooterLink
                  href="mailto:humanis@humanis-assurances.cm"
                  external
                >
                  humanis@humanis-assurances.cm
                </FooterLink>
              </Stack>

              {/* Business Hours */}
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Schedule
                  sx={{
                    color: TEAL_500,
                    fontSize: "1.25rem",
                    mt: 0.25,
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: WHITE,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      mb: 0.5,
                    }}
                  >
                    Horaires d'ouverture
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: NEUTRAL_400,
                      lineHeight: 1.5,
                      fontSize: "0.8125rem",
                    }}
                  >
                    <strong>Lun-Ven:</strong> 8h00 – 17h00
                    <br />
                    <strong>Samedi:</strong> 8h00 – 13h00
                    <br />
                    <span style={{ color: TEAL_500, fontWeight: 500 }}>
                      Consultation sur RDV
                    </span>
                  </Typography>
                </Box>
              </Stack>

              {/* Insurance Coverage Note */}
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "rgba(26, 158, 117, 0.1)",
                  borderLeft: `3px solid ${TEAL_500}`,
                  borderRadius: "4px",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Shield sx={{ color: TEAL_500, fontSize: "1rem" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: TEAL_500,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Protection Assurée
                  </Typography>
                </Stack>
                <Typography
                  variant="caption"
                  sx={{
                    color: NEUTRAL_400,
                    fontSize: "0.75rem",
                    lineHeight: 1.4,
                    display: "block",
                  }}
                >
                  Nous protégeons plus de{" "}
                  <strong style={{ color: WHITE }}>500 clients</strong> avec des
                  solutions d'assurance adaptées aux entreprises et
                  particuliers.
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Bar - Mobile-optimized */}
      <Box
        sx={{
          borderTop: `1px solid rgba(255,255,255,0.08)`,
          py: { xs: 3, sm: 4 }, // Mobile-first responsive spacing
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: 2, sm: 3, md: 4 }, // Progressive enhancement
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              gap: { xs: 3, sm: 2, md: 0 }, // Larger gaps on mobile
            }}
          >
            {/* Copyright & Regulatory - Mobile-optimized */}
            <Box sx={{ width: { xs: "100%", md: "auto" } }}>
              <Typography
                variant="body2"
                sx={{
                  color: NEUTRAL_400,
                  fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                  lineHeight: { xs: 1.5, sm: 1.4 },
                  mb: { xs: 1, sm: 0.5 },
                  fontWeight: 500,
                }}
              >
                © {new Date().getFullYear()} Humanis Assurances.{" "}
                {t("footer.copyright", "Tous droits réservés.")}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: NEUTRAL_400,
                  fontSize: { xs: "0.75rem", sm: "0.8125rem" }, // Larger on mobile for readability
                  opacity: 0.8,
                  lineHeight: { xs: 1.5, sm: 1.4 },
                  display: "block",
                  maxWidth: { xs: "100%", md: "600px" },
                }}
              >
                Cabinet de courtage d'assurances agréé par la CIMA • Siret: [À
                renseigner] • Code APE: 6622Z
              </Typography>
            </Box>

            {/* Legal Links - Mobile-optimized */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 3 }} // Larger touch targets on mobile
              divider={
                <Typography
                  sx={{
                    color: NEUTRAL_400,
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    display: { xs: "none", sm: "block" }, // Hide divider on mobile
                    lineHeight: 1.4,
                  }}
                >
                  •
                </Typography>
              }
              sx={{
                width: { xs: "100%", md: "auto" },
                alignItems: { xs: "flex-start", md: "center" },
              }}
            >
              <FooterLink to="/mentions-legales">
                {t("footer.legal", "Mentions légales")}
              </FooterLink>
              <FooterLink to="/politique-confidentialite">
                {t("footer.privacy", "Politique de confidentialité")}
              </FooterLink>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
