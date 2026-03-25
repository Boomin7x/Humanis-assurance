export const QUIZ_OPTIONS = {
  clientTypes: [
    { value: "particulier", label: "Particulier" },
    { value: "entreprise", label: "Entreprise" },
    { value: "entreprise", label: "PME-PMI" }, // Maps to entreprise
  ],

  needs: {
    particulier: [
      { value: "habitation", label: "Protéger mon logement" },
      { value: "automobile", label: "Assurer mon véhicule" },
      { value: "famille", label: "Protéger ma famille" },
      { value: "epargne", label: "Épargner pour l'avenir" },
    ],

    entreprise: [
      { value: "responsabilite", label: "Responsabilité civile" },
      { value: "biens", label: "Protéger mes biens" },
      { value: "transport", label: "Transport/Logistique" },
      { value: "personnel", label: "Prévoyance personnel" },
    ],
  },

  budgets: [
    { value: "basic", label: "Moins de 50 000 FCFA/mois" },
    { value: "standard", label: "50 000 - 200 000 FCFA/mois" },
    { value: "premium", label: "Plus de 200 000 FCFA/mois" },
  ],
} as const;