// src/portal/customer/index.ts
// Customer portal exports - dashboards, policies, claims, payments, etc.

// Dashboard
export { CustomerDashboard } from './pages/CustomerDashboard';

// Policies
export { CustomerPolicies, CustomerPolicyDetail } from './policies';

// Renewals
export { PolicyRenewals } from './renewals';

// Claims
export { Claims, ClaimDetail, DeclareClaimPanel } from './claims';

// Payments
export { Payments } from './payments';