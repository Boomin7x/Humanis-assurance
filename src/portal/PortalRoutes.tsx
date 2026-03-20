// src/portal/PortalRoutes.tsx
// Portal routing configuration with lazy loading

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { AuthProvider } from './shared/hooks/useAuth';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { RoleRoute } from './shared/components/RoleRoute';
import { PortalLayout } from './layouts/PortalLayout';

// Lazy load portal pages for better performance
const LoginPage = lazy(() => import('./shared/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import('./shared/pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('./shared/pages/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));

// Agent portal pages
const AgentDashboard = lazy(() => import('./agent/pages/AgentDashboard').then(m => ({ default: m.AgentDashboard })));

// Customer portal pages
const CustomerDashboard = lazy(() => import('./customer/pages/CustomerDashboard').then(m => ({ default: m.CustomerDashboard })));

/**
 * Loading fallback component for lazy-loaded pages
 */
function PortalLoader(): React.ReactElement {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <CircularProgress size={60} />
    </Box>
  );
}

/**
 * Placeholder page for unimplemented routes
 */
function PlaceholderPage({ title }: { title: string }): React.ReactElement {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <CircularProgress sx={{ mb: 3 }} />
      <Box sx={{ typography: 'h5', mb: 2, fontWeight: 600 }}>
        {title}
      </Box>
      <Box sx={{ typography: 'body1', color: 'text.secondary' }}>
        This page is coming soon in the next development phase.
      </Box>
    </Box>
  );
}

/**
 * Portal routes with authentication and role-based access
 */
export function PortalRoutes(): React.ReactElement {
  return (
    <AuthProvider>
      <Suspense fallback={<PortalLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />

          {/* Protected routes with layout */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <PortalLayout />
              </ProtectedRoute>
            }
          >
            {/* Agent routes */}
            <Route path="agent/*" element={
              <RoleRoute requiredRole="agent">
                <Routes>
                  <Route path="dashboard" element={<AgentDashboard />} />
                  <Route path="policies" element={<PlaceholderPage title="Policies Management" />} />
                  <Route path="expiring" element={<PlaceholderPage title="Expiring Policies" />} />
                  <Route path="commissions" element={<PlaceholderPage title="Commissions" />} />
                  <Route path="" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </RoleRoute>
            } />

            {/* Customer routes */}
            <Route path="customer/*" element={
              <RoleRoute requiredRole="customer">
                <Routes>
                  <Route path="dashboard" element={<CustomerDashboard />} />
                  <Route path="policies" element={<PlaceholderPage title="My Policies" />} />
                  <Route path="renewals" element={<PlaceholderPage title="Renewals" />} />
                  <Route path="claims" element={<PlaceholderPage title="Claims" />} />
                  <Route path="payments" element={<PlaceholderPage title="Payments" />} />
                  <Route path="" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </RoleRoute>
            } />

            {/* Default redirect */}
            <Route path="" element={<Navigate to="login" replace />} />
          </Route>

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="login" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}