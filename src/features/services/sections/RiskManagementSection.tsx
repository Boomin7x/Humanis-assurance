// src/features/services/sections/RiskManagementSection.tsx
/**
 * RISK MANAGEMENT SECTION
 *
 * Showcases the four pillars of Humanis Assurances' risk management methodology.
 * Features:
 * - Two-column layout (image + pillars grid)
 * - Four pillar cards in 2x2 grid
 * - Badge overlay on image
 * - Staggered animations
 */

import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import { SectionHeader, SectionWrapper } from "@/components/ui";
import { images } from "@/utils/imageLoader";
import { RiskPillarCard } from "../components";
import { riskManagementPillars, type SectionProps } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * RiskManagementSection Component
 *
 * Section displaying the four pillars of risk management methodology.
 *
 * @component
 * @example
 * ```tsx
 * <RiskManagementSection />
 * ```
 */
export const RiskManagementSection: React.FC<SectionProps> = React.memo(
  ({ className }) => {
    const prefersReducedMotion = useReducedMotion();
    const enableAnimations = !prefersReducedMotion;

    return (
      <SectionWrapper
        id="risk-management"
        background="alt"
        paddingY="normal"
        className={className}
        component="section"
        aria-labelledby="risk-management-heading"
        data-testid="risk-management-section"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            height: "100%",
            width: "100%",
          }}
          alignItems="center"
        >
          {/* Left - Photo */}
          <Grid
            sx={{
              height: "100%",
              width: "100%",
            }}
            size={{ xs: 12, md: 6 }}
          >
            <motion.div
              initial={enableAnimations ? { opacity: 0, x: -30 } : undefined}
              whileInView={enableAnimations ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  position: "relative",
                }}
              >
                <img
                  src={images.services.businessMeeting}
                  alt="Équipe dirigeante analysant les risques d'entreprise"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    aspectRatio: "4/3",
                    borderRadius: "8px",
                  }}
                />

                {/* Badge Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: 12, sm: 16 },
                    right: { xs: 12, sm: 16 },
                    backgroundColor: "primary.dark",
                    color: "white",
                    zIndex: 10,
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
                  Risk Management
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right - 4 Pillars Grid */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={enableAnimations ? { opacity: 0, x: 30 } : undefined}
              whileInView={enableAnimations ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Stack spacing={3}>
                <SectionHeader
                  overline="Risk Management"
                  title="Maîtrisez vos risques pour sécuriser votre avenir"
                  align="left"
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                  }}
                  role="list"
                  aria-label="Les quatre piliers du risk management"
                >
                  {riskManagementPillars.map((pillar, index) => (
                    <Grid
                      size={{ xs: 12, sm: 6 }}
                      key={pillar.id}
                      role="listitem"
                    >
                      <RiskPillarCard pillar={pillar} index={index} />
                    </Grid>
                  ))}
                </Box>
              </Stack>
            </motion.div>
          </Grid>
        </Box>
      </SectionWrapper>
    );
  },
);

RiskManagementSection.displayName = "RiskManagementSection";

export default RiskManagementSection;
