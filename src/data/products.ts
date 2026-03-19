// src/data/products.ts
import { Product } from '@/types';

export const iardtProducts: Product[] = [
  {
    id: 'automobile',
    category: 'iardt',
    name: 'Automobile',
    description: 'Protection complète pour votre véhicule professionnel ou personnel',
    icon: 'mdi:car',
    coverages: [
      'Responsabilité Civile',
      'Dommages tous accidents',
      'Vol et incendie',
      'Bris de glace',
      'Assistance 24h/24'
    ]
  },
  {
    id: 'incendie',
    category: 'iardt',
    name: 'Incendie',
    description: 'Couverture contre les risques d\'incendie et catastrophes naturelles',
    icon: 'mdi:fire',
    coverages: [
      'Incendie',
      'Explosions',
      'Dégâts des eaux',
      'Catastrophes naturelles',
      'Pertes d\'exploitation'
    ]
  },
  {
    id: 'multirisques-professionnelle',
    category: 'iardt',
    name: 'Multirisques Professionnelle',
    description: 'Protection globale de votre activité professionnelle',
    icon: 'mdi:office-building',
    coverages: [
      'Responsabilité Civile Professionnelle',
      'Dommages aux biens',
      'Pertes d\'exploitation',
      'Cyber-risques',
      'Responsabilité dirigeant'
    ]
  },
  {
    id: 'multirisques-habitation',
    category: 'iardt',
    name: 'Multirisques Habitation',
    description: 'Sécurisez votre domicile et vos biens personnels',
    icon: 'mdi:home',
    coverages: [
      'Incendie et explosion',
      'Dégâts des eaux',
      'Vol et vandalisme',
      'Responsabilité Civile vie privée',
      'Bris de glace'
    ]
  },
  {
    id: 'multirisques-commerce',
    category: 'iardt',
    name: 'Multirisques Commerce',
    description: 'Solutions adaptées aux commerçants et artisans',
    icon: 'mdi:store',
    coverages: [
      'Dommages aux locaux commerciaux',
      'Stock et marchandises',
      'Matériel professionnel',
      'Pertes d\'exploitation',
      'Responsabilité Civile'
    ]
  },
  {
    id: 'globale-banque',
    category: 'iardt',
    name: 'Globale de Banque',
    description: 'Couverture spécialisée pour les institutions financières',
    icon: 'mdi:bank',
    coverages: [
      'Responsabilité Professionnelle',
      'Détournements',
      'Vol d\'espèces',
      'Cyber-sécurité',
      'Erreurs et omissions'
    ]
  },
  {
    id: 'responsabilite-civile',
    category: 'iardt',
    name: 'Responsabilité Civile',
    description: 'Protection contre les dommages causés aux tiers',
    icon: 'mdi:shield-account',
    coverages: [
      'Dommages corporels',
      'Dommages matériels',
      'Dommages immatériels',
      'Défense et recours',
      'Assistance juridique'
    ]
  },
  {
    id: 'maladie-assistance',
    category: 'iardt',
    name: 'Maladie & Assistance',
    description: 'Couverture santé et services d\'assistance',
    icon: 'mdi:medical-bag',
    coverages: [
      'Frais médicaux',
      'Hospitalisation',
      'Assistance rapatriement',
      'Télémédecine',
      'Prévention santé'
    ]
  },
  {
    id: 'transport-terrestre',
    category: 'iardt',
    name: 'Transport Terrestre',
    description: 'Assurance des marchandises en transport routier',
    icon: 'mdi:truck',
    coverages: [
      'Marchandises transportées',
      'Avaries particulières',
      'Vol en cours de transport',
      'Responsabilité transporteur',
      'Frais de sauvetage'
    ]
  },
  {
    id: 'transport-maritime',
    category: 'iardt',
    name: 'Transport Maritime',
    description: 'Protection des marchandises par voie maritime',
    icon: 'mdi:ferry',
    coverages: [
      'Avarie commune',
      'Avarie particulière',
      'Risques de guerre',
      'Mouille et pluie',
      'Frais de manutention'
    ]
  },
  {
    id: 'transport-aerien',
    category: 'iardt',
    name: 'Transport Aérien',
    description: 'Couverture spécialisée pour le transport aérien',
    icon: 'mdi:airplane',
    coverages: [
      'Marchandises aériennes',
      'Retard de livraison',
      'Détournement',
      'Responsabilité aérienne',
      'Assistance cargo'
    ]
  },
  {
    id: 'individuelle-accident',
    category: 'iardt',
    name: 'Individuelle Accident',
    description: 'Protection personnelle contre les accidents',
    icon: 'mdi:account-injury',
    coverages: [
      'Décès accidentel',
      'Invalidité permanente',
      'Incapacité temporaire',
      'Frais médicaux',
      'Assistance domicile'
    ]
  },
  {
    id: 'caution-financiere',
    category: 'iardt',
    name: 'Caution et Ligne Financière',
    description: 'Garanties financières et cautionnements',
    icon: 'mdi:currency-usd',
    coverages: [
      'Caution de soumission',
      'Caution de bonne exécution',
      'Avance sur marché',
      'Garantie de restitution',
      'Ligne de crédit'
    ]
  },
  {
    id: 'tous-risques-chantier',
    category: 'iardt',
    name: 'Tous Risques Chantier',
    description: 'Couverture complète des projets de construction',
    icon: 'mdi:hard-hat',
    coverages: [
      'Dommages aux ouvrages',
      'Matériel de chantier',
      'Responsabilité décennale',
      'Responsabilité civile chantier',
      'Garantie de parfait achèvement'
    ]
  }
];

export const vieProducts: Product[] = [
  {
    id: 'epargne-projet',
    category: 'vie',
    name: 'Épargne Projet',
    description: 'Constituez votre épargne pour réaliser vos projets',
    icon: 'mdi:piggy-bank',
    coverages: [
      'Capital garanti',
      'Participation aux bénéfices',
      'Versements libres',
      'Rachat partiel',
      'Avance sur police'
    ]
  },
  {
    id: 'retraite-complementaire',
    category: 'vie',
    name: 'Retraite Complémentaire',
    description: 'Préparez sereinement votre retraite',
    icon: 'mdi:account-clock',
    coverages: [
      'Rente viagère',
      'Capital constitué',
      'Réversion au conjoint',
      'Indexation',
      'Option de sortie'
    ]
  },
  {
    id: 'emprunteur',
    category: 'vie',
    name: 'Emprunteur',
    description: 'Protégez vos proches en cas de décès ou invalidité',
    icon: 'mdi:home-city',
    coverages: [
      'Décès',
      'Invalidité totale',
      'Incapacité de travail',
      'Perte d\'emploi',
      'Capital dégressif'
    ]
  },
  {
    id: 'prevoyance-groupe',
    category: 'vie',
    name: 'Prévoyance Groupe',
    description: 'Solutions de prévoyance pour vos collaborateurs',
    icon: 'mdi:account-group',
    coverages: [
      'Frais d\'obsèques',
      'Capital décès',
      'Rente éducation',
      'Incapacité de travail',
      'Assistance famille'
    ]
  },
  {
    id: 'fin-carriere',
    category: 'vie',
    name: 'Indemnité de Fin de Carrière',
    description: 'Anticipez les obligations patronales de fin de carrière',
    icon: 'mdi:briefcase-check',
    coverages: [
      'Provision légale',
      'Garantie décès',
      'Invalidité totale',
      'Gestion externalisée',
      'Optimisation fiscale'
    ]
  },
  {
    id: 'education-enfant',
    category: 'vie',
    name: 'Éducation Enfant',
    description: 'Assurez l\'avenir scolaire de vos enfants',
    icon: 'mdi:school',
    coverages: [
      'Capital formation',
      'Frais de scolarité',
      'Exonération primes',
      'Double effet',
      'Bourses d\'études'
    ]
  },
  {
    id: 'epargne-journaliere',
    category: 'vie',
    name: 'Épargne Journalière',
    description: 'Épargne accessible et flexible au quotidien',
    icon: 'mdi:calendar-check',
    coverages: [
      'Versements quotidiens',
      'Disponibilité immédiate',
      'Taux progressif',
      'Prime de fidélité',
      'Gestion mobile'
    ]
  },
  {
    id: 'homme-cle',
    category: 'vie',
    name: 'Homme Clé',
    description: 'Protégez votre entreprise en cas de disparition d\'une personne clé',
    icon: 'mdi:key-person',
    coverages: [
      'Perte d\'exploitation',
      'Frais de recrutement',
      'Formation remplaçant',
      'Maintien activité',
      'Indemnisation clients'
    ]
  }
];

export const allProducts = [...iardtProducts, ...vieProducts];