// src/portal/agent/commissions/Commissions.tsx
// Commission Management for Agent Portal

import {
  MonetizationOn as CommissionIcon,
  Paid as PaidIcon,
  PendingActions as PendingIcon,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";

import { DataTable, DataTableColumn } from "../../shared/components/DataTable";
import { ErrorAlert } from "../../shared/components/ErrorAlert";
import { LoadingSkeleton } from "../../shared/components/LoadingSkeleton";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatusChip } from "../../shared/components/StatusChip";
import { SummaryCard } from "../../shared/components/SummaryCard";
import { useAuth } from "../../shared/hooks/useAuth";
import { useFilters } from "../../shared/hooks/useFilters";
import { useMockFetch } from "../../shared/hooks/useMockFetch";
import {
  getAgentCommissions,
  getCommissionSummaryService,
} from "../../shared/mock/mockCommissionService";
import { Commission, CommissionStatus } from "../../shared/types";

const statusOptions: CommissionStatus[] = ["Paid", "Pending", "Processing"];

/**
 * Commissions - Commission tracking and management for agents
 */
export function Commissions(): React.ReactElement {
  const { user } = useAuth();

  // Filters
  const { filters, setFilters } = useFilters({
    paymentStatus: "" as CommissionStatus | "",
  });

  // Fetch commissions data with proper memoization
  const fetchCommissions = useCallback(() => {
    return getAgentCommissions(user?.id || "");
  }, [user?.id]);

  const {
    data: commissions,
    loading: commissionsLoading,
    error: commissionsError,
  } = useMockFetch(fetchCommissions, [fetchCommissions]);

  // Fetch commission summary with proper memoization
  const fetchCommissionSummary = useCallback(() => {
    return getCommissionSummaryService(user?.id);
  }, [user?.id]);

  const {
    data: commissionSummary,
    loading: summaryLoading,
    error: summaryError,
  } = useMockFetch(fetchCommissionSummary, [fetchCommissionSummary]);

  // Apply filters
  const filteredCommissions = useMemo(() => {
    if (!commissions) return [];

    return commissions.filter((commission) => {
      // Payment status filter
      if (
        filters.paymentStatus &&
        commission.paymentStatus !== filters.paymentStatus
      ) {
        return false;
      }
      return true;
    });
  }, [commissions, filters.paymentStatus]);

  // Table columns configuration
  const columns: DataTableColumn<Commission>[] = [
    {
      field: "policyNumber",
      headerName: "Policy Number",
      width: 180,
      renderCell: ({ value }) => (
        <Typography variant="body2" fontWeight={600} color="#111827">
          {value}
        </Typography>
      ),
    },
    {
      field: "premiumAmount",
      headerName: "Premium Amount",
      width: 140,
      renderCell: ({ value, row }) => (
        <Typography variant="body2" color="#374151">
          {row.currency} {value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "commissionRate",
      headerName: "Commission Rate",
      width: 130,
      renderCell: ({ value }) => (
        <Typography variant="body2" color="#374151">
          {value}%
        </Typography>
      ),
    },
    {
      field: "commissionAmount",
      headerName: "Commission Amount",
      width: 150,
      renderCell: ({ value, row }) => (
        <Typography variant="body2" fontWeight={600} color="#16A34A">
          {row.currency} {value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: ({ value }) => <StatusChip status={value} />,
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      width: 120,
      renderCell: ({ value }) => (
        <Typography variant="body2" color="#374151">
          {value ? new Date(value).toLocaleDateString("en-GB") : "-"}
        </Typography>
      ),
    },
    {
      field: "period",
      headerName: "Period",
      width: 100,
      renderCell: ({ value }) => (
        <Typography variant="body2" color="#374151">
          {value}
        </Typography>
      ),
    },
  ];

  // Loading state
  const isLoading = commissionsLoading || summaryLoading;

  // Error handling
  const hasError = commissionsError || summaryError;

  if (hasError) {
    return (
      <Box sx={{ p: 3 }}>
        <PageHeader
          title="Commission Management"
          subtitle="Track your commission earnings and payments"
        />
        <ErrorAlert
          message="Failed to load commission data. Please try again."
          onRetry={() => window.location.reload()}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Commission Management"
        subtitle="Track your commission earnings and payments"
      />

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            icon={<PaidIcon />}
            label="Total Paid"
            value={`€${commissionSummary?.totalPaid.toLocaleString() || "0"}`}
            subtitle="All time earnings"
            variant="success"
            loading={isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            icon={<PendingIcon />}
            label="Total Pending"
            value={`€${commissionSummary?.totalPending.toLocaleString() || "0"}`}
            subtitle="Awaiting payment"
            variant="warning"
            loading={isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            icon={<CommissionIcon />}
            label="Processing"
            value={`€${commissionSummary?.totalProcessing?.toLocaleString() || "0"}`}
            subtitle="Being processed"
            variant="info"
            loading={isLoading}
          />
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          boxShadow: "none",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Payment Status Filter"
              value={filters.paymentStatus}
              onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value as CommissionStatus | "" })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
              }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="#111827" fontWeight={600}>
                {filteredCommissions.length}
              </Typography>
              <Typography variant="caption" color="#6B7280">
                Commission records
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="#16A34A" fontWeight={600}>
                €
                {filteredCommissions
                  .reduce(
                    (sum, comm) =>
                      sum +
                      (comm.paymentStatus === "Paid"
                        ? comm.commissionAmount
                        : 0),
                    0,
                  )
                  .toLocaleString()}
              </Typography>
              <Typography variant="caption" color="#6B7280">
                Paid this period
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Commission Breakdown */}
      <Paper
        sx={{
          mb: 3,
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          boxShadow: "none",
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#1B3A5C", mb: 2 }}
        >
          Commission Breakdown
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" fontWeight={700} color="#16A34A">
                {
                  filteredCommissions.filter((c) => c.paymentStatus === "Paid")
                    .length
                }
              </Typography>
              <Typography variant="body2" color="#6B7280">
                Paid Commissions
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" fontWeight={700} color="#D97706">
                {
                  filteredCommissions.filter(
                    (c) => c.paymentStatus === "Pending",
                  ).length
                }
              </Typography>
              <Typography variant="body2" color="#6B7280">
                Pending Commissions
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" fontWeight={700} color="#0284C7">
                {
                  filteredCommissions.filter(
                    (c) => c.paymentStatus === "Processing",
                  ).length
                }
              </Typography>
              <Typography variant="body2" color="#6B7280">
                Processing
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" fontWeight={700} color="#111827">
                {filteredCommissions.length > 0
                  ? (
                      filteredCommissions.reduce(
                        (sum, c) => sum + c.commissionRate,
                        0,
                      ) / filteredCommissions.length
                    ).toFixed(1)
                  : "0"}
                %
              </Typography>
              <Typography variant="body2" color="#6B7280">
                Avg Commission Rate
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Data Table */}
      <Paper
        sx={{
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          boxShadow: "none",
        }}
      >
        {isLoading ? (
          <Box sx={{ p: 3 }}>
            <LoadingSkeleton variant="table" count={10} />
          </Box>
        ) : (
          <DataTable
            columns={columns}
            rows={filteredCommissions}
            emptyMessage="No commission records found matching your criteria"
            getRowId={(row: Commission) => row.id}
            pageSize={15}
          />
        )}
      </Paper>

      {/* Footer Information */}
      <Box
        sx={{
          mt: 3,
          p: 3,
          backgroundColor: "#F9FAFB",
          borderRadius: "6px",
          border: "1px solid #E5E7EB",
        }}
      >
        <Typography
          variant="h6"
          color="#111827"
          fontWeight={600}
          sx={{ mb: 1 }}
        >
          Commission Information
        </Typography>
        <Typography variant="body2" color="#6B7280" sx={{ mb: 1 }}>
          • Commissions are calculated as a percentage of the premium amount
        </Typography>
        <Typography variant="body2" color="#6B7280" sx={{ mb: 1 }}>
          • Payments are processed monthly for all eligible commissions
        </Typography>
        <Typography variant="body2" color="#6B7280" sx={{ mb: 1 }}>
          • Commission rates may vary by product type and policy terms
        </Typography>
        <Typography variant="body2" color="#6B7280">
          • For commission disputes or questions, please contact your supervisor
        </Typography>
      </Box>
    </Box>
  );
}
