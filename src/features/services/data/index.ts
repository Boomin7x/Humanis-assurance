// src/features/services/data/index.ts
/**
 * SERVICES FEATURE DATA BARREL EXPORTS
 *
 * Centralized export point for all services-related data and types.
 * Enforces clean import paths throughout the application.
 */

// Type Exports
export type {
  ExpertiseArea,
  RiskManagementPillar,
  InternationalFeature,
  ClientCategory,
  SectionProps,
  BadgeProps,
  ExpertiseAreas,
  RiskManagementPillars,
  InternationalFeatures,
  ClientCategories,
} from "./types";

// Data Exports
export { expertiseAreas } from "./expertiseAreas";
export { riskManagementPillars } from "./riskManagementPillars";
export { internationalFeatures } from "./internationalFeatures";
export { clientCategories } from "./clientCategories";
