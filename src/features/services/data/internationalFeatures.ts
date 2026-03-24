// src/features/services/data/internationalFeatures.ts
/**
 * INTERNATIONAL PROGRAMS FEATURES DATA
 *
 * Key features and capabilities of Humanis Assurances' international insurance programs.
 * These highlight the firm's ability to manage multi-country insurance coverage.
 */

import type { InternationalFeatures } from "./types";

/**
 * Features of international insurance programs
 * @constant
 * @readonly
 */
export const internationalFeatures: InternationalFeatures = [
  {
    id: "global-coverage",
    title: "Couverture mondiale",
    description:
      "Programmes d'assurance cohérents dans tous vos pays d'implantation",
    iconType: "global",
  },
  {
    id: "local-expertise",
    title: "Expertise locale",
    description:
      "Connaissance approfondie des réglementations et marchés locaux",
    iconType: "check",
  },
  {
    id: "international-network",
    title: "Réseau international",
    description:
      "Partenariats avec des courtiers de référence dans le monde entier",
    iconType: "business",
  },
] as const;
