// src/features/services/data/expertiseAreas.ts
/**
 * EXPERTISE AREAS DATA
 *
 * Defines the areas of expertise for the courtage d'assurances section.
 * These represent the core competencies of Humanis Assurances as a CIMA-approved broker.
 */

import type { ExpertiseAreas } from "./types";

/**
 * Expertise areas for insurance brokerage services
 * @constant
 * @readonly
 */
export const expertiseAreas: ExpertiseAreas = [
  {
    id: "audit",
    title: "Audit des portefeuilles",
    description: "Analyse complète de vos couvertures existantes",
  },
  {
    id: "conseil",
    title: "Conseil et Orientation",
    description: "Recommandations adaptées à vos besoins spécifiques",
  },
  {
    id: "gestion",
    title: "Gestion transparente et efficace des contrats",
    description: "Suivi rigoureux et reporting détaillé",
  },
  {
    id: "representation",
    title: "Représentation et Défense des intérêts de l'assuré",
    description: "Accompagnement dans toutes vos démarches",
  },
  {
    id: "risk-management-detail",
    title: "Risk Management",
    description: "Stratégies de prévention et de réduction des risques",
  },
] as const;
