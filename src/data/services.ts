// src/data/services.ts
import { ServiceItem } from '@/types';
import { images } from '@/utils/imageLoader';

export const services: ServiceItem[] = [
  {
    id: 'courtage',
    title: 'Courtage d\'assurances',
    description: 'Audit, conseil et gestion transparente de vos contrats d\'assurance avec notre expertise de courtier agréé CIMA.',
    icon: 'mdi:shield-check',
    accentColor: 'blue',
    photo: images.office.teamAtWork
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    description: 'Identification, évaluation et maîtrise des risques pour garantir la continuité de votre activité.',
    icon: 'mdi:chart-line',
    accentColor: 'teal',
    photo: images.services.businessMeeting
  },
  {
    id: 'international',
    title: 'Programmes Internationaux',
    description: 'Gestion des programmes d\'assurance multi-pays pour vos filiales et activités internationales.',
    icon: 'mdi:earth',
    accentColor: 'blue',
    photo: images.services.international
  }
];

export const expertiseAreas = [
  {
    id: 'audit',
    title: 'Audit des portefeuilles',
    description: 'Analyse complète de vos couvertures existantes'
  },
  {
    id: 'conseil',
    title: 'Conseil et Orientation',
    description: 'Recommandations adaptées à vos besoins spécifiques'
  },
  {
    id: 'gestion',
    title: 'Gestion transparente et efficace des contrats',
    description: 'Suivi rigoureux et reporting détaillé'
  },
  {
    id: 'representation',
    title: 'Représentation et Défense des intérêts de l\'assuré',
    description: 'Accompagnement dans toutes vos démarches'
  },
  {
    id: 'risk-management-detail',
    title: 'Risk Management',
    description: 'Stratégies de prévention et de réduction des risques'
  }
];

export const riskManagementPillars = [
  {
    id: 'identify',
    number: 1,
    title: 'Identifier leurs risques',
    description: 'Cartographie complète des expositions'
  },
  {
    id: 'evaluate',
    number: 2,
    title: 'Évaluer leur impact',
    description: 'Quantification des enjeux financiers'
  },
  {
    id: 'control',
    number: 3,
    title: 'Maîtriser et réduire les pertes',
    description: 'Mise en place de mesures préventives'
  },
  {
    id: 'continuity',
    number: 4,
    title: 'Garantir la continuité d\'activité',
    description: 'Plans de reprise et solutions de financement'
  }
];