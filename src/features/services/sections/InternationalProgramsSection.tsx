// src/features/services/sections/InternationalProgramsSection.tsx
/**
 * INTERNATIONAL PROGRAMS SECTION
 *
 * Showcases Humanis Assurances' international insurance program capabilities.
 * Features:
 * - Two-column layout (content + image)
 * - List of international features with icons
 * - Badge overlay on image
 * - Mobile-first responsive design
 */

import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import { SectionHeader, SectionWrapper } from "@/components/ui";
import { images } from "@/utils/imageLoader";
import { InternationalFeatureItem } from "../components";
import { internationalFeatures, type SectionProps } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * InternationalProgramsSection Component
 *
 * Section highlighting international insurance program capabilities.
 *
 * @component
 * @example
 * ```tsx
 * <InternationalProgramsSection />
 * ```
 */
export const InternationalProgramsSection: React.FC<SectionProps> = React.memo(
  ({ className }) => {
    const prefersReducedMotion = useReducedMotion();
    const enableAnimations = !prefersReducedMotion;

    return (
      <SectionWrapper
        id="international"
        background="white"
        paddingY="normal"
        className={className}
        component="section"
        aria-labelledby="international-heading"
        data-testid="international-programs-section"
      >
        <Box
          sx={{
            gap: 4,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
          }}
          alignItems="center"
        >
          {/* Left - Content */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={enableAnimations ? { opacity: 0, x: -30 } : undefined}
              whileInView={enableAnimations ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Stack spacing={4}>
                <SectionHeader
                  overline="Programmes Internationaux"
                  title="Gestion des assurances multi-pays pour vos activités internationales"
                  align="left"
                />

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.9375rem", sm: "1rem" },
                    lineHeight: 1.7,
                  }}
                >
                  Nos programmes internationaux vous permettent de gérer
                  efficacement les assurances de vos filiales et activités à
                  l'étranger. Grâce à notre réseau de partenaires internationaux
                  et notre expertise locale, nous vous accompagnons dans la mise
                  en place de couvertures cohérentes et optimisées.
                </Typography>

                {/* Key Features */}
                <Stack
                  spacing={2}
                  component="ul"
                  sx={{ listStyle: "none", p: 0, m: 0 }}
                  aria-label="Caractéristiques des programmes internationaux"
                >
                  {internationalFeatures.map((feature) => (
                    <Box key={feature.id} component="li">
                      <InternationalFeatureItem feature={feature} />
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </motion.div>
          </Grid>

          {/* Right - Photo */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <motion.div
              initial={enableAnimations ? { opacity: 0, x: 30 } : undefined}
              whileInView={enableAnimations ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                fontStyle={{
                  width: "100%",
                  height: "100%",
                }}
                sx={{ position: "relative" }}
              >
                <img
                  src={images.services.international}
                  alt="Réseau international et couverture mondiale"
                  style={{
                    aspectRatio: "4/3",
                    borderRadius: "8px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />

                {/* Floating Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 12, sm: 16 },
                    left: { xs: 12, sm: 16 },
                    backgroundColor: "primary.dark",
                    color: "white",
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.75, sm: 1 },
                    borderRadius: "20px",
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    fontWeight: 600,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  role="status"
                  aria-label="Service"
                >
                  Couverture mondiale
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Box>
      </SectionWrapper>
    );
  },
);

InternationalProgramsSection.displayName = "InternationalProgramsSection";

export default InternationalProgramsSection;
