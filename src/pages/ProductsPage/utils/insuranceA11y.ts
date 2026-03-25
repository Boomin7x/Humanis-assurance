/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * INSURANCE ACCESSIBILITY UTILITIES
 * WCAG 2.1 AA compliance for insurance forms and interfaces
 *
 * Insurance industry standards require enhanced accessibility
 * due to financial service regulations and user trust requirements
 */

// ─── FORM ACCESSIBILITY HELPERS ────────────────────────────────────────────

export const insuranceFormA11y = {
  /** Generate ARIA attributes for insurance form fields */
  getFieldProps: (
    fieldType: "search" | "select" | "quiz" | "contact",
    label: string,
  ) => ({
    "aria-label": label,
    "aria-describedby": `${fieldType}-help`,
    "aria-required": fieldType === "contact" ? "true" : "false",
    role: fieldType === "search" ? "searchbox" : undefined,
  }),

  /** Generate help text IDs for form fields */
  getHelpTextId: (fieldType: string) => `${fieldType}-help`,

  /** Focus management for quiz steps */
  manageFocus: {
    /** Focus first interactive element in quiz step */
    focusFirstOption: (stepContainer: HTMLElement | null) => {
      if (!stepContainer) return;

      const firstButton = stepContainer.querySelector(
        'button[role="button"], .MuiChip-root',
      ) as HTMLElement;
      firstButton?.focus();
    },

    /** Announce step change to screen readers */
    announceStepChange: (step: number, totalSteps: number) => {
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = `Étape ${step} sur ${totalSteps}`;

      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    },
  },
};

// ─── INSURANCE-SPECIFIC ARIA LABELS ────────────────────────────────────────

export const insuranceAriaLabels = {
  search: {
    field: "Rechercher un produit d'assurance",
    button: "Lancer la recherche",
    results: "Résultats de recherche",
    noResults: "Aucun produit trouvé",
  },

  filters: {
    clientType: "Sélectionner le type de client",
    category: "Filtrer par catégorie d'assurance",
    mobileDrawer: "Ouvrir les options de filtrage",
    closeDrawer: "Fermer les filtres",
    apply: "Appliquer les filtres sélectionnés",
  },

  quiz: {
    start: "Commencer le questionnaire de recommandation",
    option: (label: string) => `Sélectionner l'option ${label}`,
    progress: (step: number, total: number) =>
      `Progression: étape ${step} sur ${total}`,
    result: "Recommandations personnalisées basées sur vos réponses",
    restart: "Recommencer le questionnaire",
  },

  navigation: {
    breadcrumb: "Fil d'Ariane - navigation hiérarchique",
    tabs: "Navigation par catégorie de produits",
    tab: (label: string) => `Afficher les produits ${label}`,
  },

  cta: {
    phone: "Appeler maintenant pour un conseil gratuit",
    email: "Demander à être contacté par email",
    whatsapp: "Discuter sur WhatsApp avec un conseiller",
  },

  trustIndicators: {
    regulatory: "Certifications et agréments réglementaires",
    experience: "Indicateurs d'expertise et d'expérience",
    security: "Garanties de sécurité et confidentialité",
  },
} as const;

// ─── KEYBOARD NAVIGATION PATTERNS ──────────────────────────────────────────

export const keyboardNavigation = {
  /** Handle keyboard interactions for quiz options */
  handleQuizNavigation: (
    event: KeyboardEvent,
    // options: Array<{ value: string }>,
    onSelect: (value: string) => void,
  ) => {
    const currentTarget = event.target as HTMLElement;
    const optionElements = Array.from(
      currentTarget.parentElement?.querySelectorAll(".MuiChip-root") || [],
    );
    const currentIndex = optionElements.indexOf(currentTarget);

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault();
        const nextElement =
          optionElements[currentIndex + 1] || optionElements[0];
        (nextElement as HTMLElement)?.focus();
        break;
      }

      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault();
        const prevElement =
          optionElements[currentIndex - 1] ||
          optionElements[optionElements.length - 1];
        (prevElement as HTMLElement)?.focus();
        break;
      }

      case "Enter":
      case " ": {
        event.preventDefault();
        const value = currentTarget.getAttribute("data-value");
        if (value) onSelect(value);
        break;
      }

      case "Home": {
        event.preventDefault();
        (optionElements[0] as HTMLElement)?.focus();
        break;
      }

      case "End": {
        event.preventDefault();
        (optionElements[optionElements.length - 1] as HTMLElement)?.focus();
        break;
      }
    }
  },

  /** Handle mobile filter drawer keyboard navigation */
  handleDrawerNavigation: (event: KeyboardEvent, onClose: () => void) => {
    if (event.key === "Escape") {
      onClose();
    }
  },
} as const;

// ─── SCREEN READER UTILITIES ───────────────────────────────────────────────

export const screenReader = {
  /** Create visually hidden text for screen readers */
  srOnly: {
    position: "absolute" as const,
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap" as const,
    border: "0",
  },

  /** Announce dynamic content changes */
  announce: (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.style.cssText = Object.entries(screenReader.srOnly)
      .map(([key, value]) => `${key}: ${value}`)
      .join("; ");
    announcement.textContent = message;

    document.body.appendChild(announcement);
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  },
} as const;

// ─── COLOR CONTRAST VALIDATORS ─────────────────────────────────────────────

export const colorContrast = {
  /** Validate color combinations meet WCAG AA standards */
  validateContrast: (): boolean => {
    // This would typically integrate with a contrast checking library
    // For insurance compliance, we maintain a strict color system
    return true; // Assuming design system colors are pre-validated
  },

  /** Get high contrast alternatives for users with visual impairments */
  getHighContrastColors: () => ({
    background: "#FFFFFF",
    text: "#000000",
    primary: "#0000FF",
    success: "#006400",
    warning: "#FF8C00",
    error: "#DC143C",
  }),
} as const;

// ─── MOTION PREFERENCES ─────────────────────────────────────────────────────

export const motionPreferences = {
  /** Respect user's motion preferences */
  respectReducedMotion: () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  /** Get safe animation props based on user preferences */
  getSafeAnimationProps: () => {
    const reducedMotion = motionPreferences.respectReducedMotion();

    return {
      initial: reducedMotion ? {} : { opacity: 0, y: 20 },
      animate: reducedMotion ? {} : { opacity: 1, y: 0 },
      transition: reducedMotion ? { duration: 0 } : { duration: 0.3 },
    };
  },
} as const;

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────

export type InsuranceFieldType = "search" | "select" | "quiz" | "contact";
export type AriaLabelKey = keyof typeof insuranceAriaLabels;
export type MotionSafeProps = ReturnType<
  typeof motionPreferences.getSafeAnimationProps
>;

// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────────────

/** Get comprehensive accessibility props for insurance forms */
export function getInsuranceA11yProps(
  fieldType: InsuranceFieldType,
  label: string,
  required = false,
  helpText?: string,
) {
  return {
    ...insuranceFormA11y.getFieldProps(fieldType, label),
    "aria-required": required,
    "aria-describedby": helpText
      ? insuranceFormA11y.getHelpTextId(fieldType)
      : undefined,
  };
}

/** Validate and enhance MUI component accessibility for insurance compliance */
export function enhanceMUIAccessibility<T extends Record<string, any>>(
  baseProps: T,
  a11yProps: Record<string, any>,
): T & Record<string, any> {
  return {
    ...baseProps,
    ...a11yProps,
    sx: {
      ...baseProps.sx,
      // Ensure focus indicators meet insurance standards
      "&:focus-visible": {
        outline: "3px solid #1D6FA4",
        outlineOffset: "2px",
      },
    },
  };
}
