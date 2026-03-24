// src/features/about/data/missions.ts
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SecurityIcon from "@mui/icons-material/Security";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import React from "react";

/**
 * Mission Interface
 */
export interface Mission {
  readonly title: string;
  readonly description: string;
  readonly icon: React.ReactElement;
}

/**
 * Company missions data
 */
export const missions: readonly Mission[] = [
  {
    title: "Conformité réglementaire garantie",
    description:
      "Assurer une conformité totale aux directives CIMA et aux normes internationales d'assurance pour une protection juridiquement sécurisée",
    icon: React.createElement(VerifiedIcon),
  },
  {
    title: "Accompagnement des PME-PMI",
    description:
      "Soutenir la croissance des entreprises camerounaises avec des programmes d'assurance évolutifs, des audits de risque, et un conseil stratégique personnalisé",
    icon: React.createElement(TrendingUpIcon),
  },
  {
    title: "Courtage de niveau international",
    description:
      "Offrir aux grandes entreprises une expertise de courtage international avec une maîtrise approfondie des marchés CEMAC et des programmes d'assurance complexes",
    icon: React.createElement(BusinessCenterIcon),
  },
  {
    title: "Risk Management expert",
    description:
      "Intégrer la gestion des risques dans la stratégie d'entreprise : audit, prévention, cartographie des risques, et optimisation continue des programmes d'assurance",
    icon: React.createElement(SecurityIcon),
  },
] as const;
