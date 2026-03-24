// src/pages/AboutPage.tsx
/**
 * HUMANIS ABOUT PAGE
 *
 * Professional credibility and regulatory compliance focus:
 * - CIMA regulatory approval and compliance messaging
 * - Team expertise and professional credentials
 * - Local market knowledge and Cameroon expertise
 * - Trust building through years of experience and client success
 * - Company values and missions aligned with industry standards
 *
 * Design Language: "Refined Precision"
 * - Authority through professional imagery and clear value propositions
 * - Transparency in company history, certifications, and expertise
 * - Trust elements positioned strategically throughout the page
 */

import React from "react";

import {
  AboutCTASection,
  ExpertiseSection,
  MissionsSection,
  PageHeroSection,
  TeamSection,
  ValuesSection,
  WhoWeAreSection,
} from "@/features/about/sections";

/**
 * AboutPage Component
 *
 * Main about page composed of:
 * 1. PageHeroSection - Hero with background image, title, subtitle, trust badges
 * 2. WhoWeAreSection - Company overview with stats and office image
 * 3. MissionsSection - 4 mission cards
 * 4. ValuesSection - 4 value cards
 * 5. ExpertiseSection - Expertise list with consultation image
 * 6. TeamSection - Team member cards
 * 7. AboutCTASection - Final CTA
 */
const AboutPage: React.FC = () => {
  return (
    <>
      <PageHeroSection />
      <WhoWeAreSection />
      <MissionsSection />
      <ValuesSection />
      <ExpertiseSection />
      <TeamSection />
      <AboutCTASection />
    </>
  );
};

export default AboutPage;
