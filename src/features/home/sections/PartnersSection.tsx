// src/features/home/sections/PartnersSection.tsx
import { Box, Container } from "@mui/material";
import React from "react";

import { PartnerLogos, SectionHeader, SectionWrapper } from "@/components/ui";

/**
 * PartnersSection Component
 *
 * Displays partner insurance company logos
 * for trust-building and credibility
 *
 * Shows 20+ major insurers partnered with Humanis
 */
export const PartnersSection: React.FC = React.memo(() => {
  return (
    <SectionWrapper
      background="white"
      paddingY="small"
      maxWidth={false}
      aria-label="Partner insurance companies"
    >
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        <SectionHeader
          overline="Nos Partenaires de Confiance"
          title="Partenaires"
          subtitle="Ils nous font confiance pour protéger leurs intérêts et ceux de leurs clients."
          align="center"
          animationDelay={0.2}
        />

        <Box sx={{ mt: 4 }}>
          <PartnerLogos animated />
        </Box>
      </Container>
    </SectionWrapper>
  );
});

PartnersSection.displayName = "PartnersSection";
