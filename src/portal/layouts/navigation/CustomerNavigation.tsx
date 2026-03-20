// src/portal/layouts/navigation/CustomerNavigation.tsx
// Professional insurance customer navigation - trust-building design

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Policy as PolicyIcon,
  Refresh as RenewalIcon,
  Report as ClaimIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface CustomerNavigationProps {
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
    path: '/portal/customer/dashboard',
    icon: <DashboardIcon />,
    description: 'Your account overview',
  },
  {
    label: 'My Policies',
    path: '/portal/customer/policies',
    icon: <PolicyIcon />,
    description: 'View your policies',
  },
  {
    label: 'Renewals',
    path: '/portal/customer/renewals',
    icon: <RenewalIcon />,
    description: 'Upcoming renewals',
  },
  {
    label: 'Claims',
    path: '/portal/customer/claims',
    icon: <ClaimIcon />,
    description: 'Submit and track claims',
  },
  {
    label: 'Payments',
    path: '/portal/customer/payments',
    icon: <PaymentIcon />,
    description: 'Payment history and methods',
  },
];

/**
 * Customer-specific navigation component
 */
export function CustomerNavigation({ onNavigate }: CustomerNavigationProps) {
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
                bgcolor: 'secondary.50',
                border: '1px solid',
                borderColor: 'secondary.300',
                color: 'secondary.700',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'secondary.100',
                  borderColor: 'secondary.400',
                },
                '& .MuiListItemIcon-root': {
                  color: 'secondary.600',
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
                color: isActivePath(item.path) ? 'secondary.700' : 'text.primary',
              }}
              secondaryTypographyProps={{
                fontSize: '0.6875rem',
                fontWeight: 400,
                color: isActivePath(item.path) ? 'secondary.600' : 'text.secondary',
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}