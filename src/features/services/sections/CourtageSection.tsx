// src/features/services/sections/CourtageSection.tsx
/**
 * COURTAGE D'ASSURANCES SECTION
 *
 * Showcases Humanis Assurances' insurance brokerage expertise.
 * Features:
 * - Two-column layout (content + image)
 * - List of expertise areas with icons
 * - CIMA certification badge
 * - Mobile-first responsive design
 */

import { Box, List, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import { SectionHeader, SectionWrapper } from "@/components/ui";
import { images } from "@/utils/imageLoader";
import { ExpertiseAreaItem } from "../components";
import { expertiseAreas, type SectionProps } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CourtageSection Component
 *
 * Section highlighting insurance brokerage services and expertise areas.
 *
 * @component
 * @example
 * ```tsx
 * <CourtageSection />
 * ```
 */
export const CourtageSection: React.FC<SectionProps> = React.memo(
  ({ className }) => {
    const prefersReducedMotion = useReducedMotion();
    const enableAnimations = !prefersReducedMotion;

    return (
      <SectionWrapper
        id="courtage"
        background="white"
        paddingY="normal"
        className={className}
        component="section"
        aria-labelledby="courtage-heading"
        data-testid="courtage-section"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
            gap: 4,
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
                  overline="Courtage d'assurances"
                  title="Votre partenaire expert pour tous vos besoins d'assurance"
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
                  En tant que courtier agréé CIMA, nous mettons notre expertise
                  au service de la protection de vos biens et activités. Notre
                  approche transparente et notre connaissance approfondie du
                  marché camerounais nous permettent de vous proposer les
                  meilleures solutions d'assurance.
                </Typography>

                {/* Expertise Checklist */}
                <List
                  sx={{ p: 0 }}
                  aria-label="Domaines d'expertise en courtage"
                >
                  {expertiseAreas.map((area) => (
                    <ExpertiseAreaItem key={area.id} area={area} />
                  ))}
                </List>
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
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={images.clients.consultation}
                  alt="Conseiller Humanis en consultation avec un client"
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />

                {/* CIMA Badge Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: 12, sm: 16 },
                    right: { xs: 12, sm: 16 },
                    backgroundColor: "secondary.main",
                    color: "white",
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.75, sm: 1 },
                    borderRadius: "20px",
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    fontWeight: 600,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  role="status"
                  aria-label="Certification"
                >
                  Expert courtier agréé CIMA
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Box>
      </SectionWrapper>
    );
  },
);

CourtageSection.displayName = "CourtageSection";

export default CourtageSection;
