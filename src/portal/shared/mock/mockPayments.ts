import { Payment, PaymentStatus } from "../types";

// 14 payment records with varied statuses and methods
export const mockPayments: Payment[] = [
  {
    id: "pay-001",
    policyId: "pol-001",
    policyNumber: "HM-2024-001234",
    customerId: "customer-1",
    amount: 750000,
    currency: "XAF",
    date: new Date("2024-01-15T10:30:00Z"),
    dueDate: new Date("2024-01-15T23:59:59Z"),
    status: "Paid" as PaymentStatus,
    method: "Bank Transfer",
    transactionId: "TXN-2024-001234567",
    reference: "HM-2024-001234-001",
    description: "Annual premium payment for Comprehensive Motor Insurance",
    createdAt: new Date("2024-01-01T08:00:00Z"),
    processedAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "pay-002",
    policyId: "pol-002",
    policyNumber: "HH-2024-001567",
    customerId: "customer-002",
    amount: 300000,
    currency: "XAF",
    date: new Date("2024-03-01T14:15:00Z"),
    dueDate: new Date("2024-03-01T23:59:59Z"),
    status: "Paid" as PaymentStatus,
    method: "Credit Card",
    transactionId: "TXN-2024-001234568",
    reference: "HH-2024-001567-001",
    description: "Q1 2024 premium payment for Home & Contents Insurance",
    createdAt: new Date("2024-02-25T12:00:00Z"),
    processedAt: new Date("2024-03-01T14:15:00Z"),
  },
  {
    id: "pay-003",
    policyId: "pol-002",
    policyNumber: "HH-2024-001567",
    customerId: "customer-002",
    amount: 300000,
    currency: "XAF",
    date: new Date("2024-06-01T09:45:00Z"),
    dueDate: new Date("2024-06-01T23:59:59Z"),
    status: "Paid" as PaymentStatus,
    method: "Mobile Money",
    transactionId: "MTN-2024-987654321",
    reference: "HH-2024-001567-002",
    description: "Q2 2024 premium payment for Home & Contents Insurance",
    createdAt: new Date("2024-05-25T10:30:00Z"),
    processedAt: new Date("2024-06-01T09:45:00Z"),
  },
  {
    id: "pay-004",
    policyId: "pol-003",
    policyNumber: "HL-2023-002345",
    customerId: "customer-003",
    amount: 2400000,
    currency: "XAF",
    date: new Date("2023-06-15T11:20:00Z"),
    dueDate: new Date("2023-06-15T23:59:59Z"),
    status: "Paid" as PaymentStatus,
    method: "Bank Transfer",
    transactionId: "TXN-2023-556677889",
    reference: "HL-2023-002345-001",
    description: "Annual premium payment for Term Life Insurance",
    createdAt: new Date("2023-06-01T08:15:00Z"),
    processedAt: new Date("2023-06-15T11:20:00Z"),
  },
  {
    id: "pay-005",
    policyId: "pol-004",
    policyNumber: "HH-2024-002890",
    customerId: "customer-004",
    amount: 150000,
    currency: "XAF",
    date: new Date("2024-01-31T16:30:00Z"),
    dueDate: new Date("2024-01-31T23:59:59Z"),
    status: "Paid" as PaymentStatus,
    method: "Credit Card",
    transactionId: "TXN-2024-445566778",
    reference: "HH-2024-002890-001",
    description: "January 2024 premium payment for Health Insurance",
    createdAt: new Date("2024-01-25T12:00:00Z"),
    processedAt: new Date("2024-01-31T16:30:00Z"),
  },
  {
    id: "pay-006",
    policyId: "pol-005",
    policyNumber: "HB-2024-003456",
    customerId: "customer-005",
    amount: 875000,
    currency: "XAF",
    date: new Date("2024-02-01T13:45:00Z"),
    dueDate: new Date("2024-02-01T23:59:59Z"),
    status: "Paid" as PaymentStatus,
    method: "Bank Transfer",
    transactionId: "TXN-2024-334455667",
    reference: "HB-2024-003456-001",
    description: "Q1 2024 premium payment for Business Liability Insurance",
    createdAt: new Date("2024-01-25T09:30:00Z"),
    processedAt: new Date("2024-02-01T13:45:00Z"),
  },
  {
    id: "pay-007",
    policyId: "pol-006",
    policyNumber: "HM-2024-004123",
    customerId: "customer-006",
    amount: 350000,
    currency: "XAF",
    date: new Date("2024-04-10T10:15:00Z"),
    dueDate: new Date("2024-04-10T23:59:59Z"),
    status: "Paid" as PaymentStatus,
    method: "Cash",
    reference: "HM-2024-004123-001",
    description: "Annual premium payment for Motorcycle Insurance",
    createdAt: new Date("2024-04-05T08:00:00Z"),
    processedAt: new Date("2024-04-10T10:15:00Z"),
  },
  {
    id: "pay-008",
    policyId: "pol-009",
    policyNumber: "HM-2024-007890",
    customerId: "customer-009",
    amount: 450000,
    currency: "XAF",
    date: new Date("2024-02-10T15:20:00Z"),
    dueDate: new Date("2024-02-10T23:59:59Z"),
    status: "Paid" as PaymentStatus,
    method: "Mobile Money",
    transactionId: "OM-2024-112233445",
    reference: "HM-2024-007890-001",
    description: "Annual premium payment for Third Party Motor Insurance",
    createdAt: new Date("2024-02-05T11:00:00Z"),
    processedAt: new Date("2024-02-10T15:20:00Z"),
  },
  {
    id: "pay-009",
    policyId: "pol-010",
    policyNumber: "HH-2024-008901",
    customerId: "customer-010",
    amount: 900000,
    currency: "XAF",
    date: new Date("2024-03-05T12:30:00Z"),
    dueDate: new Date("2024-03-05T23:59:59Z"),
    status: "Paid" as PaymentStatus,
    method: "Bank Transfer",
    transactionId: "TXN-2024-998877665",
    reference: "HH-2024-008901-001",
    description: "Annual premium payment for Rental Property Insurance",
    createdAt: new Date("2024-02-28T14:45:00Z"),
    processedAt: new Date("2024-03-05T12:30:00Z"),
  },
  {
    id: "pay-010",
    policyId: "pol-011",
    policyNumber: "HL-2024-009012",
    customerId: "customer-011",
    amount: 400000,
    currency: "XAF",
    date: new Date("2024-01-30T11:45:00Z"),
    dueDate: new Date("2024-01-30T23:59:59Z"),
    status: "Paid" as PaymentStatus,
    method: "Credit Card",
    transactionId: "TXN-2024-778899001",
    reference: "HL-2024-009012-001",
    description: "Q1 2024 premium payment for Education Savings Plan",
    createdAt: new Date("2024-01-25T09:15:00Z"),
    processedAt: new Date("2024-01-30T11:45:00Z"),
  },
  // Pending payments
  {
    id: "pay-011",
    policyId: "pol-002",
    policyNumber: "HH-2024-001567",
    customerId: "customer-002",
    amount: 300000,
    currency: "XAF",
    date: new Date("2024-09-01T00:00:00Z"),
    dueDate: new Date("2024-09-01T23:59:59Z"),
    status: "Pending" as PaymentStatus,
    method: "Bank Transfer",
    reference: "HH-2024-001567-003",
    description: "Q3 2024 premium payment for Home & Contents Insurance",
    createdAt: new Date("2024-08-25T10:00:00Z"),
  },
  {
    id: "pay-012",
    policyId: "pol-004",
    policyNumber: "HH-2024-002890",
    customerId: "customer-004",
    amount: 150000,
    currency: "XAF",
    date: new Date("2024-02-29T00:00:00Z"),
    dueDate: new Date("2024-02-29T23:59:59Z"),
    status: "Pending" as PaymentStatus,
    method: "Credit Card",
    reference: "HH-2024-002890-002",
    description: "February 2024 premium payment for Health Insurance",
    createdAt: new Date("2024-02-25T08:30:00Z"),
  },
  {
    id: "pay-013",
    policyId: "pol-011",
    policyNumber: "HL-2024-009012",
    customerId: "customer-011",
    amount: 400000,
    currency: "XAF",
    date: new Date("2024-04-30T00:00:00Z"),
    dueDate: new Date("2024-04-30T23:59:59Z"),
    status: "Pending" as PaymentStatus,
    method: "Mobile Money",
    reference: "HL-2024-009012-002",
    description: "Q2 2024 premium payment for Education Savings Plan",
    createdAt: new Date("2024-04-25T12:20:00Z"),
  },
  // Failed payments
  {
    id: "pay-014",
    policyId: "pol-012",
    policyNumber: "HB-2024-009123",
    customerId: "customer-012",
    amount: 2800000,
    currency: "XAF",
    date: new Date("2024-01-01T00:00:00Z"),
    dueDate: new Date("2024-01-01T23:59:59Z"),
    status: "Failed" as PaymentStatus,
    method: "Credit Card",
    reference: "HB-2024-009123-001",
    description:
      "Annual premium payment for Professional Indemnity (FAILED - Insufficient Funds)",
    createdAt: new Date("2023-12-25T15:00:00Z"),
  },
];

// Helper functions
export const getPaymentById = (id: string): Payment | undefined => {
  return mockPayments.find((payment) => payment.id === id);
};

export const getPaymentsByCustomerId = (customerId: string): Payment[] => {
  return mockPayments.filter((payment) => payment.customerId === customerId);
};

export const getPaymentsByPolicyId = (policyId: string): Payment[] => {
  return mockPayments.filter((payment) => payment.policyId === policyId);
};

export const getPaymentsByStatus = (status: PaymentStatus): Payment[] => {
  return mockPayments.filter((payment) => payment.status === status);
};

export const getPaymentsByMethod = (method: Payment["method"]): Payment[] => {
  return mockPayments.filter((payment) => payment.method === method);
};

export const getTotalPaidAmount = (customerId?: string): number => {
  const payments = customerId
    ? getPaymentsByCustomerId(customerId).filter((p) => p.status === "Paid")
    : getPaymentsByStatus("Paid");

  return payments.reduce((total, payment) => total + payment.amount, 0);
};

export const getLastPayment = (customerId: string): Payment | undefined => {
  const customerPayments = getPaymentsByCustomerId(customerId)
    .filter((p) => p.status === "Paid")
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return customerPayments[0];
};
