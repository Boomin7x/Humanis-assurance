// src/features/about/data/values.ts
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedIcon from "@mui/icons-material/Verified";
import React from "react";

import { PRIMARY_500, TEAL_500 } from "@/theme/tokens";

/**
 * Value Interface
 */
export interface Value {
  readonly title: string;
  readonly description: string;
  readonly icon: React.ReactElement;
  readonly color: string;
}

/**
 * Company values data
 */
export const values: readonly Value[] = [
  {
    title: "Intégrité professionnelle",
    description:
      "Transparence absolue, conseil indépendant, et respect strict des codes déontologiques du courtage d'assurance",
    icon: React.createElement(VerifiedIcon),
    color: PRIMARY_500,
  },
  {
    title: "Réactivité opérationnelle",
    description:
      "Support client 24/7, gestion de sinistres accélérée, et accompagnement terrain pour une protection sans interruption",
    icon: React.createElement(AccessTimeIcon),
    color: TEAL_500,
  },
  {
    title: "Excellence technique",
    description:
      "Expertise pointue en risk management, conformité réglementaire, et ingénierie d'assurance complexe",
    icon: React.createElement(SecurityIcon),
    color: PRIMARY_500,
  },
  {
    title: "Engagement client",
    description:
      "Partenariat à long terme, résultats mesurables, audits réguliers, et amélioration continue de votre protection",
    icon: React.createElement(HandshakeIcon),
    color: TEAL_500,
  },
] as const;
