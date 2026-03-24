// src/pages/ServicesPage.tsx
/**
 * HUMANIS SERVICES PAGE
 *
 * Enterprise-grade refactored services page following Feature-Sliced Design architecture.
 *
 * FEATURES:
 * - Courtage d'assurances with CIMA credentials
 * - Risk Management methodology and approach
 * - International Programs capability
 * - Client process transparency
 * - Audience segmentation (Particuliers vs Entreprises)
 * - Client testimonials for credibility
 *
 * ARCHITECTURE:
 * - Feature-based component organization
 * - Strict TypeScript typing
 * - Mobile-first responsive design
 * - Performance optimizations (React.memo, lazy animations)
 * - WCAG 2.1 AA accessibility compliance
 * - Separation of concerns (data, components, sections)
 *
 * Design Language: "Refined Precision"
 * - Service authority through process explanation and credentials
 * - Trust building through methodology transparency
 * - Clear value proposition for each service line
 */

import React from "react";

import {
  ClientCategoriesSection,
  ClientProcessSection,
  CourtageSection,
  InternationalProgramsSection,
  PageHeroSection,
  RiskManagementSection,
  TestimonialsSection,
} from "@/features/services";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ServicesPage Component
 *
 * Main services page component that composes all service-related sections.
 * Each section is a self-contained, reusable component following enterprise
 * best practices.
 *
 * @component
 * @example
 * ```tsx
 * <ServicesPage />
 * ```
 */
const ServicesPage: React.FC = () => {
  return (
    <>
      {/* Hero Section - Page introduction with breadcrumbs */}
      <PageHeroSection />

      {/* Courtage Section - Insurance brokerage expertise */}
      <CourtageSection />

      {/* Risk Management Section - Four pillars methodology */}
      <RiskManagementSection />

      {/* International Programs Section - Multi-country coverage */}
      <InternationalProgramsSection />

      {/* Client Process Section - Five-step timeline */}
      <ClientProcessSection />

      {/* Client Categories Section - Particuliers vs Entreprises */}
      <ClientCategoriesSection />

      {/* Testimonials Section - Social proof */}
      <TestimonialsSection />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT METADATA
// ─────────────────────────────────────────────────────────────────────────────

ServicesPage.displayName = "ServicesPage";

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export default ServicesPage;
