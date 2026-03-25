import { Payment, PaymentFilters, PaginatedResponse } from '../types';
import { mockPayments, getPaymentsByCustomerId, getPaymentsByStatus, getTotalPaidAmount, getLastPayment } from './mockPayments';
import { mockDelay } from './mockDelay';

// TODO: Replace with real API calls when backend is ready

export const getPayments = async (
  filters?: PaymentFilters,
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Payment>> => {
  let filteredPayments = [...mockPayments];

  if (filters) {
    if (filters.status) {
      filteredPayments = getPaymentsByStatus(filters.status);
    }
    if (filters.policyNumber) {
      const searchTerm = filters.policyNumber.toLowerCase();
      filteredPayments = filteredPayments.filter(p => p.policyNumber.toLowerCase().includes(searchTerm));
    }
    if (filters.dateFrom) {
      filteredPayments = filteredPayments.filter(p => p.date >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      filteredPayments = filteredPayments.filter(p => p.date <= filters.dateTo!);
    }
    if (filters.method) {
      filteredPayments = filteredPayments.filter(p => p.method === filters.method);
    }
  }

  filteredPayments.sort((a, b) => b.date.getTime() - a.date.getTime());

  const total = filteredPayments.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const data = filteredPayments.slice(startIndex, startIndex + pageSize);

  return mockDelay({ data, total, page, pageSize, totalPages });
};

export const getCustomerPayments = async (customerId: string): Promise<Payment[]> => {
  return mockDelay(getPaymentsByCustomerId(customerId));
};

export const getPaymentStats = async (customerId?: string) => {
  const payments = customerId ? getPaymentsByCustomerId(customerId) : mockPayments;

  const stats = {
    total: payments.length,
    paid: payments.filter(p => p.status === 'Paid').length,
    pending: payments.filter(p => p.status === 'Pending').length,
    failed: payments.filter(p => p.status === 'Failed').length,
    totalPaidAmount: getTotalPaidAmount(customerId),
    lastPayment: customerId ? getLastPayment(customerId) : undefined,
  };

  return mockDelay(stats);
};