// src/data/stats.ts
import { StatItem } from '@/types';

export const homeStats: StatItem[] = [
  {
    id: 'clients',
    value: 500,
    label: 'Clients accompagnés',
    suffix: '+'
  },
  {
    id: 'experience',
    value: 15,
    label: 'Années d\'expérience',
    suffix: '+'
  },
  {
    id: 'partners',
    value: 20,
    label: 'Compagnies partenaires',
    suffix: '+'
  },
  {
    id: 'expertise',
    value: 3,
    label: 'Pôles d\'expertise',
    suffix: ''
  }
];

export const processSteps = [
  {
    id: 'contact',
    number: 1,
    title: 'Contact initial',
    description: 'Prise de contact et évaluation préliminaire de vos besoins'
  },
  {
    id: 'audit',
    number: 2,
    title: 'Audit des besoins',
    description: 'Analyse approfondie de votre situation et identification des risques'
  },
  {
    id: 'proposition',
    number: 3,
    title: 'Proposition de couverture',
    description: 'Présentation de solutions personnalisées et comparaison des offres'
  },
  {
    id: 'souscription',
    number: 4,
    title: 'Souscription',
    description: 'Finalisation des contrats et mise en place des garanties'
  },
  {
    id: 'suivi',
    number: 5,
    title: 'Suivi & renouvellement',
    description: 'Accompagnement continu et optimisation de vos couvertures'
  }
];