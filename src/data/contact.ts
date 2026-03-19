// src/data/contact.ts
import { ContactInfo, FormField } from '@/types';

export const contactInfo: ContactInfo = {
  address: '688, Rue Joffre Akwa-Douala',
  phones: ['686 13 20 13', '686 13 29 13'],
  email: 'humanis@humanis-assurances.cm',
  website: 'www.humanis-assurances.com',
  hours: 'Lundi–Vendredi 8h–17h · Samedi 8h–13h'
};

export const contactFormFields: FormField[] = [
  {
    name: 'fullName',
    label: 'Nom complet',
    type: 'text',
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true
  },
  {
    name: 'phone',
    label: 'Téléphone',
    type: 'tel',
    required: false
  },
  {
    name: 'clientType',
    label: 'Vous êtes',
    type: 'select',
    required: true,
    options: [
      { value: 'particulier', label: 'Particulier' },
      { value: 'entreprise', label: 'Entreprise' },
      { value: 'autre', label: 'Autre' }
    ]
  },
  {
    name: 'subject',
    label: 'Objet',
    type: 'select',
    required: true,
    options: [
      { value: 'courtage', label: 'Courtage' },
      { value: 'risk-management', label: 'Risk Management' },
      { value: 'international', label: 'Programmes Internationaux' },
      { value: 'devis', label: 'Devis' },
      { value: 'autre', label: 'Autre' }
    ]
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true
  }
];

export const mapConfig = {
  center: { lat: 4.0483, lng: 9.7043 }, // Douala coordinates
  zoom: 15,
  address: '688 Rue Joffre, Akwa-Douala, Cameroun'
};