/**
 * Application route constants
 * Single source of truth for all routes
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/a-propos',
  SERVICES: '/services',
  PRODUCTS: '/produits',
  CONTACT: '/contact',
  PRODUCTS_IARDT: '/produits#iardt',
  PRODUCTS_VIE: '/produits#vie',
  SERVICES_COURTAGE: '/services#courtage',
  SERVICES_RISK: '/services#risk-management',
  SERVICES_INTERNATIONAL: '/services#international',
} as const;

export type RouteKey = keyof typeof ROUTES;
