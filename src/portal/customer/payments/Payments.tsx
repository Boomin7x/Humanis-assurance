// src/portal/customer/payments/Payments.tsx
// Customer payments page with transaction history and filtering

import {
  FilterList as FilterIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { DataTable, DataTableColumn } from "../../shared/components/DataTable";
import { ErrorAlert } from "../../shared/components/ErrorAlert";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatusChip } from "../../shared/components/StatusChip";
import { SummaryCard } from "../../shared/components/SummaryCard";
import { useAuth } from "../../shared/hooks/useAuth";
import { useMockFetch } from "../../shared/hooks/useMockFetch";

import {
  getCustomerPayments,
  getPaymentStats,
} from "../../shared/mock/mockPaymentService";
import type { Payment, PaymentStatus } from "../../shared/types";

/**
 * Formats currency for display
 */
const formatCurrency = (amount: number, currency: string = "XAF"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats date for display in table
 */
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

/**
 * Payment method display colors
 */
const getPaymentMethodColor = (method: Payment["method"]): string => {
  switch (method) {
    case "Credit Card":
      return "#1976d2";
    case "Bank Transfer":
      return "#2e7d32";
    case "Mobile Money":
      return "#ed6c02";
    case "Cash":
      return "#9c27b0";
    case "Check":
      return "#5d4037";
    default:
      return "#616161";
  }
};

/**
 * Customer Payments page component
 */
export function Payments(): React.ReactElement {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "">("");

  // Memoized fetch functions
  const fetchCustomerPayments = useCallback(
    () => getCustomerPayments(user?.id || ""),
    [user?.id],
  );

  const fetchPaymentStats = useCallback(
    () => getPaymentStats(user?.id),
    [user?.id],
  );

  const {
    data: allPayments,
    loading: loadingPayments,
    error: paymentsError,
    refetch: refetchPayments,
  } = useMockFetch(fetchCustomerPayments);

  const {
    data: paymentStats,
    loading: loadingStats,
    error: statsError,
  } = useMockFetch(fetchPaymentStats);

  // Filter payments by status
  const filteredPayments = React.useMemo(() => {
    if (!allPayments) return [];
    if (!statusFilter) return allPayments;
    return allPayments.filter((payment) => payment.status === statusFilter);
  }, [allPayments, statusFilter]);

  /**
   * Handle status filter change
   */
  const handleStatusFilterChange = useCallback((status: PaymentStatus | "") => {
    setStatusFilter(status);
  }, []);

  // Calculate total paid amount for display
  const totalPaid = React.useMemo(() => {
    if (!allPayments) return 0;
    return allPayments
      .filter((payment) => payment.status === "Paid")
      .reduce((sum, payment) => sum + payment.amount, 0);
  }, [allPayments]);

  // Define table columns
  const columns: DataTableColumn<Payment>[] = [
    {
      field: "policyNumber",
      headerName: "Policy Number",
      width: 180,
      renderCell: ({ value }) => (
        <Box sx={{ fontFamily: "monospace", fontWeight: 500 }}>{value}</Box>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: ({ value, row }) => (
        <Box sx={{ fontWeight: 500 }}>
          {formatCurrency(value, row.currency)}
        </Box>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
      renderCell: ({ value }) => formatDate(new Date(value)),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ value }) => (
        <StatusChip status={value} variant="filled" size="small" />
      ),
    },
    {
      field: "method",
      headerName: "Payment Method",
      width: 150,
      renderCell: ({ value }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: getPaymentMethodColor(value),
            }}
          />
          <Typography variant="body2">{value}</Typography>
        </Box>
      ),
    },
    {
      field: "reference",
      headerName: "Reference",
      width: 200,
      renderCell: ({ value }) => (
        <Box sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
          {value}
        </Box>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      renderCell: ({ value }) => (
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          {value}
        </Box>
      ),
    },
  ];

  const error = paymentsError || statsError;
  const loading = loadingPayments || loadingStats;

  if (error) {
    return (
      <Box>
        <PageHeader
          title="My Payments"
          subtitle="View your payment history and transactions"
          action={{
            label: "Refresh",
            onClick: refetchPayments,
            variant: "outlined",
          }}
        />
        <ErrorAlert message={error} />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="My Payments"
        subtitle="View your payment history and transactions"
        action={{
          label: "Refresh",
          onClick: refetchPayments,
          variant: "outlined",
        }}
      />

      {/* Payment Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            icon={<PaymentIcon />}
            label="Total Paid"
            value={formatCurrency(totalPaid)}
            variant="success"
            loading={loading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            icon={<PaymentIcon />}
            label="Total Payments"
            value={paymentStats?.total || 0}
            variant="primary"
            loading={loading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            icon={<PaymentIcon />}
            label="Pending Payments"
            value={paymentStats?.pending || 0}
            variant={paymentStats?.pending ? "warning" : "success"}
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Status Filter */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <FilterIcon color="action" />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) =>
              handleStatusFilterChange(e.target.value as PaymentStatus | "")
            }
            label="Filter by Status"
          >
            <MenuItem value="">All Payments</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </FormControl>
        {statusFilter && (
          <Alert severity="info" variant="outlined" sx={{ py: 0.5 }}>
            Showing {filteredPayments.length} {statusFilter.toLowerCase()}{" "}
            payment{filteredPayments.length !== 1 ? "s" : ""}
          </Alert>
        )}
      </Box>

      {/* Payments Table */}
      {filteredPayments && filteredPayments.length === 0 && !loading ? (
        <Alert severity="info" variant="outlined">
          {statusFilter
            ? `No payments found with status "${statusFilter}"`
            : "No payment history available yet."}
        </Alert>
      ) : (
        <DataTable
          columns={columns}
          rows={filteredPayments || []}
          loading={loading}
          emptyMessage="No payments found"
          getRowId={(row: Payment) => row.id}
        />
      )}

      {/* Payment Methods Legend */}
      {allPayments && allPayments.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              Payment Methods
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {Array.from(new Set(allPayments.map((p) => p.method))).map(
                (method) => (
                  <Box
                    key={method}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: "action.hover",
                    }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: getPaymentMethodColor(method),
                      }}
                    />
                    <Typography variant="caption">{method}</Typography>
                  </Box>
                ),
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
