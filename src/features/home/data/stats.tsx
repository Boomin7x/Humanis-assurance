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
  readonly labelKey: string;
  readonly icon: React.ReactElement;
}

/**
 * Homepage statistics data
 */
export const statsData: readonly StatData[] = [
  {
    number: 500,
    suffix: "+",
    labelKey: "sections.stats.clients",
    icon: <GroupsIcon />,
  },
  {
    number: 15,
    suffix: "+",
    labelKey: "sections.stats.experience",
    icon: <BusinessCenterIcon />,
  },
  {
    number: 20,
    suffix: "+",
    labelKey: "sections.stats.partners",
    icon: <SecurityIcon />,
  },
  {
    number: 3,
    labelKey: "sections.stats.expertise",
    icon: <CheckCircleIcon />,
  },
] as const;
