import { getImage, images } from '@/utils/imageLoader';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Product category data structure
 */
export interface ProductCategory {
  readonly id: 'iardt' | 'vie';
  readonly badgeText: string;
  readonly badgeVariant: 'blue' | 'teal';
  readonly title: string;
  readonly productCount: number;
  readonly ctaText: string;
  readonly href: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly overlayGradient: string;
  readonly hoverOverlayColor: string;
}

/**
 * Product categories for homepage showcase
 */
export const productCategories: readonly ProductCategory[] = [
  {
    id: 'iardt',
    badgeText: 'IARDT',
    badgeVariant: 'blue',
    title: 'Incendie, Accidents, Risques Divers & Transport',
    productCount: 14,
    ctaText: 'Explorer les produits IARDT',
    href: ROUTES.PRODUCTS_IARDT,
    imageUrl: getImage(images.services.businessMeeting, 'business'),
    imageAlt: 'Assurance IARDT - Entreprises et professionnels',
    overlayGradient:
      'linear-gradient(to top, rgba(17,27,46,0.95) 0%, rgba(17,27,46,0.20) 60%)',
    hoverOverlayColor: 'rgba(17,27,46,0.85)',
  },
  {
    id: 'vie',
    badgeText: 'Épargne',
    badgeVariant: 'teal',
    title: 'Prévoyance & Épargne',
    productCount: 8,
    ctaText: "Explorer l'assurance vie",
    href: ROUTES.PRODUCTS_VIE,
    imageUrl: getImage(images.clients.family, 'family'),
    imageAlt: 'Assurance Vie - Particuliers et familles',
    overlayGradient:
      'linear-gradient(to top, rgba(26,158,117,0.92) 0%, rgba(26,158,117,0.25) 60%)',
    hoverOverlayColor: 'rgba(26,158,117,0.85)',
  },
] as const;
