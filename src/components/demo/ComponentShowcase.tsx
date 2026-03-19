// src/components/demo/ComponentShowcase.tsx
/**
 * HUMANIS COMPONENTS SHOWCASE
 *
 * Demonstration of all Phase 3 components in action.
 * This file shows how to integrate and use each component properly.
 * Remove this file after development is complete.
 */

import React from "react";
import { Grid, Stack, Box } from "@mui/material";

// Import all our components
import {
  SectionWrapper,
  SectionHeader,
  ServiceCard,
  StatCard,
  ProductCard,
  TestimonialCard,
  Badge,
  LanguageToggle,
} from "../ui";

const ComponentShowcase: React.FC = () => {
  return (
    <Box>
      {/* Section 1: Headers and Badges */}
      <SectionWrapper background="white">
        <Stack spacing={6}>
          <SectionHeader
            overline="Phase 3 Components"
            title="HUMANIS Design System Components"
            subtitle="Demonstration of all global components with proper styling and animations"
            align="center"
          />

          {/* Badge Examples */}
          <Box sx={{ textAlign: "center" }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              flexWrap="wrap"
            >
              <Badge variant="blue" size="small">
                Info Badge
              </Badge>
              <Badge variant="teal" size="medium" icon="mdi:check-circle">
                Feature Badge
              </Badge>
              <Badge variant="navy" size="large">
                Category Badge
              </Badge>
              <Badge variant="neutral" size="medium">
                Neutral Badge
              </Badge>
            </Stack>
          </Box>

          {/* Language Toggle */}
          <Box sx={{ textAlign: "center" }}>
            <LanguageToggle variant="navbar" showIcon />
          </Box>
        </Stack>
      </SectionWrapper>

      {/* Section 2: Service Cards */}
      <SectionWrapper background="alt">
        <SectionHeader
          overline="Service Components"
          title="Service Cards Example"
          subtitle="Interactive service cards with icons and hover effects"
          align="left"
        />

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceCard
              icon="mdi:shield-check"
              title="Courtage d'assurances"
              description="Audit, conseil et gestion transparente de vos contrats d'assurance avec expertise reconnue."
              href="/services#courtage"
              accentColor="blue"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceCard
              icon="mdi:chart-line"
              title="Risk Management"
              description="Identification, évaluation et maîtrise des risques pour garantir la continuité de votre activité."
              href="/services#risk-management"
              accentColor="teal"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceCard
              icon="mdi:earth"
              title="Programmes Internationaux"
              description="Couverture multi-pays avec expertise locale et réseau international pour vos activités globales."
              href="/services#international"
              accentColor="blue"
            />
          </Grid>
        </Grid>
      </SectionWrapper>

      {/* Section 3: Stat Cards */}
      <SectionWrapper background="dark">
        <SectionHeader
          overline="Statistics"
          title="Our Numbers Speak"
          subtitle="Animated statistics cards with count-up effects"
          align="center"
          variant="dark"
        />

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              number={500}
              suffix="+"
              label="Clients accompagnés"
              animationDuration={2}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              number={15}
              suffix="+"
              label="Années d'expérience"
              animationDuration={1.8}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              number={20}
              suffix="+"
              label="Compagnies partenaires"
              animationDuration={1.5}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              number={3}
              label="Pôles d'expertise"
              animationDuration={1.2}
            />
          </Grid>
        </Grid>
      </SectionWrapper>

      {/* Section 4: Product Cards */}
      <SectionWrapper background="white">
        <SectionHeader
          overline="Insurance Products"
          title="Product Cards with Expandable Content"
          subtitle="Interactive product cards showing coverage details"
          align="left"
        />

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductCard
              category="iardt"
              name="Multirisques Professionnelle"
              description="Protection complète pour votre activité professionnelle contre tous les risques."
              icon="mdi:office-building"
              coverages={[
                "Incendie et explosion",
                "Dégâts des eaux",
                "Vol et vandalisme",
                "Responsabilité civile",
                "Perte d'exploitation",
              ]}
              onCTAClick={() => alert("Product CTA clicked!")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductCard
              category="vie"
              name="Épargne Retraite"
              description="Constituez votre capital retraite avec des solutions d'épargne performantes."
              icon="mdi:piggy-bank"
              coverages={[
                "Épargne programmée",
                "Versements libres",
                "Garantie en cas de décès",
                "Rentes viagères",
                "Sortie en capital",
              ]}
              onCTAClick={() => alert("Product CTA clicked!")}
            />
          </Grid>
        </Grid>
      </SectionWrapper>

      {/* Section 5: Testimonial Cards */}
      <SectionWrapper background="alt">
        <SectionHeader
          overline="Client Testimonials"
          title="What Our Clients Say"
          subtitle="Customer feedback with ratings and company information"
          align="center"
        />

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TestimonialCard
              quote="Service exceptionnel et conseil personnalisé. Humanis nous accompagne depuis 5 ans avec une expertise remarquable."
              author="Marie Nguema"
              company="Société Générale Cameroun"
              sector="Banque"
              rating={5}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TestimonialCard
              quote="Réactivité et professionnalisme au rendez-vous. Notre portefeuille d'assurance est parfaitement optimisé."
              author="Paul Mbaki"
              company="CFAO Cameroun"
              sector="Distribution"
              rating={5}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TestimonialCard
              quote="Une équipe à l'écoute qui comprend nos enjeux. Nous recommandons vivement leurs services."
              author="Sophie Atangana"
              company="Particulier"
              sector="Assurance Vie"
              rating={5}
            />
          </Grid>
        </Grid>
      </SectionWrapper>

      {/* Section 6: Language Toggles */}
      <SectionWrapper background="blue">
        <SectionHeader
          overline="Language Support"
          title="Language Toggle Variants"
          subtitle="Different styles for different contexts"
          align="center"
          variant="dark"
        />

        <Stack spacing={4} alignItems="center" sx={{ mt: 4 }}>
          <Box>
            <Badge variant="neutral" size="small">
              Navbar Style
            </Badge>
            <Box sx={{ mt: 2 }}>
              <LanguageToggle variant="navbar" />
            </Box>
          </Box>

          <Box>
            <Badge variant="neutral" size="small">
              Mobile Style
            </Badge>
            <Box sx={{ mt: 2 }}>
              <LanguageToggle variant="mobile" />
            </Box>
          </Box>

          <Box>
            <Badge variant="neutral" size="small">
              Footer Style
            </Badge>
            <Box sx={{ mt: 2 }}>
              <LanguageToggle variant="footer" showIcon />
            </Box>
          </Box>
        </Stack>
      </SectionWrapper>
    </Box>
  );
};

export default ComponentShowcase;
