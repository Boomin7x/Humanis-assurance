// src/portal/agent/expiring/ExpiringPolicies.tsx
// Expiring Policies Management for Agent Portal

import {
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  DataTable,
  type DataTableColumn,
} from "../../shared/components/DataTable";
import { ErrorAlert } from "../../shared/components/ErrorAlert";
import { LoadingSkeleton } from "../../shared/components/LoadingSkeleton";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatusChip } from "../../shared/components/StatusChip";
import { useMockFetch } from "../../shared/hooks/useMockFetch";
import { getExpiringPoliciesService } from "../../shared/mock/mockPolicyService";
import { Policy } from "../../shared/types";

interface ExpiringPolicy extends Policy {
  daysRemaining: number;
  followedUp: boolean;
}

/**
 * Expiring Policies - Manage and follow up on expiring policies
 */
export function ExpiringPolicies(): React.ReactElement {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<number>(30);
  const [followUpStates, setFollowUpStates] = useState<Record<string, boolean>>(
    {},
  );

  // Fetch expiring policies based on selected days with proper memoization
  const fetchExpiringPolicies = useCallback(() => {
    return getExpiringPoliciesService(selectedDays);
  }, [selectedDays]);

  const {
    data: policies,
    loading,
    error,
    refetch,
  } = useMockFetch(fetchExpiringPolicies, [fetchExpiringPolicies]);

  const handleDaysChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newValue: number | null) => {
      if (newValue !== null) {
        setSelectedDays(newValue);
      }
    },
    [],
  );

  const handleFollowUpToggle = useCallback((policyId: string) => {
    setFollowUpStates((prev) => ({
      ...prev,
      [policyId]: !prev[policyId],
    }));
  }, []);

  // Calculate days remaining for each policy
  const expiringPoliciesWithDays: ExpiringPolicy[] = React.useMemo(() => {
    if (!policies) return [];

    const now = new Date();
    return policies.map((policy) => ({
      ...policy,
      daysRemaining: Math.max(
        0,
        Math.ceil(
          (policy.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        ),
      ),
      followedUp: followUpStates[policy.id] || false,
    }));
  }, [policies, followUpStates]);

  // Table columns configuration
  const columns: DataTableColumn<ExpiringPolicy>[] = [
    {
      field: "policyNumber",
      headerName: "Policy Number",
      width: 180,
      renderCell: ({ value, row }) => (
        <Box>
          <Typography variant="body2" fontWeight={600} color="#111827">
            {value}
          </Typography>
          <Typography variant="caption" color="#6B7280">
            {row.productType}
          </Typography>
        </Box>
      ),
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 180,
      renderCell: ({ value }) => (
        <Typography variant="body2" color="#111827">
          {value}
        </Typography>
      ),
    },
    {
      field: "product",
      headerName: "Product",
      width: 180,
      renderCell: ({ value }) => (
        <Typography variant="body2" color="#111827">
          {value}
        </Typography>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 120,
      renderCell: ({ value }) => (
        <Typography variant="body2" color="#374151">
          {new Date(value).toLocaleDateString("en-GB")}
        </Typography>
      ),
    },
    {
      field: "daysRemaining",
      headerName: "Days Remaining",
      width: 120,
      renderCell: ({ value }) => {
        const isUrgent = value <= 7;
        const isWarning = value <= 15;

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.5,
              borderRadius: "4px",
              backgroundColor: isUrgent
                ? "#FEF2F2"
                : isWarning
                  ? "#FFFBEB"
                  : "#F0FDF4",
              color: isUrgent ? "#DC2626" : isWarning ? "#D97706" : "#16A34A",
              border: `1px solid ${isUrgent ? "#FCA5A5" : isWarning ? "#FDE68A" : "#BBF7D0"}`,
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          >
            <ScheduleIcon sx={{ fontSize: 14 }} />
            {value} days
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: ({ row }) => {
        if (row.followedUp) {
          return <StatusChip status="Followed Up" />;
        }
        return <StatusChip status={row.status} />;
      },
    },
    {
      field: "followUp",
      headerName: "Follow Up",
      width: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <FormControlLabel
          control={
            <Switch
              checked={row.followedUp}
              onChange={() => handleFollowUpToggle(row.id)}
              size="small"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#16A34A",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#16A34A",
                },
              }}
            />
          }
          label=""
          sx={{ m: 0 }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ViewIcon />}
            onClick={() => navigate(`/portal/agent/policies/${row.id}`)}
            sx={{
              fontSize: "0.75rem",
              py: 0.5,
              px: 1,
              border: "1px solid #1D6FA4",
              color: "#1D6FA4",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#E8F3FA",
                border: "1px solid #1B3A5C",
              },
            }}
          >
            View
          </Button>
          <Tooltip title="Coming in V1.1" arrow>
            <span>
              <Button
                size="small"
                variant="outlined"
                startIcon={<EmailIcon />}
                disabled
                sx={{
                  fontSize: "0.75rem",
                  py: 0.5,
                  px: 1,
                  borderRadius: "4px",
                }}
              >
                Notify
              </Button>
            </span>
          </Tooltip>
        </Box>
      ),
    },
  ];

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <PageHeader
          title="Expiring Policies"
          subtitle="Track and follow up on policies nearing expiration"
        />
        <ErrorAlert
          message="Failed to load expiring policies. Please try again."
          onRetry={refetch}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Expiring Policies"
        subtitle="Track and follow up on policies nearing expiration"
      />

      {/* Filter Controls */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="#6B7280"
              sx={{ mb: 1, fontWeight: 500 }}
            >
              Show policies expiring within:
            </Typography>
            <ToggleButtonGroup
              value={selectedDays}
              exclusive
              onChange={handleDaysChange}
              aria-label="expiring policies filter"
              sx={{
                "& .MuiToggleButton-root": {
                  border: "1px solid #D1D5DB",
                  borderRadius: "4px",
                  color: "#6B7280",
                  fontWeight: 500,
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  "&.Mui-selected": {
                    backgroundColor: "#1D6FA4",
                    color: "white",
                    border: "1px solid #1D6FA4",
                    "&:hover": {
                      backgroundColor: "#1B3A5C",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#F3F4F6",
                  },
                },
              }}
            >
              <ToggleButton value={30}>30 Days</ToggleButton>
              <ToggleButton value={60}>60 Days</ToggleButton>
              <ToggleButton value={90}>90 Days</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="#6B7280">
              {expiringPoliciesWithDays.length} policies found
            </Typography>
            <Typography variant="caption" color="#6B7280">
              {
                Object.keys(followUpStates).filter((key) => followUpStates[key])
                  .length
              }{" "}
              followed up
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Summary Cards */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          boxShadow: "none",
          backgroundColor: "#FFFBEB",
          borderColor: "#F59E0B",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <ScheduleIcon sx={{ color: "#D97706", fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#92400E" }}>
            Urgent Action Required
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#DC2626" }}>
              {
                expiringPoliciesWithDays.filter((p) => p.daysRemaining <= 7)
                  .length
              }
            </Typography>
            <Typography variant="body2" color="#92400E">
              Expiring within 7 days
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#D97706" }}>
              {
                expiringPoliciesWithDays.filter((p) => p.daysRemaining <= 15)
                  .length
              }
            </Typography>
            <Typography variant="body2" color="#92400E">
              Expiring within 15 days
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#16A34A" }}>
              {
                Object.keys(followUpStates).filter((key) => followUpStates[key])
                  .length
              }
            </Typography>
            <Typography variant="body2" color="#92400E">
              Followed up
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Data Table */}
      <Paper
        sx={{
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          boxShadow: "none",
        }}
      >
        {loading ? (
          <Box sx={{ p: 3 }}>
            <LoadingSkeleton variant="table" count={10} />
          </Box>
        ) : (
          <DataTable
            columns={columns}
            rows={expiringPoliciesWithDays}
            emptyMessage="No policies expiring in the selected timeframe"
            getRowId={(row: ExpiringPolicy) => row.id}
            pageSize={15}
          />
        )}
      </Paper>

      {/* Footer Info */}
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="caption" color="#6B7280">
          Tip: Use the follow-up toggle to mark policies you've contacted about
          renewal. Notification features will be available in V1.1.
        </Typography>
      </Box>
    </Box>
  );
}
