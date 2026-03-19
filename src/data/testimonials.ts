// src/data/testimonials.ts
import { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: 'sarl-btp',
    quote: 'Humanis nous accompagne depuis 5 ans dans la gestion de nos assurances. Leur expertise en Risk Management nous a permis de réduire significativement nos sinistres et nos coûts.',
    author: 'Jean-Claude Mbarga',
    company: 'SARL BTP CONSTRUCT',
    sector: 'Construction',
    avatar: undefined // Will use initials
  },
  {
    id: 'family-client',
    quote: 'Grâce à Humanis, j\'ai pu souscrire une assurance habitation complète à un tarif très compétitif. L\'équipe est toujours disponible pour répondre à mes questions.',
    author: 'Marie Nguema',
    company: 'Cliente Particulier',
    sector: 'Particulier',
    avatar: undefined
  },
  {
    id: 'import-export',
    quote: 'Pour nos activités d\'import-export, nous avions besoin d\'un partenaire capable de gérer nos assurances transport international. Humanis maîtrise parfaitement ces enjeux.',
    author: 'Paul Essomba',
    company: 'CAMEROUN IMPORT-EXPORT',
    sector: 'Commerce International',
    avatar: undefined
  },
  {
    id: 'hotel-group',
    quote: 'Le suivi personnalisé et la réactivité de l\'équipe Humanis sont exceptionnels. Ils comprennent les spécificités de notre secteur hôtelier.',
    author: 'Fabrice Ondoua',
    company: 'DOUALA HOTEL GROUP',
    sector: 'Hôtellerie',
    avatar: undefined
  },
  {
    id: 'transport-company',
    quote: 'Humanis nous a aidés à optimiser notre couverture flotte automobile tout en réduisant nos primes. Leur approche Risk Management fait la différence.',
    author: 'Sylvie Atangana',
    company: 'CAMEROUN TRANSPORT',
    sector: 'Transport',
    avatar: undefined
  },
  {
    id: 'manufacturing',
    quote: 'En tant que PME manufacturière, nous apprécions l\'approche sur mesure de Humanis. Ils ont su adapter les solutions à notre réalité opérationnelle.',
    author: 'André Fokou',
    company: 'INDUSTRIE CAMEROUNAISE',
    sector: 'Industrie',
    avatar: undefined
  }
];