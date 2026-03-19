import GroupsIcon from "@mui/icons-material/Groups";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

/**
 * Stat card data structure
 */
export interface StatData {
  readonly number: number;
  readonly suffix?: string;
  readonly label: string;
  readonly icon: React.ReactElement;
}

/**
 * Homepage statistics data
 */
export const statsData: readonly StatData[] = [
  {
    number: 500,
    suffix: "+",
    label: "Clients protégés",
    icon: <GroupsIcon />,
  },
  {
    number: 15,
    suffix: "+",
    label: "Années d'expérience",
    icon: <BusinessCenterIcon />,
  },
  {
    number: 20,
    suffix: "+",
    label: "Partenaires assureurs",
    icon: <SecurityIcon />,
  },
  {
    number: 3,
    label: "Domaines d'expertise",
    icon: <CheckCircleIcon />,
  },
] as const;
