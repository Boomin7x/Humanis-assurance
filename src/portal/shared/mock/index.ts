// src/portal/shared/mock/index.ts
// Mock services and utilities for demo mode

// Mock delay utilities
export * from './mockDelay';

// Mock data
export * from './mockUsers';
export * from './mockPolicies';
export * from './mockClaims';
export * from './mockPayments';
export * from './mockCommissions';
export * from './mockNotifications';

// Mock services
export * from './mockAuthService';
export * from './mockPolicyService';
export * from './mockClaimService';
export * from './mockPaymentService';
export * from './mockCommissionService';
export * from './mockNotificationService';
export * from './mockRenewalService';

// Re-export types for convenience
export type {
  User,
  Policy,
  Claim,
  Payment,
  Commission,
  Notification,
  PolicyStatus,
  ClaimStatus,
  PaymentStatus,
  CommissionStatus,
  NotificationType,
  UserRole,
  AuthUser,
  AuthState,
  AuthSession,
  LoginCredentials,
  CommissionSummary,
  DashboardSummary,
  PaginationParams,
  PaginatedResponse,
  FilterParams,
  PolicyFilters,
  ClaimFilters,
  PaymentFilters,
  CommissionFilters,
  ApiResponse,
  RenewalRequest,
} from '../types';