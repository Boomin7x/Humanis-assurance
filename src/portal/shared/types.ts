// src/portal/shared/types.ts
// Shared types for portal authentication and user management

export type UserRole = 'agent' | 'customer' | 'admin';
export type PolicyStatus = 'Active' | 'Expired' | 'Cancelled' | 'Pending' | 'Suspended';
export type ClaimStatus = 'Open' | 'In Progress' | 'Closed' | 'Approved' | 'Rejected';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Processing';
export type CommissionStatus = 'Paid' | 'Pending' | 'Processing';
export type NotificationType = 'policy_expiring' | 'payment_pending' | 'claim_update' | 'renewal_reminder' | 'system_alert';

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  company?: string;
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  role: UserRole;
  isAuthenticated: boolean;
  expiresAt?: Date;
}

// User types
export interface User extends AuthUser {
  createdAt: Date;
  lastLoginAt?: Date;
}

// Policy types
export interface Policy {
  id: string;
  policyNumber: string;
  product: string;
  productType: 'Motor' | 'Home' | 'Life' | 'Health' | 'Business';
  customerName: string;
  customerId: string;
  agentId?: string;
  startDate: Date;
  endDate: Date;
  status: PolicyStatus;
  premium: number;
  currency: string;
  paymentFrequency: 'Monthly' | 'Quarterly' | 'Annual';
  riskAddress?: string;
  coverageAmount: number;
  deductible?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Claim types
export interface ClaimTimeline {
  id: string;
  date: Date;
  status: ClaimStatus;
  description: string;
  updatedBy: string;
  documents?: string[];
}

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyNumber: string;
  customerId: string;
  dateOfIncident: Date;
  dateReported: Date;
  description: string;
  status: ClaimStatus;
  claimAmount?: number;
  settledAmount?: number;
  currency: string;
  timeline: ClaimTimeline[];
  attachments?: string[];
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Payment types
export interface Payment {
  id: string;
  policyId: string;
  policyNumber: string;
  customerId: string;
  amount: number;
  currency: string;
  date: Date;
  dueDate: Date;
  status: PaymentStatus;
  method: 'Credit Card' | 'Bank Transfer' | 'Cash' | 'Check' | 'Mobile Money';
  transactionId?: string;
  reference: string;
  description: string;
  createdAt: Date;
  processedAt?: Date;
}

// Commission types
export interface Commission {
  id: string;
  policyId: string;
  policyNumber: string;
  agentId: string;
  premiumAmount: number;
  commissionRate: number;
  commissionAmount: number;
  currency: string;
  paymentStatus: CommissionStatus;
  paymentDate?: Date;
  period: string;
  createdAt: Date;
  paidAt?: Date;
}

export interface CommissionSummary {
  totalPaid: number;
  totalPending: number;
  totalProcessing: number;
  currency: string;
  lastUpdated: Date;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
  expiresAt?: Date;
}

// Pagination and filtering
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterParams {
  [key: string]: any;
}

export interface PolicyFilters extends FilterParams {
  status?: PolicyStatus;
  productType?: Policy['productType'];
  customerName?: string;
  agentId?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface ClaimFilters extends FilterParams {
  status?: ClaimStatus;
  policyNumber?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface PaymentFilters extends FilterParams {
  status?: PaymentStatus;
  policyNumber?: string;
  dateFrom?: Date;
  dateTo?: Date;
  method?: Payment['method'];
}

export interface CommissionFilters extends FilterParams {
  paymentStatus?: CommissionStatus;
  period?: string;
  agentId?: string;
}

// Dashboard types
export interface DashboardSummary {
  totalPolicies: number;
  activePolicies: number;
  expiringPolicies: number;
  totalClaims: number;
  openClaims: number;
  totalPayments: number;
  pendingPayments: number;
  lastPaymentAmount?: number;
  lastPaymentDate?: Date;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// Renewal types
export interface RenewalRequest {
  policyId: string;
  requestedBy: string;
  notes?: string;
}

// Mock auth error types
export class AuthError extends Error {
  constructor(message: string, public code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'UNAUTHORIZED') {
    super(message);
    this.name = 'AuthError';
  }
}