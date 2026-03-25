// src/portal/PortalRoutes.tsx
// Portal routing configuration with lazy loading

import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { AuthProvider } from "./shared/hooks/useAuth";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { RoleRoute } from "./shared/components/RoleRoute";
import { PortalLayout } from "./layouts/PortalLayout";

// Lazy load portal pages for better performance
const LoginPage = lazy(() =>
  import("./shared/pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const ForgotPasswordPage = lazy(() =>
  import("./shared/pages/ForgotPasswordPage").then((m) => ({
    default: m.ForgotPasswordPage,
  })),
);
const ResetPasswordPage = lazy(() =>
  import("./shared/pages/ResetPasswordPage").then((m) => ({
    default: m.ResetPasswordPage,
  })),
);

// Agent portal pages
const AgentDashboard = lazy(() =>
  import("./agent/pages/AgentDashboard").then((m) => ({
    default: m.AgentDashboard,
  })),
);
const AgentPolicies = lazy(() =>
  import("./agent/policies/AgentPolicies").then((m) => ({
    default: m.AgentPolicies,
  })),
);
const AgentPolicyDetail = lazy(() =>
  import("./agent/policies/AgentPolicyDetail").then((m) => ({
    default: m.AgentPolicyDetail,
  })),
);
const ExpiringPolicies = lazy(() =>
  import("./agent/expiring/ExpiringPolicies").then((m) => ({
    default: m.ExpiringPolicies,
  })),
);
const Commissions = lazy(() =>
  import("./agent/commissions/Commissions").then((m) => ({
    default: m.Commissions,
  })),
);

// Customer portal pages
const CustomerDashboard = lazy(() =>
  import("./customer/pages/CustomerDashboard").then((m) => ({
    default: m.CustomerDashboard,
  })),
);
const CustomerPolicies = lazy(() =>
  import("./customer/policies/CustomerPolicies").then((m) => ({
    default: m.CustomerPolicies,
  })),
);
const CustomerPolicyDetail = lazy(() =>
  import("./customer/policies/CustomerPolicyDetail").then((m) => ({
    default: m.CustomerPolicyDetail,
  })),
);
const PolicyRenewals = lazy(() =>
  import("./customer/renewals/PolicyRenewals").then((m) => ({
    default: m.PolicyRenewals,
  })),
);
const Claims = lazy(() =>
  import("./customer/claims/Claims").then((m) => ({ default: m.Claims })),
);
const ClaimDetail = lazy(() =>
  import("./customer/claims/ClaimDetail").then((m) => ({
    default: m.ClaimDetail,
  })),
);
const Payments = lazy(() =>
  import("./customer/payments/Payments").then((m) => ({ default: m.Payments })),
);

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
// function PlaceholderPage({ title }: { title: string }): React.ReactElement {
//   return (
//     <Box sx={{ textAlign: 'center', py: 8 }}>
//       <CircularProgress sx={{ mb: 3 }} />
//       <Box sx={{ typography: 'h5', mb: 2, fontWeight: 600 }}>
//         {title}
//       </Box>
//       <Box sx={{ typography: 'body1', color: 'text.secondary' }}>
//         This page is coming soon in the next development phase.
//       </Box>
//     </Box>
//   );
// }

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
            <Route
              path="agent/*"
              element={
                <RoleRoute requiredRole="agent">
                  <Routes>
                    <Route path="dashboard" element={<AgentDashboard />} />
                    <Route path="policies" element={<AgentPolicies />} />
                    <Route
                      path="policies/:id"
                      element={<AgentPolicyDetail />}
                    />
                    <Route path="expiring" element={<ExpiringPolicies />} />
                    <Route path="commissions" element={<Commissions />} />
                    <Route
                      path=""
                      element={<Navigate to="dashboard" replace />}
                    />
                  </Routes>
                </RoleRoute>
              }
            />

            {/* Customer routes */}
            <Route
              path="customer/*"
              element={
                <RoleRoute requiredRole="customer">
                  <Routes>
                    <Route path="dashboard" element={<CustomerDashboard />} />
                    <Route path="policies" element={<CustomerPolicies />} />
                    <Route
                      path="policies/:id"
                      element={<CustomerPolicyDetail />}
                    />
                    <Route path="renewals" element={<PolicyRenewals />} />
                    <Route path="claims" element={<Claims />} />
                    <Route path="claims/:id" element={<ClaimDetail />} />
                    <Route path="payments" element={<Payments />} />
                    <Route
                      path=""
                      element={<Navigate to="dashboard" replace />}
                    />
                  </Routes>
                </RoleRoute>
              }
            />

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
