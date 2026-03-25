import React from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";

import { SectionWrapper } from "@/components/ui";
import { ContactHero } from "./components/ContactHero";
import { EnhancedContactForm } from "./components/EnhancedContactForm";
import { ContactInfo } from "./components/ContactInfo";
import { GoogleMapsSection } from "./components/GoogleMapsSection";
import { QuickQuoteCTA } from "./components/QuickQuoteCTA";
import { MobileContactButtons } from "./components/MobileContactButtons";

const ContactPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Split Layout */}
      <SectionWrapper background="white" paddingY="normal">
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            {/* Left - Enhanced Contact Form */}
            <Grid size={{ xs: 12, md: 7 }} id="contact-form">
              <EnhancedContactForm />
            </Grid>

            {/* Right - Contact Information */}
            <Grid size={{ xs: 12, md: 5 }}>
              <ContactInfo />
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Google Maps */}
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <GoogleMapsSection />
      </Container>

      {/* Quick Quote CTA */}
      <SectionWrapper background="alt" paddingY="normal">
        <Container maxWidth="xl">
          <QuickQuoteCTA />
        </Container>
      </SectionWrapper>

      {/* Mobile Contact Buttons - Fixed Position */}
      <MobileContactButtons />
    </>
  );
};

export default ContactPage;
