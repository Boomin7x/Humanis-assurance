// src/features/home/sections/ProcessSection.tsx
import { Container, Grid } from "@mui/material";
import React from "react";

import { SectionHeader, SectionWrapper } from "@/components/ui";
import { ProcessStepCard } from "@/features/home/components/ProcessStepCard";
import { processSteps } from "@/features/home/data/processSteps";

/**
 * ProcessSection Component
 *
 * Illustrates the 5-step client onboarding journey:
 * 1. Contact initial
 * 2. Audit des risques
 * 3. Proposition
 * 4. Souscription
 * 5. Suivi
 *
 * Builds trust through process transparency
 */
export const ProcessSection: React.FC = React.memo(() => {
  return (
    <SectionWrapper
      background="white"
      paddingY="normal"
      maxWidth={false}
      aria-label="Client onboarding process"
    >
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        <SectionHeader
          overline="Notre processus"
          title="Comment nous vous accompagnons"
          align="center"
          animationDelay={0.1}
        />

        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 4 }}
          sx={{ mt: { xs: 3, sm: 4 } }}
        >
          {processSteps.map((step, index) => (
            <Grid key={index} size={{ xs: 6, sm: 4, md: 2.4 }}>
              <ProcessStepCard
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                icon={step.icon}
                animationDelay={index * 0.1}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
});

ProcessSection.displayName = "ProcessSection";
