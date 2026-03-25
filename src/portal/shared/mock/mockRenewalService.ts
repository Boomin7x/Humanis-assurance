import { RenewalRequest } from '../types';
import { mockDelay } from './mockDelay';

// TODO: Replace with real API calls when backend is ready

export type RenewalStatus = 'none' | 'pending' | 'approved' | 'rejected' | 'expired';

export interface ExtendedRenewalRequest extends RenewalRequest {
  id: string;
  submittedAt: Date;
  status: RenewalStatus;
  estimatedProcessingTime?: number; // in days
  agentNotes?: string;
  newTerms?: {
    premiumAmount?: number;
    coverageAmount?: number;
    validUntil?: Date;
  };
}

// In-memory state for tracking renewal requests in demo
const renewalRequests: Map<string, ExtendedRenewalRequest> = new Map();

// Mock some existing renewal requests for demo purposes
const initializeDemo = () => {
  if (renewalRequests.size === 0) {
    renewalRequests.set('policy-1', {
      id: 'renewal-1',
      policyId: 'policy-1',
      requestedBy: 'customer-1',
      notes: 'Please renew my auto insurance policy',
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: 'pending',
      estimatedProcessingTime: 5,
    });
  }
};

/**
 * Submit a renewal request for a policy
 */
export const requestRenewal = async (
  policyId: string,
  requestedBy: string,
  notes?: string
): Promise<ExtendedRenewalRequest> => {
  initializeDemo();

  const renewalRequest: ExtendedRenewalRequest = {
    id: `renewal-${Date.now()}`,
    policyId,
    requestedBy,
    notes,
    submittedAt: new Date(),
    status: 'pending',
    estimatedProcessingTime: 7, // Default 7 days processing
  };

  renewalRequests.set(policyId, renewalRequest);
  return mockDelay(renewalRequest, 1000); // Simulate processing time
};

/**
 * Get renewal status for a specific policy
 */
export const getRenewalStatus = async (policyId: string): Promise<ExtendedRenewalRequest | null> => {
  initializeDemo();
  const request = renewalRequests.get(policyId) || null;
  return mockDelay(request);
};

/**
 * Get all renewal requests for a customer
 */
export const getCustomerRenewalRequests = async (customerId: string): Promise<ExtendedRenewalRequest[]> => {
  initializeDemo();
  const requests = Array.from(renewalRequests.values())
    .filter(request => request.requestedBy === customerId)
    .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());

  return mockDelay(requests);
};

/**
 * Get all renewal requests (for agent/admin view)
 */
export const getAllRenewalRequests = async (): Promise<ExtendedRenewalRequest[]> => {
  initializeDemo();
  const requests = Array.from(renewalRequests.values())
    .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());

  return mockDelay(requests);
};

/**
 * Cancel a renewal request
 */
export const cancelRenewalRequest = async (policyId: string): Promise<void> => {
  renewalRequests.delete(policyId);
  return mockDelay(undefined, 500);
};

/**
 * Update renewal request status (for agent use)
 */
export const updateRenewalRequestStatus = async (
  policyId: string,
  status: RenewalStatus,
  agentNotes?: string,
  newTerms?: ExtendedRenewalRequest['newTerms']
): Promise<ExtendedRenewalRequest | null> => {
  const request = renewalRequests.get(policyId);
  if (!request) return null;

  const updatedRequest: ExtendedRenewalRequest = {
    ...request,
    status,
    agentNotes,
    newTerms,
  };

  renewalRequests.set(policyId, updatedRequest);
  return mockDelay(updatedRequest, 800);
};