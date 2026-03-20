// src/portal/shared/components/ProtectedRoute.tsx
// Route protection component for authenticated access

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected route component that requires authentication
 * Redirects to login if user is not authenticated
 */
export function ProtectedRoute({ children }: ProtectedRouteProps): React.ReactElement {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while auth is being determined
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Redirect to login if not authenticated, preserving intended destination
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/portal/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
}