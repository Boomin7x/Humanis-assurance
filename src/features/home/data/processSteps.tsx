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
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly icon: React.ReactElement;
}

/**
 * Client onboarding process steps
 */
export const processSteps: readonly ProcessStep[] = [
  {
    stepNumber: '01',
    titleKey: 'sections.process.steps.contact',
    descriptionKey: 'process.steps.contact.description',
    icon: <PhoneIcon />,
  },
  {
    stepNumber: '02',
    titleKey: 'sections.process.steps.audit',
    descriptionKey: 'process.steps.audit.description',
    icon: <SecurityIcon />,
  },
  {
    stepNumber: '03',
    titleKey: 'sections.process.steps.proposal',
    descriptionKey: 'process.steps.proposal.description',
    icon: <BusinessCenterIcon />,
  },
  {
    stepNumber: '04',
    titleKey: 'sections.process.steps.subscription',
    descriptionKey: 'process.steps.subscription.description',
    icon: <CheckCircleIcon />,
  },
  {
    stepNumber: '05',
    titleKey: 'sections.process.steps.followup',
    descriptionKey: 'process.steps.followup.description',
    icon: <GroupsIcon />,
  },
] as const;
