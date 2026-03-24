// src/features/services/sections/ClientCategoriesSection.tsx
/**
 * CLIENT CATEGORIES SECTION
 *
 * Displays two client category cards: Particuliers (Individuals) and Entreprises (Businesses).
 * Features:
 * - Two-column card layout
 * - Background images with overlays
 * - Feature lists and CTAs
 * - Hover effects
 */

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import { SectionHeader, SectionWrapper } from "@/components/ui";
import { ClientCategoryCard } from "../components";
import { clientCategories, type SectionProps } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ClientCategoriesSection Component
 *
 * Section displaying Particuliers and Entreprises client categories.
 *
 * @component
 * @example
 * ```tsx
 * <ClientCategoriesSection />
 * ```
 */
export const ClientCategoriesSection: React.FC<SectionProps> = React.memo(
  ({ className }) => {
    const prefersReducedMotion = useReducedMotion();
    const enableAnimations = !prefersReducedMotion;

    return (
      <SectionWrapper
        background="white"
        paddingY="normal"
        className={className}
        component="section"
        aria-labelledby="clients-heading"
        data-testid="client-categories-section"
      >
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={enableAnimations ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            overline="Nos clients"
            title="Des solutions adaptées à chaque profil"
            align="center"
          />

          <Box
            sx={{
              mt: 2,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
            }}
            role="list"
            aria-label="Catégories de clients"
          >
            {clientCategories.map((category, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={category.id} role="listitem">
                <ClientCategoryCard category={category} delay={index * 0.2} />
              </Grid>
            ))}
          </Box>
        </motion.div>
      </SectionWrapper>
    );
  },
);

ClientCategoriesSection.displayName = "ClientCategoriesSection";

export default ClientCategoriesSection;
