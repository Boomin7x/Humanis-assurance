// src/features/home/sections/TestimonialsSection.tsx
import { Container, Grid } from "@mui/material";
import React from "react";

import { SectionHeader, SectionWrapper, TestimonialCard } from "@/components/ui";
import { GRID_MOBILE } from "@/theme/responsive";

/**
 * Testimonial data structure for homepage
 */
interface TestimonialData {
  readonly quote: string;
  readonly author: string;
  readonly company: string;
  readonly sector: string;
  readonly rating: number;
}

/**
 * Homepage testimonials data
 */
const TESTIMONIALS_DATA: readonly TestimonialData[] = [
  {
    quote:
      "Humanis nous accompagne depuis 5 ans. Leur expertise en risk management nous a permis d'optimiser nos coûts d'assurance de 25% tout en améliorant notre couverture.",
    author: "Marie Ngono",
    company: "Cameroun Industries",
    sector: "Secteur Manufacturier",
    rating: 5,
  },
  {
    quote:
      "Service exceptionnel et réactivité remarquable. L'équipe de Humanis comprend parfaitement les enjeux des PME camerounaises.",
    author: "Paul Mendomo",
    company: "Transport Express",
    sector: "Secteur Transport",
    rating: 5,
  },
  {
    quote:
      "Grâce à Humanis, nous avons mis en place une couverture internationale complète pour nos expatriés. Un partenaire de confiance.",
    author: "Jean-Claude Eyoum",
    company: "Agro-Business",
    sector: "Secteur Agricole",
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
  return (
    <SectionWrapper
      background="alt"
      paddingY="normal"
      maxWidth={false}
      aria-label="Client testimonials"
    >
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        <SectionHeader
          overline="Témoignages"
          title="Ce que disent nos clients"
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
                quote={testimonial.quote}
                author={testimonial.author}
                company={testimonial.company}
                sector={testimonial.sector}
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
