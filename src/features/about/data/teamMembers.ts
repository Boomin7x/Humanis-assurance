// src/features/about/data/teamMembers.ts
import { images } from "@/utils/imageLoader";

/**
 * TeamMember Interface
 */
export interface TeamMember {
  readonly name: string;
  readonly position: string;
  readonly credentials: string;
  readonly description: string;
  readonly image: string;
  readonly specialties: readonly string[];
  readonly yearsExperience: string;
}

/**
 * Team members data - Enhanced with professional credentials
 */
export const teamMembers: readonly TeamMember[] = [
  {
    name: "Jean-Claude Eyoum",
    position: "Directeur Général",
    credentials: "MBA Finance • Courtier CIMA certifié",
    description:
      "Expert en courtage d'assurance avec 20+ ans d'expérience. A accompagné 200+ entreprises dans leur stratégie de protection. Spécialiste des programmes internationaux et risk management stratégique.",
    image: images.team.member01,
    specialties: ["Courtage Entreprise", "Risk Management", "Conformité CIMA"],
    yearsExperience: "20+ ans",
  },
  {
    name: "Marie Ngono",
    position: "Directrice Opérationnelle",
    credentials: "Expert IARD • Certification Risk Manager",
    description:
      "Spécialiste en assurance vie et programmes internationaux. 15 ans d'expérience en structuration de programmes d'assurance complexes. A piloté 50+ audits de conformité réglementaire.",
    image: images.team.member02,
    specialties: [
      "Assurance Vie",
      "Programmes Internationaux",
      "Audit Conformité",
    ],
    yearsExperience: "15 ans",
  },
  {
    name: "Paul Mendomo",
    position: "Responsable IARDT",
    credentials: "Expert IARD • Gestionnaire Sinistres certifié",
    description:
      "Expert en assurance dommages et responsabilité civile. A négocié 100M+ FCFA d'indemnisations pour nos clients. Spécialiste en gestion de sinistres complexes et contentieux d'assurance.",
    image: images.team.member03,
    specialties: ["IARDT", "Gestion Sinistres", "Contentieux"],
    yearsExperience: "12 ans",
  },
  {
    name: "Sarah Bello",
    position: "Consultante Risk Management",
    credentials: "Risk Manager certifiée ARM • Auditrice interne",
    description:
      "Analyste risk manager spécialisée PME-PMI. A conduit 80+ audits de risque et cartographies pour entreprises camerounaises. Experte en prévention des risques et optimisation de la protection.",
    image: images.team.member04,
    specialties: ["Risk Management", "Audit Risques", "Prévention PME"],
    yearsExperience: "10 ans",
  },
] as const;
