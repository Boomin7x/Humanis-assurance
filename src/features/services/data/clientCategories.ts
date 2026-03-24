// src/features/services/data/clientCategories.ts
/**
 * CLIENT CATEGORIES DATA
 *
 * Defines the two primary client segments: Particuliers (Individuals) and Entreprises (Businesses).
 * Each category includes specific features, CTAs, and visual presentation details.
 */

import type { ClientCategories } from "./types";
import { images } from "@/utils/imageLoader";

/**
 * Client category configurations (Particuliers vs Entreprises)
 * @constant
 * @readonly
 */
export const clientCategories: ClientCategories = [
  {
    id: "particuliers",
    title: "Vous êtes un particulier?",
    description: "Des solutions d'assurance adaptées à votre vie personnelle",
    iconType: "person",
    features: [
      "Assurance habitation",
      "Assurance automobile",
      "Assurance vie",
      "Prévoyance individuelle",
    ],
    ctaText: "Voir mes options",
    ctaHref: "/produits#vie",
    imageSrc: images.clients.family,
    imageAlt: "Famille camerounaise heureuse",
    overlayType: "blue",
    overlayOpacity: 0.7,
    gradientOverlay:
      "linear-gradient(to top, rgba(19, 60, 105, 0.92) 0%, rgba(26, 68, 158, 0.25) 100%)",
  },
  {
    id: "entreprises",
    title: "Vous êtes une entreprise?",
    description: "Des solutions professionnelles pour protéger votre activité",
    iconType: "business",
    features: [
      "Multirisques professionnelle",
      "Responsabilité civile",
      "Flotte automobile",
      "Risk Management",
    ],
    ctaText: "Voir mes options",
    ctaHref: "/produits#iardt",
    imageSrc: images.clients.businessTeam,
    imageAlt: "Équipe d'entreprise camerounaise",
    overlayType: "dark",
    overlayOpacity: 0.6,
    gradientOverlay:
      "linear-gradient(to top, rgba(26,158,117,0.92) 0%, rgba(26,158,117,0.25) 100%)",
  },
] as const;
