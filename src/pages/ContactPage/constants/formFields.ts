export const FORM_FIELDS = {
  clientTypes: [
    { value: "particulier", label: "Particulier" },
    { value: "entreprise", label: "Entreprise" },
    { value: "autre", label: "Autre" },
  ],

  subjects: [
    { value: "devis", label: "Demande de devis personnalisé", priority: "high", description: "Obtenez votre tarification sur mesure" },
    { value: "courtage", label: "Services de courtage", priority: "medium", description: "Solutions professionnelles" },
    { value: "risk-management", label: "Gestion des risques", priority: "medium", description: "Analyse et prévention" },
    { value: "international", label: "Couverture internationale", priority: "medium", description: "Protection à l'étranger" },
    { value: "sinistre", label: "Déclaration de sinistre", priority: "high", description: "Assistance immédiate 24h/7j" },
    { value: "renouvellement", label: "Renouvellement de police", priority: "medium", description: "Mise à jour de votre contrat" },
    { value: "autre", label: "Autre demande", priority: "low", description: "Toute autre question" },
  ],

  coverageTypes: [
    { value: "auto", label: "Assurance Auto", icon: "mdi:car" },
    { value: "sante", label: "Assurance Santé", icon: "mdi:medical-bag" },
    { value: "habitation", label: "Assurance Habitation", icon: "mdi:home" },
    { value: "entreprise", label: "Assurance Entreprise", icon: "mdi:office-building" },
    { value: "voyage", label: "Assurance Voyage", icon: "mdi:airplane" },
    { value: "multiple", label: "Plusieurs couvertures", icon: "mdi:shield-check" },
  ],

  urgencyLevels: [
    { value: "immediate", label: "Immédiat (sous 24h)", priority: "high", color: "error" },
    { value: "week", label: "Cette semaine", priority: "medium", color: "warning" },
    { value: "month", label: "Ce mois-ci", priority: "normal", color: "info" },
    { value: "planning", label: "Planification future", priority: "low", color: "success" },
  ],

  companySizes: [
    { value: "micro", label: "Micro-entreprise (1-10)", range: "1-10" },
    { value: "small", label: "Petite entreprise (11-50)", range: "11-50" },
    { value: "medium", label: "Moyenne entreprise (51-250)", range: "51-250" },
    { value: "large", label: "Grande entreprise (250+)", range: "250+" },
  ],

  preferredContactTimes: [
    { value: "morning", label: "Matin (8h-12h)" },
    { value: "afternoon", label: "Après-midi (12h-17h)" },
    { value: "evening", label: "Soir (17h-19h)" },
    { value: "anytime", label: "Tout moment" },
  ],
} as const;

export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Improved Cameroon phone validation - supports MTN, Orange, Camtel formats
  cameroonPhone: /^(\+?237\s?)?[2679]\d{7}$|^(\+?237\s?)?[67]\d{8}$/,
  // Insurance-specific patterns
  estimatedValue: /^[\d,\s]+(\s*(FCFA|CFA|F))?$/i,
  fullName: /^[a-zA-Z\s\u00C0-\u017F'-]{2,50}$/,
  minMessageLength: 20, // Increased for better context
  maxMessageLength: 2000,
  // Business validation
  businessPhone: /^(\+?237\s?)?[2-79]\d{7,8}$/,
} as const;