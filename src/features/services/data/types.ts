// src/features/services/data/types.ts
/**
 * TYPE DEFINITIONS FOR SERVICES FEATURE
 *
 * Enterprise-grade type safety for all services-related data structures.
 * These types ensure strict compile-time checking and prevent runtime errors.
 */

// ─────────────────────────────────────────────────────────────────────────────
// CORE TYPES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Expertise Area - Represents a specific area of insurance expertise
 */
export interface ExpertiseArea {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

/**
 * Risk Management Pillar - One of the four pillars of risk management
 */
export interface RiskManagementPillar {
  readonly id: string;
  readonly number: 1 | 2 | 3 | 4;
  readonly title: string;
  readonly description: string;
}

/**
 * International Feature - Key feature of international insurance programs
 */
export interface InternationalFeature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly iconType: "global" | "check" | "business";
}

/**
 * Client Category - Type of client (individual or business)
 */
export interface ClientCategory {
  readonly id: "particuliers" | "entreprises";
  readonly title: string;
  readonly description: string;
  readonly iconType: "person" | "business";
  readonly features: readonly string[];
  readonly ctaText: string;
  readonly ctaHref: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly overlayType: "blue" | "dark";
  readonly overlayOpacity: number;
  readonly gradientOverlay?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Section Props - Common props for all section components
 */
export interface SectionProps {
  readonly className?: string;
}

/**
 * Badge Props - Props for badge overlay components
 */
export interface BadgeProps {
  readonly text: string;
  readonly variant?: "primary" | "secondary" | "teal";
  readonly position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY TYPES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Readonly array of expertise areas
 */
export type ExpertiseAreas = readonly ExpertiseArea[];

/**
 * Readonly array of risk management pillars
 */
export type RiskManagementPillars = readonly RiskManagementPillar[];

/**
 * Readonly array of international features
 */
export type InternationalFeatures = readonly InternationalFeature[];

/**
 * Readonly array of client categories
 */
export type ClientCategories = readonly ClientCategory[];
