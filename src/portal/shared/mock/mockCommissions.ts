import { Commission, CommissionStatus, CommissionSummary } from "../types";

// 10 commission records for agent demonstration
export const mockCommissions: Commission[] = [
  {
    id: "comm-001",
    policyId: "pol-001",
    policyNumber: "HM-2024-001234",
    agentId: "agent-1",
    premiumAmount: 750000,
    commissionRate: 0.15,
    commissionAmount: 112500,
    currency: "XAF",
    paymentStatus: "Paid" as CommissionStatus,
    paymentDate: new Date("2024-01-25T10:30:00Z"),
    period: "2024-Q1",
    createdAt: new Date("2024-01-15T08:00:00Z"),
    paidAt: new Date("2024-01-25T10:30:00Z"),
  },
  {
    id: "comm-002",
    policyId: "pol-002",
    policyNumber: "HH-2024-001567",
    agentId: "agent-1",
    premiumAmount: 1200000,
    commissionRate: 0.12,
    commissionAmount: 144000,
    currency: "XAF",
    paymentStatus: "Paid" as CommissionStatus,
    paymentDate: new Date("2024-03-15T14:20:00Z"),
    period: "2024-Q1",
    createdAt: new Date("2024-03-01T12:00:00Z"),
    paidAt: new Date("2024-03-15T14:20:00Z"),
  },
  {
    id: "comm-003",
    policyId: "pol-003",
    policyNumber: "HL-2023-002345",
    agentId: "agent-1",
    premiumAmount: 2400000,
    commissionRate: 0.08,
    commissionAmount: 192000,
    currency: "XAF",
    paymentStatus: "Paid" as CommissionStatus,
    paymentDate: new Date("2023-07-01T11:45:00Z"),
    period: "2023-Q3",
    createdAt: new Date("2023-06-15T09:15:00Z"),
    paidAt: new Date("2023-07-01T11:45:00Z"),
  },
  {
    id: "comm-004",
    policyId: "pol-004",
    policyNumber: "HH-2024-002890",
    agentId: "agent-1",
    premiumAmount: 1800000,
    commissionRate: 0.1,
    commissionAmount: 180000,
    currency: "XAF",
    paymentStatus: "Paid" as CommissionStatus,
    paymentDate: new Date("2024-01-20T16:30:00Z"),
    period: "2024-Q1",
    createdAt: new Date("2024-01-01T11:00:00Z"),
    paidAt: new Date("2024-01-20T16:30:00Z"),
  },
  {
    id: "comm-005",
    policyId: "pol-005",
    policyNumber: "HB-2024-003456",
    agentId: "agent-1",
    premiumAmount: 3500000,
    commissionRate: 0.18,
    commissionAmount: 630000,
    currency: "XAF",
    paymentStatus: "Paid" as CommissionStatus,
    paymentDate: new Date("2024-02-15T13:45:00Z"),
    period: "2024-Q1",
    createdAt: new Date("2024-02-01T16:00:00Z"),
    paidAt: new Date("2024-02-15T13:45:00Z"),
  },
  {
    id: "comm-006",
    policyId: "pol-006",
    policyNumber: "HM-2024-004123",
    agentId: "agent-1",
    premiumAmount: 350000,
    commissionRate: 0.15,
    commissionAmount: 52500,
    currency: "XAF",
    paymentStatus: "Paid" as CommissionStatus,
    paymentDate: new Date("2024-04-25T10:15:00Z"),
    period: "2024-Q2",
    createdAt: new Date("2024-04-10T12:30:00Z"),
    paidAt: new Date("2024-04-25T10:15:00Z"),
  },
  {
    id: "comm-007",
    policyId: "pol-009",
    policyNumber: "HM-2024-007890",
    agentId: "agent-1",
    premiumAmount: 450000,
    commissionRate: 0.12,
    commissionAmount: 54000,
    currency: "XAF",
    paymentStatus: "Paid" as CommissionStatus,
    paymentDate: new Date("2024-02-25T15:20:00Z"),
    period: "2024-Q1",
    createdAt: new Date("2024-02-10T09:00:00Z"),
    paidAt: new Date("2024-02-25T15:20:00Z"),
  },
  // Pending commissions
  {
    id: "comm-008",
    policyId: "pol-010",
    policyNumber: "HH-2024-008901",
    agentId: "agent-1",
    premiumAmount: 900000,
    commissionRate: 0.12,
    commissionAmount: 108000,
    currency: "XAF",
    paymentStatus: "Pending" as CommissionStatus,
    period: "2024-Q1",
    createdAt: new Date("2024-03-05T14:45:00Z"),
  },
  {
    id: "comm-009",
    policyId: "pol-011",
    policyNumber: "HL-2024-009012",
    agentId: "agent-1",
    premiumAmount: 1600000,
    commissionRate: 0.08,
    commissionAmount: 128000,
    currency: "XAF",
    paymentStatus: "Pending" as CommissionStatus,
    period: "2024-Q1",
    createdAt: new Date("2024-01-30T14:15:00Z"),
  },
  {
    id: "comm-010",
    policyId: "pol-012",
    policyNumber: "HB-2024-009123",
    agentId: "agent-1",
    premiumAmount: 2800000,
    commissionRate: 0.18,
    commissionAmount: 504000,
    currency: "XAF",
    paymentStatus: "Processing" as CommissionStatus,
    period: "2024-Q1",
    createdAt: new Date("2024-01-01T11:45:00Z"),
  },
];

// Helper functions
export const getCommissionById = (id: string): Commission | undefined => {
  return mockCommissions.find((commission) => commission.id === id);
};

export const getCommissionsByAgentId = (agentId: string): Commission[] => {
  return mockCommissions.filter((commission) => commission.agentId === agentId);
};

export const getCommissionsByPolicyId = (policyId: string): Commission[] => {
  return mockCommissions.filter(
    (commission) => commission.policyId === policyId,
  );
};

export const getCommissionsByStatus = (
  status: CommissionStatus,
): Commission[] => {
  return mockCommissions.filter(
    (commission) => commission.paymentStatus === status,
  );
};

export const getCommissionsByPeriod = (period: string): Commission[] => {
  return mockCommissions.filter((commission) => commission.period === period);
};

export const getCommissionSummary = (agentId?: string): CommissionSummary => {
  const commissions = agentId
    ? getCommissionsByAgentId(agentId)
    : mockCommissions;

  const totalPaid = commissions
    .filter((c) => c.paymentStatus === "Paid")
    .reduce((total, commission) => total + commission.commissionAmount, 0);

  const totalPending = commissions
    .filter((c) => c.paymentStatus === "Pending")
    .reduce((total, commission) => total + commission.commissionAmount, 0);

  const totalProcessing = commissions
    .filter((c) => c.paymentStatus === "Processing")
    .reduce((total, commission) => total + commission.commissionAmount, 0);

  return {
    totalPaid,
    totalPending,
    totalProcessing,
    currency: "XAF",
    lastUpdated: new Date(),
  };
};

export const getTotalCommissionEarned = (
  agentId: string,
  status?: CommissionStatus,
): number => {
  let commissions = getCommissionsByAgentId(agentId);

  if (status) {
    commissions = commissions.filter((c) => c.paymentStatus === status);
  }

  return commissions.reduce(
    (total, commission) => total + commission.commissionAmount,
    0,
  );
};

export const getCommissionsByDateRange = (
  agentId: string,
  startDate: Date,
  endDate: Date,
): Commission[] => {
  return getCommissionsByAgentId(agentId).filter((commission) => {
    return commission.createdAt >= startDate && commission.createdAt <= endDate;
  });
};
