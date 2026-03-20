// src/theme/tokens.ts
/**
 * HUMANIS INSURANCE DESIGN SYSTEM - Design Tokens
 * Professional insurance industry compliance standards
 * Single source of truth for all visual values
 *
 * Insurance Industry Design Language: "Professional Authority"
 * - Conservative, trustworthy, authoritative appearance
 * - Trust-building through clean, professional aesthetics
 * - NO SHADOWS - depth through borders and background contrast
 * - Border radius: max 8px for insurance compliance
 * - Minimal gradients - only for hero sections if needed
 * - Every design decision builds user confidence in insurance services
 */

// ─── PRIMARY PALETTE ────────────────────────────────────────────────────────

/** Brand Navy/Blue - Insurance authority and trust colors */
export const BRAND_50 = "#F4F9FD"; // Subtle backgrounds, selected states
export const BRAND_100 = "#E8F3FA"; // Card hover, form focus backgrounds
export const BRAND_300 = "#5BA3CC"; // Border hover states
export const BRAND_500 = "#1D6FA4"; // ← Primary CTAs, links, insurance brand authority
export const BRAND_700 = "#1B3A5C"; // CTA hover, primary headings
export const BRAND_900 = "#0D1B2A"; // Deep navy for maximum authority and trust

/** Legacy PRIMARY tokens for backward compatibility */
export const PRIMARY_50 = BRAND_50;
export const PRIMARY_100 = BRAND_100;
export const PRIMARY_200 = "#95BAEA";
export const PRIMARY_300 = BRAND_300;
export const PRIMARY_400 = "#2E75C7";
export const PRIMARY_500 = BRAND_500; // Updated to match insurance design system
export const PRIMARY_600 = "#0A4D96";
export const PRIMARY_700 = BRAND_700; // Updated to match insurance design system
export const PRIMARY_800 = "#083D7A";
export const PRIMARY_900 = BRAND_900; // Updated to match insurance design system

/** Secondary - Success teal (insurance trust indicator) */
export const TEAL_50 = "#E6F7F2";
export const TEAL_100 = "#B3E5D4";
export const TEAL_200 = "#7DD0B3";
export const TEAL_300 = "#42BA8F";
export const TEAL_400 = "#1FAA7A";
export const TEAL_500 = "#16A34A"; // ← updated to match insurance success color
export const TEAL_600 = "#168563";
export const TEAL_700 = "#148560"; // hover state
export const TEAL_800 = "#0F6649";
export const TEAL_900 = "#094D37";

/** Dark navy - structure and authority */
export const NAVY_900 = "#111B2E"; // page hero backgrounds
export const NAVY_800 = "#1C2B45"; // ← headings, hero section bg
export const NAVY_700 = "#243558";
export const NAVY_600 = "#2C406B";
export const NAVY_OVERLAY = "rgba(17, 27, 46, 0.72)"; // hero overlay over photos

// ─── NEUTRAL SCALE ──────────────────────────────────────────────────────────

/** Neutral scale - Professional insurance greys for trust and clarity */
export const NEUTRAL_50 = "#F9FAFB"; // ← Main page background - clean, professional
export const NEUTRAL_100 = "#F3F4F6"; // Section backgrounds, card surfaces
export const NEUTRAL_200 = "#E5E7EB"; // Default borders, form outlines
export const NEUTRAL_300 = "#D1D5DB"; // ← Dividers, inactive states
export const NEUTRAL_400 = "#9CA3AF"; // Placeholder text, disabled states
export const NEUTRAL_500 = "#6B7280"; // Supporting text, captions
export const NEUTRAL_600 = "#4B5563"; // Secondary text
export const NEUTRAL_700 = "#374151"; // ← Primary body text - excellent readability
export const NEUTRAL_800 = "#1F2937"; // Strong text, important labels
export const NEUTRAL_900 = "#111827"; // Headings, maximum emphasis

// Remove legacy neutral tokens - now using insurance-standard neutral scale above

export const WHITE = "#FFFFFF";

// ─── SEMANTIC COLORS ────────────────────────────────────────────────────────

// Professional semantic colors for insurance applications
export const SUCCESS = "#16A34A"; // Policy approved, coverage active - trust building
export const WARNING = "#D97706"; // Policy expiration warnings, regulatory notices
export const ERROR = "#DC2626"; // Form validation errors, coverage issues
export const INFO = "#0284C7"; // General information, help text - professional blue
export const WHATSAPP = "#25D366"; // WhatsApp brand green
export const WHATSAPP_DARK = "#1EBE5A"; // hover

// ─── ALPHA/GLASS TOKENS ─────────────────────────────────────────────────────

/** Glass morphism surfaces */
export const GLASS_WHITE_10 = "rgba(255, 255, 255, 0.10)"; // navbar transparent state bg
export const GLASS_WHITE_15 = "rgba(255, 255, 255, 0.15)"; // navbar border
export const GLASS_WHITE_80 = "rgba(255, 255, 255, 0.80)"; // drawer background
export const GLASS_NAVY_04 = "rgba(13, 94, 175, 0.04)"; // card hover tint
export const GLASS_NAVY_08 = "rgba(13, 94, 175, 0.08)"; // active tab tint
export const GLASS_NAVY_15 = "rgba(28, 43, 69, 0.15)"; // hero pattern overlay

// ─── GRADIENT DEFINITIONS ───────────────────────────────────────────────────

/** Gradients - hero + dark section use only */
export const GRADIENT_HERO =
  "linear-gradient(135deg, #111B2E 0%, #1C2B45 50%, #0D3A6E 100%)";
export const GRADIENT_HERO_OVERLAY =
  "linear-gradient(90deg, rgba(17,27,46,0.90) 0%, rgba(17,27,46,0.40) 100%)";
export const GRADIENT_BLUE_SECTION =
  "linear-gradient(135deg, #0A4A91 0%, #0D5EAF 60%, #1A6FC4 100%)";
export const GRADIENT_TEAL_ACCENT =
  "linear-gradient(135deg, #148560 0%, #1A9E75 100%)";
export const GRADIENT_TEXT_HERO =
  "linear-gradient(135deg, #FFFFFF 0%, #B3D4F8 100%)"; // H1 gradient text on dark hero

// ─── PALETTE OBJECTS FOR MUI ───────────────────────────────────────────────

export const primaryPalette = {
  50: PRIMARY_50,
  100: PRIMARY_100,
  200: PRIMARY_200,
  300: PRIMARY_300,
  400: PRIMARY_400,
  500: PRIMARY_500,
  600: PRIMARY_600,
  700: PRIMARY_700,
  800: PRIMARY_800,
  900: PRIMARY_900,
};

export const tealPalette = {
  50: TEAL_50,
  100: TEAL_100,
  200: TEAL_200,
  300: TEAL_300,
  400: TEAL_400,
  500: TEAL_500,
  600: TEAL_600,
  700: TEAL_700,
  800: TEAL_800,
  900: TEAL_900,
};

export const neutralPalette = {
  50: NEUTRAL_50,
  100: NEUTRAL_100,
  200: NEUTRAL_200,
  300: NEUTRAL_300,
  400: NEUTRAL_400,
  500: NEUTRAL_500,
  600: NEUTRAL_600,
  700: NEUTRAL_700,
  800: NEUTRAL_800,
  900: NEUTRAL_900,
};

// ─── TYPE GUARD UTILITIES ───────────────────────────────────────────────────

export type ColorToken =
  | keyof typeof primaryPalette
  | keyof typeof tealPalette
  | keyof typeof neutralPalette;

export function isValidColorToken(token: string | number): token is ColorToken {
  return (
    token in primaryPalette || token in tealPalette || token in neutralPalette
  );
}
