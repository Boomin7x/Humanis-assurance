// src/pages/HomePage.tsx
/**
 * HUMANIS HOME PAGE
 *
 * Trust-first insurance broker homepage implementing:
 * - Professional hero with team imagery and CIMA trust badges
 * - Social proof through client statistics and testimonials
 * - Service credibility with real business imagery
 * - Product authority with IARDT vs Vie distinction
 * - Partner trust through major insurer logos
 * - Clear conversion paths with strategic CTAs
 *
 * Design Language: "Refined Precision"
 * - No shadows, blue-tinted only design system
 * - Trust-building through authority, transparency, accessibility
 * - Insurance-specific UX patterns for conversion optimization
 */

import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

import {
  AboutSection,
  CTASection,
  HeroSection,
  PartnersSection,
  ProcessSection,
  ProductsSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection,
} from "@/features/home/sections";

/**
 * HomePage Component
 *
 * Main landing page composed of:
 * 1. HeroSection - Value proposition with CIMA accreditation
 * 2. StatsSection - Key business metrics
 * 3. ServicesSection - Core service offerings
 * 4. AboutSection - Company credibility and trust indicators
 * 5. ProductsSection - IARDT and Vie product categories
 * 6. ProcessSection - 5-step client journey
 * 7. TestimonialsSection - Social proof from clients
 * 8. PartnersSection - Insurance partner logos
 * 9. CTASection - Final conversion call-to-action
 */
const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("pages.home.title")}</title>
        <meta name="description" content={t("pages.home.description")} />
      </Helmet>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <ProductsSection />
      <ProcessSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  );
};

export default HomePage;
