import PhoneIcon from '@mui/icons-material/Phone';
import SecurityIcon from '@mui/icons-material/Security';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';

/**
 * Process step data structure
 */
export interface ProcessStep {
  readonly stepNumber: string;
  readonly title: string;
  readonly description: string;
  readonly icon: React.ReactElement;
}

/**
 * Client onboarding process steps
 */
export const processSteps: readonly ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Contact initial',
    description: 'Prise de contact initiale pour comprendre vos besoins',
    icon: <PhoneIcon />,
  },
  {
    stepNumber: '02',
    title: 'Audit des risques',
    description: 'Analyse détaillée de votre situation et de vos risques',
    icon: <SecurityIcon />,
  },
  {
    stepNumber: '03',
    title: 'Proposition',
    description: 'Présentation de solutions sur mesure et comparatifs',
    icon: <BusinessCenterIcon />,
  },
  {
    stepNumber: '04',
    title: 'Souscription',
    description: 'Souscription et mise en place des garanties',
    icon: <CheckCircleIcon />,
  },
  {
    stepNumber: '05',
    title: 'Suivi',
    description: 'Suivi personnalisé et gestion des renouvellements',
    icon: <GroupsIcon />,
  },
] as const;
