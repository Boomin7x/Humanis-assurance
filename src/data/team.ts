// src/data/team.ts
import { TeamMember } from '@/types';
import { images } from '@/utils/imageLoader';

export const teamMembers: TeamMember[] = [
  {
    id: 'director-general',
    name: 'Jean Mbarga',
    role: 'Directeur Général',
    photo: images.team.member01,
    linkedin: 'https://linkedin.com/in/jean-mbarga-humanis'
  },
  {
    id: 'director-commercial',
    name: 'Marie Atangana',
    role: 'Directrice Commerciale',
    photo: images.team.member02,
    linkedin: 'https://linkedin.com/in/marie-atangana-humanis'
  },
  {
    id: 'risk-manager',
    name: 'Paul Essomba',
    role: 'Responsable Risk Management',
    photo: images.team.member03,
    linkedin: 'https://linkedin.com/in/paul-essomba-humanis'
  },
  {
    id: 'client-advisor',
    name: 'Sylvie Ondoua',
    role: 'Conseillère Clientèle',
    photo: images.team.member04,
    linkedin: 'https://linkedin.com/in/sylvie-ondoua-humanis'
  }
];

export const companyValues = [
  {
    id: 'ecoute',
    title: 'Écoute',
    description: 'Nous prenons le temps de comprendre vos besoins spécifiques',
    icon: 'ph:ear'
  },
  {
    id: 'disponibilite',
    title: 'Disponibilité',
    description: 'Notre équipe est accessible quand vous en avez besoin',
    icon: 'mdi:clock-check-outline'
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Nous adaptons constamment nos solutions aux évolutions du marché',
    icon: 'mdi:lightbulb-on-outline'
  },
  {
    id: 'respect',
    title: 'Respect des engagements',
    description: 'Nous honorons scrupuleusement nos promesses et nos délais',
    icon: 'mdi:handshake-outline'
  }
];

export const companyMissions = [
  {
    id: 'vulgarisation',
    number: 1,
    title: 'Vulgarisation des polices d\'assurances',
    description: 'Rendre accessible la compréhension des contrats d\'assurance'
  },
  {
    id: 'accompagnement-pme',
    number: 2,
    title: 'Accompagnement PME-PMI Camerounaise',
    description: 'Soutenir le développement des entreprises locales'
  },
  {
    id: 'service-global',
    number: 3,
    title: 'Service globalisé grandes entreprises & international',
    description: 'Solutions intégrées pour les groupes multinationaux'
  },
  {
    id: 'risk-management-pilier',
    number: 4,
    title: 'Risk management comme pilier PME-PMI',
    description: 'Développer la culture de prévention des risques'
  }
];