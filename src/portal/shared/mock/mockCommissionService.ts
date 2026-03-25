import { Commission, CommissionFilters, CommissionSummary } from '../types';
import { mockCommissions, getCommissionsByAgentId, getCommissionSummary } from './mockCommissions';
import { mockDelay } from './mockDelay';

// TODO: Replace with real API calls when backend is ready

export const getCommissions = async (filters?: CommissionFilters): Promise<Commission[]> => {
  let filteredCommissions = [...mockCommissions];

  if (filters) {
    if (filters.paymentStatus) {
      filteredCommissions = filteredCommissions.filter(c => c.paymentStatus === filters.paymentStatus);
    }
    if (filters.period) {
      filteredCommissions = filteredCommissions.filter(c => c.period === filters.period);
    }
    if (filters.agentId) {
      filteredCommissions = getCommissionsByAgentId(filters.agentId);
    }
  }

  return mockDelay(filteredCommissions);
};

export const getAgentCommissions = async (agentId: string): Promise<Commission[]> => {
  return mockDelay(getCommissionsByAgentId(agentId));
};

export const getCommissionSummaryService = async (agentId?: string): Promise<CommissionSummary> => {
  return mockDelay(getCommissionSummary(agentId));
};