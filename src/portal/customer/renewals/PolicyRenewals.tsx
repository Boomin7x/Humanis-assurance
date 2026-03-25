// src/portal/customer/renewals/PolicyRenewals.tsx
// Customer policy renewals page with renewal request functionality

import {
  Schedule as ScheduleIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { ConfirmDialog } from "../../shared/components/ConfirmDialog";
import {
  DataTable,
  type DataTableColumn,
} from "../../shared/components/DataTable";
import { ErrorAlert } from "../../shared/components/ErrorAlert";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatusChip } from "../../shared/components/StatusChip";
import { useAuth } from "../../shared/hooks/useAuth";
import { useMockFetch } from "../../shared/hooks/useMockFetch";

import { getCustomerExpiringPolicies } from "../../shared/mock/mockPolicyService";
import {
  getRenewalStatus,
  requestRenewal,
} from "../../shared/mock/mockRenewalService";
import type { Policy } from "../../shared/types";

type RenewalStatus = "none" | "pending" | "approved" | "rejected";

interface PolicyWithRenewal extends Policy {
  daysRemaining: number;
  renewalStatus: RenewalStatus;
}

/**
 * Calculates days remaining until policy expiration
 */
const calculateDaysRemaining = (endDate: Date): number => {
  const today = new Date();
  const expiry = new Date(endDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Formats date for display
 */
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

/**
 * Gets renewal status label
 */
const getRenewalStatusLabel = (status: RenewalStatus): string => {
  switch (status) {
    case "approved":
      return "Approved";
    case "pending":
      return "Pending";
    case "rejected":
      return "Rejected";
    case "none":
    default:
      return "Not Requested";
  }
};

/**
 * Policy Renewals page component
 */
export function PolicyRenewals(): React.ReactElement {
  const { user } = useAuth();
  const [daysFilter, setDaysFilter] = useState<number>(30);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    policyId: string;
    policyNumber: string;
  }>({ open: false, policyId: "", policyNumber: "" });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const [requestingRenewal, setRequestingRenewal] = useState<string | null>(
    null,
  );
  const [renewalStatuses, setRenewalStatuses] = useState<
    Map<string, RenewalStatus>
  >(new Map());

  // Fetch expiring policies
  const fetchExpiringPolicies = useCallback(
    () => getCustomerExpiringPolicies(user?.id || "", daysFilter),
    [user?.id, daysFilter],
  );

  const {
    data: policies,
    loading,
    error,
    refetch,
  } = useMockFetch(fetchExpiringPolicies);

  // Lazy fetch for renewal requests
  // const [submitRenewalRequest] = useLazyMockFetch(
  //   () => requestRenewal('', user?.id || '')
  // );

  // Load renewal statuses for all policies
  React.useEffect(() => {
    if (policies) {
      const loadRenewalStatuses = async () => {
        const statusMap = new Map<string, RenewalStatus>();
        for (const policy of policies) {
          try {
            const renewalRequest = await getRenewalStatus(policy.id);
            // Convert ExtendedRenewalRequest to RenewalStatus
            const status: RenewalStatus = renewalRequest?.status as RenewalStatus || "none";
            statusMap.set(policy.id, status);
          } catch (error) {
            console.error(
              "Failed to load renewal status for policy:",
              policy.id,
              error,
            );
            statusMap.set(policy.id, "none");
          }
        }
        setRenewalStatuses(statusMap);
      };
      loadRenewalStatuses();
    }
  }, [policies]);

  // Transform policies with additional data
  const policiesWithRenewal: PolicyWithRenewal[] = React.useMemo(() => {
    return (policies || []).map((policy) => ({
      ...policy,
      daysRemaining: calculateDaysRemaining(policy.endDate),
      renewalStatus: renewalStatuses.get(policy.id) || "none",
    }));
  }, [policies, renewalStatuses]);

  /**
   * Handle days filter change
   */
  const handleDaysFilterChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newDays: number | null) => {
      if (newDays !== null) {
        setDaysFilter(newDays);
      }
    },
    [],
  );

  /**
   * Handle renewal request confirmation
   */
  const handleRequestRenewal = useCallback(
    (policyId: string, policyNumber: string) => {
      setConfirmDialog({
        open: true,
        policyId,
        policyNumber,
      });
    },
    [],
  );

  /**
   * Handle confirm renewal request
   */
  const handleConfirmRenewal = useCallback(async () => {
    const { policyId, policyNumber } = confirmDialog;
    if (!policyId || !user?.id) return;

    setRequestingRenewal(policyId);
    setConfirmDialog({ open: false, policyId: "", policyNumber: "" });

    try {
      await requestRenewal(
        policyId,
        user.id,
        "Renewal requested via customer portal",
      );

      // Update local renewal status
      setRenewalStatuses((prev) => new Map(prev.set(policyId, "pending")));

      setSnackbar({
        open: true,
        message: `Renewal request submitted for policy ${policyNumber}`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Failed to submit renewal request: ${error instanceof Error ? error.message : "Unknown error"}`,
        severity: "error",
      });
    } finally {
      setRequestingRenewal(null);
    }
  }, [confirmDialog, user?.id]);

  /**
   * Handle cancel renewal dialog
   */
  const handleCancelRenewal = useCallback(() => {
    setConfirmDialog({ open: false, policyId: "", policyNumber: "" });
  }, []);

  /**
   * Handle close snackbar
   */
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // Define table columns
  const columns: DataTableColumn<PolicyWithRenewal>[] = [
    {
      field: "policyNumber",
      headerName: "Policy Number",
      width: 180,
      renderCell: ({ value }) => (
        <Box sx={{ fontFamily: "monospace", fontWeight: 500 }}>{value}</Box>
      ),
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: ({ value, row }) => (
        <Box>
          <Box sx={{ fontWeight: 500 }}>{value}</Box>
          <Box sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
            {row.productType}
          </Box>
        </Box>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      renderCell: ({ value }) => formatDate(new Date(value)),
    },
    {
      field: "daysRemaining",
      headerName: "Days Remaining",
      width: 140,
      renderCell: ({ value }) => (
        <Box
          sx={{
            color:
              value <= 30
                ? "error.main"
                : value <= 60
                  ? "warning.main"
                  : "text.primary",
            fontWeight: 500,
          }}
        >
          {value} days
        </Box>
      ),
    },
    {
      field: "renewalStatus",
      headerName: "Renewal Status",
      width: 150,
      renderCell: ({ value }) => (
        <StatusChip status={getRenewalStatusLabel(value)} size="small" />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: ({ row }) => {
        const isRequested =
          row.renewalStatus === "pending" || row.renewalStatus === "approved";
        const isProcessing = requestingRenewal === row.id;

        return (
          <Tooltip
            title={
              isRequested ? "Renewal already requested" : "Request renewal"
            }
          >
            <span>
              <Button
                size="small"
                variant="outlined"
                startIcon={
                  isProcessing ? <CircularProgress size={14} /> : <SendIcon />
                }
                disabled={isRequested || isProcessing}
                onClick={() => handleRequestRenewal(row.id, row.policyNumber)}
                sx={{ fontSize: "0.75rem" }}
              >
                {isRequested ? "Requested" : "Request"}
              </Button>
            </span>
          </Tooltip>
        );
      },
    },
  ];

  if (error) {
    return (
      <Box>
        <PageHeader
          title="Policy Renewals"
          subtitle="Manage your policy renewals"
          action={{
            label: "Refresh",
            onClick: refetch,
            variant: "outlined"
          }}
        />
        <ErrorAlert message={error} />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Policy Renewals"
        subtitle="Manage your policy renewals"
        action={{
          label: "Refresh",
          onClick: refetch,
          variant: "outlined"
        }}
      />

      {/* Days Filter */}
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={daysFilter}
          exclusive
          onChange={handleDaysFilterChange}
          aria-label="days filter"
          size="small"
        >
          <ToggleButton value={30} aria-label="30 days">
            30 Days
          </ToggleButton>
          <ToggleButton value={60} aria-label="60 days">
            60 Days
          </ToggleButton>
          <ToggleButton value={90} aria-label="90 days">
            90 Days
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Data Table */}
      {policiesWithRenewal && policiesWithRenewal.length === 0 && !loading ? (
        <Alert severity="info" variant="outlined" icon={<ScheduleIcon />}>
          No policies expiring in the next {daysFilter} days.
        </Alert>
      ) : (
        <DataTable
          columns={columns}
          rows={policiesWithRenewal || []}
          loading={loading}
          emptyMessage={`No policies expiring in the next ${daysFilter} days`}
          getRowId={(row: PolicyWithRenewal) => row.id}
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        title="Request Policy Renewal"
        message={`Are you sure you want to request renewal for policy ${confirmDialog.policyNumber}? This will notify your agent to begin the renewal process.`}
        onConfirm={handleConfirmRenewal}
        onClose={handleCancelRenewal}
        confirmText="Request Renewal"
        cancelText="Cancel"
      />

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
