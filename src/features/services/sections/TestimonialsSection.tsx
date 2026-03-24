// src/features/services/sections/TestimonialsSection.tsx
/**
 * TESTIMONIALS SECTION
 *
 * Displays client testimonials in a grid layout.
 * Features:
 * - Three-column grid (responsive to single column on mobile)
 * - Reuses TestimonialCard component
 * - Staggered animations
 * - Mobile-first responsive design
 */

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import {
  SectionHeader,
  SectionWrapper,
  TestimonialCard,
} from "@/components/ui";
import { testimonials } from "@/data/testimonials";
import type { SectionProps } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TestimonialsSection Component
 *
 * Section displaying client testimonials using TestimonialCard components.
 *
 * @component
 * @example
 * ```tsx
 * <TestimonialsSection />
 * ```
 */
export const TestimonialsSection: React.FC<SectionProps> = React.memo(
  ({ className }) => {
    const prefersReducedMotion = useReducedMotion();
    const enableAnimations = !prefersReducedMotion;

    return (
      <SectionWrapper
        background="alt"
        paddingY="normal"
        className={className}
        component="section"
        aria-labelledby="testimonials-heading"
        data-testid="testimonials-section"
      >
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={enableAnimations ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            overline="Témoignages"
            title="Ce que disent nos clients"
            align="center"
          />

          <Box
            sx={{
              mt: 2,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
              gap: 4,
            }}
            role="list"
            aria-label="Témoignages clients"
          >
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={testimonial.id}
                role="listitem"
              >
                <motion.div
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  initial={enableAnimations ? { opacity: 0, y: 20 } : undefined}
                  whileInView={
                    enableAnimations ? { opacity: 1, y: 0 } : undefined
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              </Grid>
            ))}
          </Box>
        </motion.div>
      </SectionWrapper>
    );
  },
);

TestimonialsSection.displayName = "TestimonialsSection";

export default TestimonialsSection;
