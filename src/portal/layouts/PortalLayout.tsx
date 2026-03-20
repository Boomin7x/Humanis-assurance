// src/portal/layouts/PortalLayout.tsx
// Shared portal layout with navigation and responsive drawer

import { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Chip,
  Badge,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/hooks/useAuth';
import { AgentNavigation } from './navigation/AgentNavigation';
import { CustomerNavigation } from './navigation/CustomerNavigation';

const DRAWER_WIDTH = 240;

/**
 * Shared portal layout component with responsive navigation
 */
export function PortalLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate('/portal/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDrawerToggle = (): void => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleDrawerClose = (): void => {
    setMobileDrawerOpen(false);
  };

  // Render navigation based on user role
  const renderNavigation = () => {
    if (role === 'agent') {
      return <AgentNavigation onNavigate={handleDrawerClose} />;
    }
    return <CustomerNavigation onNavigate={handleDrawerClose} />;
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Professional Insurance Logo Section */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 0.5,
          backgroundColor: 'background.paper',
        }}
      >
        {/* Brand Authority */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              color: 'primary.700',
              fontSize: '1.125rem',
            }}
          >
            Humanis
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: '0.625rem',
            letterSpacing: '0.05em',
            ml: 1.75,
          }}
        >
          Insurance Portal
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {renderNavigation()}
      </Box>

      {/* Professional User Section */}
      <Box
        sx={{
          p: 1.5,
          borderTop: `1px solid ${theme.palette.divider}`,
          mt: 'auto',
          backgroundColor: 'neutral.50',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: theme.palette.primary.main,
              fontSize: '0.8125rem',
              fontWeight: 600,
              border: `1px solid ${theme.palette.background.paper}`,
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              noWrap
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 0.25,
                fontSize: '0.75rem',
                display: 'block',
              }}
            >
              {user?.name || 'User'}
            </Typography>
            <Chip
              label={role === 'agent' ? 'Agent' : 'Customer'}
              size="small"
              color={role === 'agent' ? 'primary' : 'secondary'}
              sx={{
                fontSize: '0.625rem',
                height: 18,
                fontWeight: 500,
                borderRadius: '3px',
              }}
            />
          </Box>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          size="small"
          sx={{
            borderColor: 'neutral.300',
            color: 'text.secondary',
            fontWeight: 500,
            textTransform: 'none',
            py: 0.75,
            fontSize: '0.75rem',
            minHeight: 32,
            '&:hover': {
              borderColor: 'error.main',
              color: 'error.main',
              backgroundColor: 'error.50',
            },
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Professional App Bar */}
      <AppBar
        position="fixed"
        elevation={0} // Insurance compliance - no shadows
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none', // Insurance compliance
        }}
      >
        <Toolbar variant="dense">
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
              size="small"
              sx={{ mr: 1.5 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="subtitle1"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              color: 'primary.700',
              fontSize: '1rem',
            }}
          >
            Insurance Portal
          </Typography>

          {/* Professional Demo Indicator */}
          <Chip
            label="🛡️ Demo"
            size="small"
            sx={{
              bgcolor: 'info.50',
              color: 'info.700',
              fontWeight: 500,
              fontSize: '0.625rem',
              border: `1px solid ${theme.palette.info.main}`,
              mr: 1.5,
              height: 24,
            }}
          />

          {/* Notifications */}
          <IconButton color="inherit" size="small" sx={{ mr: 1.5 }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>

          {/* Professional User Info (desktop only) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    fontSize: '0.75rem',
                    display: 'block',
                  }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                  }}
                >
                  {role === 'agent' ? 'Agent' : 'Customer'}
                </Typography>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              position: 'relative',
              height: '100vh',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          bgcolor: 'neutral.50', // Professional insurance background
        }}
      >
        <Toolbar variant="dense" /> {/* Spacer for AppBar */}
        <Box sx={{ p: 1.5 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}