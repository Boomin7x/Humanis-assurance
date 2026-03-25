import { Policy, PolicyFilters, PaginatedResponse } from "../types";
import {
  mockPolicies,
  getPolicyById,
  getPoliciesByCustomerId,
  getPoliciesByAgentId,
  getPoliciesByStatus,
  getExpiringPolicies,
} from "./mockPolicies";
import { mockDelay } from "./mockDelay";

// TODO: Replace with real API calls when backend is ready

/**
 * Get all policies with optional filtering and pagination
 */
export const getPolicies = async (
  filters?: PolicyFilters,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<Policy>> => {
  let filteredPolicies = [...mockPolicies];

  // Apply filters
  if (filters) {
    if (filters.status) {
      filteredPolicies = getPoliciesByStatus(filters.status);
    }
    if (filters.productType) {
      filteredPolicies = filteredPolicies.filter(
        (p) => p.productType === filters.productType,
      );
    }
    if (filters.customerName) {
      const searchTerm = filters.customerName.toLowerCase();
      filteredPolicies = filteredPolicies.filter((p) =>
        p.customerName.toLowerCase().includes(searchTerm),
      );
    }
    if (filters.agentId) {
      filteredPolicies = filteredPolicies.filter(
        (p) => p.agentId === filters.agentId,
      );
    }
    if (filters.startDate) {
      filteredPolicies = filteredPolicies.filter(
        (p) => p.startDate >= filters.startDate!,
      );
    }
    if (filters.endDate) {
      filteredPolicies = filteredPolicies.filter(
        (p) => p.endDate <= filters.endDate!,
      );
    }
  }

  // Sort by creation date (newest first)
  filteredPolicies.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  // Pagination
  const total = filteredPolicies.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const data = filteredPolicies.slice(startIndex, endIndex);

  const response: PaginatedResponse<Policy> = {
    data,
    total,
    page,
    pageSize,
    totalPages,
  };

  return mockDelay(response);
};

/**
 * Get a single policy by ID
 */
export const getPolicyDetails = async (
  policyId: string,
): Promise<Policy | null> => {
  const policy = getPolicyById(policyId);
  return mockDelay(policy || null);
};

/**
 * Get policies for a specific customer
 */
export const getCustomerPolicies = async (
  customerId: string,
): Promise<Policy[]> => {
  const policies = getPoliciesByCustomerId(customerId);
  return mockDelay(policies);
};

/**
 * Get policies for a specific agent
 */
export const getAgentPolicies = async (agentId: string): Promise<Policy[]> => {
  const policies = getPoliciesByAgentId(agentId);
  return mockDelay(policies);
};

/**
 * Get policies expiring within specified days
 */
export const getExpiringPoliciesService = async (
  days: number = 30,
): Promise<Policy[]> => {
  const policies = getExpiringPolicies(days);
  return mockDelay(policies);
};

/**
 * Get policies expiring within specified days for a specific agent
 */
export const getAgentExpiringPolicies = async (
  agentId: string,
  days: number = 30,
): Promise<Policy[]> => {
  const allExpiring = getExpiringPolicies(days);
  const agentExpiring = allExpiring.filter(
    (policy) => policy.agentId === agentId,
  );
  return mockDelay(agentExpiring);
};

/**
 * Get policies expiring within specified days for a specific customer
 */
export const getCustomerExpiringPolicies = async (
  customerId: string,
  days: number = 30,
): Promise<Policy[]> => {
  const allExpiring = getExpiringPolicies(days);
  const customerExpiring = allExpiring.filter(
    (policy) => policy.customerId === customerId,
  );
  return mockDelay(customerExpiring);
};

/**
 * Search policies by policy number or customer name
 */
export const searchPolicies = async (searchTerm: string): Promise<Policy[]> => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  const results = mockPolicies.filter(
    (policy) =>
      policy.policyNumber.toLowerCase().includes(lowerSearchTerm) ||
      policy.customerName.toLowerCase().includes(lowerSearchTerm) ||
      policy.product.toLowerCase().includes(lowerSearchTerm),
  );

  return mockDelay(results);
};

/**
 * Get policy statistics for dashboard (Agent version)
 */
export const getPolicyStats = async (agentId?: string) => {
  const policies = agentId ? getPoliciesByAgentId(agentId) : mockPolicies;

  const stats = {
    total: policies.length,
    active: policies.filter((p) => p.status === "Active").length,
    expired: policies.filter((p) => p.status === "Expired").length,
    cancelled: policies.filter((p) => p.status === "Cancelled").length,
    pending: policies.filter((p) => p.status === "Pending").length,
    expiring30Days: getExpiringPolicies(30).filter(
      (p) => !agentId || p.agentId === agentId,
    ).length,
    expiring60Days: getExpiringPolicies(60).filter(
      (p) => !agentId || p.agentId === agentId,
    ).length,
    expiring90Days: getExpiringPolicies(90).filter(
      (p) => !agentId || p.agentId === agentId,
    ).length,
  };

  return mockDelay(stats);
};

/**
 * Get policy statistics for customer dashboard
 */
export const getCustomerPolicyStats = async (customerId: string) => {
  const policies = getPoliciesByCustomerId(customerId);

  const stats = {
    total: policies.length,
    active: policies.filter((p) => p.status === "Active").length,
    expired: policies.filter((p) => p.status === "Expired").length,
    cancelled: policies.filter((p) => p.status === "Cancelled").length,
    pending: policies.filter((p) => p.status === "Pending").length,
    expiring30Days: getExpiringPolicies(30).filter(
      (p) => p.customerId === customerId,
    ).length,
    expiring60Days: getExpiringPolicies(60).filter(
      (p) => p.customerId === customerId,
    ).length,
    expiring90Days: getExpiringPolicies(90).filter(
      (p) => p.customerId === customerId,
    ).length,
  };

  return mockDelay(stats);
};
