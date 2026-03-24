// src/features/services/data/riskManagementPillars.ts
/**
 * RISK MANAGEMENT PILLARS DATA
 *
 * The four fundamental pillars of Humanis Assurances' risk management methodology.
 * These represent a comprehensive approach to enterprise risk assessment and mitigation.
 */

import type { RiskManagementPillars } from "./types";

/**
 * The four pillars of risk management methodology
 * @constant
 * @readonly
 */
export const riskManagementPillars: RiskManagementPillars = [
  {
    id: "identify",
    number: 1,
    title: "Identifier leurs risques",
    description: "Cartographie complète des expositions",
  },
  {
    id: "evaluate",
    number: 2,
    title: "Évaluer leur impact",
    description: "Quantification des enjeux financiers",
  },
  {
    id: "control",
    number: 3,
    title: "Maîtriser et réduire les pertes",
    description: "Mise en place de mesures préventives",
  },
  {
    id: "continuity",
    number: 4,
    title: "Garantir la continuité d'activité",
    description: "Plans de reprise et solutions de financement",
  },
] as const;
