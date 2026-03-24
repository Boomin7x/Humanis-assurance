// src/features/services/sections/ClientProcessSection.tsx
/**
 * CLIENT PROCESS TIMELINE SECTION
 *
 * Displays the five-step client process from initial contact to ongoing support.
 * Features:
 * - Horizontal timeline on desktop, vertical on mobile
 * - Numbered step cards with staggered animation
 * - Connecting line between steps (desktop only)
 * - Mobile-first responsive design
 */

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import { SectionHeader, SectionWrapper } from "@/components/ui";
import { processSteps } from "@/data/stats";
import { ProcessStepCard } from "../components";
import type { SectionProps } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ClientProcessSection Component
 *
 * Section displaying the client onboarding and service process.
 *
 * @component
 * @example
 * ```tsx
 * <ClientProcessSection />
 * ```
 */
export const ClientProcessSection: React.FC<SectionProps> = React.memo(
  ({ className }) => {
    const prefersReducedMotion = useReducedMotion();
    const enableAnimations = !prefersReducedMotion;

    return (
      <SectionWrapper
        background="alt"
        paddingY="normal"
        className={className}
        component="section"
        aria-labelledby="process-heading"
        data-testid="client-process-section"
      >
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={enableAnimations ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            overline="Notre processus"
            title="De la demande à la protection : un accompagnement sur mesure"
            align="center"
          />

          {/* Process Steps - Horizontal on Desktop, Vertical on Mobile */}
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(5,1fr)",
                },
                gap: 3,
              }}
              justifyContent="center"
              role="list"
              aria-label="Étapes du processus client"
            >
              {processSteps.map((step, index) => (
                <Grid size={{ xs: 12, md: 2.4 }} key={step.id} role="listitem">
                  <ProcessStepCard step={step} index={index} />
                </Grid>
              ))}
            </Box>

            {/* Connecting Line - Hidden on Mobile */}
            {/* <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "relative",
                mt: -6,
                mb: 4,
              }}
              role="presentation"
              aria-hidden="true"
            >
              <Box
                sx={{
                  height: "1px",
                  backgroundColor: "divider",
                  width: "80%",
                  margin: "0 auto",
                }}
              />
            </Box> */}
          </Box>
        </motion.div>
      </SectionWrapper>
    );
  },
);

ClientProcessSection.displayName = "ClientProcessSection";

export default ClientProcessSection;
