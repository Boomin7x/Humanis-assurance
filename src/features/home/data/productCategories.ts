import { getImage, images } from '@/utils/imageLoader';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Product category data structure
 */
export interface ProductCategory {
  readonly id: 'iardt' | 'vie';
  readonly badgeTextKey: string;
  readonly badgeVariant: 'blue' | 'teal';
  readonly titleKey: string;
  readonly productCount: number;
  readonly ctaTextKey: string;
  readonly href: string;
  readonly imageUrl: string;
  readonly imageAltKey: string;
  readonly overlayGradient: string;
  readonly hoverOverlayColor: string;
}

/**
 * Product categories for homepage showcase
 */
export const productCategories: readonly ProductCategory[] = [
  {
    id: 'iardt',
    badgeTextKey: 'sections.products.iardt.badge',
    badgeVariant: 'blue',
    titleKey: 'sections.products.iardt.title',
    productCount: 14,
    ctaTextKey: 'sections.products.iardt.cta',
    href: ROUTES.PRODUCTS_IARDT,
    imageUrl: getImage(images.services.businessMeeting, 'business'),
    imageAltKey: 'sections.products.iardt.imageAlt',
    overlayGradient:
      'linear-gradient(to top, rgba(17,27,46,0.95) 0%, rgba(17,27,46,0.20) 60%)',
    hoverOverlayColor: 'rgba(17,27,46,0.85)',
  },
  {
    id: 'vie',
    badgeTextKey: 'sections.products.life.badge',
    badgeVariant: 'teal',
    titleKey: 'sections.products.life.title',
    productCount: 8,
    ctaTextKey: 'sections.products.life.cta',
    href: ROUTES.PRODUCTS_VIE,
    imageUrl: getImage(images.clients.family, 'family'),
    imageAltKey: 'sections.products.life.imageAlt',
    overlayGradient:
      'linear-gradient(to top, rgba(26,158,117,0.92) 0%, rgba(26,158,117,0.25) 60%)',
    hoverOverlayColor: 'rgba(26,158,117,0.85)',
  },
] as const;
