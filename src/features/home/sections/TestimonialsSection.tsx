// src/features/home/sections/TestimonialsSection.tsx
import { Container, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionHeader, SectionWrapper, TestimonialCard } from "@/components/ui";
import { GRID_MOBILE } from "@/theme/responsive";

/**
 * Testimonial data structure for homepage
 */
interface TestimonialData {
  readonly quoteKey: string;
  readonly authorKey: string;
  readonly companyKey: string;
  readonly sectorKey: string;
  readonly rating: number;
}

/**
 * Homepage testimonials data
 */
const TESTIMONIALS_DATA: readonly TestimonialData[] = [
  {
    quoteKey: "testimonials.manufacturing.quote",
    authorKey: "testimonials.manufacturing.author",
    companyKey: "testimonials.manufacturing.company",
    sectorKey: "testimonials.manufacturing.sector",
    rating: 5,
  },
  {
    quoteKey: "testimonials.transport.quote",
    authorKey: "testimonials.transport.author",
    companyKey: "testimonials.transport.company",
    sectorKey: "testimonials.transport.sector",
    rating: 5,
  },
  {
    quoteKey: "testimonials.agriculture.quote",
    authorKey: "testimonials.agriculture.author",
    companyKey: "testimonials.agriculture.company",
    sectorKey: "testimonials.agriculture.sector",
    rating: 5,
  },
] as const;

/**
 * TestimonialsSection Component
 *
 * Displays client testimonials for social proof
 * - Industry-specific success stories
 * - Quantified results where applicable
 * - 5-star ratings for credibility
 */
export const TestimonialsSection: React.FC = React.memo(() => {
  const { t } = useTranslation();

  return (
    <SectionWrapper
      background="alt"
      paddingY="normal"
      maxWidth={false}
      aria-label="Client testimonials"
    >
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        <SectionHeader
          overline={t("sections.testimonials.overline")}
          title={t("sections.testimonials.title")}
          align="center"
          animationDelay={0.1}
        />

        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 4 }}
          sx={{ mt: { xs: 3, sm: 4 } }}
        >
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <Grid key={index} size={GRID_MOBILE.thirdOnDesktop}>
              <TestimonialCard
                quote={t(testimonial.quoteKey)}
                author={t(testimonial.authorKey)}
                company={t(testimonial.companyKey)}
                sector={t(testimonial.sectorKey)}
                rating={testimonial.rating}
                animated
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
});

TestimonialsSection.displayName = "TestimonialsSection";
