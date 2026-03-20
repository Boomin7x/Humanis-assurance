// src/portal/shared/components/RoleRoute.tsx
// Role-based route component for authorized access

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types';

interface RoleRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}

/**
 * Role-based route component that checks user authorization
 * Redirects based on user's actual role if access is denied
 */
export function RoleRoute({ children, requiredRole }: RoleRouteProps): React.ReactElement {
  const { role, isAuthenticated } = useAuth();

  // If not authenticated, this should be handled by ProtectedRoute
  if (!isAuthenticated || !role) {
    return <Navigate to="/portal/login" replace />;
  }

  // If user doesn't have the required role, redirect to their appropriate dashboard
  if (role !== requiredRole) {
    const redirectPath = role === 'agent'
      ? '/portal/agent/dashboard'
      : '/portal/customer/dashboard';

    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}