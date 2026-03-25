import { Claim, ClaimFilters, ClaimStatus, PaginatedResponse } from "../types";
import { mockClaims } from "./mockClaims";
import { mockDelay } from "./mockDelay";

// TODO: Replace with real API calls when backend is ready

// In-memory state for demo purposes (simulates backend state)
let claimsState = [...mockClaims];

/**
 * Get all claims with optional filtering and pagination
 */
export const getClaims = async (
  filters?: ClaimFilters,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<Claim>> => {
  let filteredClaims = [...claimsState];

  // Apply filters
  if (filters) {
    if (filters.status) {
      filteredClaims = filteredClaims.filter(
        (c) => c.status === filters.status,
      );
    }
    if (filters.policyNumber) {
      const searchTerm = filters.policyNumber.toLowerCase();
      filteredClaims = filteredClaims.filter((c) =>
        c.policyNumber.toLowerCase().includes(searchTerm),
      );
    }
    if (filters.dateFrom) {
      filteredClaims = filteredClaims.filter(
        (c) => c.dateReported >= filters.dateFrom!,
      );
    }
    if (filters.dateTo) {
      filteredClaims = filteredClaims.filter(
        (c) => c.dateReported <= filters.dateTo!,
      );
    }
  }

  // Sort by date reported (newest first)
  filteredClaims.sort(
    (a, b) => b.dateReported.getTime() - a.dateReported.getTime(),
  );

  // Pagination
  const total = filteredClaims.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const data = filteredClaims.slice(startIndex, endIndex);

  const response: PaginatedResponse<Claim> = {
    data,
    total,
    page,
    pageSize,
    totalPages,
  };

  return mockDelay(response);
};

/**
 * Get a single claim by ID
 */
export const getClaimDetails = async (
  claimId: string,
): Promise<Claim | null> => {
  const claim = claimsState.find((c) => c.id === claimId);
  return mockDelay(claim || null);
};

/**
 * Get claims for a specific customer
 */
export const getCustomerClaims = async (
  customerId: string,
): Promise<Claim[]> => {
  const claims = claimsState.filter((c) => c.customerId === customerId);
  return mockDelay(claims);
};

/**
 * Get claims for a specific policy
 */
export const getPolicyClaims = async (policyId: string): Promise<Claim[]> => {
  const claims = claimsState.filter((c) => c.policyId === policyId);
  return mockDelay(claims);
};

/**
 * Submit a new claim
 */
export const submitClaim = async (claimData: {
  policyId: string;
  policyNumber: string;
  customerId: string;
  dateOfIncident: Date;
  description: string;
  attachments?: string[];
}): Promise<Claim> => {
  const newClaim: Claim = {
    id: `clm-${Date.now()}`,
    claimNumber: `CLM-2024-${String(Date.now()).slice(-6)}`,
    ...claimData,
    dateReported: new Date(),
    status: "Open" as ClaimStatus,
    currency: "XAF",
    timeline: [
      {
        id: `tl-${Date.now()}-1`,
        date: new Date(),
        status: "Open" as ClaimStatus,
        description: "Claim submitted via customer portal",
        updatedBy: "Customer Portal",
        documents: claimData.attachments || [],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Add to beginning of claims array (most recent first)
  claimsState.unshift(newClaim);

  return mockDelay(newClaim, 1200); // Slightly longer delay for submission
};

/**
 * Update claim status (for demo purposes)
 */
export const updateClaimStatus = async (
  claimId: string,
  status: ClaimStatus,
  notes?: string,
): Promise<Claim | null> => {
  const claimIndex = claimsState.findIndex((c) => c.id === claimId);
  if (claimIndex === -1) {
    return mockDelay(null);
  }

  const claim = claimsState[claimIndex];
  const updatedClaim = {
    ...claim,
    status,
    updatedAt: new Date(),
    timeline: [
      ...claim.timeline,
      {
        id: `tl-${Date.now()}`,
        date: new Date(),
        status,
        description: notes || `Claim status updated to ${status}`,
        updatedBy: "Claims Team",
      },
    ],
  };

  claimsState[claimIndex] = updatedClaim;
  return mockDelay(updatedClaim);
};

/**
 * Search claims by claim number or description
 */
export const searchClaims = async (searchTerm: string): Promise<Claim[]> => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  const results = claimsState.filter(
    (claim) =>
      claim.claimNumber.toLowerCase().includes(lowerSearchTerm) ||
      claim.description.toLowerCase().includes(lowerSearchTerm) ||
      claim.policyNumber.toLowerCase().includes(lowerSearchTerm),
  );

  return mockDelay(results);
};

/**
 * Get claim statistics for dashboard
 */
export const getClaimStats = async (customerId?: string) => {
  const claims = customerId
    ? claimsState.filter((c) => c.customerId === customerId)
    : claimsState;

  const stats = {
    total: claims.length,
    open: claims.filter((c) => c.status === "Open").length,
    inProgress: claims.filter((c) => c.status === "In Progress").length,
    closed: claims.filter((c) => c.status === "Closed").length,
    approved: claims.filter((c) => c.status === "Approved").length,
    rejected: claims.filter((c) => c.status === "Rejected").length,
    totalClaimAmount: claims.reduce((sum, c) => sum + (c.claimAmount || 0), 0),
    totalSettledAmount: claims.reduce(
      (sum, c) => sum + (c.settledAmount || 0),
      0,
    ),
  };

  return mockDelay(stats);
};

/**
 * Get recent claims activity
 */
export const getRecentClaimsActivity = async (
  limit: number = 10,
): Promise<Claim[]> => {
  const recentClaims = claimsState
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, limit);

  return mockDelay(recentClaims);
};

// Reset function for demo purposes
export const resetClaimsState = (): void => {
  claimsState = [...mockClaims];
};
