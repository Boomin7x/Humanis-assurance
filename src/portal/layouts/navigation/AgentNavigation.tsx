// src/portal/layouts/navigation/AgentNavigation.tsx
// Professional insurance agent navigation - trust-building design

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Policy as PolicyIcon,
  Schedule as ScheduleIcon,
  MonetizationOn as CommissionIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface AgentNavigationProps {
  onNavigate?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactElement;
  description?: string;
}

const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/portal/agent/dashboard',
    icon: <DashboardIcon />,
    description: 'Overview and key metrics',
  },
  {
    label: 'Policies',
    path: '/portal/agent/policies',
    icon: <PolicyIcon />,
    description: 'Manage client policies',
  },
  {
    label: 'Expiring Policies',
    path: '/portal/agent/expiring',
    icon: <ScheduleIcon />,
    description: 'Policies due for renewal',
  },
  {
    label: 'Commissions',
    path: '/portal/agent/commissions',
    icon: <CommissionIcon />,
    description: 'Earnings and payments',
  },
];

/**
 * Agent-specific navigation component
 */
export function AgentNavigation({ onNavigate }: AgentNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string): void => {
    navigate(path);
    onNavigate?.();
  };

  const isActivePath = (path: string): boolean => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <List sx={{ pt: 1.5 }}>
      {navigationItems.map((item) => (
        <ListItem key={item.path} disablePadding>
          <ListItemButton
            selected={isActivePath(item.path)}
            onClick={() => handleNavigation(item.path)}
            sx={{
              mx: 1.5,
              my: 0.25,
              borderRadius: '4px',
              border: '1px solid transparent',
              transition: 'all 200ms ease-in-out',
              minHeight: 36,
              '&.Mui-selected': {
                bgcolor: 'primary.50',
                border: '1px solid',
                borderColor: 'primary.300',
                color: 'primary.700',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'primary.100',
                  borderColor: 'primary.400',
                },
                '& .MuiListItemIcon-root': {
                  color: 'primary.600',
                },
              },
              '&:hover:not(.Mui-selected)': {
                bgcolor: 'neutral.50',
                border: '1px solid',
                borderColor: 'neutral.200',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 32,
                color: isActivePath(item.path) ? 'inherit' : 'text.secondary',
                '& svg': {
                  fontSize: '1.125rem',
                },
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              secondary={item.description}
              primaryTypographyProps={{
                fontWeight: isActivePath(item.path) ? 600 : 500,
                fontSize: '0.8125rem',
                color: isActivePath(item.path) ? 'primary.700' : 'text.primary',
              }}
              secondaryTypographyProps={{
                fontSize: '0.6875rem',
                fontWeight: 400,
                color: isActivePath(item.path) ? 'primary.600' : 'text.secondary',
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}